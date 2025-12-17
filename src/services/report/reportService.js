import { getAuthenticatedClient } from "../api/client";

export const reportService = {
  getSalesReport: async (params = {}) => {
    const { startDate, endDate, groupBy } = params;
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    if (groupBy) searchParams.append("groupBy", groupBy);

    const client = getAuthenticatedClient();
    return client.get(`Report/GetSalesReport?${searchParams.toString()}`).json();
  },

  getUsersReport: async (params = {}) => {
    const { startDate, endDate } = params;
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`Report/GetUsersReport?${searchParams.toString()}`).json();
  },

  getProductsReport: async (params = {}) => {
    const { startDate, endDate, categoryId } = params;
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    if (categoryId) searchParams.append("categoryId", categoryId.toString());

    const client = getAuthenticatedClient();
    return client.get(`Report/GetProductsReport?${searchParams.toString()}`).json();
  },

  getFinancialReport: async (params = {}) => {
    const { startDate, endDate } = params;
    const searchParams = new URLSearchParams();
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`Report/GetFinancialReport?${searchParams.toString()}`).json();
  },
};





