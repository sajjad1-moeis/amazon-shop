import { getAuthenticatedClient, unwrapApiData } from "../api/client";

const PREFIX = "admin/seo";

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

/** فاز ۱۰ — SEO دسته و برند — api/admin/seo */
export const adminSeoService = {
  categories: ({ page = 1, pageSize = 25, search } = {}) => {
    const q = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (search?.trim()) q.set("search", search.trim());
    return getJson(`${PREFIX}/categories?${q}`);
  },

  patchCategory: (id, body) => patchJson(`${PREFIX}/categories/${id}`, body),

  brands: ({ page = 1, pageSize = 25, search } = {}) => {
    const q = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
    if (search?.trim()) q.set("search", search.trim());
    return getJson(`${PREFIX}/brands?${q}`);
  },

  patchBrand: (id, body) => patchJson(`${PREFIX}/brands/${id}`, body),
};
