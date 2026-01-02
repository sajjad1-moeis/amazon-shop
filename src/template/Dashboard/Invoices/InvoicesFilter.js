"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const paymentStatusOptions = [
  { value: "paid", label: "پرداخت شده" },
  { value: "pending", label: "در انتظار پرداخت" },
];

export default function InvoicesFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Search Input */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="جستجو بر اساس شماره فاکتور..."
        />

        {/* Payment Status Filter */}
        <StatusSelect
          value={filters.status || ""}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت پرداخت"
          options={paymentStatusOptions}
          includeAll={true}
        />

        {/* Date Range Filter */}
        <DateFilterSelect
          value={filters.dateRange || ""}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
          placeholder="بازه تاریخ"
          includeAll={true}
        />

        {/* Sort By Filter */}
        <SortBySelect
          value={filters.sortBy || ""}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="مرتب‌سازی"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
