"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import FilterSection from "@/components/FilterSection";

const messageTypeOptions = [
  { value: "support", label: "پشتیبانی" },
  { value: "payment", label: "پرداخت" },
  { value: "order", label: "سفارشات" },
];

export default function MessagesFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange(key, value === "all" ? "" : value);
  };

  return (
    <div className="mt-6 sm:mt-8 md:mt-10">
      <FilterSection>
        {/* Search Input */}
        <FilterSearchInput
          value={filters?.searchQuery ?? ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="جستجو بر اساس عنوان پیام..."
        />

        {/* Date Range Filter */}
        <DateFilterSelect
          value={filters?.dateRange ?? ""}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
          placeholder="بازه زمانی"
          includeAll={true}
        />

        {/* Sort By Filter */}
        <SortBySelect
          value={filters?.sortBy ?? ""}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="مرتب سازی"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
