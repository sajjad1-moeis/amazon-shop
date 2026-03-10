import { getAuthenticatedClient } from "../api/client";

export const paymentService = {
  /** GET api/Payment/GetPaginated — pageSize حداکثر ۱۰۰ */
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      method,
      searchTerm,
      startDate,
      endDate,
    } = params;

    const cappedSize = Math.min(Math.max(1, Number(pageSize) || 20), 100);
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: cappedSize.toString(),
    });

    if (status) searchParams.append("status", status.toString());
    if (method) searchParams.append("method", method);
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`Payment/GetPaginated?${searchParams.toString()}`).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Payment/GetById?id=${id}`).json();
  },

  /** POST api/Payment/Refund?id= — id = orderId. body: { amount?, reason? } اختیاری */
  refund: async (orderId, body = {}) => {
    const client = getAuthenticatedClient();
    const json = {};
    if (body.amount != null) json.amount = body.amount;
    if (body.reason != null && body.reason !== "") json.reason = body.reason;
    return client.post(`Payment/Refund?id=${orderId}`, { json }).json();
  },
};
