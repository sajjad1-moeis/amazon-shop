"use client";

import React from "react";
import { ReceiptEdit } from "iconsax-reactjs";
import {
  DomesticShippingMethod,
  InstallmentPlanType,
  OrderStatus,
  PaymentMethod,
  ShippingMethod,
} from "@/services/order/orderService";

const ORDER_STATUS_LABELS = {
  [OrderStatus.Pending]: "در انتظار",
  [OrderStatus.Paid]: "پرداخت شده",
  [OrderStatus.Processing]: "در حال پردازش",
  [OrderStatus.Shipped]: "ارسال شده",
  [OrderStatus.Delivered]: "تحویل شده",
  [OrderStatus.Cancelled]: "لغو شده",
  [OrderStatus.Refunded]: "بازگشت داده شده",
  [OrderStatus.Failed]: "ناموفق",
};

const PAYMENT_METHOD_LABELS = {
  [PaymentMethod.CashOnDelivery]: "پرداخت در محل",
  [PaymentMethod.OnlinePayment]: "پرداخت آنلاین",
  [PaymentMethod.Wallet]: "کیف پول",
  [PaymentMethod.Credit]: "اعتبار",
  [PaymentMethod.Installment]: "اقساط",
};

const PAYMENT_STATUS_LABELS = {
  1: "پرداخت شده",
  2: "در انتظار پرداخت",
  3: "ناموفق",
};

const SHIPPING_METHOD_LABELS = {
  [ShippingMethod.Standard]: "استاندارد",
  [ShippingMethod.Express]: "اکسپرس",
  [ShippingMethod.Courier]: "پیک",
  [ShippingMethod.Custom]: "سفارشی",
};

const DOMESTIC_SHIPPING_METHOD_LABELS = {
  [DomesticShippingMethod.Post]: "پست",
  [DomesticShippingMethod.Tipax]: "تیپاکس",
  [DomesticShippingMethod.BarBari]: "باربری",
};

const INSTALLMENT_PLAN_LABELS = {
  [InstallmentPlanType.Plan20Percent]: "طرح ۲۰/۸۰",
  [InstallmentPlanType.Plan30Percent]: "طرح ۳۰/۷۰",
};

const EXTRA_FIELD_LABELS = {
  totalWeight: "وزن کل",
  shippingCost: "هزینه ارسال",
  domesticShippingCost: "هزینه ارسال داخلی",
  finalAmount: "مبلغ نهایی",
  subtotal: "جمع کالاها",
  subTotal: "جمع کالاها",
  grandTotal: "جمع کل",
  paidAmount: "مبلغ پرداخت شده",
  remainingAmount: "مانده پرداخت",
  secondPaymentAmount: "پرداخت دوم",
  discountAmount: "تخفیف",
  taxAmount: "مالیات",
  currency: "واحد پول",
  source: "منبع سفارش",
  sourceType: "نوع منبع",
  paymentReference: "شماره مرجع پرداخت",
  paymentReferenceNumber: "شماره مرجع پرداخت",
  transactionNumber: "شماره تراکنش",
  invoiceNumber: "شماره فاکتور",
  trackingCode: "کد رهگیری",
  trackingNumber: "شماره رهگیری",
  shippingCompany: "شرکت حمل",
  carrier: "حامل",
  estimatedDeliveryDays: "روز تخمینی تحویل",
  shippingAddressId: "شناسه آدرس",
  addressId: "شناسه آدرس",
  paidPercentage: "درصد پرداخت‌شده",
  remainingPercentage: "درصد مانده",
  isPaid: "پرداخت شده؟",
  isRefunded: "استرداد شده؟",
  etaExtendedWithCustomerConsent: "تمدید ETA با رضایت مشتری",
};

const EXCLUDED_EXTRA_KEYS = new Set([
  "customerName",
  "customerEmail",
  "customerPhone",
  "userFullName",
  "userName",
  "customerFullName",
  "fullName",
  "email",
  "userEmail",
  "phoneNumber",
  "phone",
  "mobile",
  "status",
  "paymentStatus",
  "paymentMethod",
  "shippingMethod",
  "domesticShippingMethod",
  "installmentPlanType",
  "createdAt",
  "updatedAt",
  "orderDate",
  "paidAt",
  "shippedAt",
  "deliveredAt",
  "cancelledAt",
  "refundedAt",
  "expectedDeliveryDate",
  "id",
  "orderNumber",
  "userId",
  "paymentTransactionId",
  "paymentGateway",
  "trackingNumber",
  "trackingCode",
  "shippingCompany",
  "carrier",
  "cancellationReason",
  "refundReason",
  "adminNotes",
  "etaExtensionReason",
  "itemsCount",
  "itemCount",
  "totalAmount",
  "products",
  "items",
  "orderItems",
  "documents",
  "orderDocuments",
  "trackingCodes",
  "tracking",
  "trackingNumbers",
  "deliveryAddress",
  "shippingAddress",
  "address",
  "paymentInfo",
  "payment",
  "user",
]);

const pickValue = (...values) => values.find((value) => value !== undefined && value !== null && value !== "");

const isPrimitiveValue = (value) =>
  ["string", "number", "boolean"].includes(typeof value) || value instanceof Date;

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatAmount = (value) =>
  value !== undefined && value !== null && value !== ""
    ? `${Number(value).toLocaleString("fa-IR")} تومان`
    : "-";

const formatValue = (value, { type } = {}) => {
  if (value === undefined || value === null || value === "") return "-";
  if (type === "date") return formatDate(value);
  if (type === "amount") return formatAmount(value);
  if (typeof value === "boolean") return value ? "بله" : "خیر";
  if (typeof value === "number") return Number(value).toLocaleString("fa-IR");
  return String(value);
};

