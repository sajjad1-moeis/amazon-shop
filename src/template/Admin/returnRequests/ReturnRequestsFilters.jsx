"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import StatusSelect from "@/components/FilterSelects/StatusSelect";

const RETURN_STATUS_OPTIONS = [
  { value: "1", label: "در انتظار بررسی" },
  { value: "2", label: "تایید شده" },
  { value: "3", label: "رد شده" },
  { value: "4", label: "پرداخت شده" },
  { value: "5", label: "لغو شده" },
];

export default function ReturnRequestsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const statusValue = searchParams.get("status") || "all";

  const updateURL = (updates) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "all" || value === undefined || value === "") {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    newParams.delete("page");
    const qs = newParams.toString();
    router.push(qs ? `/admin/return-requests?${qs}` : "/admin/return-requests");
  };

  const handleSearchChange = (value) => {
    updateURL({ search: value || undefined, status: statusValue });
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value, search: searchValue || undefined });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={searchValue}
        onChange={handleSearchChange}
        isAdmin
        placeholder="جستجو شماره درخواست، سفارش، نام یا موبایل مشتری"
      />
      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت درخواست"
        options={RETURN_STATUS_OPTIONS}
        includeAll
        isAdmin
      />
    </FilterSection>
  );
}












































