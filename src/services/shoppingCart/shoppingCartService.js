import { getAuthenticatedClient } from "../api/client";

const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, encodeURIComponent(value));
    }
  });
  return searchParams.toString();
};

export const shoppingCartService = {
  getCart: async (userId) => {
    const client = getAuthenticatedClient();
    const queryString = buildQueryString({ userId });
    return client.get(`ShoppingCart/GetCart?${queryString}`).json();
  },

  addItem: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("ShoppingCart/AddItem", { json: data }).json();
  },

  updateItemQuantity: async (itemId, quantity) => {
    const client = getAuthenticatedClient();
    const queryString = buildQueryString({ itemId, quantity });
    return client.put(`ShoppingCart/UpdateItemQuantity?${queryString}`).json();
  },

  removeItem: async (itemId) => {
    const client = getAuthenticatedClient();
    const queryString = buildQueryString({ itemId });
    return client.delete(`ShoppingCart/RemoveItem?${queryString}`).json();
  },

  clearCart: async () => {
    const client = getAuthenticatedClient();
    return client.delete("ShoppingCart/ClearCart").json();
  },

  getCartCount: async (userId) => {
    const client = getAuthenticatedClient();
    const queryString = buildQueryString({ userId });
    return client.get(`ShoppingCart/GetCartCount?${queryString}`).json();
  },

  getCartTotal: async (userId) => {
    const client = getAuthenticatedClient();
    const queryString = buildQueryString({ userId });
    return client.get(`ShoppingCart/GetCartTotal?${queryString}`).json();
  },

  applyDiscountCode: async (discountCode) => {
    const client = getAuthenticatedClient();
    const queryString = buildQueryString({ discountCode });
    return client.post(`ShoppingCart/ApplyDiscountCode?${queryString}`).json();
  },

  removeDiscountCode: async () => {
    const client = getAuthenticatedClient();
    return client.delete("ShoppingCart/RemoveDiscountCode").json();
  },
};

