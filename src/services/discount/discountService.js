import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const discountService = {
  createDiscountCode: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("DiscountCode/CreateDiscountCode", { json: data }).json();
  },

  updateDiscountCode: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`DiscountCode/UpdateDiscountCode/${id}`, { json: data }).json();
  },

  getDiscountCodeById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`DiscountCode/GetDiscountCodeById/${id}`).json();
  },

  getDiscountCodeByCode: async (code) => {
    const client = getPublicClient();
    return client.get(`DiscountCode/GetDiscountCodeByCode?code=${encodeURIComponent(code)}`).json();
  },

  getActiveDiscountCodes: async () => {
    const client = getPublicClient();
    return client.get("DiscountCode/GetActiveDiscountCodes").json();
  },

  getAllDiscountCodes: async () => {
    const client = getAuthenticatedClient();
    return client.get("DiscountCode/GetAllDiscountCodes").json();
  },

  getDiscountCodesPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      searchTerm,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getAuthenticatedClient();
    return client.get(`DiscountCode/GetDiscountCodesPaginated?${searchParams.toString()}`).json();
  },

  validateDiscountCode: async (data) => {
    const client = getPublicClient();
    return client.post("DiscountCode/ValidateDiscountCode", { json: data }).json();
  },

  validateDiscountCodeForUser: async (userId, data) => {
    const client = getAuthenticatedClient();
    return client.post(`DiscountCode/ValidateDiscountCodeForUser/${userId}`, { json: data }).json();
  },

  applyDiscountCodeToCart: async (userId, data) => {
    const client = getAuthenticatedClient();
    return client.post(`DiscountCode/ApplyDiscountCodeToCart/${userId}`, { json: data }).json();
  },

  getCodeUsages: async (discountCodeId) => {
    const client = getAuthenticatedClient();
    return client.get(`DiscountCode/GetCodeUsages/${discountCodeId}`).json();
  },

  getUserUsages: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`DiscountCode/GetUserUsages/${userId}`).json();
  },

  getUsageStatistics: async (discountCodeId) => {
    const client = getAuthenticatedClient();
    return client.get(`DiscountCode/GetUsageStatistics/${discountCodeId}`).json();
  },
};
