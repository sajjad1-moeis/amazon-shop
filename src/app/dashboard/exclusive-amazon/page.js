"use client";

import React, { useState, useEffect, useMemo } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import InfoCardsSection from "@/template/Dashboard/ExclusiveAmazon/InfoCardsSection";
import ExclusiveAmazonTabs from "@/template/Dashboard/ExclusiveAmazon/ExclusiveAmazonTabs";
import DashboardLayout from "@/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { exclusiveAmazonService } from "@/services/exclusiveAmazon/exclusiveAmazonService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const STATUS_MAP = {
  1: "pending",
  2: "approved",
  3: "rejected",
  4: "processing",
};

function mapApiOrder(item) {
  if (!item) return null;
  const rawDate = item.lastUpdate ?? item.updatedAt ?? item.createdAt;
  const dateObj = rawDate ? new Date(rawDate) : null;
  const dateStr = dateObj && !isNaN(dateObj.getTime()) ? dateObj.toLocaleDateString("fa-IR") : "-";
  const status = STATUS_MAP[item.status] ?? (item.statusText ? undefined : "pending") ?? item.status;
  return {
    id: item.id,
    orderNumber: String(item.orderNumber ?? item.orderNo ?? item.id ?? ""),
    asin: item.asin ?? item.productName ?? item.title ?? "-",
    finalAmount: item.finalAmount ?? item.amount ?? item.total ?? "۰",
    status: status,
    statusText: item.statusText ?? (status === "pending" ? "در انتظار بررسی" : status),
    lastUpdate: dateStr,
    _date: rawDate || undefined,
  };
}

export default function ExclusiveAmazonList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
  });

  const fetchOrders = () => {
    if (userId == null) return;
    setLoading(true);
    exclusiveAmazonService
      .getMyOrders(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data) ? data : data?.items ?? data?.orders ?? [];
        setOrders(list.map(mapApiOrder).filter(Boolean));
      })
      .catch((err) => {
        if (err?.response?.status !== 404) {
          toast.error(err?.message ?? "خطا در دریافت سفارش‌های اختصاصی");
        }
        setOrders([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, [userId]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredOrders = useMemo(() => {
    let list = [...orders];
    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter(
        (o) =>
          String(o.orderNumber ?? "").toLowerCase().includes(q) ||
          String(o.asin ?? "").toLowerCase().includes(q)
      );
    }
    if (filters.status && filters.status !== "all") {
      list = list.filter((o) => String(o.status).toLowerCase() === String(filters.status).toLowerCase());
    }
    if (filters.timeRange && filters.timeRange !== "all") {
      const now = new Date();
      list = list.filter((o) => {
        const orderDate = o._date ? new Date(o._date) : null;
        if (!orderDate || isNaN(orderDate.getTime())) return true;
        const days = (now - orderDate) / (24 * 60 * 60 * 1000);
        if (filters.timeRange === "7d") return days <= 7;
        if (filters.timeRange === "30d") return days <= 30;
        if (filters.timeRange === "90d") return days <= 90;
        return true;
      });
    }
    return list;
  }, [orders, filters]);

  const handleNewOrder = () => {
    router.push("/dashboard/exclusive-amazon/new-order");
  };

  const ActionBtn = () => (
    <Button
      onClick={handleNewOrder}
      className="bg-yellow-500 max-md:w-full hover:bg-yellow-600 text-primary-800 font-medium gap-2"
    >
      ثبت سفارش جدید
      <Add size={20} />
    </Button>
  );

  return (
    <DashboardLayout dir="rtl">
      <PageHeader
        actionButton={
          <div className="md:hidden">
            <ActionBtn />
          </div>
        }
        title="خرید اختصاصی از آمازون"
        description="دسترسی ویژه برای سفارش کالاهای خاص و غیر عمومی"
      >
        <div className="max-md:hidden">
          <ActionBtn />
        </div>
      </PageHeader>

      <InfoCardsSection />

      <div className="mt-4 sm:mt-6">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Spinner className="w-8 h-8 text-primary-500" />
          </div>
        ) : (
          <ExclusiveAmazonTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
            orders={filteredOrders}
            filters={filters}
            onFiltersChange={handleFilterChange}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
