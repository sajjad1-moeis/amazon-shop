"use client";

import React from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import InvoiceDetailHeader from "@/template/Dashboard/InvoiceDetail/InvoiceDetailHeader";
import OrderTimelineSection from "@/template/Dashboard/InvoiceDetail/OrderTimelineSection";
import RecipientInfoCard from "@/template/Dashboard/InvoiceDetail/RecipientInfoCard";
import ProductsTable from "@/template/Dashboard/InvoiceDetail/ProductsTable";
import TrackingCodesCard from "@/template/Dashboard/InvoiceDetail/TrackingCodesCard";
import { toast } from "sonner";
import { mockInvoiceData } from "@/data";
import ViewAllTable from "@/components/ViewAllTable";
import PaymentInfoCard from "@/template/Dashboard/InvoiceDetail/PaymentInfoCard";

export default function InvoiceDetailPage({ params }) {
  const invoiceId = params.invoiceId;

  const handleDownload = () => {
    toast.success("فاکتور با موفقیت دانلود شد");
  };

  const invoice = mockInvoiceData;

  return (
    <DashboardLayout>
      {/* Header with Download and Status */}
      <InvoiceDetailHeader invoice={invoice} onDownload={handleDownload} />

      {/* Order Timeline and Recipient Info - کنار هم */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-4 sm:mb-6">
        {/* Order Timeline - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecipientInfoCard recipient={invoice.recipient} />
        </div>

        {/* Recipient Info - Takes 1 column */}
        <div className="lg:col-span-1">
          <OrderTimelineSection timelineSteps={invoice.timelineSteps} currentStepIndex={2} />
        </div>
      </div>

      {/* Products Table */}
      <ProductsTable products={invoice.products} />

      {/* Payment Info and Tracking Codes - کنار هم */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 my-4 sm:my-6">
        <PaymentInfoCard paymentInfo={invoice.paymentInfo} />
        <TrackingCodesCard trackingCodes={invoice.trackingCodes} />
      </div>
    </DashboardLayout>
  );
}
