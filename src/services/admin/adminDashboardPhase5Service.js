import { getAuthenticatedClient, unwrapApiData } from "../api/client";
import { fetchScraperProxyStatusJsonDeduped } from "@/lib/adminScraperProxyStatusFetch";
import { orderService } from "../order/orderService";
import { adminTicketService } from "../ticket/adminTicketService";
import { currencyRateService } from "../currency/currencyRateService";

function normalizeOrderList(raw) {
  if (raw == null) return [];
  if (Array.isArray(raw)) return raw;
  const inner =
    raw.orders ??
    raw.Orders ??
    raw.data ??
    raw.Data ??
    raw.items ??
    raw.Items;
  return Array.isArray(inner) ? inner : [];
}

function normalizeTicketList(data) {
  if (data == null) return [];
  if (Array.isArray(data)) return data;
  const inner =
    data.tickets ??
    data.Tickets ??
    data.items ??
    data.Items ??
    data.data ??
    data.Data;
  return Array.isArray(inner) ? inner : [];
}

async function fetchProxyStatusSafe() {
  try {
    const { httpOk, httpStatus, json } = await fetchScraperProxyStatusJsonDeduped();
    if (!httpOk) {
      return {
        ok: true,
        reachable: httpStatus > 0,
        ready: false,
        issues: httpStatus > 0 ? [`HTTP ${httpStatus}`] : ["درخواست وضعیت پروکسی ناموفق"],
        raw: null,
      };
    }
    const data = json?.data ?? json?.Data;
    return {
      ok: true,
      reachable: true,
      ready: Boolean(data?.ready),
      issues: Array.isArray(data?.issues) ? data.issues.map(String) : [],
      raw: data ?? null,
    };
  } catch {
    return { ok: true, reachable: false, ready: false, issues: ["درخواست وضعیت پروکسی ناموفق"], raw: null };
  }
}

async function fetchCurrencyHealthSafe() {
  try {
    const res = await currencyRateService.latest();
    const d = unwrapApiData(res);
    const hasData =
      d != null &&
      d !== "" &&
      (Array.isArray(d)
        ? d.length > 0
        : typeof d === "object"
          ? Object.keys(d).length > 0
          : true);
    return { ok: true, healthy: Boolean(hasData), detail: hasData ? "آخرین نرخ دریافت شد" : "پاسخ خالی" };
  } catch (e) {
    return { ok: false, healthy: false, detail: e?.message || "خطا در نرخ ارز" };
  }
}

function normalizeHealthApiPayload(d) {
  if (d == null) return null;
  const raw = Array.isArray(d)
    ? d
    : Array.isArray(d.services)
      ? d.services
      : Array.isArray(d.items)
        ? d.items
        : null;
  if (!raw?.length) return null;
  return raw.map((row, i) => {
    const sv = row.status ?? row.Status ?? row.state ?? row.State;
    let status = "unknown";
    if (typeof sv === "number" && Number.isFinite(sv)) {
      /* قرارداد رایج: ۰/۱ سالم، ۲ هشدار، ۳+ خطا */
      if (sv === 0 || sv === 1) status = "ok";
      else if (sv === 2) status = "warning";
      else if (sv >= 3) status = "error";
    } else {
      const statusRaw = String(sv ?? "").toLowerCase();
      if (["ok", "healthy", "up", "success", "green"].includes(statusRaw)) status = "ok";
      else if (["warn", "warning", "degraded", "amber", "yellow"].includes(statusRaw)) status = "warning";
      else if (["error", "down", "critical", "failed", "red"].includes(statusRaw)) status = "error";
    }
    return {
      id: String(row.id ?? row.key ?? row.name ?? i),
      label: String(row.label ?? row.name ?? row.title ?? `سرویس ${i + 1}`),
      status,
      detail: row.detail ?? row.message ?? row.Description ?? undefined,
      href: row.href ?? row.url ?? "/admin",
    };
  });
}

async function trySystemHealthFromApi() {
  try {
    const client = getAuthenticatedClient();
    const res = await client.get("admin/analytics/system-health").json();
    const d = unwrapApiData(res);
    const rows = normalizeHealthApiPayload(d);
    if (rows?.length) return { source: "admin/analytics/system-health", rows };
  } catch {
    /* fallback */
  }
  return null;
}

