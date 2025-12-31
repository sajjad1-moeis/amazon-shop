"use client";

import React from "react";
import ExclusiveAmazonFilter from "./ExclusiveAmazonFilter";
import ExclusiveAmazonTable from "./ExclusiveAmazonTable";
import ViewAllTable from "@/components/ViewAllTable";

export default function OrdersTab({ orders, filters, onFiltersChange }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-3">
      <div className="flex-between gap-4 mb-6">
        <h2 className="text-lg text-gray-900 dark:text-dark-titre">لیست سفارشها</h2>
        <div className="text-sm text-gray-700 dark:text-dark-text">
          تعداد کل : <span className="font-semibold text-yellow-600 dark:text-yellow-400">{orders.length} عدد</span>
        </div>
      </div>

      <ExclusiveAmazonFilter filters={filters} onFiltersChange={onFiltersChange} />

      <div className="mt-6 space-y-7">
        <ExclusiveAmazonTable orders={orders} />
        <ViewAllTable />
      </div>
    </div>
  );
}
