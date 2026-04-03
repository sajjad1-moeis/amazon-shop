import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/catalog/brand-glossary";

export const adminBrandGlossaryService = {
  list: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get(PREFIX).json();
    return unwrapApiData(res);
  },

  create: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post(PREFIX, { json: body }).json();
    return unwrapApiData(res);
  },

  update: async (id, body) => {
    const client = getAuthenticatedClient();
    const res = await client.put(`${PREFIX}/${id}`, { json: body }).json();
    return unwrapApiData(res);
  },

  remove: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.delete(`${PREFIX}/${id}`).json();
    return unwrapApiData(res);
  },
};
