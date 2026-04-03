import { getAuthenticatedClient, unwrapApiData } from "../api/client";
import { reportService } from "../report/reportService";
import { orderService, OrderStatus } from "../order/orderService";
import { adminTicketService } from "../ticket/adminTicketService";
import { toIsoRange } from "@/lib/adminDashboardDateRange";
import { fetchScraperProxyStatusJsonDeduped } from "@/lib/adminScraperProxyStatusFetch";

function pick(obj, camelKey, pascalKey) {
  if (obj == null || typeof obj !== "object") return undefined;
  if (Object.prototype.hasOwnProperty.call(obj, camelKey)) return obj[camelKey];
  if (pascalKey && Object.prototype.hasOwnProperty.call(obj, pascalKey)) return obj[pascalKey];
  return undefined;
}

async function safeUnwrap(promise) {
  try {
    const res = await promise;
    return unwrapApiData(res);
  } catch {
    return null;
  }
}

/** اجرای نگاشت با سقف همزمانی — جلوگیری از فشار ناگهانی به API (تا ~۱۸ گزارش جزئی). */
async function mapWithConcurrency(items, concurrency, mapper) {
  if (!items.length) return [];
  const results = new Array(items.length);
  let next = 0;
  const limit = Math.max(1, Math.min(concurrency, items.length));

  async function worker() {
    for (;;) {
      const i = next++;
      if (i >= items.length) return;
      results[i] = await mapper(items[i], i);
    }
  }

  await Promise.all(Array.from({ length: limit }, () => worker()));
  return results;
}

const ORDER_STATUS_LABELS = {
  [OrderStatus.Pending]: "در انتظار",
  [OrderStatus.Paid]: "پرداخت شده",
  [OrderStatus.Processing]: "در حال پردازش",
  [OrderStatus.Shipped]: "ارسال شده",
  [OrderStatus.Delivered]: "تحویل شده",
  [OrderStatus.Cancelled]: "لغو شده",
  [OrderStatus.Refunded]: "بازگشت داده شده",
  [OrderStatus.Failed]: "ناموفق",
};

const MS_DAY = 86400000;

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function endOfDay(d) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

/** حداکثر ~۱۸ درخواست برای fallback روند فروش */
function buildSalesBuckets(start, end) {
  const startT = startOfDay(start).getTime();
  const endT = end.getTime();
  const approxDays = Math.max(1, Math.ceil((endT - startT) / MS_DAY) + 1);
  const buckets = [];
  const maxDaily = 14;
  if (approxDays <= maxDaily) {
    let cur = startOfDay(start);
    while (cur.getTime() <= endT) {
      const e = endOfDay(cur);
      const endBucket = Math.min(e.getTime(), endT);
      buckets.push({ start: new Date(cur), end: new Date(endBucket) });
      cur = new Date(cur.getTime() + MS_DAY);
    }
    return buckets;
  }
  let cur = startOfDay(start);
  while (cur.getTime() <= endT) {
    const weekEnd = Math.min(cur.getTime() + 6 * MS_DAY, endT);
    buckets.push({ start: new Date(cur), end: new Date(weekEnd) });
    cur = new Date(cur.getTime() + 7 * MS_DAY);
  }
  return buckets.slice(0, 18);
}

function labelForBucket(bucketStart) {
  return bucketStart.toLocaleDateString("fa-IR", { month: "short", day: "numeric" });
}

