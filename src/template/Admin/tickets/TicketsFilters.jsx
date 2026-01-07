"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";

const STATUS_OPTIONS = [
  { value: "open", label: "تیکت‌های باز" },
  { value: "closed", label: "تیکت‌های بسته" },
];

export default function TicketsFilters({ isInDrawer = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

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
    router.push(`/admin/tickets?${newParams.toString()}`);
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value });
  };

  const searchValue = searchParams.get("search") || "";

  const handleSearchChange = (value) => {
    updateURL({ search: value, status: statusValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو نام" />

      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت"
        options={STATUS_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
    </FilterSection>
  );
}
