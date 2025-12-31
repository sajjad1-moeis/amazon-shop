"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const invoiceStatusOptions = [
  { value: "paid", label: "پرداخت شده" },
  { value: "pending", label: "در انتظار پرداخت" },
];

const invoiceSortOptions = [
  { value: "newest", label: "جدیدترین" },
  { value: "oldest", label: "قدیمی‌ترین" },
  { value: "amount-high", label: "بیشترین مبلغ" },
  { value: "amount-low", label: "کمترین مبلغ" },
];

export default function InvoicesFilter({ filters, onFiltersChange }) {
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
        placeholder="جستجو بر اساس شماره فاکتور..."
      />

      {/* Status Filter */}
      <StatusSelect
        value={filters.status || undefined}
        onValueChange={(value) => handleFilterChange("status", value)}
        placeholder="وضعیت پرداخت"
        options={invoiceStatusOptions}
        includeAll={true}
      />

      {/* Date Range Filter */}
      <DateFilterSelect
        value={filters.dateRange || undefined}
        onValueChange={(value) => handleFilterChange("dateRange", value)}
        placeholder="بازه تاریخ"
        includeAll={true}
      />

      {/* Sort By Filter - استفاده از StatusSelect با options سفارشی */}
      <StatusSelect
        value={filters.sortBy || undefined}
        onValueChange={(value) => handleFilterChange("sortBy", value)}
        placeholder="مرتب‌سازی"
        options={invoiceSortOptions}
        includeAll={false}
      />
    </FilterSection>
  );
}
