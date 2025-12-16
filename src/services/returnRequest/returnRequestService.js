import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const returnRequestService = {
  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("ReturnRequest/Create", { json: data }).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetById?id=${id}`).json();
  },

  getByReturnNumber: async (returnNumber) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetByReturnNumber?returnNumber=${encodeURIComponent(returnNumber)}`).json();
  },

  getMyReturnRequests: async () => {
    const client = getAuthenticatedClient();
    return client.get("ReturnRequest/GetMyReturnRequests").json();
  },

  getByOrderId: async (orderId) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetByOrderId?orderId=${orderId}`).json();
  },

  canReturn: async (orderItemId) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/CanReturn?orderItemId=${orderItemId}`).json();
  },

  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ReturnRequest/GetAll").json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`ReturnRequest/GetByStatus?status=${status}`).json();
  },

  approve: async (id, data = {}) => {
    const client = getAuthenticatedClient();
    return client.post(`ReturnRequest/Approve?id=${id}`, { json: data }).json();
  },

  reject: async (id, reason) => {
    const client = getAuthenticatedClient();
    return client.post(`ReturnRequest/Reject?id=${id}`, { json: { reason } }).json();
  },

  processRefund: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`ReturnRequest/ProcessRefund?id=${id}`).json();
  },
};

