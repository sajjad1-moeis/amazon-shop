import { getPublicClient, getAuthenticatedClient, API_BASE_URL } from "../api/client";
import { getToken } from "@/lib/token-manager";

export const productCategoryService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ProductCategory/GetAll").json();
  },

  getMainCategories: async () => {
    const client = getPublicClient();
    return client.get("ProductCategory/GetMainCategories").json();
  },

  getActive: async () => {
    const client = getPublicClient();
    return client.get("ProductCategory/GetActive").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductCategory/GetById?id=${id}`).json();
  },

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`ProductCategory/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("ProductCategory/Create", { json: data }).json();
  },

  /**
   * ایجاد دسته‌بندی با ارسال فایل تصویر/آیکون — fetch ساده و FormData.
   * فیلدها: name, slug?, key?, parentCategoryId?, isActive, imageFile?, iconFile?
   */
  createWithFormData: async ({ name, slug, key, parentCategoryId, isActive, imageFile, iconFile }) => {
    const token = getToken();
    if (!token) throw new Error("Access token not found");
    const formData = new FormData();
    formData.append("name", name.trim());
    if (slug?.trim()) formData.append("slug", slug.trim());
    if (key?.trim()) formData.append("key", key.trim());
    if (parentCategoryId != null && parentCategoryId !== "" && parentCategoryId !== "none")
      formData.append("parentCategoryId", String(parentCategoryId));
    formData.append("isActive", isActive === true ? "true" : "false");
    if (imageFile instanceof File) formData.append("image", imageFile);
    if (iconFile instanceof File) formData.append("icon", iconFile);
    const base = (API_BASE_URL || "").replace(/\/$/, "");
    const res = await fetch(`${base}/ProductCategory/Create`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.message || res.statusText || "خطا در ایجاد دسته‌بندی");
      err.response = res;
      err.data = data;
      throw err;
    }
    return data;
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`ProductCategory/Update?id=${id}`, { json: data }).json();
  },

  /**
   * به‌روزرسانی دسته‌بندی با ارسال فایل تصویر/آیکون — fetch و FormData.
   */
  updateWithFormData: async (id, { name, slug, key, parentCategoryId, isActive, imageFile, iconFile }) => {
    const token = getToken();
    if (!token) throw new Error("Access token not found");
    const formData = new FormData();
    formData.append("name", (name || "").trim());
    if (slug != null && slug !== "") formData.append("slug", slug.trim());
    if (key != null && key !== "") formData.append("key", key.trim());
    if (parentCategoryId != null && parentCategoryId !== "" && parentCategoryId !== "none")
      formData.append("parentCategoryId", String(parentCategoryId));
    formData.append("isActive", isActive === true ? "true" : "false");
    if (imageFile instanceof File) formData.append("image", imageFile);
    if (iconFile instanceof File) formData.append("icon", iconFile);
    const base = (API_BASE_URL || "").replace(/\/$/, "");
    const res = await fetch(`${base}/ProductCategory/Update?id=${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.message || res.statusText || "خطا در به‌روزرسانی دسته‌بندی");
      err.response = res;
      err.data = data;
      throw err;
    }
    return data;
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`ProductCategory/SoftDelete?id=${id}`).json();
  },

  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`ProductCategory/HardDelete?id=${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ProductCategory/Restore?id=${id}`).json();
  },

  getProductCount: async (categoryId) => {
    const client = getAuthenticatedClient();
    return client.get(`ProductCategory/GetProductCount?categoryId=${categoryId}`).json();
  },
};
