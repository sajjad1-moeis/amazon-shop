"use client";

import { orderDetailData } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import TrackingCodesCard from "@/template/Dashboard/Invoices/InvoiceDetail/TrackingCodesCard";
import DeliveryAddressCard from "@/template/Dashboard/Orders/OrderDetail/DeliveryAddressCard";
import OrderDetailHeader from "@/template/Dashboard/Orders/OrderDetail/OrderDetailHeader";
import OrderProgressSection from "@/template/Dashboard/Orders/OrderDetail/OrderProgressSection";
import PaymentInfoCard from "@/template/Dashboard/Orders/OrderDetail/PaymentInfoCard";
import PaymentStatusCard from "@/template/Dashboard/Orders/OrderDetail/PaymentStatusCard";
import ProductListSection from "@/template/Dashboard/Orders/OrderDetail/ProductListSection";
import ProductMediaSlider from "@/template/Dashboard/Orders/OrderDetail/ProductMediaSlider";
import SecondPaymentCard from "@/template/Dashboard/Orders/OrderDetail/SecondPaymentCard";
import SupportCard from "@/template/Dashboard/Orders/OrderDetail/SupportCard";
import { toast } from "sonner";

export default function OrderDetail({ params }) {
  const orderId = params.orderId;
  const order = orderDetailData; // در واقعیت باید از API یا props بیاید

  const handleDownloadInvoice = () => {
    toast.success("فاکتور با موفقیت دانلود شد");
  };

  const handleCancelOrder = () => {
    if (typeof window !== "undefined" && window.confirm("آیا از لغو سفارش اطمینان دارید؟")) {
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
    <DashboardLayout>
      {/* Header */}
      <OrderDetailHeader order={order} onDownloadInvoice={handleDownloadInvoice} onCancelOrder={handleCancelOrder} />

      {/* Order Progress Section */}
      <OrderProgressSection productsProgress={order.productsProgress} />

      {/* Product List Section */}
      <ProductListSection products={order.products} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-8">
        <div className="lg:col-span-3">
          <DeliveryAddressCard address={order.deliveryAddress} showEditButton={true} onEdit={handleEditAddress} />
        </div>
        <PaymentStatusCard paymentStatus={order.paymentStatus} />
      </div>

      {/* Media and Second Payment - کنار هم */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <ProductMediaSlider media={order.media} />
        </div>
        {order.needsSecondPayment && (
          <SecondPaymentCard remainingAmount={order.remainingAmount} onPay={handleSecondPayment} />
        )}
      </div>

      {/* Payment Info and Tracking Codes - کنار هم در بالا */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PaymentInfoCard paymentInfo={order.paymentInfo} />
        <TrackingCodesCard trackingCodes={order.trackingCodes} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 my-8">
        <div className="lg:col-span-3">
          <DeliveryAddressCard address={order.deliveryAddress} showEditButton={true} onEdit={handleEditAddress} />
        </div>
        <SupportCard hasTicket={order.hasTicket} onCreateTicket={handleCreateTicket} />
      </div>
    </DashboardLayout>
  );
}
