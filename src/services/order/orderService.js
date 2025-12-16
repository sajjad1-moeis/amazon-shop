import { getAuthenticatedClient } from "../api/client";

export const orderService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      searchTerm,
      startDate,
      endDate,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`Order/GetPaginated?${searchParams.toString()}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Order/GetById?id=${id}`).json();
  },

  updateStatus: async (id, status) => {
    const client = getAuthenticatedClient();
    return client.post(`Order/UpdateStatus?id=${id}&status=${status}`).json();
  },

  cancel: async (id, reason) => {
    const client = getAuthenticatedClient();
    return client.post(`Order/Cancel?id=${id}`, { json: { reason } }).json();
  },
};
