"use client";

import React from "react";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const ticketPriorityOptions = [
  { value: "high", label: "بالا" },
  { value: "medium", label: "متوسط" },
  { value: "low", label: "پایین" },
];

const ticketStatusOptions = [
  { value: "pending", label: "در حال پردازش" },
  { value: "answered", label: "پاسخ داده شده" },
  { value: "closed", label: "بسته شده" },
];

export default function TicketsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <FilterSection>
      {/* Search */}
      <FilterSearchInput
        value={filters.searchQuery || ""}
        onChange={(value) => handleFilterChange("searchQuery", value)}
        placeholder="جستجو بر اساس شماره تیکت یا موضوع..."
      />

      {/* Priority */}
      <StatusSelect
        value={filters.priority || undefined}
        onValueChange={(value) => handleFilterChange("priority", value)}
        placeholder="اولویت"
        options={ticketPriorityOptions}
        includeAll={true}
      />

      {/* Status */}
      <StatusSelect
        value={filters.status || undefined}
        onValueChange={(value) => handleFilterChange("status", value)}
        placeholder="وضعیت"
        options={ticketStatusOptions}
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
  );
}
