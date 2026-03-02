import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) search.append(k, String(v));
  });
  return search.toString();
};

/**
 * سرویس دعوت دوستان — api/Referral
 * Phase 18 - بخش ۶
 */
export const referralService = {
  /** GET api/Referral/GetMyReferralInfo */
  getMyReferralInfo: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("Referral/GetMyReferralInfo").json();
    return unwrapApiData(res);
  },

  /** GET api/Referral/GetInvitedFriends — pageNumber, pageSize */
  getInvitedFriends: async (params = {}) => {
    const client = getAuthenticatedClient();
    const query = qs(params);
    const res = await client.get(`Referral/GetInvitedFriends${query ? `?${query}` : ""}`).json();
    return unwrapApiData(res);
  },
};
