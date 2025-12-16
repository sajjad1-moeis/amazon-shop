import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const productCategoryService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ProductCategory/GetAll").json();
  },

  getMainCategories: async () => {
    const client = getPublicClient();
    return client.get("ProductCategory/GetMainCategories").json();
  },

  getActive: async () => {
    const client = getPublicClient();
    return client.get("ProductCategory/GetActive").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductCategory/GetById?id=${id}`).json();
  },

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`ProductCategory/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("ProductCategory/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`ProductCategory/Update?id=${id}`, { json: data }).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`ProductCategory/SoftDelete?id=${id}`).json();
  },

  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`ProductCategory/HardDelete?id=${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductCategory/Restore?id=${id}`).json();
  },

  getProductCount: async (categoryId) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductCategory/GetProductCount?categoryId=${categoryId}`).json();
  },
};
