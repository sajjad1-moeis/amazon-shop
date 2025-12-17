import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const contactService = {
  create: async (data) => {
    const client = getPublicClient();
    return client.post("ContactUs/Create", { json: data }).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ContactUs/GetById?id=${id}`).json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetAll").json();
  },

  getUnread: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetUnread").json();
  },

  getRead: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetRead").json();
  },

  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, isRead = null } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (isRead !== null) {
      searchParams.append("isRead", isRead.toString());
    }

    const client = getAuthenticatedClient();
    return client.get(`ContactUs/GetPaginated?${searchParams.toString()}`).json();
  },

  markAsRead: async (id) => {
    const client = getAuthenticatedClient();
    return client.put(`ContactUs/MarkAsRead?id=${id}`).json();
  },

  getUnreadCount: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetUnreadCount").json();
  },
};
