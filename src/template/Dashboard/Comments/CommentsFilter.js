"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function CommentsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex gap-2 md:gap-4">
      {/* Status Filter - Right */}
      <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
        <SelectTrigger className={filterSelectTriggerStyles}>
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className={filterSelectContentStyles}>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="approved">تأیید شده</SelectItem>
          <SelectItem value="pending">در حال بررسی</SelectItem>
          <SelectItem value="rejected">رد شده</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By Filter - Left */}
      <Select value={filters.sortBy || undefined} onValueChange={(value) => handleFilterChange("sortBy", value)}>
        <SelectTrigger className={filterSelectTriggerStyles}>
          <SelectValue placeholder="مرتب سازی" />
        </SelectTrigger>
        <SelectContent className={filterSelectContentStyles}>
          <SelectItem value="newest">جدیدترین</SelectItem>
          <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
