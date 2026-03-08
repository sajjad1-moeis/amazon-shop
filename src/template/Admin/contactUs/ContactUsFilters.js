"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";

const CONTACT_US_PATH = "/admin/contact-us";

const FILTER_OPTIONS = [
  { value: "all", label: "همه درخواست‌ها" },
  { value: "unread", label: "خوانده نشده" },
  { value: "read", label: "خوانده شده" },
];

export default function ContactUsFilters({ isInDrawer = false }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterValue = searchParams.get("filter") || "all";
  const searchValue = searchParams.get("search") || "";

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
    router.push(`${CONTACT_US_PATH}?${newParams.toString()}`);
  };

  const handleStatusChange = (value) => {
    updateURL({ filter: value, search: searchValue });
  };

  const handleSearchChange = (value) => {
    updateURL({ search: value, filter: filterValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput
        value={searchValue}
        onChange={handleSearchChange}
        isAdmin
        placeholder="جستجو نام، ایمیل یا متن پیام..."
      />
      <StatusSelect
        value={filterValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت"
        options={FILTER_OPTIONS}
        includeAll={false}
        isInDrawer={isInDrawer}
        isAdmin
      />
    </FilterSection>
  );
}
