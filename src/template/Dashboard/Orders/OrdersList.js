"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import OrdersFilter from "./OrdersFilter";
import OrdersTable from "./OrdersTable";

const initialOrders = [
  {
    id: "۱۲۳۴۴",
    orderNumber: "ORD-۱۲۳۴۴",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "processing",
    statusText: "در حال پردازش",
    items: 3,
  },
  {
    id: "۱۲۳۴۵",
    orderNumber: "ORD-۱۲۳۴۵",
    date: "۱۴۰۳/۱۰/۰۶",
    amount: "۱,۲۰۰,۰۰۰ تومان",
    status: "shipped",
    statusText: "ارسال شده",
    items: 2,
  },
  {
    id: "۱۲۳۴۶",
    orderNumber: "ORD-۱۲۳۴۶",
    date: "۱۴۰۳/۱۰/۰۵",
    amount: "۵۶۰,۰۰۰ تومان",
    status: "delivered",
    statusText: "تحویل داده شده",
    items: 1,
  },
  {
    id: "۱۲۳۴۷",
    orderNumber: "ORD-۱۲۳۴۷",
    date: "۱۴۰۳/۱۰/۰۴",
    amount: "۲,۳۰۰,۰۰۰ تومان",
    status: "cancelled",
    statusText: "لغو شده",
    items: 4,
  },
];

export default function OrdersList() {
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    dateRange: "",
    searchQuery: "",
  });

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="سفارش‌های من"
        description="لیست کامل سفارش‌های شما و وضعیت هر کدام"
      />

      {/* Filters Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <OrdersFilter filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Orders Table Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">لیست سفارش‌ها</h2>
        <OrdersTable orders={initialOrders} />
      </div>
    </>
  );
}

