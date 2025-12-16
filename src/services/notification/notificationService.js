import { getAuthenticatedClient } from "../api/client";

export const notificationService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      isRead,
      type,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (isRead !== undefined) searchParams.append("isRead", isRead.toString());
    if (type) searchParams.append("type", type);

    const client = getAuthenticatedClient();
    return client.get(`Notification/GetPaginated?${searchParams.toString()}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Notification/GetById?id=${id}`).json();
  },

  markAsRead: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Notification/MarkAsRead?id=${id}`).json();
  },

  markAllAsRead: async () => {
    const client = getAuthenticatedClient();
    return client.post("Notification/MarkAllAsRead").json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Notification/Create", { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Notification/Delete?id=${id}`).json();
  },
};
