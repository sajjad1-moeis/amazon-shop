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

  /** POST api/TicketCategory/update/{id} */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`TicketCategory/update/${id}`, { json: data }).json();
  },

  /** POST api/TicketCategory/delete/{id} */
  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`TicketCategory/delete/${id}`).json();
  },

  /** POST api/TicketCategory/hard-delete/{id} */
  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`TicketCategory/hard-delete/${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`TicketCategory/Restore?id=${id}`).json();
  },

  /** GET api/TicketCategory/GetTicketCount — Query: id (category id) */
  getTicketCount: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`TicketCategory/GetTicketCount?id=${id}`).json();
  },
};
