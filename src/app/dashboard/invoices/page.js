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
        (invoice) =>
          (invoice.invoiceNumber || invoice.id || "").toLowerCase().includes(query) ||
          (invoice.orderNumber || "").toLowerCase().includes(query)
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
          result.sort((a, b) => {
            const dateA = a.issueDate || a.date || "";
            const dateB = b.issueDate || b.date || "";
            return dateB.localeCompare(dateA, "fa-IR");
          });
          break;
        case "oldest":
          result.sort((a, b) => {
            const dateA = a.issueDate || a.date || "";
            const dateB = b.issueDate || b.date || "";
            return dateA.localeCompare(dateB, "fa-IR");
          });
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
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-box p-4 md:p-6 mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl font-bold text-[#1E429F] dark:text-white">لیست فاکتورها</h2>
            <p className="text-gray-600 dark:text-dark-text">
              تعداد کل فاکتورها: <span className="text-orange-600 dark:text-orange-400 font-semibold">{filteredInvoices.length}</span>
            </p>
          </div>
          <InvoicesTable invoices={filteredInvoices} onView={handleView} />
        </div>
      </div>
    </DashboardLayout>
  );
}