function normalizeSeriesPayload(d) {
  if (d == null) return null;
  const raw = Array.isArray(d)
    ? d
    : Array.isArray(d.points)
      ? d.points
      : Array.isArray(d.series)
        ? d.series
        : Array.isArray(d.items)
          ? d.items
          : Array.isArray(d.data)
            ? d.data
            : null;
  if (!raw || raw.length === 0) return null;
  return raw.map((row, i) => {
    const day =
      row.date ??
      row.Date ??
      row.label ??
      row.day ??
      row.Day ??
      row.periodStart ??
      row.PeriodStart;
    const sales = Number(
      pick(row, "totalSales", "TotalSales") ??
        pick(row, "sales", "Sales") ??
        row.revenue ??
        row.Revenue ??
        0
    );
    const orders = Number(
      pick(row, "totalOrders", "TotalOrders") ??
        pick(row, "orders", "Orders") ??
        pick(row, "orderCount", "OrderCount") ??
        0
    );
    let label =
      typeof day === "string" || day instanceof Date
        ? new Date(day).toLocaleDateString("fa-IR", { month: "short", day: "numeric" })
        : null;
    if (!label || label === "Invalid Date") label = `نقطه ${i + 1}`;
    return {
      label,
      sales: Number.isFinite(sales) ? sales : 0,
      orders: Number.isFinite(orders) ? orders : 0,
    };
  });
}

function normalizeStatusSegments(d) {
  if (d == null) return null;
  const raw = Array.isArray(d)
    ? d
    : Array.isArray(d.segments)
      ? d.segments
      : Array.isArray(d.items)
        ? d.items
        : Array.isArray(d.data)
          ? d.data
          : null;
  if (!raw) return null;
  const out = [];
  for (const row of raw) {
    const status = Number(row.status ?? row.Status ?? row.orderStatus ?? row.OrderStatus);
    const value = Number(row.count ?? row.Count ?? row.value ?? row.Value ?? 0);
    if (!Number.isFinite(status) || status < 1 || status > 8) continue;
    out.push({
      status,
      name: ORDER_STATUS_LABELS[status] || `وضعیت ${status}`,
      value: Number.isFinite(value) ? value : 0,
    });
  }
  return out.length ? out : null;
}

/**
 * روند فروش در بازه: اولویت با اندپوینت ادمین، سپس گزارش با groupBy، سپس چند گزارش بازه‌ای.
 * @returns {Promise<{ ok: boolean, source: string | null, points: Array<{label: string, sales: number, orders: number}>, error: string | null }>}
 */
export async function fetchSalesTrendSeries(start, end) {
  const { startDate, endDate } = toIsoRange(start, end);
  try {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ startDate, endDate }).toString();
    const res = await client.get(`admin/analytics/sales-trend?${qs}`).json();
    const d = unwrapApiData(res);
    const pts = normalizeSeriesPayload(d);
    if (pts && pts.length > 0) {
      return { ok: true, source: "admin/analytics/sales-trend", points: pts, error: null };
    }
  } catch {
    /* fallback */
  }

  for (const groupBy of ["day", "Day", "Daily"]) {
    try {
      const res = await reportService.getSalesReport({ startDate, endDate, groupBy });
      const d = unwrapApiData(res);
      let pts = normalizeSeriesPayload(d);
      if (!pts && d && typeof d === "object") {
        const inner = d.buckets ?? d.Buckets ?? d.rows ?? d.Rows;
        pts = normalizeSeriesPayload(inner);
      }
      if (pts && pts.length > 0) {
        return { ok: true, source: `Report/GetSalesReport?groupBy=${groupBy}`, points: pts, error: null };
      }
    } catch {
      /* next */
    }
  }

  const buckets = buildSalesBuckets(start, end);
  if (buckets.length === 0) {
    return { ok: true, source: "report-buckets", points: [], error: null };
  }

  try {
    const results = await mapWithConcurrency(buckets, 5, async (b) => {
      const iso = toIsoRange(b.start, b.end);
      const raw = await safeUnwrap(reportService.getSalesReport(iso));
      const sales = Number(pick(raw, "totalSales", "TotalSales") ?? raw?.totalRevenue ?? 0);
      const orders = Number(
        pick(raw, "totalOrders", "TotalOrders") ?? pick(raw, "orderCount", "OrderCount") ?? 0
      );
      return {
        label: labelForBucket(b.start),
        sales: Number.isFinite(sales) ? sales : 0,
        orders: Number.isFinite(orders) ? orders : 0,
      };
    });
    return { ok: true, source: "Report/GetSalesReport (بازه‌های جزئی)", points: results, error: null };
  } catch (e) {
    return {
      ok: false,
      source: null,
      points: [],
      error: e?.message || "خطا در بارگذاری روند فروش",
    };
  }
}

