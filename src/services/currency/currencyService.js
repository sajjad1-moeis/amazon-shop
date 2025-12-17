import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const currencyService = {
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
    return client.get(`CurrencyService/GetPaginated?${searchParams.toString()}`).json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("CurrencyService/GetAll").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`CurrencyService/GetById?id=${id}`).json();
  },

  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("CurrencyService/Create", { json: data }).json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`CurrencyService/Update?id=${id}`, { json: data }).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`CurrencyService/Delete?id=${id}`).json();
  },

  softDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`CurrencyService/SoftDelete?id=${id}`).json();
  },
};





