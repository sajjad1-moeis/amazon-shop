"use client";

import { initialInvoices } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvoicesFilter from "@/template/Dashboard/Invoices/InvoicesFilter";
import InvoicesTable from "@/template/Dashboard/Invoices/InvoicesTable";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function InvoicesPage() {
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
        (invoice) => invoice.id.toLowerCase().includes(query) || invoice.orderNumber.toLowerCase().includes(query)
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
    <DashboardLayout>
      <div dir="rtl">
        {/* Top Section: Header */}
        <PageHeader title="فاکتورها" description="لیست کامل فاکتورهای خرید شما" />

        {/* Filters Section */}
        <InvoicesFilter filters={filters} onFiltersChange={setFilters} />

        {/* Invoices Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-md p-4 mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg text-primary-700 dark:text-white">لیست فاکتورها</h2>
            <p className="text-gray-500">
              تعداد کل فاکتور‌ها: <span className="text-yellow-600">3</span>
            </p>
          </div>
          <InvoicesTable invoices={filteredInvoices} onDownload={handleDownload} onView={handleView} />
        </div>
      </div>
    </DashboardLayout>
  );
}
