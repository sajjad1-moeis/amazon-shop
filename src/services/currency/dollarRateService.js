import { getPublicClient, getAuthenticatedClient } from "../api/client";

/**
 * Phase 14 — api/DollarRate
 * پاسخ استاندارد: { statusCode, success, message, data }. از unwrapApiData استفاده کنید.
 */
export const dollarRateService = {
  getFromApi: () => getPublicClient().get("DollarRate/from-api").json(),
  getCurrent: () => getPublicClient().get("DollarRate/current").json(),
  set: (body) => getAuthenticatedClient().post("DollarRate/set", { json: body }).json(),
  update: (body) => getAuthenticatedClient().post("DollarRate/update", { json: body }).json(),
  getSource: () => getPublicClient().get("DollarRate/source").json(),
  setSource: (body) => getAuthenticatedClient().post("DollarRate/set-source", { json: body }).json(),
  delete: () => getAuthenticatedClient().post("DollarRate/delete").json(),
  dollarRate: (params) => {
    const qs = new URLSearchParams();
    if (params?.isManual != null) qs.set("isManual", String(params.isManual));
    if (params?.manualRate != null) qs.set("manualRate", String(params.manualRate));
    const query = qs.toString();
    return getAuthenticatedClient()
      .post(`DollarRate/dollar-rate${query ? `?${query}` : ""}`)
      .json();
  },
  getAllFromApi: () => getPublicClient().get("DollarRate/all-from-api").json(),
  getFromApiByCurrency: (currency) =>
    getPublicClient().get(`DollarRate/from-api/${encodeURIComponent(currency)}`).json(),
  updateAll: () => getAuthenticatedClient().post("DollarRate/update-all").json(),
  updateCurrency: (currency) =>
    getAuthenticatedClient().post(`DollarRate/update/${encodeURIComponent(currency)}`).json(),
};
