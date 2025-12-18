import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const productService = {
  getAllActive: async () => {
    const client = getPublicClient();
    return client.get("Product/GetAllActive").json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetAll").json();
  },

  getById: async (id) => {
    const client = getPublicClient();
    return client.get(`Product/GetById?id=${id}`).json();
  },

  getBySlug: async (slug) => {
    const client = getPublicClient();
    return client.get(`Product/GetBySlug?slug=${encodeURIComponent(slug)}`).json();
  },

  getByASIN: async (asin) => {
    const client = getPublicClient();
    return client.get(`Product/GetByASIN?asin=${encodeURIComponent(asin)}`).json();
  },

  search: async (params = {}) => {
    const {
      query,
      categoryId,
      brandId,
      minPrice,
      maxPrice,
      pageNumber = 1,
      pageSize = 20,
      sortBy,
      sortDescending,
    } = params;
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    if (query) searchParams.append("query", query);
    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (brandId) searchParams.append("brandId", brandId.toString());
    if (minPrice) searchParams.append("minPrice", minPrice.toString());
    if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (sortDescending !== undefined) searchParams.append("sortDescending", sortDescending.toString());

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
      sortBy,
      sortDescending,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (brandId) searchParams.append("brandId", brandId.toString());
    if (status !== undefined && status !== null) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (minPrice) searchParams.append("minPrice", minPrice.toString());
    if (maxPrice) searchParams.append("maxPrice", maxPrice.toString());
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (sortDescending !== undefined) searchParams.append("sortDescending", sortDescending.toString());

    const client = getAuthenticatedClient();
    return client.get(`Product/GetPaginated?${searchParams.toString()}`).json();
  },

  getByCategory: async (categoryId, params = {}) => {
    const { pageNumber = 1, pageSize = 20, sortBy, sortDescending } = params;
    const searchParams = new URLSearchParams({
      categoryId: categoryId.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (sortDescending !== undefined) searchParams.append("sortDescending", sortDescending.toString());

    const client = getPublicClient();
    return client.get(`Product/GetByCategory?${searchParams.toString()}`).json();
  },

  getByBrand: async (brandId, params = {}) => {
    const { pageNumber = 1, pageSize = 20 } = params;
    const searchParams = new URLSearchParams({
      brandId: brandId.toString(),
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    const client = getPublicClient();
    return client.get(`Product/GetByBrand?${searchParams.toString()}`).json();
  },

  getFeatured: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString() ? `Product/GetFeatured?${searchParams.toString()}` : "Product/GetFeatured";
    return client.get(url).json();
  },

  getBestSellers: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString()
      ? `Product/GetBestSellers?${searchParams.toString()}`
      : "Product/GetBestSellers";
    return client.get(url).json();
  },

  getNewArrivals: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString()
      ? `Product/GetNewArrivals?${searchParams.toString()}`
      : "Product/GetNewArrivals";
    return client.get(url).json();
  },

  getOnSale: async (limit) => {
    const client = getPublicClient();
    const searchParams = new URLSearchParams();
    if (limit) searchParams.append("limit", limit.toString());
    const url = searchParams.toString() ? `Product/GetOnSale?${searchParams.toString()}` : "Product/GetOnSale";
    return client.get(url).json();
  },

  getRelated: async (productId, limit = 4) => {
    const client = getPublicClient();
    return client.get(`Product/GetRelated?productId=${productId}&limit=${limit}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Product/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/Update?id=${id}`, { json: data }).json();
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

  changeStatus: async (id, status) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/ChangeStatus?id=${id}&status=${status}`).json();
  },

  updateStock: async (id, stock) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/UpdateStock?id=${id}&stock=${stock}`).json();
  },

  updatePrice: async (id, price, discountPrice) => {
    const client = getAuthenticatedClient();
    const searchParams = new URLSearchParams({ id: id.toString(), price: price.toString() });
    if (discountPrice) searchParams.append("discountPrice", discountPrice.toString());
    return client.put(`Product/UpdatePrice?${searchParams.toString()}`).json();
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
    if (Array.isArray(files)) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      formData.append("files", files);
    }
    return client.post(`Product/UploadProductImages?productId=${productId}`, { body: formData }).json();
  },

  deleteProductImage: async (productId, imageIndex) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/DeleteProductImage?productId=${productId}&imageIndex=${imageIndex}`).json();
  },

  getStatistics: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetStatistics").json();
  },

  getCountByCategory: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetCountByCategory").json();
  },

  getCountByBrand: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetCountByBrand").json();
  },

  getCountByStatus: async () => {
    const client = getAuthenticatedClient();
    return client.get("Product/GetCountByStatus").json();
  },
};
