"use client";

import ViewAllTable from "@/components/ViewAllTable";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import InvoicesFilter from "@/template/Dashboard/Invoices/InvoicesFilter";
import InvoicesTable from "@/template/Dashboard/Invoices/InvoicesTable";
import { useRouter } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { invoiceService } from "@/services/invoice/invoiceService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

export default function InvoicesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    dateRange: "",
    searchQuery: "",
  });

  useEffect(() => {
    if (userId == null) return;
    setLoading(true);
    const status = filters.status && filters.status !== "all" ? filters.status : undefined;
    const promise = status
      ? invoiceService.getUserInvoicesByStatus(userId, status)
      : invoiceService.getUserInvoices(userId);
    promise
      .then((res) => {
        const data = unwrapApiData(res);
        setInvoices(Array.isArray(data) ? data : []);
      })
      .catch(() => setInvoices([]))
      .finally(() => setLoading(false));
  }, [userId, filters.status]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  const handleView = (invoiceId) => {
    router.push(`/dashboard/invoices/${invoiceId}`);
  };

  const filteredInvoices = useMemo(() => {
    let list = [...invoices];
    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter(
        (inv) =>
          String(inv.invoiceNumber ?? inv.id ?? "").toLowerCase().includes(q) ||
          String(inv.orderNumber ?? "").toLowerCase().includes(q)
      );
    }
    if (filters.dateRange) {
      const now = new Date();
      let from = null;
      if (filters.dateRange === "today") {
        from = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      } else if (filters.dateRange === "week") {
        from = new Date(now);
        from.setDate(from.getDate() - 7);
      } else if (filters.dateRange === "month") {
        from = new Date(now);
        from.setMonth(from.getMonth() - 1);
      } else if (filters.dateRange === "year") {
        from = new Date(now);
        from.setFullYear(from.getFullYear() - 1);
      }
      if (from) {
        list = list.filter((inv) => {
          const d = inv.issueDate ?? inv.date ?? inv.createdAt;
          if (!d) return false;
          const invDate = new Date(d);
          return invDate >= from;
        });
      }
    }
    if (filters.sortBy === "newest") {
      list.sort((a, b) => {
        const da = new Date(a.issueDate ?? a.date ?? a.createdAt ?? 0).getTime();
        const db = new Date(b.issueDate ?? b.date ?? b.createdAt ?? 0).getTime();
        return db - da;
      });
    } else if (filters.sortBy === "oldest") {
      list.sort((a, b) => {
        const da = new Date(a.issueDate ?? a.date ?? a.createdAt ?? 0).getTime();
        const db = new Date(b.issueDate ?? b.date ?? b.createdAt ?? 0).getTime();
        return da - db;
      });
    }
    return list;
  }, [invoices, filters.searchQuery, filters.dateRange, filters.sortBy]);

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده فاکتورها وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div dir="rtl">
        {/* Top Section: Header */}
        <PageHeader title="فاکتورها" description="لیست کامل فاکتورهای خرید شما" />

        {/* Filters Section */}
        <InvoicesFilter filters={filters} onFiltersChange={handleFilterChange} />

        {/* Invoices Table Section */}
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mt-8">
          <div className="flex-between gap-4 mb-6">
            <h2 className="text-lg md:text-xl text-primary-700 dark:text-dark-titre">لیست فاکتورها</h2>
            <p className="text-gray-600 max-md:text-sm dark:text-dark-text">
              تعداد کل فاکتورها:{" "}
              <span className="text-yellow-600 dark:text-yellow-400 font-semibold">{filteredInvoices.length}</span>
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center py-12">
              <Spinner size="lg" />
            </div>
          ) : (
            <InvoicesTable invoices={filteredInvoices} onView={handleView} />
          )}
          <ViewAllTable className={"xl:hidden"} />
        </div>
      </div>
    </DashboardLayout>
  );
}
