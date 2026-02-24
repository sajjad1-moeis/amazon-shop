import { getPublicClient, getAuthenticatedClient } from "../api/client";

/**
 * Phase 14 — api/CurrencyRate
 * پاسخ استاندارد: { statusCode, success, message, data }. از unwrapApiData استفاده کنید.
 */
export const currencyRateService = {
  get: (currency) =>
    getPublicClient().get(`CurrencyRate/${encodeURIComponent(currency)}`).json(),
  latest: () => getPublicClient().get("CurrencyRate/latest").json(),
  history: (currency, days) => {
    const qs = days != null ? `?days=${Number(days)}` : "";
    return getPublicClient()
      .get(`CurrencyRate/${encodeURIComponent(currency)}/history${qs}`)
      .json();
  },
  update: (body) =>
    getAuthenticatedClient().post("CurrencyRate/update", { json: body }).json(),
  supported: () => getPublicClient().get("CurrencyRate/supported").json(),
  sources: () => getPublicClient().get("CurrencyRate/sources").json(),
};
