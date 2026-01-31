"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";

export default function BlogCommentsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchValue = searchParams.get("search") || "";

  const handleSearchChange = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    newParams.delete("page");
    router.push(`/admin/blog/comments?${newParams.toString()}`);
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو..." />
    </FilterSection>
  );
}















