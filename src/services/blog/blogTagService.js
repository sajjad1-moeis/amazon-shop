import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const blogTagService = {
  getAll: async () => {
    const client = getPublicClient();
    return client.get("BlogTag/GetAll").json();
  },

  getByBlogId: async (blogId) => {
    const client = getPublicClient();
    return client.get(`BlogTag/GetByBlogId?blogId=${blogId}`).json();
  },

  getById: async (id) => {
    const client = getPublicClient();
    return client.get(`BlogTag/GetById?id=${id}`).json();
  },

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`BlogTag/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("BlogTag/Create", { json: data }).json();
  },

  /** POST api/BlogTag/update/{id} */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogTag/update/${id}`, { json: data }).json();
  },

  /** POST api/BlogTag/delete/{id} */
  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogTag/delete/${id}`).json();
  },
};
