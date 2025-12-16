import { getAuthenticatedClient } from "../api/client";

export const reviewService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      productId,
      searchTerm,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (productId) searchParams.append("productId", productId.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getAuthenticatedClient();
    return client.get(`Review/GetPaginated?${searchParams.toString()}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Review/GetById?id=${id}`).json();
  },

  approve: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Review/Approve?id=${id}`).json();
  },

  reject: async (id, reason) => {
    const client = getAuthenticatedClient();
    return client.post(`Review/Reject?id=${id}`, { json: { reason } }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Review/Delete?id=${id}`).json();
  },
};
