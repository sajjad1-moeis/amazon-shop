"use client";

import React from "react";
import DateFilterSelect from "@/components/FilterSelects/DateFilterSelect";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import FilterSection from "@/components/FilterSection";

const orderStatusOptions = [
  { value: "processing", label: "در حال پردازش" },
  { value: "to-dubai", label: "در مسیر دبی" },
  { value: "to-iran", label: "در مسیر ایران" },
  { value: "clearance", label: "ترخیص" },
  { value: "delivered", label: "تحویل شده" },
  { value: "returned", label: "مرجوعی" },
];

const paymentStatusOptions = [
  { value: "full", label: "پرداخت کامل" },
  { value: "partial", label: "پرداخت جزئی" },
  { value: "pending", label: "در انتظار پرداخت" },
];

export default function OrdersFilter({ filters, onFiltersChange }) {
  return (
    <div className="mt-6 sm:mt-8 md:mt-10">
      <FilterSection>
        {/* Search */}
        <FilterSearchInput
          value={filters.searchQuery || ""}
          onChange={(value) => onFiltersChange("searchQuery", value)}
          placeholder="جستجو بر اساس شماره سفارش یا نام محصول..."
        />

        {/* Time Range Filter */}
        <DateFilterSelect
          value={filters.timeRange || ""}
          onValueChange={(value) => onFiltersChange("timeRange", value)}
          placeholder="بازه زمانی"
          includeAll={true}
        />

        {/* Status Filter */}
        <StatusSelect
          value={filters.status || ""}
          onValueChange={(value) => onFiltersChange("status", value)}
          placeholder="وضعیت"
          options={orderStatusOptions}
          includeAll={true}
        />

        {/* Payment Status Filter */}
        <StatusSelect
          value={filters.paymentStatus || ""}
          onValueChange={(value) => onFiltersChange("paymentStatus", value)}
          placeholder="وضعیت پرداخت"
          options={paymentStatusOptions}
          includeAll={true}
        />
      </FilterSection>
    </div>
  );
}
