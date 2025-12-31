"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

export default function PurchasesFilter({ filters, onFiltersChange }) {
  return (
    <FilterSection>
      {/* Search */}
      <FilterSearchInput
        value={filters.searchQuery || ""}
        onChange={(value) => onFiltersChange("searchQuery", value)}
        placeholder="جستجو بر اساس نام محصول ..."
      />

      {/* Date Filter */}
      <DateFilterSelect
        value={filters.dateFilter || ""}
        onValueChange={(value) => onFiltersChange("dateFilter", value)}
        placeholder="تاریخ"
      />

      {/* Sort By */}
      <SortBySelect
        value={filters.sortBy || ""}
        onValueChange={(value) => onFiltersChange("sortBy", value)}
        placeholder="مرتب سازی"
        includePrice={true}
      />
    </FilterSection>
  );
}
