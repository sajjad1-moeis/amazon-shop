import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/UserDashboard — همه endpointها با توکن؛ کاربر از توکن استخراج می‌شود.
 * GetDashboard, GetSummary, GetRecentOrders, GetRecentTickets, GetCurrencyRates, GetSuggestedProducts.
 */
export const userDashboardService = {
  getDashboard: async () => {
    const client = getAuthenticatedClient();
    return client.get("UserDashboard/GetDashboard").json();
  },

  getSummary: async () => {
    const client = getAuthenticatedClient();
    return client.get("UserDashboard/GetSummary").json();
  },

  getRecentOrders: async (count = 5) => {
    const client = getAuthenticatedClient();
    return client.get(`UserDashboard/GetRecentOrders?count=${Math.min(20, Math.max(1, count))}`).json();
  },

  getRecentTickets: async (count = 3) => {
    const client = getAuthenticatedClient();
    return client.get(`UserDashboard/GetRecentTickets?count=${Math.min(20, Math.max(1, count))}`).json();
  },

  getCurrencyRates: async () => {
    const client = getAuthenticatedClient();
    return client.get("UserDashboard/GetCurrencyRates").json();
  },

  getSuggestedProducts: async (count = 6) => {
    const client = getAuthenticatedClient();
    return client.get(`UserDashboard/GetSuggestedProducts?count=${Math.min(20, Math.max(1, count))}`).json();
  },
};
