import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 9: api/Notification — GetNotifications(userId, pageNumber, pageSize, onlyUnread),
 * GetNotification(notificationId, userId), MarkAsRead, MarkAllAsRead(userId),
 * POST delete/{id}?userId=, GetUnreadCount(userId), GetNotificationsByType(userId, type).
 */
export const notificationService = {
  /** GET api/Notification/GetNotifications — Query: userId, pageNumber, pageSize, onlyUnread */
  getNotifications: async (params = {}) => {
    const { userId, pageNumber = 1, pageSize = 20, onlyUnread = false } = params;
    const searchParams = new URLSearchParams({
      userId: String(userId),
      pageNumber: String(pageNumber),
      pageSize: String(pageSize),
      onlyUnread: String(onlyUnread),
    });
    const client = getAuthenticatedClient();
    return client.get(`Notification/GetNotifications?${searchParams.toString()}`).json();
  },

  /** برای سازگاری با کد قبلی؛ همان getNotifications با نام قدیمی */
  getPaginated: async (params = {}) => {
    const { userId, pageNumber = 1, pageSize = 20, onlyUnread } = params;
    return notificationService.getNotifications({
      userId,
      pageNumber,
      pageSize,
      onlyUnread,
    });
  },

  /** GET api/Notification/GetNotification — Query: notificationId, userId */
  getNotification: async (notificationId, userId) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ notificationId: String(notificationId), userId: String(userId) });
    return client.get(`Notification/GetNotification?${qs.toString()}`).json();
  },

  getById: async (id, userId) => {
    return notificationService.getNotification(id, userId);
  },

  /** POST api/Notification/MarkAsRead — Query: notificationId, userId */
  markAsRead: async (notificationId, userId) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ notificationId: String(notificationId), userId: String(userId) });
    return client.post(`Notification/MarkAsRead?${qs.toString()}`).json();
  },

  /** POST api/Notification/MarkAllAsRead — Query: userId؛ بدنه اختیاری: { notificationIds } */
  markAllAsRead: async (userId, body) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId) });
    return client.post(`Notification/MarkAllAsRead?${qs.toString()}`, { json: body || {} }).json();
  },

  /** POST api/Notification/CreateNotification — Phase 23: body می‌تواند userId (تک کاربر) یا userIds (آرایه) داشته باشد؛ حداقل title و message الزامی. */
  create: async (data) => {
    const client = getAuthenticatedClient();
    return client.post("Notification/CreateNotification", { json: data }).json();
  },

  /** POST api/Notification/delete/{id} — Query: userId */
  delete: async (id, userId) => {
    const client = getAuthenticatedClient();
    return client.post(`Notification/delete/${id}?userId=${encodeURIComponent(userId)}`).json();
  },

  /** GET api/Notification/GetUnreadCount — Query: userId */
  getUnreadCount: async (userId) => {
    const client = getAuthenticatedClient();
    return client.get(`Notification/GetUnreadCount?userId=${encodeURIComponent(userId)}`).json();
  },

  /** GET api/Notification/GetNotificationsByType — Query: userId, type */
  getNotificationsByType: async (userId, type) => {
    const client = getAuthenticatedClient();
    const qs = new URLSearchParams({ userId: String(userId), type: String(type) });
    return client.get(`Notification/GetNotificationsByType?${qs.toString()}`).json();
  },

  /** POST api/Notification/DeleteAll — حذف همه اعلان‌ها — Phase 18 */
  deleteAll: async () => {
    const client = getAuthenticatedClient();
    return client.post("Notification/DeleteAll").json();
  },
};
