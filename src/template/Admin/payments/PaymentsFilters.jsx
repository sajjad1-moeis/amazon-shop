"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import StatusSelect from "@/components/FilterSelects/StatusSelect";

const PAYMENT_STATUS_OPTIONS = [
  { value: "success", label: "موفق" },
  { value: "failed", label: "ناموفق" },
  { value: "pending", label: "در انتظار" },
  { value: "refund", label: "بازگشت وجه" },
];

export default function PaymentsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const statusValue = searchParams.get("status") || "all";

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());

    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || !value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });

    newParams.delete("page");
    router.push(`/admin/payments?${newParams.toString()}`);
  };

  const handleSearchChange = (value) => {
    updateURL({ search: value, status: statusValue });
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value, search: searchValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو پرداخت" />
      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت پرداخت"
        options={PAYMENT_STATUS_OPTIONS}
        includeAll={true}
        isAdmin
      />
    </FilterSection>
  );
}
