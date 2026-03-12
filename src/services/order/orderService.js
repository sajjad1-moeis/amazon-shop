import { getAuthenticatedClient } from "../api/client";
import { unwrapApiData } from "../api/client";

const qs = (params) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") search.append(k, String(v));
  });
  return search.toString();
};

// ─── Enums (طبق داک مرحله ۴) ───────────────────────────────────────────────

/** وضعیت سفارش (OrderStatus) */
export const OrderStatus = {
  Pending: 1,
  Paid: 2,
  Processing: 3,
  Shipped: 4,
  Delivered: 5,
  Cancelled: 6,
  Refunded: 7,
  Failed: 8,
};

/** روش پرداخت (PaymentMethod) */
export const PaymentMethod = {
  CashOnDelivery: 1,
  OnlinePayment: 2,
  Wallet: 3,
  Credit: 4,
  Installment: 5,
};

/** روش ارسال (ShippingMethod) */
export const ShippingMethod = {
  Standard: 1,
  Express: 2,
  Courier: 3,
  Custom: 4,
};

/** نوع طرح اقساط — فقط وقتی paymentMethod = Installment */
export const InstallmentPlanType = {
  Plan20Percent: 1,
  Plan30Percent: 2,
};

/** روش ارسال داخلی — ادمین (DomesticShippingMethod) */
export const DomesticShippingMethod = {
  Post: 1,
  Tipax: 2,
  BarBari: 3,
};

// ─── سرویس سفارش — API مرحله ۴ (api/Order) ────────────────────────────────

/**
 * همهٔ endpointها با توکن.
 * بخش کاربر: userId برابر کاربر جاری (مگر ادمین).
 * بخش ادمین: نیاز به نقش Admin.
 */
