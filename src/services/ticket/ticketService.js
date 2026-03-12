import { getAuthenticatedClient, API_BASE_URL } from "../api/client";
import { getToken } from "@/lib/token-manager";

/** وضعیت تیکت — مطابق داک مرحله ۸ */
export const TicketStatus = {
  Open: 1,
  InProgress: 2,
  WaitingForUser: 3,
  Resolved: 4,
  Closed: 5,
};

/** اولویت تیکت */
export const TicketPriority = {
  Low: 1,
  Normal: 2,
  High: 3,
  Urgent: 4,
};

export const ticketService = {
  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Ticket/Create", { json: data }).json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetById?id=${id}`).json();
  },

  getByTicketNumber: async (ticketNumber) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetByTicketNumber?ticketNumber=${encodeURIComponent(ticketNumber)}`).json();
  },

  getByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetByUserId?userId=${userId}`).json();
  },

  /** GET api/Ticket/GetMyTickets */
  getMyTickets: async () => {
    const client = getAuthenticatedClient();
    return client.get("Ticket/GetMyTickets").json();
  },

  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, status, priority, searchTerm, sortBy, sortColumn } = params;
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });
    if (status !== undefined && status !== null) searchParams.append("status", status.toString());
    if (priority !== undefined && priority !== null) searchParams.append("priority", priority.toString());
    if (searchTerm != null && String(searchTerm).trim()) searchParams.append("searchTerm", String(searchTerm).trim());
    if (sortBy != null && String(sortBy)) searchParams.append("sortBy", String(sortBy));
    if (sortColumn != null && String(sortColumn)) searchParams.append("sortColumn", String(sortColumn));
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetPaginated?${searchParams.toString()}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetByStatus?status=${status}`).json();
  },

  /** POST api/Ticket/Update?id= — بدنه: UpdateTicketDto */
  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/Update?id=${id}`, { json: data }).json();
  },

  /** بستن تیکت (وضعیت = بسته شده) */
  closeTicket: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/Update?id=${id}`, { json: { status: TicketStatus.Closed } }).json();
  },

  /** POST api/Ticket/AddMessage — بدنه: CreateTicketMessageDto */
  addMessage: async (body) => {
    const client = getAuthenticatedClient();
    return client.post("Ticket/AddMessage", { json: body }).json();
  },

  getMessages: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetMessages?ticketId=${ticketId}`).json();
  },

  getTicketWithMessages: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetTicketWithMessages?ticketId=${ticketId}`).json();
  },

  /** POST api/Ticket/delete/{id} */
  softDelete: async (id, reason) => {
    const client = getAuthenticatedClient();
    const qs = reason ? `?reason=${encodeURIComponent(reason)}` : "";
    return client.post(`Ticket/delete/${id}${qs}`).json();
  },

  /** POST api/Ticket/hard-delete/{id} */
  hardDelete: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/hard-delete/${id}`).json();
  },

  /** POST api/Ticket/Restore?id= */
  restore: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/Restore?id=${id}`).json();
  },

  /** POST api/Ticket/{ticketId}/Rate — بدنه: { rating, comment? } */
  rate: async (ticketId, body) => {
    const client = getAuthenticatedClient();
    return client.post(`Ticket/${ticketId}/Rate`, { json: body }).json();
  },

  /** POST api/Ticket/UploadTicketFile?ticketId= — آپلود با fetch ساده (multipart/form-data) */
  uploadTicketFile: async (ticketId, file) => {
    const base = (API_BASE_URL || "").replace(/\/$/, "");
    const url = `${base}/Ticket/UploadTicketFile?ticketId=${encodeURIComponent(ticketId)}`;
    const token = getToken();
    if (!token) throw new Error("Access token not found");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.message || res.statusText || "خطا در آپلود فایل");
      err.response = res;
      err.data = data;
      throw err;
    }
    return data;
  },

  /** POST api/Ticket/UploadTicketFiles?ticketId= — form: files */
  uploadTicketFiles: async (ticketId, files) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    const list = Array.isArray(files) ? files : [files];
    list.forEach((f) => formData.append("files", f));
    return client
      .extend({ retry: { limit: 0 } })
      .post(`Ticket/UploadTicketFiles?ticketId=${ticketId}`, { body: formData })
      .json();
  },

  getTicketCountByUserId: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetTicketCountByUserId?userId=${userId}`).json();
  },

  deleteOldTicketFiles: async () => {
    const client = getAuthenticatedClient();
    return client.delete("Ticket/DeleteOldTicketFiles").json();
  },

  getTicketCountByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`Ticket/GetTicketCountByStatus?status=${status}`).json();
  },
};
