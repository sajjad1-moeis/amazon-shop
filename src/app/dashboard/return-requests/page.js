"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ReturnRequestsFilter from "@/template/Dashboard/ReturnRequests/ReturnRequestsFilter";
import ActiveReturnCard from "@/template/Dashboard/ReturnRequests/ActiveReturnCard";
import ReturnsTable from "@/template/Dashboard/ReturnRequests/ReturnsTable";
import { activeReturn, initialReturns } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import ViewAllTable from "@/components/ViewAllTable";

export default function ReturnRequestsList() {
  const [returns, setReturns] = useState(initialReturns);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    category: "",
    searchQuery: "",
  });

  const handleCancelReturn = (returnId) => {
    if (confirm("آیا از لغو این درخواست اطمینان دارید؟")) {
      setReturns(returns.filter((r) => r.id !== returnId));
    }
  };

  const ReturnBtn = () => (
    <Link href="/dashboard/return-requests/new">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 max-md:w-full">
        ثبت درخواست جدید
        <Add size={20} />
      </Button>
    </Link>
  );

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader
        title="درخواستهای مرجوعی"
        description="تمام درخواستهایی که برای مرجوعی کالا ثبت کرده اید در این بخش قابل مشاهده و پیگیری هستند"
        actionButton={
          <div className="md:hidden">
            <ReturnBtn />
          </div>
        }
      >
        <div className="max-md:hidden">
          <ReturnBtn />
        </div>
      </PageHeader>

      {/* Filters Section with New Request Button */}

      <ReturnRequestsFilter filters={filters} onFiltersChange={setFilters} />

      {/* Active Return Status Section */}
      {activeReturn && (
        <div className="my-8">
          <ActiveReturnCard returnData={activeReturn} onCancel={handleCancelReturn} />
        </div>
      )}

      {/* Returns Table Section */}

      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
        <h2 className="text-lg  text-gray-900 dark:text-white mb-6">لیست درخواستهای مرجوعی</h2>
        <ReturnsTable returns={returns} onCancel={handleCancelReturn} />

        <ViewAllTable className={"xl:hidden mt-8"} />
      </div>
    </DashboardLayout>
  );
}
