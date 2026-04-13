import { getAuthenticatedClient, unwrapApiData } from "../api/client";
import { reportService } from "../report/reportService";
import { orderService } from "../order/orderService";
import { adminAnalyticsService } from "./adminAnalyticsService";
import { getPreviousPeriodRange, toIsoRange } from "@/lib/adminDashboardDateRange";
import { toFiniteAmount } from "@/utils/adminAmountUtils";

function pick(obj, camelKey, pascalKey) {
  if (obj == null || typeof obj !== "object") return undefined;
  if (Object.prototype.hasOwnProperty.call(obj, camelKey)) return obj[camelKey];
  if (pascalKey && Object.prototype.hasOwnProperty.call(obj, pascalKey)) return obj[pascalKey];
  return undefined;
}

function pctChange(current, previous) {
  if (previous == null || Number.isNaN(previous) || previous === 0) {
    if (current == null || Number.isNaN(current) || current === 0) return null;
    return null;
  }
  return ((Number(current) - Number(previous)) / Number(previous)) * 100;
}

function conversionRateFromPayload(convRes) {
  if (typeof convRes === "number" && Number.isFinite(convRes)) return convRes;
  if (convRes && typeof convRes === "object") {
    const v =
      pick(convRes, "conversionRate", "ConversionRate") ??
      pick(convRes, "rate", "Rate") ??
      pick(convRes, "overallConversionRate", "OverallConversionRate");
    if (v == null || v === "") return null;
    const n = toFiniteAmount(v, NaN);
    return Number.isFinite(n) ? n : null;
  }
  return null;
}

function optionalApiPercent(d, camelKey, pascalKey) {
  const x = pick(d, camelKey, pascalKey);
  if (x == null || x === "") return null;
  const n = toFiniteAmount(x, NaN);
  return Number.isFinite(n) ? n : null;
}

async function safeUnwrapReport(promise) {
  try {
    const res = await promise;
    return unwrapApiData(res);
  } catch {
    return null;
  }
}

async function safeOrderCount(status) {
  try {
    const raw = await orderService.getOrderCountByStatus(status);
    if (typeof raw === "number" && Number.isFinite(raw)) return raw;
    const n = pick(raw, "count", "Count") ?? pick(raw, "orderCount", "OrderCount");
    return toFiniteAmount(n, 0);
  } catch {
    return 0;
  }
}

/**
 * تلاش برای اندپوینت تجمیعی بک‌اند؛ در صورت خطا، ترکیب Report + Order.
 * @returns {Promise<{
 *   source: 'dashboard-kpi' | 'fallback',
 *   totalSales: number,
 *   newOrdersCount: number,
 *   pendingOrdersCount: number,
 *   newUsersCount: number,
 *   conversionRate: number | null,
 *   conversionNote?: string,
 *   salesDeltaPct: number | null,
 *   ordersDeltaPct: number | null,
 *   usersDeltaPct: number | null,
 *   conversionDeltaPct?: number | null,
 *   pendingIsSnapshot?: boolean,
 *   registeredOrdersCount?: number | null,
 *   registeredOrdersDeltaPct?: number | null
 * }>}
 */
