import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/products/catalog";

async function getJson(path) {
  const client = getAuthenticatedClient();
  const res = await client.get(path).json();
  return unwrapApiData(res);
}

async function patchJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.patch(path, { json: body }).json();
  return unwrapApiData(res);
}

async function postJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.post(path, { json: body }).json();
  return unwrapApiData(res);
}

/** فاز ۹ — api/admin/products/catalog */
export const adminProductCatalogService = {
  translationQueue: ({ page = 1, pageSize = 25, mode = "missing", search } = {}) => {
    const q = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      mode: String(mode),
    });
    if (search && String(search).trim()) q.set("search", String(search).trim());
    return getJson(`${PREFIX}/translation-queue?${q.toString()}`);
  },

  qaQueue: ({
    page = 1,
    pageSize = 25,
    noImage = true,
    noCategory = true,
    thinDescription = false,
    priceAnomaly = false,
    duplicateAsin = false,
    search,
  } = {}) => {
    const q = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
      noImage: String(noImage),
      noCategory: String(noCategory),
      thinDescription: String(thinDescription),
      priceAnomaly: String(priceAnomaly),
      duplicateAsin: String(duplicateAsin),
    });
    if (search && String(search).trim()) q.set("search", String(search).trim());
    return getJson(`${PREFIX}/qa-queue?${q.toString()}`);
  },

  patchTitleFa: (productId, titleFa) =>
    patchJson(`${PREFIX}/${productId}/title-fa`, { titleFa: titleFa === null ? null : titleFa }),

  bulkTitleFa: (items) => postJson(`${PREFIX}/translation/bulk`, { items }),
};
