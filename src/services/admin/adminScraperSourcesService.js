import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/scraper-sources";

async function getJson(path) {
  const client = getAuthenticatedClient();
  const res = await client.get(path).json();
  return unwrapApiData(res);
}

async function postJson(path, body) {
  const client = getAuthenticatedClient();
  const res = await client.post(path, { json: body ?? {} }).json();
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

/** فاز ۷ — api/admin/scraper-sources */
export const adminScraperSourcesService = {
  /** @param {number} [limit] حداکثر ۱۰۰۰؛ پیش‌فرض سمت سرور ۵۰۰ */
  list: (limit) => {
    const qs = typeof limit === "number" && limit > 0 ? `?limit=${Math.min(1000, Math.max(1, Math.floor(limit)))}` : "";
    return getJson(`${PREFIX}${qs}`);
  },
  get: (id) => getJson(`${PREFIX}/${id}`),
  create: (body) => postJson(PREFIX, body),
  update: (id, body) => putJson(`${PREFIX}/${id}`, body),
  delete: (id) => deleteJson(`${PREFIX}/${id}`),
  testConnection: (id) => postJson(`${PREFIX}/${id}/test-connection`, {}),
};

export const SCRAPER_SOURCE_TYPES = [
  { value: "scraper_api", label: "API اسکرپر (پایتون)" },
  { value: "dotnet_api", label: "API دات‌نت" },
  { value: "marketplace", label: "مارکت‌پلیس / فروشگاه" },
  { value: "translation", label: "ترجمه / سرویس زبانی" },
  { value: "other", label: "سایر" },
];
