import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const blogCommentService = {
  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`BlogComment/GetById?id=${id}`).json();
  },

  getByBlogId: async (blogId) => {
    const client = getAuthenticatedClient();
    return client.get(`BlogComment/GetByBlogId?blogId=${blogId}`).json();
  },

  getByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`BlogComment/GetByUserId?userId=${userId}`).json();
  },

  getApprovedByBlogId: async (blogId) => {
    const client = getPublicClient();
    return client.get(`BlogComment/GetApprovedByBlogId?blogId=${blogId}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`BlogComment/GetByStatus?status=${status}`).json();
  },

  /** GET api/BlogComment/GetPaginated — Phase 23: pageNumber, pageSize, status?, blogId?, searchTerm? */
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, blogId, searchTerm } = params;
    const qs = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });
    if (status !== undefined && status !== null) qs.append("status", String(status));
    if (blogId !== undefined && blogId !== null) qs.append("blogId", String(blogId));
    if (searchTerm != null && searchTerm !== "") qs.append("searchTerm", searchTerm);
    const client = getAuthenticatedClient();
    return client.get(`BlogComment/GetPaginated?${qs.toString()}`).json();
  },

  /** GetCount — Query: blogId */
  getCount: async (blogId) => {
    const client = getPublicClient();
    return client.get(`BlogComment/GetCount?blogId=${blogId}`).json();
  },

  getCountByBlogId: async (blogId) => {
    const client = getPublicClient();
    return client.get(`BlogComment/GetCount?blogId=${blogId}`).json();
  },

  create: async (data) => {
    const client = getPublicClient();
    return client.post("BlogComment/Create", { json: data }).json();
  },

  /** POST api/BlogComment/update/{id} */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/update/${id}`, { json: data }).json();
  },

  approve: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/Approve?id=${id}`).json();
  },

  reject: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/Reject?id=${id}`).json();
  },

  /** POST api/BlogComment/delete/{id} */
  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/delete/${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`BlogComment/Restore?id=${id}`).json();
  },
};
