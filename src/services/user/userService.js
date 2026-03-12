import { getAuthenticatedClient, API_BASE_URL } from "../api/client";
import { getToken } from "@/lib/token-manager";

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
    const active = Boolean(isActive);
    return client
      .post(`Users/ChangeUserStatus?id=${id}`, {
        json: { isActive: active, statusDto: { isActive: active } },
      })
      .json();
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

  /** آپلود تصویر پروفایل با fetch ساده و FormData (بدون ست کردن Content-Type) */
  uploadProfileImage: async (id, file) => {
    const token = getToken();
    if (!token) throw new Error("Access token not found");
    const formData = new FormData();
    formData.append("file", file);
    if (file?.name) formData.append("fileName", file.name);
    const base = (API_BASE_URL || "").replace(/\/$/, "");
    const res = await fetch(`${base}/Users/UploadProfileImage?id=${id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const err = new Error(data?.message || res.statusText || "خطا در آپلود تصویر");
      err.response = res;
      err.data = data;
      throw err;
    }
    return data;
  },

  deleteProfileImage: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Users/DeleteProfileImage?id=${id}`).json();
  },

  getUsersWithFilters: async (filters = {}) => {
    const client = getAuthenticatedClient();
    const params = {
      principal: filters.principal,
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

  /** GET api/Users/GetProfile — پروفایل کاربر جاری — Phase 18 */
  getProfile: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/GetProfile").json();
  },

  /** GET api/Users/GetVerificationStatus — وضعیت احراز هویت — Phase 18 */
  getVerificationStatus: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/GetVerificationStatus").json();
  },

  /** POST api/Users/ChangePassword — تغییر رمز عبور کاربر جاری؛ پس از موفقیت توکن‌های جدید در data برمی‌گردد (Phase 19) */
  changePassword: async (body) => {
    const client = getAuthenticatedClient();
    return client.post("Users/ChangePassword", { json: body }).json();
  },

  /** PUT api/Users/UpdateProfile — ویرایش اطلاعات اصلی پروفایل (Phase 20) */
  updateProfile: async (body) => {
    const client = getAuthenticatedClient();
    return client.put("Users/UpdateProfile", { json: body }).json();
  },

  /** PUT api/Users/UpdateFinancialInfo — ذخیره حساب بانکی ترجیحی (Phase 20) */
  updateFinancialInfo: async (body) => {
    const client = getAuthenticatedClient();
    return client.put("Users/UpdateFinancialInfo", { json: body }).json();
  },

  /** GET api/Users/NotificationSettings — دریافت تنظیمات نوتیفیکیشن (Phase 20) */
  getNotificationSettings: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/NotificationSettings").json();
  },

  /** PUT api/Users/NotificationSettings — به‌روزرسانی تنظیمات نوتیفیکیشن (Phase 20) */
  updateNotificationSettings: async (body) => {
    const client = getAuthenticatedClient();
    return client.put("Users/NotificationSettings", { json: body }).json();
  },

  /** GET api/Users/ConnectedDevices — لیست دستگاه‌های متصل (Phase 20) */
  getConnectedDevices: async () => {
    const client = getAuthenticatedClient();
    return client.get("Users/ConnectedDevices").json();
  },

  /** POST api/Users/LogoutDevice?deviceId= — خروج از یک دستگاه (Phase 20) */
  logoutDevice: async (deviceId) => {
    const client = getAuthenticatedClient();
    return client.post(`Users/LogoutDevice?deviceId=${encodeURIComponent(deviceId)}`).json();
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
