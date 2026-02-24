import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 13 - api/admin/AdminQualityShield
 * همهٔ endpointها پاسخ استاندارد { statusCode, success, message, data } برمی‌گردانند.
 * در فراخواننده از unwrapApiData استفاده کنید.
 */
export const adminQualityShieldService = {
  /**
   * GET api/admin/AdminQualityShield
   * Query: orderId?, userId?, status?
   * لیست سرویس‌های سپر کیفیت.
   */
  getList: async (params = {}) => {
    const { orderId, userId, status } = params;
    const searchParams = new URLSearchParams();
    if (orderId != null) searchParams.append("orderId", String(orderId));
    if (userId != null) searchParams.append("userId", String(userId));
    if (status != null) searchParams.append("status", String(status));
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/AdminQualityShield${qs ? `?${qs}` : ""}`).json();
  },

  /**
   * POST api/admin/AdminQualityShield/{serviceId}/start-inspection
   * Body: { inspectorName }
   */
  startInspection: async (serviceId, body) => {
    const client = getAuthenticatedClient();
    return client
      .post(`admin/AdminQualityShield/${serviceId}/start-inspection`, {
        json: body,
      })
      .json();
  },

  /**
   * POST api/admin/AdminQualityShield/{serviceId}/complete-inspection
   * Body: { result, inspectionNotes?, photoPath?, videoPath? }
   * result: 1 Pass, 2 Fail, 3 Conditional
   */
  completeInspection: async (serviceId, body) => {
    const client = getAuthenticatedClient();
    return client
      .post(`admin/AdminQualityShield/${serviceId}/complete-inspection`, {
        json: body,
      })
      .json();
  },

  /**
   * POST api/admin/AdminQualityShield/{serviceId}/upload
   * Body: form photoPath?, videoPath? (مسیرهای برگشتی از endpoint آپلود فایل)
   * @param {{ photoPath?: string, videoPath?: string }} payload
   */
  upload: async (serviceId, payload) => {
    const body = new URLSearchParams();
    if (payload?.photoPath) body.append("photoPath", payload.photoPath);
    if (payload?.videoPath) body.append("videoPath", payload.videoPath);
    const client = getAuthenticatedClient();
    return client
      .post(`admin/AdminQualityShield/${serviceId}/upload`, {
        body,
      })
      .json();
  },
};
