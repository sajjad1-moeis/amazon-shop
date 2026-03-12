import { getPublicClient, getAuthenticatedClient, API_BASE_URL } from "../api/client";
import { getToken } from "@/lib/token-manager";

export const blogService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      categoryId,
      authorId,
      isFeatured,
      searchTerm,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (authorId) searchParams.append("authorId", authorId.toString());
    if (isFeatured !== undefined) searchParams.append("isFeatured", isFeatured.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getPublicClient();
    return client.get(`Blog/GetPaginated?${searchParams.toString()}`).json();
  },

  getFeatured: async () => {
    const client = getPublicClient();
    return client.get("Blog/GetFeatured").json();
  },

  getPublished: async () => {
    const client = getPublicClient();
    return client.get("Blog/GetPublished").json();
  },

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`Blog/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Blog/GetById?id=${id}`).json();
  },

  getByAuthorId: async (authorId) => {
    const client = getPublicClient();
    return client.get(`Blog/GetByAuthorId?authorId=${authorId}`).json();
  },

  getByCategoryId: async (categoryId) => {
    const client = getPublicClient();
    return client.get(`Blog/GetByCategoryId?categoryId=${categoryId}`).json();
  },

  getByStatus: async (status) => {
    const client = getPublicClient();
    return client.get(`Blog/GetByStatus?status=${status}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Blog/Create", { json: data }).json();
  },

  /** POST api/Blog/update/{id} — Admin */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`Blog/update/${id}`, { json: data }).json();
  },

  /** POST api/Blog/IncrementViewCount?id= */
  incrementViewCount: async (id) => {
    const client = getPublicClient();
    return client.post(`Blog/IncrementViewCount?id=${id}`).json();
  },

  /**
   * POST api/Blog/UploadFeaturedImage — با fetch ساده و multipart/form-data.
   * هدر Content-Type ست نمی‌شود تا مرورگر خودش boundary را بگذارد.
   */
  uploadFeaturedImage: async (blogId, file) => {
    const token = getToken();
    if (!token) throw new Error("Access token not found");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("blogId", blogId.toString());
    if (file?.name) {
      formData.append("fileName", file.name);
      formData.append("filename", file.name);
    }

    const base = (API_BASE_URL || "").replace(/\/$/, "");
    const url = `${base}/Blog/UploadFeaturedImage?blogId=${blogId}`;

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.message || res.statusText || "خطا در آپلود تصویر");
      err.response = res;
      err.data = data;
      throw err;
    }
    return data;
  },

  incrementLikeCount: async (id) => {
    const client = getPublicClient();
    return client.post(`Blog/IncrementLikeCount?id=${id}`).json();
  },

  /** POST api/Blog/delete/{id} — Admin */
  softDelete: async (id, reason) => {
    const client = getAuthenticatedClient();
    const qs = reason ? `?reason=${encodeURIComponent(reason)}` : "";
    return client.post(`Blog/delete/${id}${qs}`).json();
  },

  /** POST api/Blog/hard-delete/{id} — Admin */
  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Blog/hard-delete/${id}`).json();
  },

  /** POST api/Blog/Restore?id= — Admin */
  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Blog/Restore?id=${id}`).json();
  },

  /** POST api/Blog/Publish?id= — Admin (در صورت وجود در بک‌اند) */
  publish: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Blog/Publish?id=${id}`).json();
  },
};

