import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const contactService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("Contact/GetAll").json();
  },

  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, searchTerm } = params;
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getAuthenticatedClient();
    return client.get(`Contact/GetPaginated?${searchParams.toString()}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Contact/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getPublicClient();
    return client.post("Contact/Create", { json: data }).json();
  },

  markAsRead: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Contact/MarkAsRead?id=${id}`).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Contact/Delete?id=${id}`).json();
  },
};

