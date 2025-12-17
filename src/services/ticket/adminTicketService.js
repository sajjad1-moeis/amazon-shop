import { getAuthenticatedClient } from "../api/client";

export const adminTicketService = {
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetAll").json();
  },

  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetById?id=${id}`).json();
  },

  getPaginated: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      status,
      priority,
      categoryId,
      assignedToUserId,
      searchTerm,
      startDate,
      endDate,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (status !== undefined && status !== null) searchParams.append("status", status.toString());
    if (priority !== undefined && priority !== null) searchParams.append("priority", priority.toString());
    if (categoryId) searchParams.append("categoryId", categoryId.toString());
    if (assignedToUserId) searchParams.append("assignedToUserId", assignedToUserId.toString());
    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

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

  getByAssignedUser: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetByAssignedUser?userId=${userId}`).json();
  },

  getUnassigned: async () => {
    const client = getAuthenticatedClient();
    return client.get("AdminTicket/GetUnassigned").json();
  },

  update: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`AdminTicket/Update?id=${id}`, { json: data }).json();
  },

  updateStatus: async (id, status) => {
    const client = getAuthenticatedClient();
    return client.put(`AdminTicket/UpdateStatus?id=${id}&status=${status}`).json();
  },

  updatePriority: async (id, priority) => {
    const client = getAuthenticatedClient();
    return client.put(`AdminTicket/UpdatePriority?id=${id}&priority=${priority}`).json();
  },

  assignTicket: async (id, userId) => {
    const client = getAuthenticatedClient();
    return client.post(`AdminTicket/AssignTicket?id=${id}&userId=${userId}`).json();
  },

  unassignTicket: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`AdminTicket/UnassignTicket?id=${id}`).json();
  },

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

  addAdminMessage: async (ticketId, message, isInternal = false) => {
    const client = getAuthenticatedClient();
    return client
      .post(`AdminTicket/AddAdminMessage?ticketId=${ticketId}&isInternal=${isInternal}`, {
        json: { message },
      })
      .json();
  },

  getMessages: async (ticketId) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetMessages?ticketId=${ticketId}`).json();
  },

  getTicketWithMessages: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`AdminTicket/GetTicketWithMessages?id=${id}`).json();
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
    return client.post(`AdminTicket/UploadFile?ticketId=${ticketId}`, { body: formData }).json();
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



