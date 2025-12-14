"use client";

import React, { useMemo, useState } from "react";
import { toast } from "sonner";
import { Box, Truck, Buildings2 } from "iconsax-reactjs";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import OrdersTabs from "@/template/Dashboard/Orders/OrdersTabs";
import OrdersFilter from "@/template/Dashboard/Orders/OrdersFilter";
import OrderCard from "@/template/Dashboard/Orders/OrderCard";
import { initialOrders } from "@/data";

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

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
    paymentStatus: "",
  });

  const orders = useMemo(() => {
    return initialOrders.map((order) => ({
      ...order,
      timeline: order.timeline ?? DEFAULT_TIMELINE,
    }));
  }, []);

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

  const handleViewDetails = (orderId) => toast.info(`مشاهده جزئیات سفارش ${orderId}`);
  const handleDownloadInvoice = () => toast.success("فاکتور با موفقیت دانلود شد");
  const handleSecondPayment = (orderId) => toast.info(`پرداخت مرحله دوم سفارش ${orderId}`);

  return (
    <DashboardLayout>
      <div dir="rtl">
        <PageHeader title="سفارش‌های من" description="تاریخچه و وضعیت تمام سفارش‌های شما" />

        {/* Tabs */}
        <OrdersTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <OrdersFilter filters={filters} onFiltersChange={setFilters} />

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
            {filteredOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={handleViewDetails}
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

function Section({ children }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-4 md:p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {children}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center mt-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <p className="text-gray-500 dark:text-gray-400">سفارشی یافت نشد</p>
    </div>
  );
}
