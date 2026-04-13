import { getAuthenticatedClient } from "../api/client";

/**
 * api/admin/analytics — آمار و تحلیل ادمین
 * همهٔ متدها پاسخ استاندارد { statusCode, success, message, data } را برمی‌گردانند.
 * در لایهٔ فراخواننده از unwrapApiData استفاده کنید.
 */
export const adminAnalyticsService = {
  /** GET api/admin/analytics/popular-search-terms?limit= */
  getPopularSearchTerms: async (limit) => {
    const client = getAuthenticatedClient();
    const qs = typeof limit === "number" ? `?limit=${limit}` : "";
    return client.get(`admin/analytics/popular-search-terms${qs}`).json();
  },

  /** GET api/admin/analytics/popular-search-terms/by-date-range?startDate=&endDate=&limit= */
  getPopularSearchTermsByDateRange: async (params) => {
    const { startDate, endDate, limit } = params || {};
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    if (typeof limit === "number") searchParams.append("limit", String(limit));
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/analytics/popular-search-terms/by-date-range${qs ? `?${qs}` : ""}`).json();
  },

  /** GET api/admin/analytics/top-selling-products?limit= */
  getTopSellingProducts: async (limit) => {
    const client = getAuthenticatedClient();
    const qs = typeof limit === "number" ? `?limit=${limit}` : "";
    return client.get(`admin/analytics/top-selling-products${qs}`).json();
  },

  /** GET api/admin/analytics/search-trends?startDate=&endDate= */
  getSearchTrends: async (params) => {
    const { startDate, endDate } = params || {};
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/analytics/search-trends${qs ? `?${qs}` : ""}`).json();
  },

  /** GET api/admin/analytics/conversion-rate */
  getConversionRate: async () => {
    const client = getAuthenticatedClient();
    return client.get("admin/analytics/conversion-rate").json();
  },

  /** GET api/admin/analytics/no-result-searches?limit= */
  getNoResultSearches: async (limit) => {
    const client = getAuthenticatedClient();
    const qs = typeof limit === "number" ? `?limit=${limit}` : "";
    return client.get(`admin/analytics/no-result-searches${qs}`).json();
  },

  /** GET api/admin/analytics/no-result-searches/by-date-range?startDate=&endDate=&limit= — اختیاری */
  getNoResultSearchesByDateRange: async (params) => {
    const { startDate, endDate, limit } = params || {};
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    if (typeof limit === "number") searchParams.append("limit", String(limit));
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/analytics/no-result-searches/by-date-range${qs ? `?${qs}` : ""}`).json();
  },

  /** GET api/admin/analytics/user-stats */
  getUserStats: async () => {
    const client = getAuthenticatedClient();
    return client.get("admin/analytics/user-stats").json();
  },

  /** GET api/admin/analytics/summary */
  getSummary: async () => {
    const client = getAuthenticatedClient();
    return client.get("admin/analytics/summary").json();
  },

  /** GET api/admin/analytics/summary/by-date-range?startDate=&endDate= — اختیاری؛ در نبود، فرانت از summary کلی استفاده می‌کند */
  getSummaryByDateRange: async (params) => {
    const { startDate, endDate } = params || {};
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/analytics/summary/by-date-range${qs ? `?${qs}` : ""}`).json();
  },

  /** GET api/admin/analytics/dashboard-alerts — هشدارهای تجمیعی داشبورد */
  getDashboardAlerts: async () => {
    const client = getAuthenticatedClient();
    return client.get("admin/analytics/dashboard-alerts").json();
  },

  /** GET api/admin/analytics/conversion-rate?startDate=&endDate= — اختیاری */
  getConversionRateByDateRange: async (params) => {
    const { startDate, endDate } = params || {};
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/analytics/conversion-rate${qs ? `?${qs}` : ""}`).json();
  },
};

