import { getPublicClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") search.append(k, String(v));
  });
  return search.toString();
};

/**
 * سرویس درگاه پرداخت — API مرحله ۵ (api/Payment)
 * کنترلر [Authorize] ندارد؛ برای سفارش/کیف‌پول بعد از لاگین فراخوانی می‌شود.
 * مبلغ‌ها در درگاه به ریال هستند.
 */
export const paymentGatewayService = {
  /**
   * POST api/Payment/request — درخواست پرداخت مستقیم (عمومی، بدون سفارش).
   * @param {{ amount: number, description: string, mobile?: string, email?: string, callbackUrl?: string }} body — amount به ریال، حداقل ۱۰۰۰
   * @returns {Promise<{ status, authority, paymentUrl }>}
   */
  request: async (body) => {
    const client = getPublicClient();
    const res = await client.post("Payment/request", { json: body }).json();
    return unwrapApiData(res);
  },

  /**
   * POST api/Payment/request-from-order — درخواست پرداخت برای سفارش.
   * کاربر را به data.paymentUrl هدایت کنید؛ callback به verify-order.
   * @param {{ orderId: number, mobile?: string, email?: string }} body
   * @returns {Promise<{ status, authority, paymentUrl }>}
   */
  requestFromOrder: async (body) => {
    const client = getPublicClient();
    const res = await client.post("Payment/request-from-order", { json: body }).json();
    return unwrapApiData(res);
  },

  /**
   * GET api/Payment/verify-order — تأیید پرداخت سفارش (callback زرین‌پال).
   * با Accept: application/json صدا بزنید تا JSON برگردد (بدون ریدایرکت).
   * @param {{ authority: string, Status?: string }} params
   * @returns {Promise<{ statusCode, refId, authority, amount, verifiedAt }>}
   */
  verifyOrder: async (params) => {
    const client = getPublicClient();
    const res = await client.get(`Payment/verify-order?${qs(params)}`).json();
    return unwrapApiData(res);
  },

  /**
   * GET api/Payment/verify-wallet — تأیید شارژ کیف‌پول (callback زرین‌پال).
   * @param {{ authority: string, Status?: string }} params
   * @returns {Promise<WalletTransactionResponseDto>}
   */
  verifyWallet: async (params) => {
    const client = getPublicClient();
    const res = await client.get(`Payment/verify-wallet?${qs(params)}`).json();
    return unwrapApiData(res);
  },

  /**
   * POST api/Payment/verify-and-complete-order — تأیید و تکمیل سفارش از فرانت با authority.
   * وقتی callback به صفحهٔ فرانت می‌آید، با orderId و authority این را صدا بزنید.
   * @param {{ authority: string, orderId: number }} body
   * @returns {Promise<PaymentVerifyResponse>}
   */
  verifyAndCompleteOrder: async (body) => {
    const client = getPublicClient();
    const res = await client.post("Payment/verify-and-complete-order", { json: body }).json();
    return unwrapApiData(res);
  },

  /**
   * POST api/Payment/request-second-installment — درخواست پرداخت قسط دوم (اقساطی).
   * @param {{ orderId: number, mobile?: string, email?: string }} body
   * @returns {Promise<{ status, authority, paymentUrl }>}
   */
  requestSecondInstallment: async (body) => {
    const client = getPublicClient();
    const res = await client.post("Payment/request-second-installment", { json: body }).json();
    return unwrapApiData(res);
  },

  /**
   * GET api/Payment/verify-second-installment — تأیید پرداخت قسط دوم (callback).
   * @param {{ authority: string, Status?: string }} params
   * @returns {Promise<PaymentVerifyResponse>}
   */
  verifySecondInstallment: async (params) => {
    const client = getPublicClient();
    const res = await client.get(`Payment/verify-second-installment?${qs(params)}`).json();
    return unwrapApiData(res);
  },

  /**
   * POST api/Payment/pay-with-wallet — پرداخت سفارش با کیف‌پول (بدون درگاه).
   * @param {{ orderId: number }} body
   * @returns {Promise<OrderResponseDto>}
   */
  payWithWallet: async (body) => {
    const client = getPublicClient();
    const res = await client.post("Payment/pay-with-wallet", { json: body }).json();
    return unwrapApiData(res);
  },
};
