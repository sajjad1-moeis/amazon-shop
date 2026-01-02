"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const statusOptions = [
  { value: "processing", label: "در حال پردازش" },
  { value: "to-dubai", label: "در مسیر دبی" },
  { value: "to-iran", label: "در مسیر ایران" },
  { value: "clearance", label: "ترخیص" },
  { value: "delivered", label: "تحویل شده" },
  { value: "returned", label: "مرجوعی" },
];

const paymentStatusOptions = [
  { value: "full", label: "پرداخت کامل" },
  { value: "partial", label: "پرداخت جزئی" },
  { value: "pending", label: "در انتظار پرداخت" },
];

export default function OrdersFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="mb-4 sm:mb-6 mt-10">
      <FilterSection>
        {/* Search Input */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="جستجو بر اساس شماره سفارش یا نام محصول..."
        />

        {/* Time Range Filter */}
        <DateFilterSelect
          value={filters.timeRange || ""}
          onValueChange={(value) => handleFilterChange("timeRange", value)}
          placeholder="بازه زمانی"
          includeAll={true}
        />

        {/* Status Filter */}
        <StatusSelect
          value={filters.status || ""}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={statusOptions}
          includeAll={true}
        />

        {/* Payment Status Filter */}
        <StatusSelect
          value={filters.paymentStatus || ""}
          onValueChange={(value) => handleFilterChange("paymentStatus", value)}
          placeholder="وضعیت پرداخت"
          options={paymentStatusOptions}
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
