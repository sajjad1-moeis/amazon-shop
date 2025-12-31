"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const categoryOptions = [
  { value: "orders", label: "سفارش‌ها" },
  { value: "tickets", label: "تیکت‌ها" },
  { value: "wallet", label: "کیف پول" },
  { value: "account", label: "حساب کاربری" },
];

const statusOptions = [
  { value: "read", label: "خوانده شده" },
  { value: "unread", label: "خوانده نشده" },
];

export default function NotificationsFilter({ filters, onFiltersChange }) {
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
          placeholder="جستجو در عنوان اعلان..."
        />

        {/* Category */}
        <StatusSelect
          value={filters.category || filters.allCategories || undefined}
          onValueChange={(value) => {
            handleFilterChange("category", value);
            handleFilterChange("allCategories", value);
          }}
          placeholder="دسته بندی"
          options={categoryOptions}
          includeAll={true}
        />

        {/* Status */}
        <StatusSelect
          value={filters.status || undefined}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={statusOptions}
          includeAll={true}
        />

        {/* Date Range */}
        <DateFilterSelect
          value={filters.timeRange || filters.dateRange || undefined}
          onValueChange={(value) => {
            handleFilterChange("timeRange", value);
            handleFilterChange("dateRange", value);
          }}
          placeholder="بازه زمانی"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
