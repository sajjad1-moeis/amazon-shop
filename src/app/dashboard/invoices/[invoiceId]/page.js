"use client";

import React, { use, useState, useEffect } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import InvoiceDetailHeader from "@/template/Dashboard/InvoiceDetail/InvoiceDetailHeader";
import OrderTimelineSection from "@/template/Dashboard/InvoiceDetail/OrderTimelineSection";
import RecipientInfoCard from "@/template/Dashboard/InvoiceDetail/RecipientInfoCard";
import ProductsTable from "@/template/Dashboard/InvoiceDetail/ProductsTable";
import PaymentInfoCard from "@/template/Dashboard/InvoiceDetail/PaymentInfoCard";
import TrackingCodesCard from "@/template/Dashboard/InvoiceDetail/TrackingCodesCard";
import { toast } from "sonner";
import { invoiceService } from "@/services/invoice/invoiceService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

export default function InvoiceDetailPage({ params }) {
  const resolved = use(typeof params?.then === "function" ? params : Promise.resolve(params ?? {}));
  const invoiceId = resolved?.invoiceId ?? null;
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(!!invoiceId);

  useEffect(() => {
    if (!invoiceId) return;
    setLoading(true);
    invoiceService
      .getInvoiceById(invoiceId)
      .then((res) => {
        const data = unwrapApiData(res);
        setInvoice(data);
      })
      .catch(() => setInvoice(null))
      .finally(() => setLoading(false));
  }, [invoiceId]);

  const handleDownload = async () => {
    if (invoiceId == null) return;
    try {
      const { blob, filename } = await invoiceService.downloadInvoice({ invoiceId });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);
      toast.success("فاکتور با موفقیت دانلود شد");
    } catch (err) {
      toast.error(err?.message || "دانلود فاکتور ناموفق بود");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  if (!invoiceId || !invoice) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">فاکتور یافت نشد.</div>
      </DashboardLayout>
    );
  }

  const recipient = invoice.recipient ?? {};
  const timelineSteps = invoice.timelineSteps ?? invoice.timeline ?? [];
  const products = invoice.products ?? invoice.items ?? [];
  const paymentInfo = invoice.paymentInfo ?? invoice.payment ?? {};
  const trackingCodes = invoice.trackingCodes ?? [];

  return (
    <DashboardLayout>
      <div dir="rtl">
        {/* Header with Download and Status */}
        <InvoiceDetailHeader invoice={invoice} onDownload={handleDownload} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="md:col-span-2">
            <RecipientInfoCard recipient={recipient} />
          </div>
          <div className="md:col-span-1">
            <OrderTimelineSection timelineSteps={timelineSteps} currentStepIndex={invoice.currentStepIndex ?? 2} />
          </div>
        </div>

        <ProductsTable products={products} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
          <PaymentInfoCard paymentInfo={paymentInfo} />
          <TrackingCodesCard trackingCodes={trackingCodes} />
        </div>
      </div>
    </DashboardLayout>
  );
}
