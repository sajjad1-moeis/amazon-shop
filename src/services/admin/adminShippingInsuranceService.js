import { getAuthenticatedClient } from "../api/client";

/**
 * Phase 13 - api/admin/AdminShippingInsurance
 * همهٔ endpointها پاسخ استاندارد { statusCode, success, message, data } برمی‌گردانند.
 * در فراخواننده از unwrapApiData استفاده کنید.
 */
export const adminShippingInsuranceService = {
  /**
   * GET api/admin/AdminShippingInsurance
   * Query: orderId?, userId?, status?
   * لیست بیمه‌های ارسال با فیلتر اختیاری.
   */
  getList: async (params = {}) => {
    const { orderId, userId, status } = params;
    const searchParams = new URLSearchParams();
    if (orderId != null) searchParams.append("orderId", String(orderId));
    if (userId != null) searchParams.append("userId", String(userId));
    if (status != null) searchParams.append("status", String(status));
    const qs = searchParams.toString();
    const client = getAuthenticatedClient();
    return client.get(`admin/AdminShippingInsurance${qs ? `?${qs}` : ""}`).json();
  },

  /**
   * PUT api/admin/AdminShippingInsurance/claims/{claimId}/process
   * Query: adminUserId (الزامی)
   * Body: ProcessClaimDto { status, approvedAmount?, adminNote?, rejectionReason? }
   */
  processClaim: async (claimId, adminUserId, body) => {
    const client = getAuthenticatedClient();
    const qs = `adminUserId=${encodeURIComponent(adminUserId)}`;
    return client
      .put(`admin/AdminShippingInsurance/claims/${claimId}/process?${qs}`, {
        json: body,
      })
      .json();
  },
};
