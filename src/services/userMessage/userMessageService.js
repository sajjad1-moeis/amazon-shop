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
 * سرویس پیام کاربر — api/UserMessage
 * Phase 18 - بخش ۵
 */
export const userMessageService = {
  /** GET api/UserMessage/GetMessages — pageNumber, pageSize, messageType, onlyUnread, searchQuery, dateFrom, dateTo, sortBy */
  getMessages: async (params = {}) => {
    const client = getAuthenticatedClient();
    const query = qs(params);
    const res = await client.get(`UserMessage/GetMessages${query ? `?${query}` : ""}`).json();
    return unwrapApiData(res);
  },

  /** GET api/UserMessage/GetById?messageId={id} */
  getById: async (messageId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserMessage/GetById?messageId=${messageId}`).json();
    return unwrapApiData(res);
  },

  /** POST api/UserMessage/MarkAsRead — body: { messageId } */
  markAsRead: async (messageId) => {
    const client = getAuthenticatedClient();
    const res = await client.post("UserMessage/MarkAsRead", { json: { messageId } }).json();
    return unwrapApiData(res);
  },
};
