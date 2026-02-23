import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) search.append(k, String(v));
  });
  return search.toString();
};

/**
 * سرویس سبد خرید — API مرحله ۳ (api/ShoppingCart)
 * همهٔ متدها نیاز به توکن و userId برابر کاربر جاری دارند.
 */
export const shoppingCartService = {
  /** GET api/ShoppingCart/GetCart?userId={id} — برمی‌گرداند: items, totalItems, subTotal, finalTotal, ... */
  getCart: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`ShoppingCart/GetCart?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** POST api/ShoppingCart/AddToCart?userId={id} — body: { productId, quantity, hasQualityShield? } */
  addToCart: async (userId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`ShoppingCart/AddToCart?${qs({ userId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/ShoppingCart/UpdateCartItem?userId={id}&cartItemId={id} — body: { quantity, hasQualityShield? } */
  updateCartItem: async (userId, cartItemId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`ShoppingCart/UpdateCartItem?${qs({ userId, cartItemId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/ShoppingCart/delete-item?userId={id}&cartItemId={id} */
  removeItem: async (userId, cartItemId) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`ShoppingCart/delete-item?${qs({ userId, cartItemId })}`)
      .json();
    return res;
  },

  /** POST api/ShoppingCart/delete-multiple?userId={id} — body: { cartItemIds: number[] } */
  removeMultipleItems: async (userId, cartItemIds) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`ShoppingCart/delete-multiple?${qs({ userId })}`, {
        json: { cartItemIds },
      })
      .json();
    return res;
  },

  /** POST api/ShoppingCart/clear?userId={id} */
  clearCart: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`ShoppingCart/clear?${qs({ userId })}`).json();
    return res;
  },

  /** POST api/ShoppingCart/RefreshCartPrices?userId={id} */
  refreshCartPrices: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`ShoppingCart/RefreshCartPrices?${qs({ userId })}`)
      .json();
    return unwrapApiData(res);
  },

  /** POST api/ShoppingCart/remove-discount/{userId} */
  removeDiscountCode: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`ShoppingCart/remove-discount/${userId}`).json();
    return res;
  },
};
