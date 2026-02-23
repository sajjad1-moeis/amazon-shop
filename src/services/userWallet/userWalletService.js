import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) search.append(k, String(v));
  });
  return search.toString();
};

/** نوع تراکنش کیف‌پول (WalletTransactionType) */
export const WalletTransactionType = {
  Deposit: 1,
  Withdrawal: 2,
  Refund: 3,
  Reward: 4,
  Discount: 5,
};

/**
 * سرویس کیف‌پول کاربر — API مرحله ۵ (api/UserWallet)
 * همهٔ endpointها (جز AddTransaction) با توکن و userId برابر کاربر جاری.
 * AddTransaction فقط ادمین.
 */
export const userWalletService = {
  /** GET api/UserWallet/GetWallet?userId={id} */
  getWallet: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserWallet/GetWallet?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/UserWallet/GetWalletWithTransactions?userId={id} — کیف‌پول + لیست تراکنش‌ها */
  getWalletWithTransactions: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client
      .get(`UserWallet/GetWalletWithTransactions?${qs({ userId })}`)
      .json();
    return unwrapApiData(res);
  },

  /** POST api/UserWallet/CreateWallet?userId={id} */
  createWallet: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`UserWallet/CreateWallet?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /**
   * POST api/UserWallet/RequestChargeWallet?userId={id} — درخواست شارژ از درگاه.
   * کاربر را به data.paymentUrl هدایت کنید؛ callback به api/Payment/verify-wallet.
   * @param {number} userId
   * @param {{ amount: number, description?: string }} body — amount حداقل ۱۰۰۰ (ریال)
   * @returns {Promise<{ status, authority, paymentUrl }>}
   */
  requestChargeWallet: async (userId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`UserWallet/RequestChargeWallet?${qs({ userId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** GET api/UserWallet/GetTransactions?userId={id} */
  getTransactions: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserWallet/GetTransactions?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/UserWallet/GetBalance?userId={id} — فقط موجودی (number) */
  getBalance: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`UserWallet/GetBalance?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /**
   * POST api/UserWallet/AddTransaction — فقط ادمین. واریز/برداشت/بازگشت/پاداش/تخفیف دستی.
   * @param {{ userId: number, type: number, amount: number, description?: string, referenceId?: string }} body
   * @param type — WalletTransactionType: 1=Deposit, 2=Withdrawal, 3=Refund, 4=Reward, 5=Discount
   * @returns {Promise<WalletTransactionResponseDto>}
   */
  addTransaction: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post("UserWallet/AddTransaction", { json: body }).json();
    return unwrapApiData(res);
  },
};
