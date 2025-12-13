"use client";

import { Button } from "@/components/ui/button";
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

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader title="خدمات ارزی" description="مدیریت درخواستها و ثبت خدمات ارزی">
        <Link href="/dashboard/currency-services/new-request">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-800 gap-2">
            ثبت درخواست جدید
            <Add size={20} />
          </Button>
        </Link>
      </PageHeader>

      {/* Identity Verification */}
      <div className="mb-6">
        <IdentityVerification />
      </div>

      {/* Requests Section */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-box p-4">
        <h2 className="text-lg md:text-xl text-gray-900 dark:text-white mb-6">تاریخچه درخواست‌ها</h2>

        {/* Filters */}
        <div className="mb-6">
          <RequestsFilter filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Requests Table */}
        <RequestsTable requests={initialRequests} />
      </div>
    </DashboardLayout>
  );
}
