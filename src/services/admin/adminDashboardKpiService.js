import { getAuthenticatedClient, unwrapApiData } from "../api/client";
import { reportService } from "../report/reportService";
import { orderService } from "../order/orderService";
import { adminAnalyticsService } from "./adminAnalyticsService";
import { getPreviousPeriodRange, toIsoRange } from "@/lib/adminDashboardDateRange";

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
    return Number(n) || 0;
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
 *   pendingIsSnapshot?: boolean
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
        totalSales: Number(pick(d, "totalSales", "TotalSales") ?? 0),
        newOrdersCount: Number(pick(d, "newOrdersCount", "NewOrdersCount") ?? 0),
        pendingOrdersCount: Number(pick(d, "pendingOrdersCount", "PendingOrdersCount") ?? 0),
        newUsersCount: Number(pick(d, "newUsersCount", "NewUsersCount") ?? 0),
        conversionRate:
          (() => {
            const v = pick(d, "conversionRate", "ConversionRate");
            return v != null && Number.isFinite(Number(v)) ? Number(v) : null;
          })(),
        conversionNote: pick(d, "conversionFormula", "ConversionFormula") || undefined,
        salesDeltaPct:
          pick(d, "totalSalesChangePercent", "TotalSalesChangePercent") != null
            ? Number(pick(d, "totalSalesChangePercent", "TotalSalesChangePercent"))
            : null,
        ordersDeltaPct:
          pick(d, "newOrdersChangePercent", "NewOrdersChangePercent") != null
            ? Number(pick(d, "newOrdersChangePercent", "NewOrdersChangePercent"))
            : null,
        usersDeltaPct:
          pick(d, "newUsersChangePercent", "NewUsersChangePercent") != null
            ? Number(pick(d, "newUsersChangePercent", "NewUsersChangePercent"))
            : null,
      };
    }
  } catch {
    /* fallback زیر */
  }

  const [salesCur, salesPrev, usersCur, usersPrev, c1, c2, c3, convRes] = await Promise.all([
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
  ]);

  let conversionRate = null;
  let conversionNote =
    "نرخ تبدیل بازه‌ای در صورت پشتیبانی بک‌اند از conversion-rate?startDate=&endDate= نمایش داده می‌شود.";
  if (typeof convRes === "number" && Number.isFinite(convRes)) {
    conversionRate = convRes;
    conversionNote = undefined;
  } else if (convRes && typeof convRes === "object") {
    const v =
      pick(convRes, "conversionRate", "ConversionRate") ??
      pick(convRes, "rate", "Rate") ??
      pick(convRes, "overallConversionRate", "OverallConversionRate");
    if (v != null && Number.isFinite(Number(v))) {
      conversionRate = Number(v);
      conversionNote = pick(convRes, "formulaDescription", "FormulaDescription") || undefined;
    }
  }

  const totalSales = Number(
    pick(salesCur, "totalSales", "TotalSales") ?? salesCur?.totalRevenue ?? 0
  );
  const totalSalesPrev = Number(
    pick(salesPrev, "totalSales", "TotalSales") ?? salesPrev?.totalRevenue ?? 0
  );

  const newOrdersCount = Number(
    pick(salesCur, "totalOrders", "TotalOrders") ??
      pick(salesCur, "orderCount", "OrderCount") ??
      0
  );
  const newOrdersPrev = Number(
    pick(salesPrev, "totalOrders", "TotalOrders") ??
      pick(salesPrev, "orderCount", "OrderCount") ??
      0
  );

  const newUsersCount = Number(
    pick(usersCur, "newUsersThisMonth", "NewUsersThisMonth") ??
      pick(usersCur, "newUsers", "NewUsers") ??
      pick(usersCur, "newUserCount", "NewUserCount") ??
      0
  );
  const newUsersPrev = Number(
    pick(usersPrev, "newUsersThisMonth", "NewUsersThisMonth") ??
      pick(usersPrev, "newUsers", "NewUsers") ??
      pick(usersPrev, "newUserCount", "NewUserCount") ??
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
    salesDeltaPct: pctChange(totalSales, totalSalesPrev),
    ordersDeltaPct: pctChange(newOrdersCount, newOrdersPrev),
    usersDeltaPct: pctChange(newUsersCount, newUsersPrev),
    pendingIsSnapshot: true,
  };
}
