import { getAuthenticatedClient } from "../api/client";

export const settingsService = {
  getGeneral: async () => {
    const client = getAuthenticatedClient();
    return client.get("Settings/GetGeneral").json();
  },

  updateGeneral: async (data) => {
    const client = getAuthenticatedClient();
    return client.put("Settings/UpdateGeneral", { json: data }).json();
  },

  getPayment: async () => {
    const client = getAuthenticatedClient();
    return client.get("Settings/GetPayment").json();
  },

  updatePayment: async (data) => {
    const client = getAuthenticatedClient();
    return client.put("Settings/UpdatePayment", { json: data }).json();
  },

  getShipping: async () => {
    const client = getAuthenticatedClient();
    return client.get("Settings/GetShipping").json();
  },

  updateShipping: async (data) => {
    const client = getAuthenticatedClient();
    return client.put("Settings/UpdateShipping", { json: data }).json();
  },

  getEmail: async () => {
    const client = getAuthenticatedClient();
    return client.get("Settings/GetEmail").json();
  },

  updateEmail: async (data) => {
    const client = getAuthenticatedClient();
    return client.put("Settings/UpdateEmail", { json: data }).json();
  },
};