export async function fetchAdminDashboardKpi(start, end) {
  const { startDate, endDate } = toIsoRange(start, end);
  const prev = getPreviousPeriodRange(start, end);
  const prevIso = toIsoRange(prev.start, prev.end);

  try {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ startDate, endDate });
    const res = await client.get(`admin/analytics/dashboard-kpi?${qs.toString()}`).json();
    const d = unwrapApiData(res);
    if (d && typeof d === "object" && !Array.isArray(d)) {
      return {
        source: "dashboard-kpi",
        totalSales: toFiniteAmount(pick(d, "totalSales", "TotalSales"), 0),
        newOrdersCount: toFiniteAmount(pick(d, "newOrdersCount", "NewOrdersCount"), 0),
        pendingOrdersCount: toFiniteAmount(pick(d, "pendingOrdersCount", "PendingOrdersCount"), 0),
        newUsersCount: toFiniteAmount(pick(d, "newUsersCount", "NewUsersCount"), 0),
        conversionRate: (() => {
          const v = pick(d, "conversionRate", "ConversionRate");
          if (v == null || v === "") return null;
          const n = toFiniteAmount(v, NaN);
          return Number.isFinite(n) ? n : null;
        })(),
        conversionNote: pick(d, "conversionFormula", "ConversionFormula") || undefined,
        salesDeltaPct: optionalApiPercent(d, "totalSalesChangePercent", "TotalSalesChangePercent"),
        ordersDeltaPct: optionalApiPercent(d, "newOrdersChangePercent", "NewOrdersChangePercent"),
        usersDeltaPct: optionalApiPercent(d, "newUsersChangePercent", "NewUsersChangePercent"),
        conversionDeltaPct:
          optionalApiPercent(d, "conversionRateChangePercent", "ConversionRateChangePercent") ??
          optionalApiPercent(d, "conversionChangePercent", "ConversionChangePercent"),
        registeredOrdersCount: (() => {
          const v = pick(d, "registeredOrdersCount", "RegisteredOrdersCount");
          if (v == null || v === "") return null;
          const n = toFiniteAmount(v, NaN);
          return Number.isFinite(n) ? n : null;
        })(),
        registeredOrdersDeltaPct: optionalApiPercent(
          d,
          "registeredOrdersChangePercent",
          "RegisteredOrdersChangePercent"
        ),
      };
    }
  } catch {
    /* fallback زیر */
  }

  const [salesCur, salesPrev, usersCur, usersPrev, c1, c2, c3, convRes, convPrevRes] = await Promise.all([
    safeUnwrapReport(reportService.getSalesReport({ startDate, endDate })),
    safeUnwrapReport(reportService.getSalesReport(prevIso)),
    safeUnwrapReport(reportService.getUsersReport({ startDate, endDate })),
    safeUnwrapReport(reportService.getUsersReport(prevIso)),
    safeOrderCount(1),
    safeOrderCount(2),
    safeOrderCount(3),
    (async () => {
      try {
        const raw = await adminAnalyticsService.getConversionRateByDateRange({ startDate, endDate });
        return unwrapApiData(raw);
      } catch {
        return null;
      }
    })(),
    (async () => {
      try {
        const raw = await adminAnalyticsService.getConversionRateByDateRange(prevIso);
        return unwrapApiData(raw);
      } catch {
        return null;
      }
    })(),
  ]);

  let conversionRate = null;
  let conversionNote =
    "نرخ تبدیل بازه‌ای در صورت پشتیبانی بک‌اند از conversion-rate?startDate=&endDate= نمایش داده می‌شود.";
  conversionRate = conversionRateFromPayload(convRes);
  if (conversionRate != null) {
    conversionNote =
      convRes && typeof convRes === "object"
        ? pick(convRes, "formulaDescription", "FormulaDescription") || undefined
        : undefined;
  }

  const conversionPrev = conversionRateFromPayload(convPrevRes);
  const conversionDeltaPct =
    conversionRate != null && conversionPrev != null ? pctChange(conversionRate, conversionPrev) : null;

  const totalSales = toFiniteAmount(
    pick(salesCur, "totalSales", "TotalSales") ??
      pick(salesCur, "totalRevenue", "TotalRevenue") ??
      salesCur?.totalRevenue,
    0
  );
  const totalSalesPrev = toFiniteAmount(
    pick(salesPrev, "totalSales", "TotalSales") ??
      pick(salesPrev, "totalRevenue", "TotalRevenue") ??
      salesPrev?.totalRevenue,
    0
  );

  const newOrdersCount = toFiniteAmount(
    pick(salesCur, "totalOrders", "TotalOrders") ?? pick(salesCur, "orderCount", "OrderCount"),
    0
  );
  const newOrdersPrev = toFiniteAmount(
    pick(salesPrev, "totalOrders", "TotalOrders") ?? pick(salesPrev, "orderCount", "OrderCount"),
    0
  );

  const newUsersCount = toFiniteAmount(
    pick(usersCur, "newUsersThisMonth", "NewUsersThisMonth") ??
      pick(usersCur, "newUsers", "NewUsers") ??
      pick(usersCur, "newUserCount", "NewUserCount"),
    0
  );
  const newUsersPrev = toFiniteAmount(
    pick(usersPrev, "newUsersThisMonth", "NewUsersThisMonth") ??
      pick(usersPrev, "newUsers", "NewUsers") ??
      pick(usersPrev, "newUserCount", "NewUserCount"),
    0
  );

  return {
    source: "fallback",
    totalSales,
    newOrdersCount,
    pendingOrdersCount: c1 + c2 + c3,
    newUsersCount,
    conversionRate,
    conversionNote,
    conversionDeltaPct,
    salesDeltaPct: pctChange(totalSales, totalSalesPrev),
    ordersDeltaPct: pctChange(newOrdersCount, newOrdersPrev),
    usersDeltaPct: pctChange(newUsersCount, newUsersPrev),
    pendingIsSnapshot: true,
    registeredOrdersCount: null,
    registeredOrdersDeltaPct: null,
  };
}
