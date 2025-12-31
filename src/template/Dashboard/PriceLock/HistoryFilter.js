"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const statusOptions = [
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیر فعال" },
];

export default function HistoryFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
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
  );
}
