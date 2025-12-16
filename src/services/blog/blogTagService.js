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

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("BlogTag/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`BlogTag/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`BlogTag/Delete?id=${id}`).json();
  },
};
