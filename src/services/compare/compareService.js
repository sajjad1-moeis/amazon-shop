import { getPublicClient, getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/Compare — add, remove, list, data, clear با bodyهای مناسب و userId/sessionId.
 */
export const compareService = {
  /** POST api/Compare/add — بدنه: CompareAddRequestDto (productId, userId?, sessionId?) */
  add: async (data) => {
    const client = getPublicClient();
    return client.post("Compare/add", { json: data }).json();
  },

  /** POST api/Compare/remove — بدنه: CompareRemoveRequestDto (productId, userId?, sessionId?) */
  remove: async (data) => {
    const client = getPublicClient();
    return client.post("Compare/remove", { json: data }).json();
  },

  /** GET api/Compare/list — Query: userId?, sessionId? */
  list: async (params = {}) => {
    const client = getPublicClient();
    const qs = new URLSearchParams();
    if (params.userId != null) qs.append("userId", String(params.userId));
    if (params.sessionId != null) qs.append("sessionId", params.sessionId);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return client.get(`Compare/list${query}`).json();
  },

  /** GET api/Compare/data — Query: userId?, sessionId? */
  data: async (params = {}) => {
    const client = getPublicClient();
    const qs = new URLSearchParams();
    if (params.userId != null) qs.append("userId", String(params.userId));
    if (params.sessionId != null) qs.append("sessionId", params.sessionId);
    const query = qs.toString() ? `?${qs.toString()}` : "";
    return client.get(`Compare/data${query}`).json();
  },

  /** POST api/Compare/clear — بدنه: CompareContextRequestDto (userId?, sessionId?) */
  clear: async (data = {}) => {
    const client = getPublicClient();
    return client.post("Compare/clear", { json: data }).json();
  },
};
