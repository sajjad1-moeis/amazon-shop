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

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`BlogCategory/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("BlogCategory/Create", { json: data }).json();
  },

  /** POST api/BlogCategory/update/{id} */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogCategory/update/${id}`, { json: data }).json();
  },

  /** POST api/BlogCategory/delete/{id} */
  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogCategory/delete/${id}`).json();
  },
};
