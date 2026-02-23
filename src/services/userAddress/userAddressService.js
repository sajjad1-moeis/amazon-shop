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
 * سرویس آدرس کاربر — API مرحله ۳ (api/UserAddress)
 * همهٔ متدها نیاز به توکن و userId برابر کاربر جاری دارند.
 */
export const userAddressService = {
  /** GET api/UserAddress/GetUserAddresses?userId={id} */
  getAddresses: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserAddress/GetUserAddresses?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/UserAddress/GetAddressById?id={id}&userId={userId} */
  getAddressById: async (userId, id) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserAddress/GetAddressById?${qs({ id, userId })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/UserAddress/GetDefaultAddress?userId={id} */
  getDefaultAddress: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserAddress/GetDefaultAddress?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** POST api/UserAddress/CreateAddress?userId={id} — body: CreateUserAddressDto */
  createAddress: async (userId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`UserAddress/CreateAddress?${qs({ userId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/UserAddress/update/{id}?userId={userId} — body: UpdateUserAddressDto (partial) */
  updateAddress: async (userId, id, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`UserAddress/update/${id}?${qs({ userId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/UserAddress/delete/{id}?userId={userId} */
  deleteAddress: async (userId, id) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`UserAddress/delete/${id}?${qs({ userId })}`)
      .json();
    return res;
  },

  /** POST api/UserAddress/SetDefaultAddress?userId={id}&addressId={addressId} */
  setDefaultAddress: async (userId, addressId) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`UserAddress/SetDefaultAddress?${qs({ userId, addressId })}`)
      .json();
    return res;
  },
};
