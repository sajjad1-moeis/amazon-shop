"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const statusOptions = [
  { value: "pending", label: "در انتظار بررسی" },
  { value: "approved", label: "تأیید شده" },
  { value: "rejected", label: "رد شده" },
  { value: "processing", label: "در حال پردازش" },
];

export default function ExclusiveAmazonFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="mt-6 sm:mt-8 md:mt-10">
      <FilterSection>
        {/* Search Input */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="جستجو نام محصول..."
        />

        {/* Time Range Filter */}
        <DateFilterSelect
          value={filters.timeRange || filters.dateRange || ""}
          onValueChange={(value) => {
            handleFilterChange("timeRange", value);
            handleFilterChange("dateRange", value);
          }}
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
      </FilterSection>
    </div>
  );
}
