"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvoicesFilter from "./InvoicesFilter";
import InvoicesTable from "./InvoicesTable";
const initialInvoices = [
  {
    id: "INV-۱۲۳۴۴",
    orderNumber: "ORD-۱۲۳۴۴",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "INV-۱۲۳۴۵",
    orderNumber: "ORD-۱۲۳۴۵",
    date: "۱۴۰۳/۱۰/۰۶",
    amount: "۱,۲۰۰,۰۰۰ تومان",
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "INV-۱۲۳۴۶",
    orderNumber: "ORD-۱۲۳۴۶",
    date: "۱۴۰۳/۱۰/۰۵",
    amount: "۵۶۰,۰۰۰ تومان",
    status: "pending",
    statusText: "در انتظار پرداخت",
  },
];

export default function InvoicesList() {
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    dateRange: "",
    searchQuery: "",
  });

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader title="فاکتورها" description="لیست کامل فاکتورهای خرید شما" />

      {/* Filters Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <InvoicesFilter filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Invoices Table Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">لیست فاکتورها</h2>
        <InvoicesTable invoices={initialInvoices} />
      </div>
    </>
  );
}
