"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvoicesFilter from "./InvoicesFilter";
import InvoicesTable from "./InvoicesTable";
import { toast } from "sonner";

const initialInvoices = [
  {
    id: "INV-۱۲۳۴۴",
    orderNumber: "ORD-۱۲۳۴۴",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰",
    amountNumber: 890000,
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "INV-۱۲۳۴۵",
    orderNumber: "ORD-۱۲۳۴۵",
    date: "۱۴۰۳/۱۰/۰۶",
    amount: "۱,۲۰۰,۰۰۰",
    amountNumber: 1200000,
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "INV-۱۲۳۴۶",
    orderNumber: "ORD-۱۲۳۴۶",
    date: "۱۴۰۳/۱۰/۰۵",
    amount: "۵۶۰,۰۰۰",
    amountNumber: 560000,
    status: "pending",
    statusText: "در انتظار پرداخت",
  },
  {
    id: "INV-۱۲۳۴۷",
    orderNumber: "ORD-۱۲۳۴۷",
    date: "۱۴۰۳/۱۰/۰۴",
    amount: "۲,۳۵۰,۰۰۰",
    amountNumber: 2350000,
    status: "paid",
    statusText: "پرداخت شده",
  },
  {
    id: "INV-۱۲۳۴۸",
    orderNumber: "ORD-۱۲۳۴۸",
    date: "۱۴۰۳/۱۰/۰۳",
    amount: "۷۵۰,۰۰۰",
    amountNumber: 750000,
    status: "pending",
    statusText: "در انتظار پرداخت",
  },
];

export default function InvoicesList() {
  const router = useRouter();
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    dateRange: "",
    searchQuery: "",
  });

  // Filter invoices based on filters
  const filteredInvoices = useMemo(() => {
    let result = [...initialInvoices];

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(
        (invoice) =>
          invoice.id.toLowerCase().includes(query) || invoice.orderNumber.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (filters.status && filters.status !== "all") {
      result = result.filter((invoice) => invoice.status === filters.status);
    }

    // Sort invoices
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "newest":
          result.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case "oldest":
          result.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        case "amount-high":
          result.sort((a, b) => b.amountNumber - a.amountNumber);
          break;
        case "amount-low":
          result.sort((a, b) => a.amountNumber - b.amountNumber);
          break;
        default:
          break;
      }
    }

    return result;
  }, [filters]);

  const handleDownload = (invoiceId) => {
    toast.success("فاکتور با موفقیت دانلود شد");
  };

  const handleView = (invoiceId) => {
    router.push(`/dashboard/invoices/${invoiceId}`);
  };

  return (
    <div dir="rtl">
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
        <InvoicesTable invoices={filteredInvoices} onDownload={handleDownload} onView={handleView} />
      </div>
    </div>
  );
}
