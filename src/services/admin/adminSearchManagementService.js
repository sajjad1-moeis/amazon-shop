import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/search-management";

async function getJson(path) {
  const client = getAuthenticatedClient();
  const res = await client.get(path).json();
  return unwrapApiData(res);
}

async function postJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.post(path, { json: body }).json();
  return unwrapApiData(res);
}

async function putJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.put(path, { json: body }).json();
  return unwrapApiData(res);
}

async function deleteJson(path) {
  const client = getAuthenticatedClient();
  const res = await client.delete(path).json();
  return unwrapApiData(res);
}

/**
 * فاز ۶ — api/admin/search-management
 */
export const adminSearchManagementService = {
  getLowClickSearches: (params = {}) => {
    const sp = new URLSearchParams();
    if (params.limit != null) sp.set("limit", String(params.limit));
    if (params.minSearches != null) sp.set("minSearches", String(params.minSearches));
    if (params.maxClickRatePercent != null) sp.set("maxClickRatePercent", String(params.maxClickRatePercent));
    const qs = sp.toString();
    return getJson(`${PREFIX}/reports/low-click-searches${qs ? `?${qs}` : ""}`);
  },

  getNoPurchaseSearches: (params = {}) => {
    const sp = new URLSearchParams();
    if (params.limit != null) sp.set("limit", String(params.limit));
    if (params.minClicks != null) sp.set("minClicks", String(params.minClicks));
    const qs = sp.toString();
    return getJson(`${PREFIX}/reports/no-purchase-searches${qs ? `?${qs}` : ""}`);
  },

  listSynonyms: () => getJson(`${PREFIX}/synonyms`),
  createSynonym: (body) => postJson(`${PREFIX}/synonyms`, body),
  updateSynonym: (id, body) => putJson(`${PREFIX}/synonyms/${id}`, body),
  deleteSynonym: (id) => deleteJson(`${PREFIX}/synonyms/${id}`),

  listRedirects: () => getJson(`${PREFIX}/redirects`),
  createRedirect: (body) => postJson(`${PREFIX}/redirects`, body),
  updateRedirect: (id, body) => putJson(`${PREFIX}/redirects/${id}`, body),
  deleteRedirect: (id) => deleteJson(`${PREFIX}/redirects/${id}`),

  listCategoryLandings: () => getJson(`${PREFIX}/category-landings`),
  createCategoryLanding: (body) => postJson(`${PREFIX}/category-landings`, body),
  updateCategoryLanding: (id, body) => putJson(`${PREFIX}/category-landings/${id}`, body),
  deleteCategoryLanding: (id) => deleteJson(`${PREFIX}/category-landings/${id}`),

  listGates: (whitelistOnly) => {
    const qs =
      whitelistOnly === true ? "?whitelistOnly=true" : whitelistOnly === false ? "?whitelistOnly=false" : "";
    return getJson(`${PREFIX}/gates${qs}`);
  },
  createGate: (body) => postJson(`${PREFIX}/gates`, body),
  updateGate: (id, body) => putJson(`${PREFIX}/gates/${id}`, body),
  deleteGate: (id) => deleteJson(`${PREFIX}/gates/${id}`),
};
