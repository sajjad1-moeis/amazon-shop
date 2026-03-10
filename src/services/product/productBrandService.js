import { getPublicClient, getAuthenticatedClient } from "../api/client";

/**
 * API Phase 23 — ProductBrand: GetPaginated, GetById, Create, Update, Delete
 * GetAll در بک‌اند وجود ندارد؛ از GetPaginated با pageSize بزرگ استفاده می‌شود.
 */
const LARGE_PAGE_SIZE = 99999;

export const productBrandService = {
  /** برمی‌گرداند { success, data: brands[] } — سازگار با فراخوان‌کنندگان getAll */
  getAll: async () => {
    const res = await productBrandService.getPaginated({
      pageNumber: 1,
      pageSize: LARGE_PAGE_SIZE,
    });
    const data = res?.data ?? res;
    const brands = Array.isArray(data?.brands) ? data.brands : Array.isArray(data) ? data : [];
    return { success: res?.success !== false, data: brands };
  },

  /** GET api/ProductBrand/GetPaginated — pageNumber, pageSize (حداکثر ۱۰۰), searchTerm?, isActive? */
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, searchTerm, isActive } = params;
    const cappedSize = Math.min(Math.max(1, Number(pageSize) || 20), 99999);
    const qs = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(cappedSize),
    });
    if (searchTerm != null && searchTerm !== "") qs.append("searchTerm", searchTerm);
    if (isActive !== undefined && isActive !== null) qs.append("isActive", String(isActive));
    const client = getAuthenticatedClient();
    return client.get(`ProductBrand/GetPaginated?${qs.toString()}`).json();
  },

  getActive: async () => {
    const client = getPublicClient();
    return client.get("ProductBrand/GetActive").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductBrand/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("ProductBrand/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`ProductBrand/Update?id=${id}`, { json: data }).json();
  },

  /** DELETE api/ProductBrand/Delete?id= — Soft Delete */
  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`ProductBrand/Delete?id=${id}`).json();
  },
};





