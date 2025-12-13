"use client";

import React from "react";
import OrderDetailHeader from "./OrderDetailHeader";
import OrderProgressSection from "./OrderProgressSection";
import ProductListSection from "./ProductListSection";
import DeliveryAddressCard from "./DeliveryAddressCard";
import PaymentStatusCard from "./PaymentStatusCard";
import ProductMediaSlider from "./ProductMediaSlider";
import SecondPaymentCard from "./SecondPaymentCard";
import TrackingCodesCard from "./TrackingCodesCard";
import PaymentInfoCard from "./PaymentInfoCard";
import SupportCard from "./SupportCard";
import { toast } from "sonner";
import { orderDetailData } from "@/data";

export default function OrderDetail() {
  const order = orderDetailData; // در واقعیت باید از API یا props بیاید

  const handleDownloadInvoice = () => {
    toast.success("فاکتور با موفقیت دانلود شد");
  };

  const handleCancelOrder = () => {
    if (confirm("آیا از لغو سفارش اطمینان دارید؟")) {
      toast.success("سفارش لغو شد");
    }
  };

  const handleSecondPayment = () => {
    toast.info("در حال انتقال به صفحه پرداخت...");
  };

  const handleCreateTicket = () => {
    toast.info("در حال باز کردن فرم ثبت تیکت...");
  };

  const handleEditAddress = () => {
    toast.info("در حال باز کردن فرم ویرایش آدرس...");
  };

  return (
    <div dir="rtl">
      {/* Header */}
      <OrderDetailHeader order={order} onDownloadInvoice={handleDownloadInvoice} onCancelOrder={handleCancelOrder} />

      {/* Order Progress Section */}
      <OrderProgressSection productsProgress={order.productsProgress} />

      {/* Product List Section */}
      <ProductListSection products={order.products} />

      {/* Payment Info and Tracking Codes - کنار هم در بالا */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PaymentInfoCard paymentInfo={order.paymentInfo} />
        <TrackingCodesCard trackingCodes={order.trackingCodes} />
      </div>

      {/* Support (زیر کدهای رهگیری) */}
      <div className="mb-6">
        <SupportCard hasTicket={order.hasTicket} onCreateTicket={handleCreateTicket} />
      </div>

      {/* Payment Status and Address - کنار هم */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PaymentStatusCard paymentStatus={order.paymentStatus} />
        <DeliveryAddressCard address={order.deliveryAddress} showEditButton={true} onEdit={handleEditAddress} />
      </div>

      {/* Media and Second Payment - کنار هم */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProductMediaSlider media={order.media} />
        {order.needsSecondPayment && (
          <SecondPaymentCard remainingAmount={order.remainingAmount} onPay={handleSecondPayment} />
        )}
      </div>

      {/* Address (دومین بار - پایین) */}
      <div className="mb-6">
        <DeliveryAddressCard address={order.deliveryAddress} showEditButton={true} onEdit={handleEditAddress} />
      </div>
    </div>
  );
}