async function safeOrderCount(status) {
  try {
    const raw = await orderService.getOrderCountByStatus(status);
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    const n = pick(raw, "count", "Count") ?? pick(raw, "orderCount", "OrderCount");
    return Number(n) || 0;
  } catch {
    return 0;
  }
}

/**
 * توزیع وضعیت سفارش؛ در نبود API بازه‌دار، شمارش لحظه‌ای per-status.
 */
export async function fetchOrderStatusDistribution(start, end) {
  const { startDate, endDate } = toIsoRange(start, end);
  try {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ startDate, endDate }).toString();
    const res = await client.get(`admin/analytics/order-status-distribution?${qs}`).json();
    const d = unwrapApiData(res);
    const segments = normalizeStatusSegments(d);
    if (segments && segments.length > 0) {
      return {
        ok: true,
        source: "admin/analytics/order-status-distribution",
        segments,
        snapshotNote: null,
        error: null,
      };
    }
  } catch {
    /* fallback */
  }

  const statuses = [1, 2, 3, 4, 5, 6, 7, 8];
  const counts = await Promise.all(statuses.map((s) => safeOrderCount(s)));
  const segments = statuses
    .map((status, i) => ({
      status,
      name: ORDER_STATUS_LABELS[status] || `وضعیت ${status}`,
      value: counts[i],
    }))
    .filter((x) => x.value > 0);

  return {
    ok: true,
    source: "OrderCountByStatus (لحظه‌ای)",
    segments,
    snapshotNote: "بدون API بازه‌دار؛ بر اساس شمارش فعلی هر وضعیت در سیستم.",
    error: null,
  };
}

/**
 * هشدارهای read-only (پروکسی، تیکت باز). سفارش معطل از KPI در UI ادغام می‌شود.
 */
export async function fetchDashboardAlertsFragment() {
  const items = [];

  try {
    const { httpOk, json: j } = await fetchScraperProxyStatusJsonDeduped();
    if (httpOk && j) {
      const data = j?.data ?? j?.Data;
      if (j?.success && data && data.ready === false && Array.isArray(data.issues)) {
        data.issues.forEach((issue, i) => {
          items.push({
            id: `proxy-issue-${i}`,
            title: "پیکربندی پروکسی اسکرپر",
            description: String(issue),
            severity: "warning",
            href: "/admin/scraper-proxy",
          });
        });
      }
    }
  } catch {
    /* نادیده — ویجت اصلی داشبورد کار می‌کند */
  }

  try {
    const res = await adminTicketService.getPaginated({ pageNumber: 1, pageSize: 1, status: 1 });
    const d = unwrapApiData(res);
    const list = Array.isArray(d?.tickets)
      ? d.tickets
      : Array.isArray(d?.Tickets)
        ? d.Tickets
        : [];
    const explicit =
      Number(pick(d, "totalCount", "TotalCount")) ||
      Number(pick(d, "totalItems", "TotalItems")) ||
      Number(pick(d, "totalRecords", "TotalRecords")) ||
      0;
    const tp = Number(pick(d, "totalPages", "TotalPages")) || 0;
    const ps = Number(pick(d, "pageSize", "PageSize")) || 1;
    let estimated = explicit > 0 ? explicit : tp > 0 ? tp * ps : 0;
    if (estimated === 0 && list.length > 0) {
      estimated = tp > 0 ? tp * ps : list.length;
    }
    if (estimated > 0) {
      items.push({
        id: "tickets-open",
        title: "تیکت‌های باز",
        description: `${estimated.toLocaleString("fa-IR")} مورد در وضعیت باز؛ پاسخ یا تخصیص بررسی شود.`,
        severity: estimated > 20 ? "critical" : "warning",
        href: "/admin/tickets?status=open",
        count: estimated,
      });
    }
  } catch {
    /* ignore */
  }

  return { ok: true, items, error: null };
}
