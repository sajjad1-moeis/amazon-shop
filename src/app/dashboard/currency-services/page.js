"use client";

import { Button } from "@/components/ui/button";
import ViewAllTable from "@/components/ViewAllTable";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import IdentityVerification from "@/template/Dashboard/CurrencyServices/IdentityVerification";
import RequestsFilter from "@/template/Dashboard/CurrencyServices/RequestsFilter";
import RequestsTable from "@/template/Dashboard/CurrencyServices/RequestsTable";
import { Add } from "iconsax-reactjs";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { currencyService } from "@/services/currency/currencyService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

export default function CurrencyServicesPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [filters, setFilters] = useState({
    dateRange: "",
    status: "",
    serviceType: "",
    searchQuery: "",
  });
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId == null) {
      setRequests([]);
      setLoading(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    const params = {
      pageNumber: 1,
      pageSize: 50,
      userId,
      searchTerm: filters.searchQuery?.trim() || undefined,
      status: filters.status ? parseInt(filters.status, 10) : undefined,
      serviceType: filters.serviceType ? parseInt(filters.serviceType, 10) : undefined,
    };
    currencyService
      .getPaginated(params)
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        setRequests(Array.isArray(data?.requests) ? data.requests : []);
      })
      .catch((err) => {
        if (!cancelled) {
          toast.error(err?.message ?? "خطا در دریافت درخواست‌ها");
          setRequests([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [userId, filters.searchQuery, filters.status, filters.serviceType]);

  const filteredRequests = useMemo(() => {
    let list = [...requests];
    if (!filters.dateRange) return list;
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
      list = list.filter((r) => {
        const d = r.createdAt ?? r.date;
        if (!d) return false;
        const txDate = new Date(d);
        return !isNaN(txDate.getTime()) && txDate >= from;
      });
    }
    return list;
  }, [requests, filters.dateRange]);

  const handleFiltersChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  const CurrencyBtn = () => (
    <Link href="/dashboard/currency-services/new-request" className="w-full">
      <Button className="bg-yellow-500 w-full hover:bg-yellow-600 text-gray-800 gap-2">
        ثبت درخواست جدید
        <Add size={20} />
      </Button>
    </Link>
  );

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader
        actionButton={
          <div className="md:hidden">
            <CurrencyBtn />
          </div>
        }
        title="خدمات ارزی"
        description="مدیریت درخواستها و ثبت خدمات ارزی"
      >
        <div className="max-md:hidden">
          <CurrencyBtn />
        </div>
      </PageHeader>

      {/* Identity Verification */}
      <div className="mb-6">
        <IdentityVerification />
      </div>

      {/* Requests Section */}
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 sm:p-4">
        <h2 className="text-base sm:text-lg md:text-xl text-gray-900 dark:text-white mb-4 sm:mb-6">
          تاریخچه درخواست‌ها
        </h2>

        {/* Filters */}
        <RequestsFilter filters={filters} onFiltersChange={handleFiltersChange} />

        {/* Requests Table */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <RequestsTable requests={filteredRequests} />
        )}
        <div className="mb-6 lg:hidden"></div>
        <ViewAllTable />
      </div>
    </DashboardLayout>
  );
}
