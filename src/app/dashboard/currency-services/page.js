"use client";

import { Button } from "@/components/ui/button";
import ViewAllTable from "@/components/ViewAllTable";
import { initialRequests } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import IdentityVerification from "@/template/Dashboard/CurrencyServices/IdentityVerification";
import RequestsFilter from "@/template/Dashboard/CurrencyServices/RequestsFilter";
import RequestsTable from "@/template/Dashboard/CurrencyServices/RequestsTable";
import { Add } from "iconsax-reactjs";
import Link from "next/link";
import { useState } from "react";

export default function CurrencyServicesPage() {
  const [filters, setFilters] = useState({
    dateRange: "",
    status: "",
    serviceType: "",
    searchQuery: "",
  });

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
          <div class="md:hidden">
            <CurrencyBtn />
          </div>
        }
        title="خدمات ارزی"
        description="مدیریت درخواستها و ثبت خدمات ارزی"
      >
        <div class="max-md:hidden">
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
        <RequestsTable requests={initialRequests} />
        <div class="mb-6 lg:hidden"></div>
        <ViewAllTable />
      </div>
    </DashboardLayout>
  );
}
