import { getAuthenticatedClient } from "../api/client";

export const securityService = {
  getLogs: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      level,
      startDate,
      endDate,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (level) searchParams.append("level", level);
    if (startDate) searchParams.append("startDate", startDate);
    if (endDate) searchParams.append("endDate", endDate);

    const client = getAuthenticatedClient();
    return client.get(`Security/GetLogs?${searchParams.toString()}`).json();
  },

  getPermissions: async () => {
    const client = getAuthenticatedClient();
    return client.get("Security/GetPermissions").json();
  },

  updatePermission: async (userId, permissions) => {
    const client = getAuthenticatedClient();
    return client.post("Security/UpdatePermission", { json: { userId, permissions } }).json();
  },

  getAdmins: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      searchTerm,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (searchTerm) searchParams.append("searchTerm", searchTerm);

    const client = getAuthenticatedClient();
    return client.get(`Security/GetAdmins?${searchParams.toString()}`).json();
  },

  createAdmin: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Security/CreateAdmin", { json: data }).json();
  },

  updateAdmin: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Security/UpdateAdmin?id=${id}`, { json: data }).json();
  },

  deleteAdmin: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Security/DeleteAdmin?id=${id}`).json();
  },
};





