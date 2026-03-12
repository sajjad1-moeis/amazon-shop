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

/** مقادیر وضعیت باید با mapApiReturn در صفحه return-requests هماهنگ باشند (pending, approved, rejected, completed, cancelled) */
const returnStatusOptions = [
  { value: "pending", label: "در حال بررسی" },
  { value: "approved", label: "تأیید شده" },
  { value: "rejected", label: "رد شده" },
  { value: "completed", label: "تکمیل شده" },
  { value: "cancelled", label: "لغو شده" },
];

const defaultFilters = {
  searchQuery: "",
  category: "",
  status: "",
  sortBy: "",
};

export default function ReturnRequestsFilter({ filters, onFiltersChange, placeholder }) {
  const safeFilters = filters ?? defaultFilters;
  const handleFilterChange = (key, value) => {
    onFiltersChange?.(key, value === "all" ? "" : value);
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Search Input */}
        <FilterSearchInput
          value={safeFilters.searchQuery ?? ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder={placeholder || "جستجو بر اساس شماره درخواست یا نام کالا..."}
        />

        {/* Category */}
        <StatusSelect
          value={safeFilters.category ?? ""}
          onValueChange={(value) => handleFilterChange("category", value)}
          placeholder="دسته بندی"
          options={categoryOptions}
          includeAll={true}
        />

        {/* Status */}
        <StatusSelect
          value={safeFilters.status ?? ""}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={returnStatusOptions}
          includeAll={true}
        />

        {/* Sort By */}
        <SortBySelect
          value={safeFilters.sortBy ?? ""}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="مرتب سازی"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
