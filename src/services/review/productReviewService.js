import { getPublicClient, getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/ProductReview — Create, GetById, GetByProductId, GetApprovedByProductId,
 * GetByUserId, GetByStatus, GetByRating, update/{id}, delete/{id}, Restore, Approve, Reject,
 * GetReviewCountByProductId.
 */
export const productReviewService = {
  create: async (data) => {
    const client = getPublicClient();
    return client.post("ProductReview/Create", { json: data }).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductReview/GetById?id=${id}`).json();
  },

  getByProductId: async (productId) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductReview/GetByProductId?productId=${productId}`).json();
  },

  getApprovedByProductId: async (productId) => {
    const client = getPublicClient();
    return client.get(`ProductReview/GetApprovedByProductId?productId=${productId}`).json();
  },

  getByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductReview/GetByUserId?userId=${userId}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductReview/GetByStatus?status=${status}`).json();
  },

  /** GET api/ProductReview/GetPaginated — Phase 23: pageNumber, pageSize, status?, productId?, searchTerm? */
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, productId, searchTerm } = params;
    const qs = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
    });
    if (status !== undefined && status !== null) qs.append("status", String(status));
    if (productId !== undefined && productId !== null) qs.append("productId", String(productId));
    if (searchTerm != null && searchTerm !== "") qs.append("searchTerm", searchTerm);
    const client = getAuthenticatedClient();
    return client.get(`ProductReview/GetPaginated?${qs.toString()}`).json();
  },

  getByRating: async (productId, rating) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ productId: String(productId), rating: String(rating) });
    return client.get(`ProductReview/GetByRating?${qs.toString()}`).json();
  },

  /** POST api/ProductReview/update/{id} */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductReview/update/${id}`, { json: data }).json();
  },

  /** POST api/ProductReview/delete/{id} — حذف نرم */
  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductReview/delete/${id}`).json();
  },

  /** POST api/ProductReview/Restore — Query: id */
  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductReview/Restore?id=${id}`).json();
  },

  approve: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductReview/Approve?id=${id}`).json();
  },

  /** POST api/ProductReview/Reject?id= — body: { reason? } */
  reject: async (id, reason) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductReview/Reject?id=${id}`, { json: reason != null ? { reason } : {} }).json();
  },

  getReviewCountByProductId: async (productId) => {
    const client = getPublicClient();
    return client.get(`ProductReview/GetReviewCountByProductId?productId=${productId}`).json();
  },
};
