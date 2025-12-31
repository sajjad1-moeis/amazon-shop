"use client";

import React from "react";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
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
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <FilterSection>
      {/* Search */}
      <FilterSearchInput
        value={filters.searchQuery || ""}
        onChange={(value) => handleFilterChange("searchQuery", value)}
        placeholder="جستجو بر اساس نام محصول ..."
      />

      {/* Brand */}
      <StatusSelect
        value={filters.brand}
        onValueChange={(value) => handleFilterChange("brand", value)}
        placeholder="برند"
        options={brandOptions}
        includeAll={false}
      />

      {/* Tracking Status */}
      <StatusSelect
        value={filters.trackingStatus}
        onValueChange={(value) => handleFilterChange("trackingStatus", value)}
        placeholder="وضعیت ردیابی"
        options={trackingStatusOptions}
        includeAll={false}
      />

      {/* Sort By */}
      <SortBySelect
        value={filters.sortBy}
        onValueChange={(value) => handleFilterChange("sortBy", value)}
        placeholder="مرتب سازی"
        includePrice={true}
      />
    </FilterSection>
  );
}
