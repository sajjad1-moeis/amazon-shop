import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const blogCategoryService = {
  getActive: async () => {
    const client = getPublicClient();
    return client.get("BlogCategory/GetActive").json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("BlogCategory/GetAll").json();
  },

  getById: async (id) => {
    const client = getPublicClient();
    return client.get(`BlogCategory/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("BlogCategory/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`BlogCategory/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`BlogCategory/Delete?id=${id}`).json();
  },
};
