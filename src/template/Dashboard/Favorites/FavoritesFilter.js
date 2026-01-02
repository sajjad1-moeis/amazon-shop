"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const brandOptions = [
  { value: "sony", label: "SONY" },
  { value: "microsoft", label: "Microsoft" },
  { value: "nintendo", label: "Nintendo" },
];

const trackingStatusOptions = [
  { value: "active", label: "فعال" },
  { value: "inactive", label: "غیرفعال" },
];

export default function FavoritesFilter({ filters, onFiltersChange }) {
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
          placeholder="جستجو بر اساس نام محصول..."
        />

        {/* Brand */}
        <StatusSelect
          value={filters.brand || ""}
          onValueChange={(value) => handleFilterChange("brand", value)}
          placeholder="برند"
          options={brandOptions}
          includeAll={true}
        />

        {/* Tracking Status */}
        <StatusSelect
          value={filters.trackingStatus || ""}
          onValueChange={(value) => handleFilterChange("trackingStatus", value)}
          placeholder="وضعیت ردیابی"
          options={trackingStatusOptions}
          includeAll={true}
        />

        {/* Sort By */}
        <SortBySelect
          value={filters.sortBy || ""}
          onValueChange={(value) => handleFilterChange("sortBy", value)}
          placeholder="مرتب سازی"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
