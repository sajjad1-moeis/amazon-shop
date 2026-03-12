"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import StatusSelect from "@/components/FilterSelects/StatusSelect";

const ORDER_STATUS_OPTIONS = [
  { value: "1", label: "در انتظار" },
  { value: "2", label: "پرداخت شده" },
  { value: "3", label: "در حال پردازش" },
  { value: "4", label: "ارسال شده" },
  { value: "5", label: "تحویل شده" },
  { value: "6", label: "لغو شده" },
  { value: "7", label: "بازگشت داده شده" },
  { value: "8", label: "ناموفق" },
];

export default function OrdersFilters() {
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
    router.push(`/admin/orders?${newParams.toString()}`);
  };

  const handleSearchChange = (value) => {
    updateURL({ search: value, status: statusValue });
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value, search: searchValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو نام" />
      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت سفارش"
        options={ORDER_STATUS_OPTIONS}
        includeAll={true}
        isAdmin
      />
    </FilterSection>
  );
}












































