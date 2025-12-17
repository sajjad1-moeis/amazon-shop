import { getAuthenticatedClient } from "../api/client";

const buildQueryString = (params) => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      searchParams.append(key, value.toString());
    }
  });
  return searchParams.toString();
};

export const userService = {
  getAllUsers: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/GetAllUsers").json();
  },

  getUserById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Users/GetUserById?id=${id}`).json();
  },

  getUserByEmail: async (email) => {
    const client = getAuthenticatedClient();
    return client.get(`Users/GetUserByEmail?email=${encodeURIComponent(email)}`).json();
  },

  getUserByPhone: async (phone) => {
    const client = getAuthenticatedClient();
    return client.get(`Users/GetUserByPhone?phone=${encodeURIComponent(phone)}`).json();
  },

  createUser: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Users/CreateUser", { json: data }).json();
  },

  updateUser: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Users/UpdateUser", { json: data }).json();
  },

  deleteUser: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Users/DeleteUser?id=${id}`).json();
  },

  getActiveUsers: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/GetActiveUsers").json();
  },

  getUsersByRole: async (role) => {
    const client = getAuthenticatedClient();
    return client.get(`Users/GetUsersByRole?role=${encodeURIComponent(role)}`).json();
  },

  updateLastLogin: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/UpdateLastLogin?id=${id}`).json();
  },

  changeUserStatus: async (id, isActive) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/ChangeUserStatus?id=${id}&isActive=${isActive}`).json();
  },

  getUsersCount: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/GetUsersCount").json();
  },

  checkUserExists: async (email, phone) => {
    const client = getAuthenticatedClient();
    const params = buildQueryString({ email, phone });
    return client.get(`Users/CheckUserExists?${params}`).json();
  },

  banUser: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/BanUser?id=${id}`).json();
  },

  unbanUser: async (id) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/UnbanUser?id=${id}`).json();
  },

  uploadProfileImage: async (id, file) => {
    const client = getAuthenticatedClient();
    const formData = new FormData();
    formData.append("file", file);
    return client.post(`Users/UploadProfileImage?id=${id}`, { body: formData }).json();
  },

  deleteProfileImage: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Users/DeleteProfileImage?id=${id}`).json();
  },

  getUsersWithFilters: async (filters = {}) => {
    const client = getAuthenticatedClient();
    const params = {
      pageNumber: filters.pageNumber,
      pageSize: filters.pageSize,
      searchTerm: filters.searchTerm,
      roleName: filters.roleName,
      isActive: filters.isActive !== undefined && filters.isActive !== null ? filters.isActive : undefined,
      isBanned: filters.isBanned !== undefined && filters.isBanned !== null ? filters.isBanned : undefined,
      createdFrom: filters.createdFrom,
      createdTo: filters.createdTo,
      sortBy: filters.sortBy,
      sortDescending:
        filters.sortDescending !== undefined && filters.sortDescending !== null ? filters.sortDescending : undefined,
    };
    const queryString = buildQueryString(params);
    const url = queryString ? `Users/GetUsersWithFilters?${queryString}` : "Users/GetUsersWithFilters";
    return client.get(url).json();
  },

  getUserDetailForAdmin: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Users/GetUserDetailForAdmin?id=${id}`).json();
  },

  adminUpdateUser: async (id, userData) => {
    const client = getAuthenticatedClient();
    return client.put(`Users/AdminUpdateUser?id=${id}`, { json: userData }).json();
  },

  adminChangePassword: async (id, passwordData) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/AdminChangePassword?id=${id}`, { json: passwordData }).json();
  },

  chargeUserWallet: async (id, walletData) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/ChargeUserWallet?id=${id}`, { json: walletData }).json();
  },

  deductUserWallet: async (id, walletData) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/DeductUserWallet?id=${id}`, { json: walletData }).json();
  },
};

export default userService;
