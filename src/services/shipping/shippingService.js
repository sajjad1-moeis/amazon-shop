import { getAuthenticatedClient } from "../api/client";

/** Phase 23 — GetMethods و GetZones با صفحه‌بندی */
export const shippingService = {
  /** GET api/Shipping/GetMethods — pageNumber, pageSize?, isActive? */
  getMethods: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, isActive } = params;
    const qs = new URLSearchParams({ pageNumber: String(pageNumber), pageSize: String(pageSize) });
    if (isActive !== undefined && isActive !== null) qs.append("isActive", String(isActive));
    const client = getAuthenticatedClient();
    return client.get(`Shipping/GetMethods?${qs.toString()}`).json();
  },

  getMethodById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Shipping/GetMethodById?id=${id}`).json();
  },

  createMethod: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Shipping/CreateMethod", { json: data }).json();
  },

  updateMethod: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Shipping/UpdateMethod?id=${id}`, { json: data }).json();
  },

  deleteMethod: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Shipping/DeleteMethod?id=${id}`).json();
  },

  /** GET api/Shipping/GetZones — pageNumber, pageSize?, isActive? */
  getZones: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, isActive } = params;
    const qs = new URLSearchParams({ pageNumber: String(pageNumber), pageSize: String(pageSize) });
    if (isActive !== undefined && isActive !== null) qs.append("isActive", String(isActive));
    const client = getAuthenticatedClient();
    return client.get(`Shipping/GetZones?${qs.toString()}`).json();
  },

  getZoneById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Shipping/GetZoneById?id=${id}`).json();
  },

  createZone: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Shipping/CreateZone", { json: data }).json();
  },

  updateZone: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Shipping/UpdateZone?id=${id}`, { json: data }).json();
  },

  deleteZone: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Shipping/DeleteZone?id=${id}`).json();
  },
};
