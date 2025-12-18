"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "all", label: "همه تیکت‌ها" },
  { value: "open", label: "تیکت‌های باز" },
  { value: "closed", label: "تیکت‌های بسته" },
];

export default function TicketsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const statusValue = searchParams.get("status") || "all";

  const updateURL = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === "all" || !value) {
      newParams.delete("status");
    } else {
      newParams.set("status", value);
    }
    newParams.delete("page");
    router.push(`/admin/tickets?${newParams.toString()}`);
  };

  const handleStatusChange = (value) => {
    updateURL(value);
  };

  return (
    <Select value={statusValue} onValueChange={handleStatusChange}>
      <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[160px]">
        <SelectValue placeholder="وضعیت" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border-gray-700">
        {STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}





