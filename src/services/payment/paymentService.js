import { getAuthenticatedClient } from "../api/client";

export const paymentService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      method,
      searchTerm,
      startDate,
      endDate,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (method) searchParams.append("method", method);
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`Payment/GetPaginated?${searchParams.toString()}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Payment/GetById?id=${id}`).json();
  },

  refund: async (id, amount, reason) => {
    const client = getAuthenticatedClient();
    return client.post(`Payment/Refund?id=${id}`, { json: { amount, reason } }).json();
  },
};
