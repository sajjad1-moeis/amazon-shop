"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/layout/DashboardLayout";
import TrackingCodesCard from "@/template/Dashboard/InvoiceDetail/TrackingCodesCard";
import DeliveryAddressCard from "@/template/Dashboard/OrderDetail/DeliveryAddressCard";
import OrderDetailHeader from "@/template/Dashboard/OrderDetail/OrderDetailHeader";
import OrderProgressSection from "@/template/Dashboard/OrderDetail/OrderProgressSection";
import PaymentInfoCard from "@/template/Dashboard/OrderDetail/PaymentInfoCard";
import PaymentStatusCard from "@/template/Dashboard/OrderDetail/PaymentStatusCard";
import ProductListSection from "@/template/Dashboard/OrderDetail/ProductListSection";
import ProductMediaSlider from "@/template/Dashboard/OrderDetail/ProductMediaSlider";
import OrderDocumentsCard from "@/template/Dashboard/OrderDetail/OrderDocumentsCard";
import SecondPaymentCard from "@/template/Dashboard/OrderDetail/SecondPaymentCard";
import SupportCard from "@/template/Dashboard/OrderDetail/SupportCard";
import { toast } from "sonner";
import { orderService } from "@/services/order/orderService";
import { invoiceService } from "@/services/invoice/invoiceService";
import { Spinner } from "@/components/ui/spinner";

export default function OrderDetail({ params }) {
  const orderId = params.orderId;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(!!orderId);

  useEffect(() => {
    if (!orderId) return;
    let cancelled = false;
    setLoading(true);
    orderService
      .getOrderById(orderId)
      .then((data) => {
        if (cancelled) return;
        setOrder(data || null);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err?.message ?? "خطا در دریافت جزئیات سفارش");
          setOrder(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [orderId]);

  const handleDownloadInvoice = async () => {
    if (orderId == null) return;
    try {
      const { blob, filename } = await invoiceService.downloadInvoice({ orderId });
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

  const handleCancelOrder = async () => {
    if (typeof window !== "undefined" && window.confirm("آیا از لغو سفارش اطمینان دارید؟")) {
      try {
        await orderService.cancelOrder(orderId, { cancellationReason: "لغو از سمت کاربر" });
        toast.success("سفارش لغو شد");
      } catch (e) {
        toast.error(e?.message ?? "خطا در لغو سفارش");
      }
    }
  };

  const handleSecondPayment = () => {
    toast.info("در حال انتقال به صفحه پرداخت...");
  };

  const handleEditAddress = () => {
    toast.info("در حال باز کردن فرم ویرایش آدرس...");
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

  if (!order) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">سفارش یافت نشد.</div>
      </DashboardLayout>
    );
  }

  const productsProgress = order.productsProgress ?? order.timelineSteps ?? [];
  const deliveryAddress = order.deliveryAddress ?? order.shippingAddress ?? {};
  const paymentInfo = order.paymentInfo ?? order.payment ?? {};
  const documents = order.documents ?? order.orderDocuments ?? [];
  const media = order.media ?? order.productMedia ?? [];
  const trackingCodes = order.trackingCodes ?? order.tracking ?? [];
  const paymentStatus = order.paymentStatus ?? {};
  const hasTicket = order.hasTicket ?? false;

  return (
    <DashboardLayout>
      {/* Header */}
      <OrderDetailHeader order={order} onDownloadInvoice={handleDownloadInvoice} onCancelOrder={handleCancelOrder} />

      {/* Order Progress Section */}
      <OrderProgressSection productsProgress={productsProgress} />

      {/* Product List Section */}
      <ProductListSection products={order.products ?? order.items ?? []} />

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        <div className="md:col-span-2 lg:col-span-3">
          <DeliveryAddressCard address={deliveryAddress} showEditButton={true} onEdit={handleEditAddress} />
        </div>
        <PaymentStatusCard paymentStatus={paymentStatus} />
      </div>

      {/* Order Documents */}
      <div className="mb-6">
        <OrderDocumentsCard documents={documents || []} />
      </div>

      {/* Media and Second Payment - کنار هم */}
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <ProductMediaSlider media={media} />
        </div>
        {order.needsSecondPayment && (
          <SecondPaymentCard remainingAmount={order.remainingAmount} onPay={handleSecondPayment} />
        )}
      </div>

      {/* Payment Info and Tracking Codes - کنار هم در بالا */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <PaymentInfoCard paymentInfo={paymentInfo} />
        <TrackingCodesCard trackingCodes={trackingCodes} />
      </div>

      <div className="my-8">
        <SupportCard hasTicket={hasTicket} />
      </div>
    </DashboardLayout>
  );
}
