"use client";

import React, { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Box, Truck, Buildings2 } from "iconsax-reactjs";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import OrdersTabs from "@/template/Dashboard/Orders/OrdersTabs";
import OrdersFilter from "@/template/Dashboard/Orders/OrdersFilter";
import OrderCard from "@/template/Dashboard/Orders/OrderCard";
import { orderService } from "@/services/order/orderService";
import { useAuth } from "@/contexts/AuthContext";
import { Spinner } from "@/components/ui/spinner";

const DEFAULT_TIMELINE = {
  currentStepIndex: 1,
  productName: "محصول اول",
  steps: [
    { id: "clearance", label: "ترخیص", Icon: Box },
    { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
    { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
  ],
};

const PAYMENT_STATUS_MAP = {
  full: "پرداخت کامل",
  partial: "پرداخت جزئی",
  pending: "در انتظار پرداخت",
};

function mapApiOrderToCard(apiOrder) {
  if (!apiOrder) return null;

  const id = apiOrder.id ?? apiOrder.orderId;
  const orderNumber = apiOrder.orderNumber ?? String(id ?? "");

  const createdAt = apiOrder.createdAt ?? apiOrder.orderDate ?? apiOrder.createdOn;
  const orderDate =
    createdAt != null
      ? new Date(createdAt).toLocaleDateString("fa-IR")
      : apiOrder.orderDateText ?? apiOrder.orderDate ?? "-";

  const items =
    Array.isArray(apiOrder.items) && apiOrder.items.length
      ? apiOrder.items
      : Array.isArray(apiOrder.orderItems) && apiOrder.orderItems.length
        ? apiOrder.orderItems
        : Array.isArray(apiOrder.products) && apiOrder.products.length
          ? apiOrder.products
          : [];

  const products = items.map((item, index) => {
    const productId = item.productId ?? item.id ?? index;
    const name = item.productName ?? item.title ?? item.name ?? "محصول";
    const image =
      item.productImageUrl ??
      item.imageUrl ??
      item.image ??
      item.thumbnailUrl ??
      (Array.isArray(item.images) && item.images[0]) ??
      "/image/Home/product.png";
    const priceRaw =
      item.price ??
      item.unitPrice ??
      item.finalPrice ??
      item.totalPrice ??
      item.amount ??
      0;
    const price = typeof priceRaw === "number" ? priceRaw : Number(priceRaw) || 0;
    const quantity = item.quantity ?? item.count ?? 1;

    return {
      id: productId,
      name,
      image,
      price,
      quantity,
    };
  });

  const itemsCount =
    apiOrder.itemsCount ??
    apiOrder.items?.length ??
    apiOrder.orderItems?.length ??
    apiOrder.products?.length ??
    products.length;

  const totalAmountRaw =
    apiOrder.totalAmount ??
    apiOrder.finalAmount ??
    apiOrder.amount ??
    apiOrder.grandTotal ??
    apiOrder.totalPrice ??
    0;
  const totalAmount =
    typeof totalAmountRaw === "number"
      ? totalAmountRaw.toLocaleString("fa-IR")
      : String(totalAmountRaw);

  const status =
    apiOrder.statusText ??
    apiOrder.status ??
    "processing";

  const paymentStatusText =
    apiOrder.paymentStatusText ??
    apiOrder.paymentStatus ??
    (apiOrder.isPaid ? PAYMENT_STATUS_MAP.full : PAYMENT_STATUS_MAP.pending);

  const timeline =
    apiOrder.timeline ??
    apiOrder.timelineSteps ??
    null;

  const needsSecondPayment =
    apiOrder.needsSecondPayment ??
    (apiOrder.secondPaymentAmount != null && Number(apiOrder.secondPaymentAmount) > 0);

  const remainingAmount = apiOrder.secondPaymentAmount ?? apiOrder.remainingAmount ?? 0;

  return {
    ...apiOrder,
    id,
    orderNumber,
    orderDate,
    itemsCount,
    products,
    totalAmount,
    status,
    paymentStatus: paymentStatusText,
    timeline:
      timeline && Array.isArray(timeline.steps)
        ? timeline
        : {
            currentStepIndex: 1,
            productName: products[0]?.name ?? "محصول اول",
            steps: [
              { id: "clearance", label: "ترخیص", Icon: Box },
              { id: "to-iran", label: "ارسال به ایران", Icon: Truck },
              { id: "warehouse", label: "رسید به انبار", Icon: Buildings2 },
            ],
          },
    needsSecondPayment,
    remainingAmount,
  };
}

export default function OrdersPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
    paymentStatus: "",
  });
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  useEffect(() => {
    if (userId == null) {
      setOrders([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    orderService
      .getUserOrders(userId)
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data?.orders) ? data.orders : Array.isArray(data) ? data : [];
        const mapped = list.map(mapApiOrderToCard).filter(Boolean);
        setOrders(mapped);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err?.message ?? "خطا در دریافت سفارش‌ها");
          setOrders([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => (activeTab === "all" ? true : order.status === activeTab))
      .filter((order) => {
        if (!filters.searchQuery) return true;

        const query = filters.searchQuery.toLowerCase();
        return (
          order.orderNumber.toLowerCase().includes(query) ||
          order.products.some((p) => p.name.toLowerCase().includes(query))
        );
      })
      .filter((order) => (filters.status && filters.status !== "all" ? order.status === filters.status : true))
      .filter((order) =>
        filters.paymentStatus && filters.paymentStatus !== "all"
          ? order.paymentStatus === PAYMENT_STATUS_MAP[filters.paymentStatus]
          : true
      );
  }, [orders, activeTab, filters]);

  const handleDownloadInvoice = () => toast.success("فاکتور با موفقیت دانلود شد");
  const handleSecondPayment = (orderId) => toast.info(`پرداخت مرحله دوم سفارش ${orderId}`);

  return (
    <DashboardLayout>
      <div dir="rtl">
        <PageHeader title="سفارش‌های من" description="تاریخچه و وضعیت تمام سفارش‌های شما" />

        {/* Tabs */}
        <OrdersTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <OrdersFilter filters={filters} onFiltersChange={handleFilterChange} />

        {/* Orders List */}
        {loading ? (
          <div className="flex justify-center py-12 mt-6">
            <Spinner size="lg" />
          </div>
        ) : filteredOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onDownloadInvoice={handleDownloadInvoice}
                onSecondPayment={handleSecondPayment}
              />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function EmptyState() {
  return (
    <div
      className="bg-white dark:bg-dark-box rounded-2xl p-8 text-center mt-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <p className="text-gray-500 dark:text-dark-titre">سفارشی یافت نشد</p>
    </div>
  );
}
