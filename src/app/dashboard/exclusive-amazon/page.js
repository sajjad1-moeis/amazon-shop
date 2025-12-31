"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import InfoCardsSection from "@/template/Dashboard/ExclusiveAmazon/InfoCardsSection";
import ExclusiveAmazonTabs from "@/template/Dashboard/ExclusiveAmazon/ExclusiveAmazonTabs";
import DashboardLayout from "@/layout/DashboardLayout";

const INITIAL_ORDERS = [
  {
    id: 1,
    orderNumber: "۱۱۲",
    asin: "کنترلر پلی استیشن ۵ - سفید",
    finalAmount: "۱۴,۰۰۰,۰۰۰",
    status: "pending",
    statusText: "در انتظار بررسی",
    lastUpdate: "۱۴۰۳/۱۰/۲۱",
  },
  {
    id: 2,
    orderNumber: "۱۱۱",
    asin: "کنترلر پلی استیشن ۵ - سفید",
    finalAmount: "۱۴,۰۰۰,۰۰۰",
    status: "pending",
    statusText: "در انتظار بررسی",
    lastUpdate: "۱۴۰۳/۱۰/۲۱",
  },
];

export default function ExclusiveAmazonList() {
  const [activeTab, setActiveTab] = useState("orders");
  const [orders] = useState(INITIAL_ORDERS);
  const [filters, setFilters] = useState({
    searchQuery: "",
    timeRange: "",
    status: "",
  });

  const handleNewOrder = () => {
    window.location.href = "/dashboard/exclusive-amazon/new-order";
  };

  return (
    <DashboardLayout dir="rtl">
      <PageHeader title="خرید اختصاصی از آمازون" description="دسترسی ویژه برای سفارش کالاهای خاص و غیر عمومی">
        <Button
          onClick={handleNewOrder}
          className="bg-yellow-500 hover:bg-yellow-600 text-primary-800  font-medium gap-2"
        >
          ثبت سفارش جدید
          <Add size={20} />
        </Button>
      </PageHeader>

      <InfoCardsSection />

      <div className="mt-4 sm:mt-6">
        <ExclusiveAmazonTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          orders={orders}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>
    </DashboardLayout>
  );
}
