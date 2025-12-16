import { getAuthenticatedClient } from "../api/client";

export const inventoryService = {
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      searchTerm,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getAuthenticatedClient();
    return client.get(`Inventory/GetPaginated?${searchParams.toString()}`).json();
  },

  getByProductId: async (productId) => {
    const client = getAuthenticatedClient();
    return client.get(`Inventory/GetByProductId?productId=${productId}`).json();
  },

  stockIn: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Inventory/StockIn", { json: data }).json();
  },

  stockOut: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Inventory/StockOut", { json: data }).json();
  },

  updateStock: async (productId, quantity) => {
    const client = getAuthenticatedClient();
    return client.post(`Inventory/UpdateStock?productId=${productId}&quantity=${quantity}`).json();
  },
};
