/**
 * سرویس بنر — api/Banner
 * خواندن عمومی؛ Create/Update/Delete/Restore/UploadImage فقط Admin (فاز ۱۰).
 */

import { getPublicClient, getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

/** موقعیت بنر — مطابق داک */
export const BannerPosition = {
  Top: 1,
  MiddleLeft: 2,
  MiddleRight: 3,
  CategoryPage: 4,
};

const client = () => getPublicClient();
const authClient = () => getAuthenticatedClient();

export const bannerService = {
  getAll: async () => {
    const res = await client().get("Banner/GetAll").json();
    return unwrapApiData(res);
  },

  getActive: async () => {
    const res = await client().get("Banner/GetActive").json();
    return unwrapApiData(res);
  },

  getActiveByPosition: async (position) => {
    const res = await client().get(`Banner/GetActiveByPosition?position=${position}`).json();
    return unwrapApiData(res);
  },

  getTopBanners: async () => {
    const res = await client().get("Banner/GetTopBanners").json();
    return unwrapApiData(res);
  },

  getMiddleBanners: async () => {
    const res = await client().get("Banner/GetMiddleBanners").json();
    return unwrapApiData(res);
  },

  getCategoryPageBanners: async () => {
    const res = await client().get("Banner/GetCategoryPageBanners").json();
    return unwrapApiData(res);
  },

  getById: async (id) => {
    const res = await client().get(`Banner/GetById?id=${id}`).json();
    return unwrapApiData(res);
  },

  /** POST api/Banner/Create — multipart/form-data: title, description?, imageFile, linkUrl?, altText?, position, isActive?, displayOrder?, startDate?, endDate? */
  create: async (formData) => {
    const res = await authClient().post("Banner/Create", { body: formData }).json();
    return unwrapApiData(res);
  },

  /** POST api/Banner/update/{id} — body: UpdateBannerDto (JSON) */
  update: async (id, body) => {
    const res = await authClient().post(`Banner/update/${id}`, { json: body }).json();
    return unwrapApiData(res);
  },

  /** POST api/Banner/UploadImage?id= — multipart: فیلد نام `file` */
  uploadImage: async (id, file) => {
    const fd = new FormData();
    fd.append("file", file);
    const res = await authClient().post(`Banner/UploadImage?id=${id}`, { body: fd }).json();
    return unwrapApiData(res);
  },

  /** POST api/Banner/delete/{id} */
  softDelete: async (id, reason) => {
    const qs = reason ? `?reason=${encodeURIComponent(reason)}` : "";
    const res = await authClient().post(`Banner/delete/${id}${qs}`).json();
    return unwrapApiData(res);
  },

  /** POST api/Banner/hard-delete/{id} */
  hardDelete: async (id) => {
    const res = await authClient().post(`Banner/hard-delete/${id}`).json();
    return unwrapApiData(res);
  },

  /** POST api/Banner/Restore?id= */
  restore: async (id) => {
    const res = await authClient().post(`Banner/Restore?id=${id}`).json();
    return unwrapApiData(res);
  },

  trackClick: async (id) => {
    const res = await authClient().post(`Banner/TrackClick?id=${id}`).json();
    return unwrapApiData(res);
  },

  trackView: async (id) => {
    const res = await authClient().post(`Banner/TrackView?id=${id}`).json();
    return unwrapApiData(res);
  },
};
