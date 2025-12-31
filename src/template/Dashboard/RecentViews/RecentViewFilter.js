"use client";

import React from "react";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const categoryOptions = [
  { value: "electronics", label: "الکترونیک" },
  { value: "clothing", label: "پوشاک" },
  { value: "home", label: "خانه و آشپزخانه" },
];

export default function RecentViewFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value === "all" ? "" : value }));
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Search Input */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="جستجو بر اساس نام محصول..."
        />

        {/* Category */}
        <StatusSelect
          value={filters.category || undefined}
          onValueChange={(value) => handleFilterChange("category", value)}
          placeholder="دسته بندی"
          options={categoryOptions}
          includeAll={true}
        />

        {/* Date Range */}
        <DateFilterSelect
          value={filters.dateRange || undefined}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
          placeholder="بازه زمانی"
          includeAll={true}
        />

        {/* Sort By */}
        <SortBySelect
          value={filters.sortBy || undefined}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="مرتب سازی"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
