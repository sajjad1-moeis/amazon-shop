"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import StatusSelect from "@/components/FilterSelects/StatusSelect";

const STATUS_OPTIONS = [
  { value: "1", label: "در انتظار تأیید" },
  { value: "2", label: "تأیید شده" },
  { value: "3", label: "رد شده" },
  { value: "4", label: "اسپم" },
];

const BASE_PATH = "/admin/blog/comments";

export default function BlogCommentsFilters({ isInDrawer = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") || "";
  const statusValue = searchParams.get("status") || "1";

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || value === "" || value == null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    newParams.delete("page");
    const query = newParams.toString();
    router.push(query ? `${BASE_PATH}?${query}` : BASE_PATH);
  };

  const handleSearchChange = (value) => {
    updateURL({ search: value, status: statusValue });
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value || "1", search: searchValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={searchValue}
        onChange={handleSearchChange}
        isAdmin
        placeholder="جستجو نویسنده، متن یا عنوان پست..."
      />
      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت"
        options={STATUS_OPTIONS}
        includeAll={false}
        isInDrawer={isInDrawer}
        isAdmin
      />
    </FilterSection>
  );
}
