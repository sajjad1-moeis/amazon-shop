"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const transactionTypeOptions = [
  { value: "charge", label: "شارژ کیف پول" },
  { value: "withdraw", label: "برداشت" },
  { value: "refund", label: "بازگشت وجه" },
  { value: "reward", label: "پاداش" },
  { value: "discount", label: "تخفیف" },
];

const transactionStatusOptions = [
  { value: "pending", label: "در انتظار" },
  { value: "processing", label: "در حال پردازش" },
  { value: "completed", label: "تکمیل شده" },
  { value: "failed", label: "ناموفق" },
];

export default function TransactionsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange(key, value === "all" ? "" : value);
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Search */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="شماره یا عنوان تراکنش..."
        />

        {/* Transaction Type */}
        <StatusSelect
          value={filters.transactionType || ""}
          onValueChange={(value) => handleFilterChange("transactionType", value)}
          placeholder="نوع تراکنش"
          options={transactionTypeOptions}
          includeAll={true}
        />

        {/* Status */}
        <StatusSelect
          value={filters.status || ""}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={transactionStatusOptions}
          includeAll={true}
        />

        {/* Date Range */}
        <DateFilterSelect
          value={filters.dateRange || ""}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
          placeholder="بازه تاریخ"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
