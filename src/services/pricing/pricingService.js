/**
 * Public pricing service — preview final IRR price for scraped products.
 * Backend: POST api/Pricing/preview, POST api/Pricing/batch-preview
 */

import { getPublicClient, unwrapApiData } from "../api/client";

const P = "Pricing";

function parseNum(v) {
  if (v == null) return 0;
  if (typeof v === "number" && Number.isFinite(v)) return v;
  const n = parseFloat(String(v).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
}

export const pricingService = {
  /**
   * Preview final IRR price based on AED base price and optional category/weight.
   * @param {{ asin?: string, basePriceAed: number, shippingAed?: number, importFeeAed?: number, categoryId?: number, weightKg?: number }} body
   * @returns {Promise<{ finalPriceIrr: number, breakdown?: any }>}
   */
  preview: async (body) => {
    const client = getPublicClient();
    const res = await client.post(`${P}/preview`, { json: body }).json();
    return unwrapApiData(res);
  },

  /**
   * Batch preview: get final IRR for many scraped items in one call (e.g. search results).
   * @param {Array<{ asin?: string, basePriceAed: number, weightKg?: number, categoryId?: number }>} items
   * @returns {Promise<{ results: Array<{ asin?: string, finalPriceIrr: number, breakdown?: any }> }>}
   */
  batchPreview: async (items) => {
    if (!Array.isArray(items) || items.length === 0) {
      return { results: [] };
    }
    const MAX_ITEMS = 50;
    const list = items.slice(0, MAX_ITEMS);
    const client = getPublicClient();
    const payload = {
      items: list.map((p) => ({
        asin: p.asin ?? p.ASIN ?? p.amazonASIN ?? null,
        basePriceAed: Math.max(0, parseNum(p.basePriceAed ?? p.current_price ?? p.price)),
        weightKg: (p.weight_kg ?? p.weightKg) != null ? parseNum(p.weight_kg ?? p.weightKg) : null,
        categoryId: p.categoryId ?? null,
      })),
    };
    const res = await client.post(`${P}/batch-preview`, { json: payload }).json();
    const data = unwrapApiData(res);
    return data && Array.isArray(data.results) ? data : { results: [] };
  },
};

