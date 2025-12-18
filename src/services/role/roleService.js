import { getAuthenticatedClient } from "../api/client";

export const roleService = {
  // دریافت لیست نقش‌ها با فیلتر و صفحه‌بندی
  getRolesWithFilters: async (params = {}) => {
    const {
      pageNumber = 1,
      pageSize = 20,
      searchTerm,
      isActive,
      createdFrom,
      createdTo,
      sortBy = "createdAt",
      sortDescending = true,
    } = params;

    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (searchTerm) searchParams.append("searchTerm", searchTerm);
    if (isActive !== undefined && isActive !== null) searchParams.append("isActive", isActive.toString());
    if (createdFrom) searchParams.append("createdFrom", createdFrom);
    if (createdTo) searchParams.append("createdTo", createdTo);
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (sortDescending !== undefined) searchParams.append("sortDescending", sortDescending.toString());

    const client = getAuthenticatedClient();
    return client.get(`Role/GetRolesWithFilters?${searchParams.toString()}`).json();
  },

  // دریافت جزئیات کامل نقش
  getRoleDetailForAdmin: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/GetRoleDetailForAdmin?id=${id}`).json();
  },

  // دریافت تمام نقش‌ها
  getAllRoles: async () => {
    const client = getAuthenticatedClient();
    return client.get("Role/GetAllRoles").json();
  },

  // دریافت نقش‌های فعال
  getActiveRoles: async () => {
    const client = getAuthenticatedClient();
    return client.get("Role/GetActiveRoles").json();
  },

  // دریافت نقش با شناسه
  getRoleById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/GetRoleById?id=${id}`).json();
  },

  // دریافت نقش با نام
  getRoleByName: async (name) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/GetRoleByName?name=${encodeURIComponent(name)}`).json();
  },

  // ایجاد نقش جدید
  createRole: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Role/CreateRole", { json: data }).json();
  },

  // به‌روزرسانی نقش
  updateRole: async (id, data) => {
    const client = getAuthenticatedClient();
    return client.put(`Role/UpdateRole?id=${id}`, { json: data }).json();
  },

  // حذف نقش
  deleteRole: async (id) => {
    const client = getAuthenticatedClient();
    return client.delete(`Role/DeleteRole?id=${id}`).json();
  },

  // دریافت نقش‌های یک کاربر
  getUserRoles: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/GetUserRoles?userId=${userId}`).json();
  },

  // اختصاص نقش به کاربر
  assignRoleToUser: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Role/AssignRoleToUser", { json: data }).json();
  },

  // حذف نقش از کاربر
  removeRoleFromUser: async (userId, roleName) => {
    const client = getAuthenticatedClient();
    return client.delete(`Role/RemoveRoleFromUser?userId=${userId}&roleName=${encodeURIComponent(roleName)}`).json();
  },

  // تغییر نقش کاربر
  changeUserRole: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Role/ChangeUserRole", { json: data }).json();
  },

  // دریافت کاربران با یک نقش خاص
  getUsersByRole: async (roleName) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/GetUsersByRole?roleName=${encodeURIComponent(roleName)}`).json();
  },

  // بررسی اینکه آیا کاربر نقش خاصی دارد یا خیر
  userHasRole: async (userId, roleName) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/UserHasRole?userId=${userId}&roleName=${encodeURIComponent(roleName)}`).json();
  },

  // بررسی وجود نقش
  roleExists: async (name) => {
    const client = getAuthenticatedClient();
    return client.get(`Role/RoleExists?name=${encodeURIComponent(name)}`).json();
  },

  // دریافت نقش‌های انگلیسی سایت
  getEnglishSiteRoles: async () => {
    const client = getAuthenticatedClient();
    return client.get("Role/GetEnglishSiteRoles").json();
  },
};

