import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const productService = {
  getAllActive: async () => {
    const client = getPublicClient();
    return client.get("Product/GetAllActive").json();
  },

  getById: async (id) => {
    const client = getPublicClient();
    return client.get(`Product/GetById?id=${id}`).json();
  },

  getByASIN: async (asin) => {
    const client = getPublicClient();
    return client.get(`Product/GetByASIN?asin=${encodeURIComponent(asin)}`).json();
  },

  search: async (params = {}) => {
    const { query, categoryId, brandId, minPrice, maxPrice, pageNumber = 1, pageSize = 20 } = params;
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    if (query) searchParams.append("query", query);
    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (brandId) searchParams.append("brandId", brandId.toString());
    if (minPrice) searchParams.append("minPrice", minPrice.toString());
    if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());

    const client = getPublicClient();
    return client.get(`Product/Search?${searchParams.toString()}`).json();
  },

  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      categoryId,
      brandId,
      status,
      searchTerm,
      minPrice,
      maxPrice,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (brandId) searchParams.append("brandId", brandId.toString());
    if (status) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (minPrice) searchParams.append("minPrice", minPrice.toString());
    if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());

    const client = getAuthenticatedClient();
    return client.get(`Product/GetPaginated?${searchParams.toString()}`).json();
  },

  getByCategory: async (categoryId, params = {}) => {
    const { pageNumber = 1, pageSize = 20 } = params;
    const searchParams = new URLSearchParams({
      categoryId: categoryId.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const client = getPublicClient();
    return client.get(`Product/GetByCategory?${searchParams.toString()}`).json();
  },

  getFeatured: async () => {
    const client = getPublicClient();
    return client.get("Product/GetFeatured").json();
  },

  getBestSellers: async () => {
    const client = getPublicClient();
    return client.get("Product/GetBestSellers").json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Product/Create", { json: data }).json();
  },

  update: async (data) => {
    const client = getAuthenticatedClient();
    return client.put("Product/Update", { json: data }).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/SoftDelete?id=${id}`).json();
  },

  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/HardDelete?id=${id}`).json();
  },

  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Product/Restore?id=${id}`).json();
  },

  trackView: async (productId) => {
    const client = getPublicClient();
    return client.post(`Product/TrackView?productId=${productId}`).json();
  },

  uploadMainImage: async (productId, file) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    formData.append("file", file);
    return client.post(`Product/UploadMainImage?productId=${productId}`, { body: formData }).json();
  },

  uploadProductImages: async (productId, files) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append("files", file);
    });
    return client.post(`Product/UploadProductImage?productId=${productId}`, { body: formData }).json();
  },

  deleteProductImage: async (productId, imageIndex) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/DeleteProductImage?productId=${productId}&imageIndex=${imageIndex}`).json();
  },
};
