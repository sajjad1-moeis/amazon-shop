"use client";

import React, { useState } from "react";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import OrdersTable from "@/template/Admin/orders/OrdersTable";

// داده‌های تستی
const mockOrders = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerName: "علی محمدی",
    totalAmount: 45000000,
    status: "processing",
    date: "1403/09/20",
    itemsCount: 2,
    paymentStatus: "paid",
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerName: "مریم احمدی",
    totalAmount: 32000000,
    status: "shipped",
    date: "1403/09/20",
    itemsCount: 1,
    paymentStatus: "paid",
  },
  {
    id: 3,
    orderNumber: "ORD-2024-003",
    customerName: "حسین رضایی",
    totalAmount: 8500000,
    status: "delivered",
    date: "1403/09/19",
    itemsCount: 1,
    paymentStatus: "paid",
  },
  {
    id: 4,
    orderNumber: "ORD-2024-004",
    customerName: "فاطمه کریمی",
    totalAmount: 12000000,
    status: "pending",
    date: "1403/09/19",
    itemsCount: 1,
    paymentStatus: "pending",
  },
  {
    id: 5,
    orderNumber: "ORD-2024-005",
    customerName: "محمد صادقی",
    totalAmount: 55000000,
    status: "processing",
    date: "1403/09/19",
    itemsCount: 3,
    paymentStatus: "paid",
  },
];

export default function OrdersPage() {
  const [orders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter(
    (order) =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch
          title="فاکتور ها"
          searchPlaceholder="جستجو نام"
          onSearchChange={setSearchTerm}
        />

        <OrdersTable orders={filteredOrders} />
      </div>
    </div>
  );
}
