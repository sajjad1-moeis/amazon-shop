"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

export default function PurchasesFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Search */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="جستجو بر اساس نام محصول ..."
        />

        {/* Date Filter */}
        <DateFilterSelect
          value={filters.dateFilter || ""}
          onValueChange={(value) => handleFilterChange("dateFilter", value)}
          placeholder="تاریخ"
          includeAll={true}
        />

        {/* Sort By */}
        <SortBySelect
          value={filters.sortBy || ""}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="مرتب سازی"
          includePrice={true}
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
