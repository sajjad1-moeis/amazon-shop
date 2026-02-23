import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/UserRecentView — GetRecentViews(userId, limit?), TrackView(userId, body),
 * POST clear/{userId}, POST delete?userId=&productId=, GetRecentViewsCount(userId).
 */
export const userRecentViewService = {
  getRecentViews: async (userId, limit) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId) });
    if (limit != null) qs.append("limit", String(limit));
    return client.get(`UserRecentView/GetRecentViews?${qs.toString()}`).json();
  },

  /** POST api/UserRecentView/TrackView — Query: userId؛ بدنه: TrackProductViewDto (productId) */
  trackView: async (userId, data) => {
    const client = getAuthenticatedClient();
    return client
      .post(`UserRecentView/TrackView?userId=${encodeURIComponent(userId)}`, { json: data })
      .json();
  },

  /** POST api/UserRecentView/clear/{userId} */
  clear: async (userId) => {
    const client = getAuthenticatedClient();
    return client.post(`UserRecentView/clear/${userId}`).json();
  },

  /** POST api/UserRecentView/delete — Query: userId, productId */
  delete: async (userId, productId) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId), productId: String(productId) });
    return client.post(`UserRecentView/delete?${qs.toString()}`).json();
  },

  getRecentViewsCount: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`UserRecentView/GetRecentViewsCount?userId=${encodeURIComponent(userId)}`).json();
  },
};
