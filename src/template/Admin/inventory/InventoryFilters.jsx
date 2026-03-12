"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import StatusSelect from "@/components/FilterSelects/StatusSelect";

const INVENTORY_STATUS_OPTIONS = [
  { value: "enough", label: "موجودی کافی" },
  { value: "low", label: "موجودی کم" },
  { value: "out", label: "ناموجود" },
];

export default function InventoryFilters() {
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
    router.push(`/admin/inventory?${newParams.toString()}`);
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={searchValue}
        onChange={(value) => updateURL({ search: value, status: statusValue })}
        isAdmin
        placeholder="جستجو محصول"
      />
      <StatusSelect
        value={statusValue}
        onValueChange={(value) => updateURL({ status: value, search: searchValue })}
        placeholder="وضعیت موجودی"
        options={INVENTORY_STATUS_OPTIONS}
        includeAll={true}
        isAdmin
      />
    </FilterSection>
  );
}
