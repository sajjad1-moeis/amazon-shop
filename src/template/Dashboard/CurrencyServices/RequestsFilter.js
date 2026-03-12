"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const SERVICE_TYPE_OPTIONS = [
  { value: "1", label: "تبدیل ارز" },
  { value: "2", label: "پرداخت آنلاین" },
  { value: "3", label: "شارژ حساب ارزی" },
  { value: "4", label: "پرداخت آمازون" },
  { value: "5", label: "تسویه بین‌المللی" },
  { value: "6", label: "پرداخت سرویس‌های خارجی" },
  { value: "7", label: "پرداخت ارزی بین‌المللی" },
];

const STATUS_OPTIONS = [
  { value: "1", label: "در انتظار" },
  { value: "2", label: "در حال بررسی" },
  { value: "3", label: "تأیید شده" },
  { value: "4", label: "در حال پردازش" },
  { value: "5", label: "تکمیل شده" },
  { value: "6", label: "رد شده" },
  { value: "7", label: "لغو شده" },
];

export default function RequestsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange(key, value === "all" ? "" : value);
  };

  return (
    <div className="mb-4 sm:mb-6">
      <FilterSection>
        {/* Search */}
        <FilterSearchInput
          value={filters?.searchQuery ?? ""}
          onChange={(value) => handleFilterChange("searchQuery", value)}
          placeholder="کد درخواست..."
        />

        {/* Service Type */}
        <StatusSelect
          value={filters?.serviceType ?? ""}
          onValueChange={(value) => handleFilterChange("serviceType", value)}
          placeholder="نوع خدمت"
          options={SERVICE_TYPE_OPTIONS}
          includeAll={true}
        />

        {/* Status */}
        <StatusSelect
          value={filters?.status ?? ""}
          onValueChange={(value) => handleFilterChange("status", value)}
          placeholder="وضعیت"
          options={STATUS_OPTIONS}
          includeAll={true}
        />

        {/* Date Range */}
        <DateFilterSelect
          value={filters?.dateRange ?? ""}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
          placeholder="بازه تاریخ"
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
