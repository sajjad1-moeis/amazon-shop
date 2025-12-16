import { getAuthenticatedClient } from "../api/client";

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
    const searchParams = new URLSearchParams();
    if (email) searchParams.append("email", email);
    if (phone) searchParams.append("phone", phone);
    return client.get(`Users/CheckUserExists?${searchParams.toString()}`).json();
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
};
