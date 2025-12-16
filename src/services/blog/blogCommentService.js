import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const blogCommentService = {
  getApprovedByBlogId: async (blogId) => {
    const client = getPublicClient();
    return client.get(`BlogComment/GetApprovedByBlogId?blogId=${blogId}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`BlogComment/GetByStatus?status=${status}`).json();
  },

  getCountByBlogId: async (blogId) => {
    const client = getPublicClient();
    return client.get(`BlogComment/GetCountByBlogId?blogId=${blogId}`).json();
  },

  create: async (data) => {
    const client = getPublicClient();
    return client.post("BlogComment/Create", { json: data }).json();
  },

  approve: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/Approve?id=${id}`).json();
  },

  reject: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/Reject?id=${id}`).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`BlogComment/SoftDelete?id=${id}`).json();
  },
};