const MetaItem = ({ label, value, mono = false }) => (
  <div className="rounded-lg border border-gray-600 bg-gray-700/40 p-3">
    <p className="text-xs text-gray-500 mb-1">{label}</p>
    <p className={`text-sm text-gray-200 break-words ${mono ? "font-mono" : ""}`}>{value}</p>
  </div>
);

export default function AdminOrderDetailMeta({ order = {}, rawResponse = null }) {
  const apiFields = [
    { label: "وضعیت پاسخ API", value: formatValue(rawResponse?.success) },
    { label: "کد وضعیت", value: formatValue(rawResponse?.statusCode) },
    { label: "پیام پاسخ", value: formatValue(rawResponse?.message) },
  ].filter((item) => item.value !== "-");

  const detailFields = [
    { label: "شناسه سفارش", value: formatValue(order?.id), mono: true },
    { label: "شماره سفارش", value: formatValue(order?.orderNumber), mono: true },
    { label: "شناسه کاربر", value: formatValue(pickValue(order?.userId, order?.user?.id)), mono: true },
    {
      label: "وضعیت سفارش",
      value: formatValue(ORDER_STATUS_LABELS[order?.status] ?? order?.status),
    },
    {
      label: "وضعیت پرداخت",
      value: formatValue(PAYMENT_STATUS_LABELS[order?.paymentStatus] ?? order?.paymentStatus),
    },
    {
      label: "روش پرداخت",
      value: formatValue(PAYMENT_METHOD_LABELS[order?.paymentMethod] ?? order?.paymentMethod),
    },
    {
      label: "روش ارسال",
      value: formatValue(SHIPPING_METHOD_LABELS[order?.shippingMethod] ?? order?.shippingMethod),
    },
    {
      label: "ارسال داخلی",
      value: formatValue(
        DOMESTIC_SHIPPING_METHOD_LABELS[order?.domesticShippingMethod] ?? order?.domesticShippingMethod
      ),
    },
    {
      label: "طرح اقساط",
      value: formatValue(INSTALLMENT_PLAN_LABELS[order?.installmentPlanType] ?? order?.installmentPlanType),
    },
    { label: "تاریخ ایجاد", value: formatValue(pickValue(order?.createdAt, order?.orderDate), { type: "date" }) },
    { label: "آخرین بروزرسانی", value: formatValue(order?.updatedAt, { type: "date" }) },
    { label: "تاریخ پرداخت", value: formatValue(order?.paidAt, { type: "date" }) },
    { label: "تاریخ ارسال", value: formatValue(order?.shippedAt, { type: "date" }) },
    { label: "تاریخ تحویل", value: formatValue(order?.deliveredAt, { type: "date" }) },
    { label: "تاریخ لغو", value: formatValue(order?.cancelledAt, { type: "date" }) },
    { label: "تاریخ استرداد", value: formatValue(order?.refundedAt, { type: "date" }) },
    { label: "تعداد آیتم", value: formatValue(pickValue(order?.itemsCount, order?.itemCount)) },
    { label: "مبلغ کل", value: formatValue(order?.totalAmount, { type: "amount" }) },
    { label: "شماره تراکنش", value: formatValue(order?.paymentTransactionId ?? order?.transactionNumber), mono: true },
    { label: "درگاه پرداخت", value: formatValue(order?.paymentGateway) },
    { label: "شماره رهگیری", value: formatValue(order?.trackingNumber ?? order?.trackingCode), mono: true },
    { label: "شرکت حمل", value: formatValue(order?.shippingCompany ?? order?.carrier) },
    { label: "تاریخ تحویل تخمینی", value: formatValue(order?.expectedDeliveryDate, { type: "date" }) },
    { label: "روز تخمینی تحویل", value: formatValue(order?.estimatedDeliveryDays) },
  ].filter((item) => item.value !== "-");

  const noteFields = [
    { label: "یادداشت ادمین", value: formatValue(order?.adminNotes) },
    { label: "دلیل لغو", value: formatValue(order?.cancellationReason) },
    { label: "دلیل استرداد", value: formatValue(order?.refundReason) },
    { label: "علت تمدید ETA", value: formatValue(order?.etaExtensionReason) },
  ].filter((item) => item.value !== "-");

  const extraFields = Object.entries(order || {})
    .filter(([key, value]) => !EXCLUDED_EXTRA_KEYS.has(key) && isPrimitiveValue(value))
    .map(([key, value]) => ({
      key,
      label: EXTRA_FIELD_LABELS[key] ?? key,
      value: formatValue(value, {
        type: /At$|Date$/i.test(key) ? "date" : /amount|price|cost|total|subtotal|discount|tax/i.test(key) ? "amount" : undefined,
      }),
      mono: /id|number|code|tracking|transaction/i.test(key),
    }))
    .filter((item) => item.value !== "-");

  if (apiFields.length === 0 && detailFields.length === 0 && noteFields.length === 0 && extraFields.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <ReceiptEdit size={20} />
        جزئیات تکمیلی سفارش
      </h2>

      {apiFields.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-3">متادیتای پاسخ API</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {apiFields.map((item) => (
              <MetaItem key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      )}

      {detailFields.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-3">فیلدهای اصلی سفارش</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {detailFields.map((item) => (
              <MetaItem key={item.label} label={item.label} value={item.value} mono={item.mono} />
            ))}
          </div>
        </div>
      )}

      {noteFields.length > 0 && (
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-3">یادداشت‌ها و دلایل</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {noteFields.map((item) => (
              <MetaItem key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </div>
      )}

      {extraFields.length > 0 && (
        <div>
          <p className="text-xs text-gray-500 mb-3">سایر فیلدهای موجود در ریسپانس</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
            {extraFields.map((item) => (
              <MetaItem key={item.key} label={item.label} value={item.value} mono={item.mono} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
