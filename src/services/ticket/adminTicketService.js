import { getAuthenticatedClient } from "../api/client";

export const adminTicketService = {
  // لیست ساده تیکت‌ها (در صورت نیاز به استفاده از GET قدیمی)
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetAll").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetById?id=${id}`).json();
  },

  // جستجوی پیشرفته مطابق داکیومنت (POST /api/AdminTicket/Search)
  searchTickets: async (filters = {}) => {
    const client = getAuthenticatedClient();
    return client.post("AdminTicket/Search", { json: filters }).json();
  },

  // نسخه قبلی صفحه‌بندی (در صورت نیاز برای سازگاری)
  /** GET api/AdminTicket/GetPaginated — فاز ۲۲ با query params. phoneNumber برای فیلتر بر اساس شماره موبایل. */
  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      priority,
      categoryId,
      userId,
      phoneNumber,
      assignedToUserId,
      searchTerm,
      startDate,
      endDate,
      sortBy,
      sortColumn,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status !== undefined && status !== null) searchParams.append("status", status.toString());
    if (priority !== undefined && priority !== null) searchParams.append("priority", priority.toString());
    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (userId) searchParams.append("userId", userId.toString());
    if (phoneNumber) searchParams.append("phoneNumber", String(phoneNumber));
    if (assignedToUserId) searchParams.append("assignedToUserId", assignedToUserId.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (sortColumn) searchParams.append("sortColumn", sortColumn);

    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetPaginated?${searchParams.toString()}`).json();
  },

  getByStatus: async (status) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetByStatus?status=${status}`).json();
  },

  getByPriority: async (priority) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetByPriority?priority=${priority}`).json();
  },

  getByCategory: async (categoryId) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetByCategory?categoryId=${categoryId}`).json();
  },

  /** GET api/AdminTicket/GetByAssignedUser?assignedToUserId= */
  getByAssignedUser: async (assignedToUserId) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetByAssignedUser?assignedToUserId=${assignedToUserId}`).json();
  },

  getUnassigned: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetUnassigned").json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`AdminTicket/Update?id=${id}`, { json: data }).json();
  },

  // تغییر وضعیت مطابق داکیومنت (POST /api/AdminTicket/{ticketId}/ChangeStatus)
  changeStatus: async (ticketId, status, notes) => {
    const client = getAuthenticatedClient();
    const searchParams = new URLSearchParams({ status: status.toString() });
    if (notes) searchParams.append("notes", notes);
    return client.post(`AdminTicket/${ticketId}/ChangeStatus?${searchParams.toString()}`).json();
  },

  // تغییر اولویت مطابق داکیومنت (POST /api/AdminTicket/{ticketId}/ChangePriority)
  changePriority: async (ticketId, priority) => {
    const client = getAuthenticatedClient();
    const searchParams = new URLSearchParams({ priority: priority.toString() });
    return client.post(`AdminTicket/${ticketId}/ChangePriority?${searchParams.toString()}`).json();
  },

  // اختصاص تیکت مطابق داکیومنت (POST /api/AdminTicket/{ticketId}/Assign)
  assignTicket: async (ticketId, assignedToUserId) => {
    const client = getAuthenticatedClient();
    return client.post(`AdminTicket/${ticketId}/Assign`, { json: { assignedToUserId } }).json();
  },

  // حذف اختصاص (در صورت وجود اندپوینت Unassign قدیمی، نگه می‌داریم)
  unassignTicket: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.post(`AdminTicket/UnassignTicket?id=${ticketId}`).json();
  },

  // نگه داشتن متدهای close/reopen برای سازگاری، هرچند داکیومنت از ChangeStatus استفاده می‌کند
  closeTicket: async (id, reason) => {
    const client = getAuthenticatedClient();
    const searchParams = new URLSearchParams({ id: id.toString() });
    if (reason) searchParams.append("reason", reason);
    return client.post(`AdminTicket/CloseTicket?${searchParams.toString()}`).json();
  },

  reopenTicket: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`AdminTicket/ReopenTicket?id=${id}`).json();
  },

  // افزودن پیام از طرف پشتیبان (POST /api/AdminTicket/{ticketId}/AddMessage)
  addMessage: async (ticketId, { message, isInternal = false, attachmentUrl }) => {
    const client = getAuthenticatedClient();
    const id = typeof ticketId === "string" ? ticketId.replace(/\/$/, "") : ticketId;
    const idNum = parseInt(id, 10);
    return client
      .post(`AdminTicket/${id}/AddMessage`, {
        json: {
          ticketId: Number.isNaN(idNum) ? id : idNum,
          message,
          isInternal,
          attachmentUrl,
        },
      })
      .json();
  },

  // افزودن پیام از طرف ادمین (برای سازگاری با کد موجود)
  addAdminMessage: async (ticketId, message, isInternal = false) => {
    const client = getAuthenticatedClient();
    const id = typeof ticketId === "string" ? ticketId.replace(/\/$/, "") : ticketId;
    const idNum = parseInt(id, 10);
    return client
      .post(`AdminTicket/${id}/AddMessage`, {
        json: {
          ticketId: Number.isNaN(idNum) ? id : idNum,
          message,
          isInternal,
        },
      })
      .json();
  },

  getMessages: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/${ticketId}/GetMessages`).json();
  },

  getTicketWithMessages: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetTicketWithMessages?ticketId=${ticketId}`).json();
  },

  delete: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`AdminTicket/Delete?id=${id}`).json();
  },

  getStatistics: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetStatistics").json();
  },

  getCountByStatus: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetCountByStatus").json();
  },

  getCountByPriority: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetCountByPriority").json();
  },

  getCountByCategory: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetCountByCategory").json();
  },

  uploadFile: async (ticketId, file) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ticketId", ticketId.toString());
    return client.post(`AdminTicket/UploadTicketFile?ticketId=${ticketId}`, { body: formData }).json();
  },

  deleteFile: async (fileId) => {
    const client = getAuthenticatedClient();
    return client.delete(`AdminTicket/DeleteFile?fileId=${fileId}`).json();
  },

  exportToExcel: async (params = {}) => {
    const { status, priority, categoryId, assignedToUserId, startDate, endDate } = params;

    const searchParams = new URLSearchParams();
    if (status !== undefined && status !== null) searchParams.append("status", status.toString());
    if (priority !== undefined && priority !== null) searchParams.append("priority", priority.toString());
    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (assignedToUserId) searchParams.append("assignedToUserId", assignedToUserId.toString());
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/ExportToExcel?${searchParams.toString()}`).blob();
  },
};
