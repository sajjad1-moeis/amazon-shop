import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const ticketCategoryService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("TicketCategory/GetAll").json();
  },

  getActive: async () => {
    const client = getAuthenticatedClient();
    return client.get("TicketCategory/GetActive").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`TicketCategory/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("TicketCategory/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`TicketCategory/Update?id=${id}`, { json: data }).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`TicketCategory/SoftDelete?id=${id}`).json();
  },

  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`TicketCategory/HardDelete?id=${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`TicketCategory/Restore?id=${id}`).json();
  },

  getTicketCount: async (categoryId) => {
    const client = getAuthenticatedClient();
    return client.get(`TicketCategory/GetTicketCount?categoryId=${categoryId}`).json();
  },
};
