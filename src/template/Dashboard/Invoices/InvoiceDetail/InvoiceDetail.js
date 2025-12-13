"use client";

import React from "react";
import InvoiceDetailHeader from "./InvoiceDetailHeader";
import TrackingCodesCard from "./TrackingCodesCard";
import RecipientInfoCard from "./RecipientInfoCard";
import OrderTimelineCard from "./OrderTimelineCard";
import ProductsTable from "./ProductsTable";
import { toast } from "sonner";
import { DocumentText, Wallet, ShoppingCart, Buildings2, Truck, Box, TickCircle } from "iconsax-reactjs";

// Sample data - این باید از API یا props بیاید
const invoiceDetailData = {
  invoiceNumber: "۸۷۴۳-۲۰۲۴۰۲۰۳-IN۷",
  status: "paid",
  statusText: "پرداخت شده",
  totalAmount: 12350000,
  orderId: "MCL-P-۲۰۲۴۰۲۰۳-۸۷۴۳",
  issueDate: "۱۴۰۳/۱۰/۱۸",
  orderType: "نماینده (Partner)",
  trackingCodes: [
    {
      label: "Amazon Tracking",
      code: "TBA-۳۴۷۶۹۱۲۳",
      url: "https://amazon.com/tracking/TBA-34769123",
    },
    {
      label: "UAE-IR Tracking",
      code: "ML-DXB-۸۷۳۲۱",
      url: "https://tracking.com/ML-DXB-87321",
    },
    {
      label: "داخل ایران Tracking",
      code: "۵۲۲۹۹۳۷۲۸۳۴۵ پست پیشتاز",
      url: "https://post.ir/tracking/522993728345",
    },
  ],
  recipient: {
    name: "محمد صالحی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    address: "تهران، پاسداران، خیابان گلستان ششم......",
    deliveryType: "پست پیشتاز",
  },
  timeline: {
    currentStepIndex: 2,
    steps: [
      { id: "order", label: "ثبت سفارش", Icon: DocumentText, date: "۱۴۰۳/۰۱/۰۵" },
      { id: "payment", label: "پرداخت موفق", Icon: Wallet, date: "۱۴۰۳/۰۱/۱۲" },
      { id: "purchase", label: "خرید از فروشنده", Icon: ShoppingCart },
      { id: "dubai", label: "رسید به انبار دبی", Icon: Buildings2 },
      { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
      { id: "clearance", label: "ترخیص", Icon: Box },
      { id: "delivery", label: "تحویل مشتری", Icon: TickCircle },
    ],
  },
  products: [
    {
      id: "p1",
      name: "محصول نمونه Microless",
      quantity: 1,
      representativePrice: 12300000,
      subtotal: 12300000,
    },
    {
      id: "p2",
      name: "محصول دوم نمونه",
      quantity: 2,
      representativePrice: 12300000,
      subtotal: 12300000,
    },
  ],
};

export default function InvoiceDetail({ invoiceId }) {
  const invoice = invoiceDetailData; // در واقعیت باید از API یا props بیاید

  const handleDownload = () => {
    toast.success("فاکتور PDF با موفقیت دانلود شد");
  };

  return (
    <div dir="rtl">
      {/* Invoice Header */}
      <InvoiceDetailHeader invoice={{ ...invoice, onDownload: handleDownload }} />

      {/* Tracking Codes and Recipient Info - کنار هم */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <TrackingCodesCard trackingCodes={invoice.trackingCodes} />
        <RecipientInfoCard recipient={invoice.recipient} />
      </div>

      {/* Order Timeline */}
      <OrderTimelineCard timeline={invoice.timeline} />

      {/* Products Table */}
      <ProductsTable products={invoice.products} />
    </div>
  );
}