export const orderService = {
  // ─── کاربر ─────────────────────────────────────────────────────────────

  /** POST api/Order/CreateOrder — ایجاد سفارش از سبد. بعد از آن برای پرداخت آنلاین از paymentGatewayService.requestFromOrder استفاده کنید. */
  createOrder: async (body) => {
    const client = getAuthenticatedClient();
    const res = await client.post("Order/CreateOrder", { json: body }).json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetOrderById?orderId={id} */
  getOrderById: async (orderId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`Order/GetOrderById?${qs({ orderId })}`).json();
    return unwrapApiData(res);
  },

  /** همان GetOrderById اما بدون unwrap — برای نمایش ریسپانس خام */
  getOrderByIdRaw: async (orderId) => {
    const client = getAuthenticatedClient();
    return client.get(`Order/GetOrderById?${qs({ orderId })}`).json();
  },

  /** GET api/Order/GetOrderByOrderNumber?orderNumber={number} */
  getOrderByOrderNumber: async (orderNumber) => {
    const client = getAuthenticatedClient();
    const res = await client
      .get(`Order/GetOrderByOrderNumber?${qs({ orderNumber })}`)
      .json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetOrderByPhoneNumber?phoneNumber={phone} */
  getOrderByPhoneNumber: async (phoneNumber) => {
    const client = getAuthenticatedClient();
    const res = await client
      .get(`Order/GetOrderByPhoneNumber?${qs({ phoneNumber })}`)
      .json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetUserOrders?userId={id} — سفارش‌های من */
  getUserOrders: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`Order/GetUserOrders?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetUserOrdersByStatus?userId={id}&status={status} */
  getUserOrdersByStatus: async (userId, status) => {
    const client = getAuthenticatedClient();
    const res = await client
      .get(`Order/GetUserOrdersByStatus?${qs({ userId, status })}`)
      .json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetUserOrderCount?userId={id} */
  getUserOrderCount: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`Order/GetUserOrderCount?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetUserTotalSpent?userId={id} */
  getUserTotalSpent: async (userId) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`Order/GetUserTotalSpent?${qs({ userId })}`).json();
    return unwrapApiData(res);
  },

  /** POST api/Order/CancelOrder?orderId={id} — body: { cancellationReason, adminNotes? } */
  cancelOrder: async (orderId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`Order/CancelOrder?${qs({ orderId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  // ─── ادمین ─────────────────────────────────────────────────────────────

  /** GET api/Order/GetAllOrders */
  getAllOrders: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("Order/GetAllOrders").json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetOrdersByStatus?status={status} */
  getOrdersByStatus: async (status) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`Order/GetOrdersByStatus?${qs({ status })}`).json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetRecentOrders?count={n} — پیش‌فرض ۱۰ */
  getRecentOrders: async (count = 10) => {
    const client = getAuthenticatedClient();
    const res = await client.get(`Order/GetRecentOrders?${qs({ count })}`).json();
    return unwrapApiData(res);
  },

  /** POST api/Order/update-status/{orderId} — body: { status, adminNotes? } */
  updateStatus: async (orderId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`Order/update-status/${orderId}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/Order/update-payment/{orderId} — body: { paymentTransactionId, paymentGateway?, paidAmount, paidAt? } */
  updatePayment: async (orderId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`Order/update-payment/${orderId}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/Order/update-shipping/{orderId} — body: { trackingNumber, shippingCompany?, domesticShippingMethod?, shippedAt?, estimatedDeliveryDays? } */
  updateShipping: async (orderId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`Order/update-shipping/${orderId}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/Order/mark-delivered/{orderId} */
  markDelivered: async (orderId) => {
    const client = getAuthenticatedClient();
    const res = await client.post(`Order/mark-delivered/${orderId}`).json();
    return unwrapApiData(res);
  },

  /** PUT api/Order/{orderId}/eta-extension — body: { expectedDeliveryDate?, etaExtendedWithCustomerConsent, etaExtensionReason? } */
  updateEtaExtension: async (orderId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .put(`Order/${orderId}/eta-extension`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** POST api/Order/RefundOrder?orderId={id} — body: { refundAmount, refundReason, adminNotes? } */
  refundOrder: async (orderId, body) => {
    const client = getAuthenticatedClient();
    const res = await client
      .post(`Order/RefundOrder?${qs({ orderId })}`, { json: body })
      .json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetOrderCountByStatus?status={status} */
  getOrderCountByStatus: async (status) => {
    const client = getAuthenticatedClient();
    const res = await client
      .get(`Order/GetOrderCountByStatus?${qs({ status })}`)
      .json();
    return unwrapApiData(res);
  },

  /** GET api/Order/GetTotalRevenue */
  getTotalRevenue: async () => {
    const client = getAuthenticatedClient();
    const res = await client.get("Order/GetTotalRevenue").json();
    return unwrapApiData(res);
  },

  /**
   * سازگاری با صفحه ادمین: لیست با فیلتر وضعیت و جستجو بر اساس نام/شماره/موبایل.
   * برمی‌گرداند: { success: true, data: { orders: [], totalPages: number } }
   */
  getPaginated: async (params = {}) => {
    const { status, searchTerm, pageNumber = 1, pageSize = 20 } = params ?? {};
    const raw =
      status != null && status !== ""
        ? await orderService.getOrdersByStatus(Number(status))
        : await orderService.getAllOrders();
    const list = Array.isArray(raw) ? raw : raw?.data ?? [];
    let orders = Array.isArray(list) ? list : [];

    if (searchTerm && typeof searchTerm === "string" && searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      orders = orders.filter((order) => {
        const name =
          order.customerName ??
          order.userFullName ??
          order.userName ??
          order.recipientName ??
          "";
        const orderNum = order.orderNumber != null ? String(order.orderNumber) : "";
        const phone =
          order.userPhoneNumber ??
          order.phoneNumber ??
          order.recipientPhone ??
          order.mobile ??
          "";
        return (
          (name && name.toLowerCase().includes(term)) ||
          (orderNum && orderNum.toLowerCase().includes(term)) ||
          (phone && phone.replace(/\s/g, "").includes(term.replace(/\s/g, "")))
        );
      });
    }

    const total = orders.length;
    const start = (Math.max(1, pageNumber) - 1) * pageSize;
    const paged = orders.slice(start, start + pageSize);

    return {
      success: true,
      data: {
        orders: paged,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
      },
    };
  },
};
