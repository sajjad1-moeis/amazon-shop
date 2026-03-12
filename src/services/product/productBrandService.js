import { getPublicClient, getAuthenticatedClient } from "../api/client";

/**
 * سرویس برند محصول — ProductBrand
 * مطابق قرارداد بک‌اند:
 * - GET ProductBrand/GetAll
 * - GET ProductBrand/GetActive
 * - GET ProductBrand/GetById
 * - POST ProductBrand/Create
 * - PUT ProductBrand/Update?id={id}
 * - DELETE ProductBrand/Delete?id={id}
 */

export const productBrandService = {
  /** GET api/ProductBrand/GetAll — لیست کامل برندها برای جدول/کمبوباکس‌ها */
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ProductBrand/GetAll").json();
  },

  /** (در صورت نیاز به صفحه‌بندی) GET api/ProductBrand/GetPaginated — pageNumber, pageSize, searchTerm?, isActive? */
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, searchTerm, isActive } = params;
    const qs = new URLSearchParams({
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
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





