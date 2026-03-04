import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") search.append(k, String(v));
  });
  return search.toString();
};

/**
 * سرویس خریدهای کاربر — api/UserPurchase
 * Phase 18 - بخش ۱۱
 */
export const userPurchaseService = {
  /** GET api/UserPurchase/GetUserPurchases?userId={id} */
  getUserPurchases: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserPurchase/GetUserPurchases?userId=${userId}`).json();
    return unwrapApiData(res);
  },

  /** GET api/UserPurchase/GetUserPurchasesPaginated — userId, pageNumber, pageSize, sortBy, dateFrom, dateTo, searchQuery */
  getUserPurchasesPaginated: async (params) => {
    const client = getAuthenticatedClient();
    const query = qs(params);
    const res = await client.get(`UserPurchase/GetUserPurchasesPaginated?${query}`).json();
    return unwrapApiData(res);
  },
};
