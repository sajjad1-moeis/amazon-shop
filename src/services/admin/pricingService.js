/**
 * سرویس تنظیمات و قوانین قیمت‌گذاری ادمین — API مرحله ۷ (api/admin/pricing)
 * همهٔ endpointها با توکن و نقش Admin.
 */

import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const P = "admin/pricing";

/** ─── تنظیمات قیمت‌گذاری ───────────────────────────────────────────────── */

export const pricingSettingsApi = {
  get: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get(`${P}/settings`).json();
    return unwrapApiData(res);
  },
  update: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.put(`${P}/settings`, { json: body }).json();
    return unwrapApiData(res);
  },
};

/** ─── قوانین قیمت (PriceRule) ───────────────────────────────────────────── */

export const priceRulesApi = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get(`${P}/price-rules`).json();
    return unwrapApiData(res);
  },
  create: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`${P}/price-rules`, { json: body }).json();
    return unwrapApiData(res);
  },
  update: async (id, body) => {
    const client = getAuthenticatedClient();
    const res = await client.put(`${P}/price-rules/${id}`, { json: body }).json();
    return unwrapApiData(res);
  },
  delete: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.delete(`${P}/price-rules/${id}`).json();
    return unwrapApiData(res);
  },
};

/** ─── قوانین وزن (WeightRule) ───────────────────────────────────────────── */

export const weightRulesApi = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get(`${P}/weight-rules`).json();
    return unwrapApiData(res);
  },
  create: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`${P}/weight-rules`, { json: body }).json();
    return unwrapApiData(res);
  },
  update: async (id, body) => {
    const client = getAuthenticatedClient();
    const res = await client.put(`${P}/weight-rules/${id}`, { json: body }).json();
    return unwrapApiData(res);
  },
  delete: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.delete(`${P}/weight-rules/${id}`).json();
    return unwrapApiData(res);
  },
};

/** ─── Override دسته (CategoryPricingOverride) ─────────────────────────────── */

export const categoryOverridesApi = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get(`${P}/category-overrides`).json();
    return unwrapApiData(res);
  },
  create: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`${P}/category-overrides`, { json: body }).json();
    return unwrapApiData(res);
  },
  update: async (id, body) => {
    const client = getAuthenticatedClient();
    const res = await client.put(`${P}/category-overrides/${id}`, { json: body }).json();
    return unwrapApiData(res);
  },
  delete: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.delete(`${P}/category-overrides/${id}`).json();
    return unwrapApiData(res);
  },
};

/** یک نقطهٔ ورود برای استفاده در UI */
export const adminPricingService = {
  settings: pricingSettingsApi,
  priceRules: priceRulesApi,
  weightRules: weightRulesApi,
  categoryOverrides: categoryOverridesApi,
};
