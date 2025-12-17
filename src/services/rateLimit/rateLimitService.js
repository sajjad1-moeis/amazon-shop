import { getAuthenticatedClient } from "../api/client";

export const rateLimitService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      searchTerm,
      userId,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (userId) searchParams.append("userId", userId.toString());

    const client = getAuthenticatedClient();
    return client.get(`RateLimit/GetPaginated?${searchParams.toString()}`).json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("RateLimit/GetAll").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`RateLimit/GetById?id=${id}`).json();
  },

  getByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`RateLimit/GetByUserId?userId=${userId}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("RateLimit/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`RateLimit/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`RateLimit/Delete?id=${id}`).json();
  },

  reset: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`RateLimit/Reset?id=${id}`).json();
  },
};





