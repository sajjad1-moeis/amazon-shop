"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight2 } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import { orderService } from "@/services/order/orderService";
import { invoiceService } from "@/services/invoice/invoiceService";
import { unwrapApiData } from "@/services/api/client";
import AdminOrderDetailHeader from "@/template/Admin/orders/OrderDetailHeader";
import AdminOrderDetailInfo from "@/template/Admin/orders/OrderDetailInfo";
import AdminOrderDetailProducts from "@/template/Admin/orders/OrderDetailProducts";
import AdminOrderDetailAddress from "@/template/Admin/orders/OrderDetailAddress";
import AdminOrderDetailPayment from "@/template/Admin/orders/OrderDetailPayment";
import AdminOrderDetailShipping from "@/template/Admin/orders/OrderDetailShipping";
import AdminOrderDetailDocuments from "@/template/Admin/orders/OrderDetailDocuments";
import AdminOrderDetailMeta from "@/template/Admin/orders/OrderDetailMeta";

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params?.orderId;
  const [order, setOrder] = useState(null);
  const [rawResponse, setRawResponse] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    if (!orderId) return;
    try {
      setLoading(true);
      const raw = await orderService.getOrderByIdRaw(orderId);
      setRawResponse(raw);
      const data = unwrapApiData(raw);
      setOrder(data ?? null);
    } catch (err) {
      toast.error(err?.message ?? "خطا در دریافت جزئیات سفارش");
      setOrder(null);
      setRawResponse(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  const handleDownloadInvoice = async () => {
    if (!orderId) return;
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

  const handleOrderUpdated = () => {
    fetchOrder();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 mb-4">سفارش یافت نشد</p>
        <Button asChild variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
          <Link href="/admin/orders">
            <ArrowRight2 size={18} className="ml-2" />
            بازگشت به لیست سفارشات
          </Link>
        </Button>
      </div>
    );
  }

  const deliveryAddress = order.deliveryAddress ?? order.shippingAddress ?? order.address ?? {};
  const paymentInfo = order.paymentInfo ?? order.payment ?? {};
  const products =
    order.products ??
    order.items ??
    order.orderItems ??
    [];
  const documents = order.documents ?? order.orderDocuments ?? [];
  const trackingCodes = order.trackingCodes ?? order.tracking ?? order.trackingNumbers ?? [];

  return (
    <div dir="rtl" className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Button asChild variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <Link href="/admin/orders">
            <ArrowRight2 size={20} className="ml-1" />
            بازگشت به لیست
          </Link>
        </Button>
      </div>

      <AdminOrderDetailHeader
        order={order}
        onDownloadInvoice={handleDownloadInvoice}
        onOrderUpdated={handleOrderUpdated}
      />

      <AdminOrderDetailInfo order={order} />

      <AdminOrderDetailMeta order={order} rawResponse={rawResponse} />

      <AdminOrderDetailProducts products={products} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AdminOrderDetailAddress address={deliveryAddress} />
        <AdminOrderDetailPayment paymentInfo={paymentInfo} order={order} />
      </div>

      <AdminOrderDetailShipping trackingCodes={trackingCodes} order={order} onUpdated={handleOrderUpdated} />

      {documents?.length > 0 && <AdminOrderDetailDocuments documents={documents} />}
    </div>
  );
}
