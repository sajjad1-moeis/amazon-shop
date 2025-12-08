"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Admin/PageHeader";
import PaymentsTable from "@/template/Admin/payments/PaymentsTable";

const mockPayments = [
  {
    id: 1,
    transactionId: "TXN-001",
    orderNumber: "ORD-2024-001",
    amount: 45000000,
    status: "success",
    method: "کارت بانکی",
    date: "1403/09/20",
  },
  {
    id: 2,
    transactionId: "TXN-002",
    orderNumber: "ORD-2024-002",
    amount: 32000000,
    status: "success",
    method: "آنلاین",
    date: "1403/09/20",
  },
  {
    id: 3,
    transactionId: "TXN-003",
    orderNumber: "ORD-2024-003",
    amount: 8500000,
    status: "failed",
    method: "کارت بانکی",
    date: "1403/09/19",
  },
];

export default function PaymentsPage() {
  const [payments] = useState(mockPayments);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPayments = payments.filter(
    (payment) =>
      payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="پرداخت‌ها"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <PaymentsTable payments={filteredPayments} />
      </div>
    </div>
  );
}
