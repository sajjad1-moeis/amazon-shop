"use client";

import ViewAllTable from "@/components/ViewAllTable";
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
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4 md:p-6 mt-8">
          <div className="flex-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl text-primary-700 dark:text-dark-titre">لیست فاکتورها</h2>
            <p className="text-gray-600 max-md:text-sm dark:text-dark-text">
              تعداد کل فاکتورها:{" "}
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">{initialInvoices.length}</span>
            </p>
          </div>
          <InvoicesTable invoices={initialInvoices} onView={handleView} />
          <ViewAllTable />
        </div>
      </div>
    </DashboardLayout>
  );
}