function buildFallbackHealthRows({ proxy, currency, ordersOk, ticketsOk }) {
  const rows = [];

  const proxyStatus = !proxy.reachable ? "error" : proxy.ready ? "ok" : "warning";
  rows.push({
    id: "scraper-proxy",
    label: "پروکسی اسکرپر",
    status: proxyStatus,
    detail:
      proxy.issues.length > 0
        ? proxy.issues.slice(0, 2).join(" · ")
        : proxy.ready
          ? "پیکربندی کامل"
          : "بدون جزئیات",
    href: "/admin/scraper-proxy",
  });

  const apiOk = ordersOk || ticketsOk;
  rows.push({
    id: "dotnet-api",
    label: "اتصال API ادمین",
    status: apiOk ? "ok" : "error",
    detail: apiOk ? "پاسخ از سفارش یا تیکت دریافت شد" : "دریافت سفارش/تیکت ناموفق بود",
    href: "/admin/orders",
  });

  rows.push({
    id: "currency-rates",
    label: "نرخ ارز (عمومی)",
    status: currency.healthy ? "ok" : currency.ok ? "warning" : "error",
    detail: currency.detail,
    href: "/admin/currency-rates",
  });

  rows.push({
    id: "catalog-sync",
    label: "کاتالوگ / همگام‌سازی",
    status: "unknown",
    detail: "جزئیات صف و sync در صورت وجود API اختصاصی در بک‌اند",
    href: "/admin/products/list",
  });

  rows.push({
    id: "translation-jobs",
    label: "ترجمه / صف پردازش",
    status: "unknown",
    detail: "پس از اتصال اندپوینت سلامت job، اینجا به‌روز می‌شود",
    href: "/admin/settings/general",
  });

  return rows;
}

/**
 * بستهٔ دادهٔ فاز ۵ داشبورد: سلامت، پروکسی، سفارش و تیکت اخیر.
 * با reloadNonce در والد تازه می‌شود (وابسته به بازهٔ زمانی نیست).
 */
export async function fetchDashboardPhase5Bundle() {
  const [ordersRes, ticketsRes, proxy, currency, apiHealth] = await Promise.all([
    (async () => {
      try {
        const raw = await orderService.getRecentOrders(8);
        const orders = normalizeOrderList(raw);
        return { ok: true, orders, error: null };
      } catch (e) {
        return { ok: false, orders: [], error: e?.message || "خطا در سفارشات اخیر" };
      }
    })(),
    (async () => {
      try {
        const res = await adminTicketService.getPaginated({ pageNumber: 1, pageSize: 8 });
        const data = unwrapApiData(res);
        const tickets = normalizeTicketList(data);
        const ts = (x) => {
          const v = new Date(x ?? 0).getTime();
          return Number.isFinite(v) ? v : 0;
        };
        const sorted = [...tickets].sort(
          (a, b) =>
            ts(b.updatedAt ?? b.UpdatedAt ?? b.createdAt ?? b.CreatedAt) -
            ts(a.updatedAt ?? a.UpdatedAt ?? a.createdAt ?? a.CreatedAt)
        );
        return { ok: true, tickets: sorted.slice(0, 8), error: null };
      } catch (e) {
        return { ok: false, tickets: [], error: e?.message || "خطا در تیکت‌های اخیر" };
      }
    })(),
    fetchProxyStatusSafe(),
    fetchCurrencyHealthSafe(),
    trySystemHealthFromApi(),
  ]);

  const ordersOk = ordersRes.ok;
  const ticketsOk = ticketsRes.ok;

  const healthRows = apiHealth?.rows?.length
    ? apiHealth.rows
    : buildFallbackHealthRows({
        proxy,
        currency,
        ordersOk,
        ticketsOk,
      });

  return {
    ok: true,
    health: {
      source: apiHealth?.source ?? "fallback",
      rows: healthRows,
    },
    proxy: {
      ready: proxy.ready,
      reachable: proxy.reachable,
      issues: proxy.issues,
    },
    recentOrders: ordersRes,
    recentTickets: ticketsRes,
  };
}
