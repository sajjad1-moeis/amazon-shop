import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const productService = {
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

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Product/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Product/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Product/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Product/Delete?id=${id}`).json();
  },

  uploadImage: async (productId, file) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productId", productId.toString());

    return client.post(`Product/UploadImage?productId=${productId}`, { body: formData }).json();
  },

  updateStatus: async (id, status) => {
    const client = getAuthenticatedClient();
    return client.post(`Product/UpdateStatus?id=${id}&status=${status}`).json();
  },
};

