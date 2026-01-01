"use client";

import React from "react";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const categoryOptions = [
  { value: "electronics", label: "الکترونیک" },
  { value: "clothing", label: "پوشاک" },
  { value: "home", label: "خانه و آشپزخانه" },
];

const returnStatusOptions = [
  { value: "reviewing", label: "در حال بررسی" },
  { value: "approved", label: "تأیید شده" },
  { value: "rejected", label: "رد شده" },
];

export default function ReturnRequestsFilter({ filters, onFiltersChange, placeholder }) {
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
          placeholder={placeholder || "جستجو بر اساس شماره درخواست یا نام کالا..."}
        />

        {/* Category */}
        <StatusSelect
          value={filters.category || undefined}
          onValueChange={(value) => handleFilterChange("category", value)}
          placeholder="دسته بندی"
          options={categoryOptions}
          includeAll={true}
        />

        {/* Status */}
        <StatusSelect
          value={filters.status || undefined}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={returnStatusOptions}
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
