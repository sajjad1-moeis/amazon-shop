"use client";

import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import InvoiceDetailHeader from "@/template/Dashboard/Invoices/InvoiceDetail/InvoiceDetailHeader";
import InvoiceHeaderCard from "@/template/Dashboard/Invoices/InvoiceDetail/InvoiceHeaderCard";
import OrderTimelineSection from "@/template/Dashboard/Invoices/InvoiceDetail/OrderTimelineSection";
import RecipientInfoCard from "@/template/Dashboard/Invoices/InvoiceDetail/RecipientInfoCard";
import ProductsTable from "@/template/Dashboard/Invoices/InvoiceDetail/ProductsTable";
import PaymentInfoCard from "@/template/Dashboard/Invoices/InvoiceDetail/PaymentInfoCard";
import TrackingCodesCard from "@/template/Dashboard/Invoices/InvoiceDetail/TrackingCodesCard";
import { TickCircle, CardTick1, Shop } from "iconsax-reactjs";
import { toast } from "sonner";

// داده نمونه برای فاکتور - در واقع باید از API بیاید
const mockInvoiceData = {
  id: "INV-۱۲۳۴۴",
  invoiceNumber: "۸۷۴۳-۲۰۲۴۰۲۰۳-IN۷",
  issueDate: "۱۴۰۳/۱۰/۱۸",
  orderType: "نماینده (Partner)",
  orderId: "MCL-P-۲۰۲۴۰۲۰۳-۸۷۴۳",
  totalAmount: 12350000,
  status: "paid",
  timelineSteps: [
    { id: "order", label: "ثبت سفارش", Icon: TickCircle, date: "۱۴۰۳/۰۷/۰۵", completed: true },
    { id: "payment", label: "پرداخت موفق", Icon: CardTick1, date: "۱۴۰۳/۰۱/۱۲", completed: true },
    { id: "purchase", label: "خرید از فروشنده", Icon: Shop, completed: false },
  ],
  recipient: {
    name: "محمد صالحی",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    nationalId: "۶۶۰۰۱۲۲۳۴۵",
    deliveryType: "پست پیشتاز",
    address: "تهران، پاسداران، خیابان گلستان ششم، پلاک ۲۸، واحد ۳",
  },
  products: [
    {
      id: "p1",
      name: "محصول نمونه Microless",
      quantity: 1,
      representativePrice: 12300000,
      subtotal: 12300000,
      weight: 12.5,
    },
    {
      id: "p2",
      name: "محصول دوم نمونه",
      quantity: 2,
      representativePrice: 12300000,
      subtotal: 12300000,
      weight: 12.5,
    },
  ],
  paymentInfo: {
    totalAmount: 12450000,
    paidAmount: 12450000,
    remainingAmount: 0,
    paymentDate: "۱۴۰۳/۰۶/۰۳",
    transactionNumber: "۳۴۷۸۹۹۱۲۳",
    paymentMethod: "درگاه زرین پال",
  },
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
      code: "۵۲۲۹۹۳۷۲۸۳۴۵",
      url: "https://post.ir/tracking/522993728345",
    },
  ],
};

export default function InvoiceDetailPage({ params }) {
  const invoiceId = params.invoiceId;

  const handleDownload = () => {
    toast.success("فاکتور با موفقیت دانلود شد");
  };

  // در واقعیت باید از API داده بگیریم بر اساس invoiceId
  const invoice = mockInvoiceData;

  return (
    <DashboardLayout>
      <div dir="rtl">
        {/* Header with Download and Status */}
        <InvoiceDetailHeader invoice={invoice} onDownload={handleDownload} />

        {/* Invoice Header Card */}
        <InvoiceHeaderCard invoice={invoice} />

        {/* Order Timeline and Recipient Info - کنار هم */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Order Timeline - Takes 2 columns */}
          <div className="lg:col-span-2">
            <OrderTimelineSection timelineSteps={invoice.timelineSteps} currentStepIndex={2} />
          </div>

          {/* Recipient Info - Takes 1 column */}
          <div className="lg:col-span-1">
            <RecipientInfoCard recipient={invoice.recipient} />
          </div>
        </div>

        {/* Products Table */}
        <ProductsTable products={invoice.products} />

        {/* Payment Info and Tracking Codes - کنار هم */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <PaymentInfoCard paymentInfo={invoice.paymentInfo} />
          <TrackingCodesCard trackingCodes={invoice.trackingCodes} />
        </div>
      </div>
    </DashboardLayout>
  );
}
