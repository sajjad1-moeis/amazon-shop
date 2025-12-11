"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import IdentityVerification from "./IdentityVerification";
import RequestsFilter from "./RequestsFilter";
import RequestsTable from "./RequestsTable";
import Link from "next/link";

const initialRequests = [
  {
    id: "ER-۵۵۲۱",
    serviceType: "انتقال حواله",
    amount: "۱,۲۰۰ USD",
    status: "reviewing",
    date: "۱۴۰۳/۱۰/۰۹ - ۰۹:۱۲",
  },
  {
    id: "ER-۵۵۲۰",
    serviceType: "پرداخت سرویس خارجی",
    amount: "۲۰۰ USD",
    status: "successful",
    date: "۱۴۰۳/۱۰/۰۸ - ۱۲:۴۲",
  },
];

export default function CurrencyServicesList() {
  const [filters, setFilters] = useState({
    dateRange: "",
    status: "",
    serviceType: "",
    searchQuery: "",
  });

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="خدمات ارزی"
        description="مدیریت درخواستها و ثبت خدمات ارزی"
        actionButton={
          <Link href="/dashboard/currency-services/new-request">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">
              <Add size={20} className="ml-2" />
              ثبت درخواست جدید
            </Button>
          </Link>
        }
      />

      {/* Identity Verification */}
      <div className="mb-6">
        <IdentityVerification />
      </div>

      {/* Requests Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">
          تاریخچه درخواست‌ها
        </h2>

        {/* Filters */}
        <div className="mb-6">
          <RequestsFilter filters={filters} onFiltersChange={setFilters} />
        </div>

        {/* Requests Table */}
        <RequestsTable requests={initialRequests} />
      </div>
    </>
  );
}

