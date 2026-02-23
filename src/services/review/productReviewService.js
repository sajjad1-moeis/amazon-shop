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

  reject: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductReview/Reject?id=${id}`).json();
  },

  getReviewCountByProductId: async (productId) => {
    const client = getPublicClient();
    return client.get(`ProductReview/GetReviewCountByProductId?productId=${productId}`).json();
  },
};
