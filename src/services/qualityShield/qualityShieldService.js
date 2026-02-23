import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/QualityShield — POST (خرید با userId)، GET user?userId=،
 * GET order/{orderId}، GET /{serviceId}، POST /{serviceId}/cancel.
 */
export const qualityShieldService = {
  /** POST api/QualityShield — Query: userId؛ بدنه: PurchaseQualityShieldDto */
  purchase: async (userId, data) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId) });
    return client.post(`QualityShield?${qs.toString()}`, { json: data }).json();
  },

  /** GET api/QualityShield/user — Query: userId */
  getByUser: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`QualityShield/user?userId=${encodeURIComponent(userId)}`).json();
  },

  /** GET api/QualityShield/order/{orderId} — Query: userId اختیاری */
  getByOrderId: async (orderId, userId) => {
    const client = getAuthenticatedClient();
    const qs = userId != null ? `?userId=${encodeURIComponent(userId)}` : "";
    return client.get(`QualityShield/order/${orderId}${qs}`).json();
  },

  /** GET api/QualityShield/{serviceId} — Query: userId اختیاری */
  getById: async (serviceId, userId) => {
    const client = getAuthenticatedClient();
    const qs = userId != null ? `?userId=${encodeURIComponent(userId)}` : "";
    return client.get(`QualityShield/${serviceId}${qs}`).json();
  },

  /** POST api/QualityShield/{serviceId}/cancel — Query: userId؛ بدنه اختیاری: { reason } */
  cancel: async (serviceId, userId, data) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId) });
    return client.post(`QualityShield/${serviceId}/cancel?${qs.toString()}`, { json: data || {} }).json();
  },
};
