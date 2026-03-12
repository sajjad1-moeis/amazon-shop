"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DocumentDownload,
  Edit2,
  Truck,
  TickCircle,
  CloseCircle,
} from "iconsax-reactjs";
import {
  orderService,
  OrderStatus,
  PaymentMethod,
} from "@/services/order/orderService";
import { toast } from "sonner";
import OrderStatusDialog from "./OrderStatusDialog";
import OrderShippingDialog from "./OrderShippingDialog";
import { formatDateTimeFa } from "@/utils/adminDateUtils";

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

const getStatusBadgeClass = (status) => {
  const map = {
    [OrderStatus.Pending]: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    [OrderStatus.Paid]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    [OrderStatus.Processing]: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    [OrderStatus.Shipped]: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    [OrderStatus.Delivered]: "bg-green-500/20 text-green-400 border-green-500/30",
    [OrderStatus.Cancelled]: "bg-red-500/20 text-red-400 border-red-500/30",
    [OrderStatus.Refunded]: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    [OrderStatus.Failed]: "bg-red-500/20 text-red-400 border-red-500/30",
  };
  return map[status] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
};


export default function AdminOrderDetailHeader({ order, onDownloadInvoice, onOrderUpdated }) {
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [shippingDialogOpen, setShippingDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const statusLabel = ORDER_STATUS_LABELS[order?.status] ?? "نامشخص";
  const paymentLabel = PAYMENT_METHOD_LABELS[order?.paymentMethod] ?? order?.paymentMethod ?? "-";

  const handleCancelOrder = async () => {
    if (!window.confirm("آیا از لغو سفارش اطمینان دارید؟")) return;
    try {
      setLoading(true);
      await orderService.cancelOrder(order.id, { cancellationReason: "لغو از پنل ادمین" });
      toast.success("سفارش لغو شد");
      onOrderUpdated?.();
    } catch (e) {
      toast.error(e?.message ?? "خطا در لغو سفارش");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkDelivered = async () => {
    try {
      setLoading(true);
      await orderService.markDelivered(order.id);
      toast.success("سفارش به‌عنوان تحویل شده ثبت شد");
      onOrderUpdated?.();
    } catch (e) {
      toast.error(e?.message ?? "خطا در ثبت تحویل");
    } finally {
      setLoading(false);
    }
  };

  const canCancel = order?.status !== OrderStatus.Cancelled && order?.status !== OrderStatus.Delivered;
  const canMarkDelivered = order?.status === OrderStatus.Shipped;

  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4 md:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              سفارش #{order?.orderNumber ?? order?.id}
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              تاریخ ثبت: {formatDateTimeFa(order?.createdAt ?? order?.orderDate)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={onDownloadInvoice}
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white gap-2"
            >
              <DocumentDownload size={18} />
              دانلود فاکتور
            </Button>
            <Button
              onClick={() => setStatusDialogOpen(true)}
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white gap-2"
            >
              <Edit2 size={18} />
              تغییر وضعیت
            </Button>
            {canMarkDelivered && (
              <Button
                onClick={handleMarkDelivered}
                disabled={loading}
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
              >
                <TickCircle size={18} />
                تحویل شده
              </Button>
            )}
            <Button
              onClick={() => setShippingDialogOpen(true)}
              variant="outline"
              size="sm"
              className="border-gray-500 text-gray-300 hover:bg-gray-600 hover:text-white gap-2"
            >
              <Truck size={18} />
              ارسال
            </Button>
            {canCancel && (
              <Button
                onClick={handleCancelOrder}
                disabled={loading}
                variant="outline"
                size="sm"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20 gap-2"
              >
                <CloseCircle size={18} />
                لغو سفارش
              </Button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-600">
          <div>
            <span className="text-gray-500 text-xs">وضعیت سفارش</span>
            <div className="mt-1">
              <Badge variant="outline" className={getStatusBadgeClass(order?.status)}>
                {statusLabel}
              </Badge>
            </div>
          </div>
          <div>
            <span className="text-gray-500 text-xs">روش پرداخت</span>
            <p className="text-gray-200 text-sm mt-1">{paymentLabel}</p>
          </div>
          <div>
            <span className="text-gray-500 text-xs">تعداد آیتم</span>
            <p className="text-gray-200 text-sm mt-1">{order?.itemsCount ?? order?.itemCount ?? 0}</p>
          </div>
          <div>
            <span className="text-gray-500 text-xs">مبلغ کل</span>
            <p className="text-gray-200 text-sm mt-1 font-medium">
              {order?.totalAmount ? `${Number(order.totalAmount).toLocaleString("fa-IR")} تومان` : "-"}
            </p>
          </div>
        </div>
      </div>

      <OrderStatusDialog
        open={statusDialogOpen}
        onOpenChange={setStatusDialogOpen}
        orderId={order?.id}
        currentStatus={order?.status}
        onSuccess={onOrderUpdated}
      />
      <OrderShippingDialog
        open={shippingDialogOpen}
        onOpenChange={setShippingDialogOpen}
        orderId={order?.id}
        onSuccess={onOrderUpdated}
      />
    </div>
  );
}
