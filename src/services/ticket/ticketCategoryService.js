import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

export const ticketCategoryService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("TicketCategory/GetAll").json();
    return unwrapApiData(res);
  },

  getActive: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("TicketCategory/GetActive").json();
    return unwrapApiData(res);
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`TicketCategory/GetById?id=${id}`).json();
    return unwrapApiData(res);
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    const res = await client.post("TicketCategory/Create", { json: data }).json();
    return unwrapApiData(res);
  },

  /** POST api/TicketCategory/Update?id= — body: UpdateTicketCategoryDto */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`TicketCategory/Update?id=${id}`, { json: data }).json();
    return unwrapApiData(res);
  },

  /** POST api/TicketCategory/delete/{id} */
  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`TicketCategory/delete/${id}`).json();
    return unwrapApiData(res);
  },

  /** POST api/TicketCategory/hard-delete/{id} */
  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`TicketCategory/hard-delete/${id}`).json();
    return unwrapApiData(res);
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`TicketCategory/Restore?id=${id}`).json();
    return unwrapApiData(res);
  },

  /** GET api/TicketCategory/GetTicketCount — Query: id (category id) */
  getTicketCount: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`TicketCategory/GetTicketCount?id=${id}`).json();
    return unwrapApiData(res);
  },
};
