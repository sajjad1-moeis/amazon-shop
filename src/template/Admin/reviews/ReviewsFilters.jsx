"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import StatusSelect from "@/components/FilterSelects/StatusSelect";

/** status مطابق doc: ۱=Pending، ۲=Approved، ۳=Rejected، ۴=Spam */
const REVIEW_STATUS_OPTIONS = [
  { value: "pending", label: "در انتظار" },
  { value: "approved", label: "تایید شده" },
  { value: "rejected", label: "رد شده" },
  { value: "spam", label: "اسپم" },
];

export default function ReviewsFilters() {
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
    router.push(`/admin/reviews?${newParams.toString()}`);
  };

  const handleSearchChange = (value) => {
    updateURL({ search: value, status: statusValue });
  };

  const handleStatusChange = (value) => {
    updateURL({ status: value, search: searchValue });
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو نظر" />
      <StatusSelect
        value={statusValue}
        onValueChange={handleStatusChange}
        placeholder="وضعیت نظر"
        options={REVIEW_STATUS_OPTIONS}
        includeAll={true}
        isAdmin
      />
    </FilterSection>
  );
}
