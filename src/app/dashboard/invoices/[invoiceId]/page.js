"use client";

import { invoiceDetailData } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import OrderTimelineCard from "@/template/Dashboard/Invoices/InvoiceDetail/OrderTimelineCard";
import ProductsTable from "@/template/Dashboard/Invoices/InvoiceDetail/ProductsTable";
import RecipientInfoCard from "@/template/Dashboard/Invoices/InvoiceDetail/RecipientInfoCard";
import TrackingCodesCard from "@/template/Dashboard/Invoices/InvoiceDetail/TrackingCodesCard";
import InvoiceDetailHeader from "@/template/Dashboard/Invoices/InvoiceDetail/InvoiceDetailHeader";
import { toast } from "sonner";

export default function InvoiceDetailPage({ params }) {
  const invoice = invoiceDetailData; // در واقعیت باید از API یا props بیاید

  const handleDownload = () => {
    toast.success("فاکتور PDF با موفقیت دانلود شد");
  };

  return (
    <DashboardLayout>
      <div dir="rtl">
        {/* Invoice Header */}
        <InvoiceDetailHeader invoice={{ ...invoice, onDownload: handleDownload }} />

        {/* Tracking Codes and Recipient Info - کنار هم */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RecipientInfoCard recipient={invoice.recipient} />
          <TrackingCodesCard trackingCodes={invoice.trackingCodes} />
        </div>

        {/* Order Timeline */}
        <OrderTimelineCard timeline={invoice.timeline} />

        {/* Products Table */}
        <ProductsTable products={invoice.products} />
      </div>
    </DashboardLayout>
  );
}
