import { getAuthenticatedClient } from "../api/client";

export const shippingService = {
  getMethods: async () => {
    const client = getAuthenticatedClient();
    return client.get("Shipping/GetMethods").json();
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

  getZones: async () => {
    const client = getAuthenticatedClient();
    return client.get("Shipping/GetZones").json();
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
