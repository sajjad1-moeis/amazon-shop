"use client";

import React from "react";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import FilterSection from "@/components/FilterSection";

const statusOptions = [
  { value: "approved", label: "تأیید شده" },
  { value: "pending", label: "در حال بررسی" },
  { value: "rejected", label: "رد شده" },
];

export default function CommentsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Status Filter */}
        <StatusSelect
          value={filters.status || ""}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={statusOptions}
          includeAll={true}
        />

        {/* Sort By Filter */}
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
