import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

/** وضعیت درخواست مرجوعی — مطابق داک مرحله ۸ */
export const ReturnRequestStatus = {
  Pending: 1,
  Approved: 2,
  Rejected: 3,
  Completed: 4,
  Cancelled: 5,
};

export const returnRequestService = {
  /** POST api/ReturnRequest/Create — form (multipart) با فیلدها + files */
  create: async (data, files = []) => {
    const client = getAuthenticatedClient();
    const form = new FormData();
    form.append("userId", String(data.userId));
    form.append("orderId", String(data.orderId));
    form.append("orderItemId", String(data.orderItemId));
    form.append("description", data.description || "");
    (files || []).forEach((f) => form.append("files", f));
    const res = await client
      .extend({ retry: { limit: 0 } })
      .post("ReturnRequest/Create", { body: form })
      .json();
    return unwrapApiData(res);
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetById?id=${id}`).json();
  },

  getByReturnNumber: async (returnNumber) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetByReturnNumber?returnNumber=${encodeURIComponent(returnNumber)}`).json();
  },

  /** GET api/ReturnRequest/GetMyReturnRequests — Query: userId (اختیاری اگر از توکن گرفته شود) */
  getMyReturnRequests: async (userId) => {
    const client = getAuthenticatedClient();
    const qs = userId != null ? `?userId=${userId}` : "";
    return client.get(`ReturnRequest/GetMyReturnRequests${qs}`).json();
  },

  getByOrderId: async (orderId) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetByOrderId?orderId=${orderId}`).json();
  },

  canReturn: async (orderItemId) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/CanReturn?orderItemId=${orderItemId}`).json();
  },

  /** GET api/ReturnRequest/GetAll — Query: pageNumber, pageSize, status?, userId?, orderId? */
  getAll: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, userId, orderId } = params;
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    if (status != null) searchParams.append("status", String(status));
    if (userId != null) searchParams.append("userId", String(userId));
    if (orderId != null) searchParams.append("orderId", String(orderId));
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetAll?${searchParams.toString()}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetByStatus?status=${status}`).json();
  },

  /** POST api/ReturnRequest/Approve?returnRequestId= — body: { adminNotes?, finalRefundAmount } */
  approve: async (returnRequestId, body) => {
    const client = getAuthenticatedClient();
    return client.post(`ReturnRequest/Approve?returnRequestId=${returnRequestId}`, { json: body }).json();
  },

  /** POST api/ReturnRequest/Reject?returnRequestId= — body: { rejectionReason } */
  reject: async (returnRequestId, body) => {
    const client = getAuthenticatedClient();
    return client.post(`ReturnRequest/Reject?returnRequestId=${returnRequestId}`, { json: body }).json();
  },

  /** POST api/ReturnRequest/ProcessRefund — body: { returnRequestId } */
  processRefund: async (returnRequestId) => {
    const client = getAuthenticatedClient();
    return client.post("ReturnRequest/ProcessRefund", { json: { returnRequestId } }).json();
  },
};





