import { getAuthenticatedClient } from "../api/client";

export const ticketService = {
  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Ticket/Create", { json: data }).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetById?id=${id}`).json();
  },

  getByTicketNumber: async (ticketNumber) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetByTicketNumber?ticketNumber=${encodeURIComponent(ticketNumber)}`).json();
  },

  getByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetByUserId?userId=${userId}`).json();
  },

  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      priority,
      searchTerm,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (priority) searchParams.append("priority", priority.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetPaginated?${searchParams.toString()}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetByStatus?status=${status}`).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Ticket/Update?id=${id}`, { json: data }).json();
  },

  addMessage: async (ticketId, message) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/AddMessage?ticketId=${ticketId}`, { json: { message } }).json();
  },

  getMessages: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetMessages?ticketId=${ticketId}`).json();
  },

  getTicketWithMessages: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetTicketWithMessages?id=${id}`).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Ticket/SoftDelete?id=${id}`).json();
  },

  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Ticket/HardDelete?id=${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/Restore?id=${id}`).json();
  },

  getTicketCountByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetTicketCountByUserId?userId=${userId}`).json();
  },

  deleteOldTicketFiles: async () => {
    const client = getAuthenticatedClient();
    return client.delete("Ticket/DeleteOldTicketFiles").json();
  },

  getTicketCountByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetTicketCountByStatus?status=${status}`).json();
  },

  uploadTicketFile: async (ticketId, file) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ticketId", ticketId.toString());
    return client.post(`Ticket/UploadTicketFile?ticketId=${ticketId}`, { body: formData }).json();
  },
};
