import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/PriceAlert — POST با userId در query و CreatePriceAlertDto؛
 * GET لیست با userId و onlyActive؛ GET/PUT/DELETE api/PriceAlert/{alertId} با userId.
 */
export const priceAlertService = {
  /** POST api/PriceAlert — Query: userId؛ بدنه: CreatePriceAlertDto */
  create: async (userId, data) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId) });
    return client.post(`PriceAlert?${qs.toString()}`, { json: data }).json();
  },

  /** GET api/PriceAlert — Query: userId, onlyActive (پیش‌فرض false) */
  getList: async (userId, onlyActive = false) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId), onlyActive: String(onlyActive) });
    return client.get(`PriceAlert?${qs.toString()}`).json();
  },

  /** GET api/PriceAlert/{alertId} — Query: userId */
  getById: async (alertId, userId) => {
    const client = getAuthenticatedClient();
    return client.get(`PriceAlert/${alertId}?userId=${encodeURIComponent(userId)}`).json();
  },

  /** PUT api/PriceAlert/{alertId} — Query: userId؛ بدنه: UpdatePriceAlertDto */
  update: async (alertId, userId, data) => {
    const client = getAuthenticatedClient();
    return client.put(`PriceAlert/${alertId}?userId=${encodeURIComponent(userId)}`, { json: data }).json();
  },

  /** DELETE api/PriceAlert/{alertId} — Query: userId؛ غیرفعال کردن هشدار */
  delete: async (alertId, userId) => {
    const client = getAuthenticatedClient();
    return client.delete(`PriceAlert/${alertId}?userId=${encodeURIComponent(userId)}`).json();
  },
};
