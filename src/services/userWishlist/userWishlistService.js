import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/UserWishlist — GetWishlist(userId), AddToWishlist(userId, dto),
 * POST delete?userId=&productId=, IsProductInWishlist, GetWishlistCount(userId).
 */
export const userWishlistService = {
  getWishlist: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`UserWishlist/GetWishlist?userId=${encodeURIComponent(userId)}`).json();
  },

  addToWishlist: async (userId, data) => {
    const client = getAuthenticatedClient();
    return client
      .post(`UserWishlist/AddToWishlist?userId=${encodeURIComponent(userId)}`, { json: data })
      .json();
  },

  /** POST api/UserWishlist/delete — Query: userId, productId */
  delete: async (userId, productId) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId), productId: String(productId) });
    return client.post(`UserWishlist/delete?${qs.toString()}`).json();
  },

  isProductInWishlist: async (userId, productId) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId), productId: String(productId) });
    return client.get(`UserWishlist/IsProductInWishlist?${qs.toString()}`).json();
  },

  getWishlistCount: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`UserWishlist/GetWishlistCount?userId=${encodeURIComponent(userId)}`).json();
  },
};
