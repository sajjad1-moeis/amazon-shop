"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const FILTER_OPTIONS = [
  { value: "all", label: "همه درخواست‌ها" },
  { value: "unread", label: "خوانده نشده" },
  { value: "read", label: "خوانده شده" },
];

export default function ContactUsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterValue = searchParams.get("filter") || "all";

  const updateURL = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      newParams.delete("filter");
    } else {
      newParams.set("filter", value);
    }
    newParams.delete("page");
    router.push(`/admin/contact-us?${newParams.toString()}`);
  };

  const handleFilterChange = (value) => {
    updateURL(value);
  };

  return (
    <Select value={filterValue} onValueChange={handleFilterChange}>
      <SelectTrigger className="bg-gray-700 border-gray-600 text-white w-fit gap-5 h-auto">
        <SelectValue placeholder="وضعیت" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        {FILTER_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
