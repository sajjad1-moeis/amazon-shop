import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const productBrandService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ProductBrand/GetAll").json();
  },

  getActive: async () => {
    const client = getPublicClient();
    return client.get("ProductBrand/GetActive").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductBrand/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("ProductBrand/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`ProductBrand/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`ProductBrand/Delete?id=${id}`).json();
  },
};





