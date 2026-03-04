import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

/**
 * سرویس حساب بانکی کاربر — api/bank-accounts
 * Phase 18 - بخش ۳.۳ و ۱۲.۳
 */
export const userBankAccountService = {
  /** GET api/bank-accounts — لیست حساب‌های تأییدشده */
  getList: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("bank-accounts").json();
    return unwrapApiData(res);
  },

  /** POST api/bank-accounts — بدنه: AddBankAccountDto */
  add: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post("bank-accounts", { json: body }).json();
    return unwrapApiData(res);
  },

  /** POST api/bank-accounts/{id}/verify — بدنه: VerifyBankAccountDto */
  verify: async (id, body) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`bank-accounts/${id}/verify`, { json: body }).json();
    return unwrapApiData(res);
  },

  /** DELETE api/bank-accounts/{id} */
  delete: async (id) => {
    const client = getAuthenticatedClient();
    const res = await client.delete(`bank-accounts/${id}`).json();
    return unwrapApiData(res);
  },
};
