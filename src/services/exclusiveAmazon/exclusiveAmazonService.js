import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

/**
 * سرویس سفارش‌های اختصاصی آمازون — api/ExclusiveOrder (یا مشابه)
 * در صورت نبود اندپوینت در بک‌اند، خالی برمی‌گردد.
 */
export const exclusiveAmazonService = {
  /** GET api/ExclusiveOrder/GetMyOrders?userId= */
  getMyOrders: async (userId) => {
    const client = getAuthenticatedClient();
    const qs = userId != null ? `?userId=${userId}` : "";
    const res = await client
      .extend({ retry: { limit: 0 } })
      .get(`ExclusiveOrder/GetMyOrders${qs}`)
      .json();
    return unwrapApiData(res);
  },
};
