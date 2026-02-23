/**
 * سرویس کد تخفیف — API مرحله ۸ (api/DiscountCode)
 * اعمال به سبد، CRUD، اعتبارسنجی و آمار استفاده.
 */

import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") search.append(k, String(v));
  });
  return search.toString();
};

/** نوع تخفیف — مطابق داک */
export const DiscountType = {
  Percentage: 1,
  FixedAmount: 2,
};

export const discountCodeService = {
  /** POST api/DiscountCode/ApplyDiscountCodeToCart/{userId} — body: { code } */
  applyDiscountCodeToCart: async (userId, code) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`DiscountCode/ApplyDiscountCodeToCart/${userId}`, {
        json: { code: String(code).trim() },
      })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/DiscountCode/CreateDiscountCode — body: CreateDiscountCodeDto */
  create: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post("DiscountCode/CreateDiscountCode", { json: body }).json();
    return unwrapApiData(res);
  },

  /** POST api/DiscountCode/update/{id} — body: UpdateDiscountCodeDto */
  update: async (id, body) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`DiscountCode/update/${id}`, { json: body }).json();
    return unwrapApiData(res);
  },

  /** GET api/DiscountCode/GetDiscountCodeById/{id} */
  getById: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`DiscountCode/GetDiscountCodeById/${id}`).json();
    return unwrapApiData(res);
  },

  /** GET api/DiscountCode/GetDiscountCodeByCode?code= */
  getByCode: async (code) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`DiscountCode/GetDiscountCodeByCode?${qs({ code })}`).json();
    return unwrapApiData(res);
  },

  getActive: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("DiscountCode/GetActiveDiscountCodes").json();
    return unwrapApiData(res);
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("DiscountCode/GetAllDiscountCodes").json();
    return unwrapApiData(res);
  },

  /** GET api/DiscountCode/GetDiscountCodesPaginated — Query: pageNumber, pageSize, status?, isActive? */
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, isActive } = params;
    const client = getAuthenticatedClient();
    const res = await client
      .get(`DiscountCode/GetDiscountCodesPaginated?${qs({ pageNumber, pageSize, status, isActive })}`)
      .json();
    return unwrapApiData(res);
  },

  /** POST api/DiscountCode/ValidateDiscountCode — body: { code, purchaseAmount? } */
  validate: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post("DiscountCode/ValidateDiscountCode", { json: body }).json();
    return unwrapApiData(res);
  },

  /** POST api/DiscountCode/ValidateDiscountCodeForUser/{userId} — body: ValidateDiscountCodeDto */
  validateForUser: async (userId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`DiscountCode/ValidateDiscountCodeForUser/${userId}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** GET api/DiscountCode/GetCodeUsages/{discountCodeId} */
  getCodeUsages: async (discountCodeId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`DiscountCode/GetCodeUsages/${discountCodeId}`).json();
    return unwrapApiData(res);
  },

  /** GET api/DiscountCode/GetUserUsages/{userId} */
  getUserUsages: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`DiscountCode/GetUserUsages/${userId}`).json();
    return unwrapApiData(res);
  },

  /** GET api/DiscountCode/GetUsageStatistics/{discountCodeId} */
  getUsageStatistics: async (discountCodeId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`DiscountCode/GetUsageStatistics/${discountCodeId}`).json();
    return unwrapApiData(res);
  },

  /** POST api/DiscountCode/delete/{id} — حذف نرم */
  softDelete: async (id, reason) => {
    const client = getAuthenticatedClient();
    const q = reason ? `?reason=${encodeURIComponent(reason)}` : "";
    const res = await client.post(`DiscountCode/delete/${id}${q}`).json();
    return unwrapApiData(res);
  },

  /** POST api/DiscountCode/RestoreDiscountCode/{id} */
  restore: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`DiscountCode/RestoreDiscountCode/${id}`).json();
    return unwrapApiData(res);
  },
};
