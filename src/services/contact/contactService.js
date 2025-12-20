import { getPublicClient, getAuthenticatedClient } from "../api/client";

export const contactService = {
  /**
   * دریافت تمام درخواست‌ها
   * GET /api/ContactUs/GetAll
   */
  getAll: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetAll").json();
  },

  /**
   * دریافت درخواست‌ها با صفحه‌بندی
   * GET /api/ContactUs/GetPaginated
   * @param {Object} params - { pageNumber, pageSize, isRead }
   */
  getPaginated: async (params = {}) => {
    const { pageNumber = 1, pageSize = 20, isRead } = params;
    const searchParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
    });

    if (isRead !== null && isRead !== undefined) {
      searchParams.append("isRead", isRead.toString());
    }

    const client = getAuthenticatedClient();
    return client.get(`ContactUs/GetPaginated?${searchParams.toString()}`).json();
  },

  /**
   * دریافت درخواست با شناسه
   * GET /api/ContactUs/GetById?id={id}
   */
  getById: async (id) => {
    const client = getAuthenticatedClient();
    return client.get(`ContactUs/GetById?id=${id}`).json();
  },

  /**
   * ثبت درخواست جدید
   * POST /api/ContactUs/Create
   * @param {Object} data - { fullName, email, message }
   */
  create: async (data) => {
    const client = getPublicClient();
    return client.post("ContactUs/Create", { json: data }).json();
  },

  /**
   * دریافت درخواست‌های خوانده نشده
   * GET /api/ContactUs/GetUnread
   */
  getUnread: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetUnread").json();
  },

  /**
   * دریافت درخواست‌های خوانده شده
   * GET /api/ContactUs/GetRead
   */
  getRead: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetRead").json();
  },

  /**
   * دریافت تعداد درخواست‌های خوانده نشده
   * GET /api/ContactUs/GetUnreadCount
   */
  getUnreadCount: async () => {
    const client = getAuthenticatedClient();
    return client.get("ContactUs/GetUnreadCount").json();
  },

  /**
   * علامت‌گذاری درخواست به عنوان خوانده شده
   * PUT /api/ContactUs/MarkAsRead?id={id}
   */
  markAsRead: async (id) => {
    const client = getAuthenticatedClient();
    return client.put(`ContactUs/MarkAsRead?id=${id}`).json();
  },
};

