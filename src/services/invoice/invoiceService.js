import { getAuthenticatedClient, API_BASE_URL } from "../api/client";
import { getToken } from "@/lib/token-manager";

/**
 * Phase 9: api/Invoice — CreateInvoiceFromOrder, GetInvoiceById, GetInvoiceByInvoiceNumber,
 * GetInvoiceByOrderId, GetUserInvoices, GetUserInvoicesByStatus, GetAllInvoices,
 * GetInvoicesByStatus, GetInvoicesByType, GetRecentInvoices, UpdateInvoiceStatus,
 * UpdateInvoicePayment, IssueInvoice, SendInvoice, CancelInvoice,
 * GetUserInvoiceCount, GetInvoiceCountByStatus, GetTotalInvoiceAmount, GetTotalPaidInvoiceAmount.
 */
export const invoiceService = {
  createInvoiceFromOrder: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Invoice/CreateInvoiceFromOrder", { json: data }).json();
  },

  getInvoiceById: async (invoiceId) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetInvoiceById?invoiceId=${invoiceId}`).json();
  },

  getInvoiceByInvoiceNumber: async (invoiceNumber) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetInvoiceByInvoiceNumber?invoiceNumber=${encodeURIComponent(invoiceNumber)}`).json();
  },

  getInvoiceByOrderId: async (orderId) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetInvoiceByOrderId?orderId=${orderId}`).json();
  },

  getUserInvoices: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetUserInvoices?userId=${userId}`).json();
  },

  getUserInvoicesByStatus: async (userId, status) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId), status: String(status) });
    return client.get(`Invoice/GetUserInvoicesByStatus?${qs.toString()}`).json();
  },

  getAllInvoices: async () => {
    const client = getAuthenticatedClient();
    return client.get("Invoice/GetAllInvoices").json();
  },

  getInvoicesByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetInvoicesByStatus?status=${status}`).json();
  },

  getInvoicesByType: async (type) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetInvoicesByType?type=${type}`).json();
  },

  getRecentInvoices: async (count = 10) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetRecentInvoices?count=${count}`).json();
  },

  updateInvoiceStatus: async (invoiceId, data) => {
    const client = getAuthenticatedClient();
    return client.post(`Invoice/UpdateInvoiceStatus?invoiceId=${invoiceId}`, { json: data }).json();
  },

  updateInvoicePayment: async (invoiceId, data) => {
    const client = getAuthenticatedClient();
    return client.post(`Invoice/UpdateInvoicePayment?invoiceId=${invoiceId}`, { json: data }).json();
  },

  issueInvoice: async (invoiceId) => {
    const client = getAuthenticatedClient();
    return client.post(`Invoice/IssueInvoice?invoiceId=${invoiceId}`).json();
  },

  sendInvoice: async (invoiceId) => {
    const client = getAuthenticatedClient();
    return client.post(`Invoice/SendInvoice?invoiceId=${invoiceId}`).json();
  },

  cancelInvoice: async (invoiceId, data) => {
    const client = getAuthenticatedClient();
    return client.post(`Invoice/CancelInvoice?invoiceId=${invoiceId}`, { json: data || {} }).json();
  },

  getUserInvoiceCount: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetUserInvoiceCount?userId=${userId}`).json();
  },

  getInvoiceCountByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`Invoice/GetInvoiceCountByStatus?status=${status}`).json();
  },

  getTotalInvoiceAmount: async () => {
    const client = getAuthenticatedClient();
    return client.get("Invoice/GetTotalInvoiceAmount").json();
  },

  getTotalPaidInvoiceAmount: async () => {
    const client = getAuthenticatedClient();
    return client.get("Invoice/GetTotalPaidInvoiceAmount").json();
  },

  /**
   * GET api/Invoice/Download?orderId=... یا ?invoiceId=... — دانلود فاکتور به‌صورت فایل (Phase 19).
   * پاسخ موفق: فایل با Content-Disposition؛ خطا: JSON با message.
   * @param {{ orderId?: number, invoiceId?: number }} params — حداقل یکی الزامی
   * @returns {{ blob: Blob, filename: string }}
   */
  downloadInvoice: async (params = {}) => {
    const { orderId, invoiceId } = params;
    if (orderId == null && invoiceId == null) {
      throw new Error("Either orderId or invoiceId is required");
    }
    const qs = new URLSearchParams();
    if (orderId != null) qs.append("orderId", String(orderId));
    if (invoiceId != null) qs.append("invoiceId", String(invoiceId));
    const token = getToken();
    if (!token) throw new Error("Access token not found");
    const url = `${API_BASE_URL}/Invoice/Download?${qs.toString()}`;
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const contentType = res.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const errBody = await res.json();
        throw new Error(errBody.message || "دانلود فاکتور ناموفق بود");
      }
      throw new Error("دانلود فاکتور ناموفق بود");
    }
    const blob = await res.blob();
    const disposition = res.headers.get("Content-Disposition") || "";
    const match = disposition.match(/filename="?([^";\s]+)"?/);
    const filename = match ? match[1].trim() : "invoice.json";
    return { blob, filename };
  },
};
