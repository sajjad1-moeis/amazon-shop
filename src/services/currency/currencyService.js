import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 14 — api/CurrencyService (ادمین درخواست‌های سرویس ارز).
 * GetPaginated: data.requests, data.totalCount, data.totalPages
 */
export const currencyService = {
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, serviceType, userId, phoneNumber, searchTerm } = params;
    const q = new URLSearchParams({ pageNumber: String(pageNumber), pageSize: String(pageSize) });
    if (status != null) q.set("status", String(status));
    if (serviceType != null) q.set("serviceType", String(serviceType));
    if (userId != null) q.set("userId", String(userId));
    if (phoneNumber != null) q.set("phoneNumber", String(phoneNumber));
    if (searchTerm) q.set("searchTerm", searchTerm);
    const client = getAuthenticatedClient();
    return client.get(`CurrencyService/GetPaginated?${q.toString()}`).json();
  },

  getByStatus: (status) =>
    getAuthenticatedClient().get(`CurrencyService/by-status/${status}`).json(),

  updateRequestStatus: (requestId, body) =>
    getAuthenticatedClient().post(`CurrencyService/${requestId}/status`, { json: body }).json(),

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("CurrencyService/GetAll").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`CurrencyService/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("CurrencyService/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`CurrencyService/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`CurrencyService/Delete?id=${id}`).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`CurrencyService/SoftDelete?id=${id}`).json();
  },
};





