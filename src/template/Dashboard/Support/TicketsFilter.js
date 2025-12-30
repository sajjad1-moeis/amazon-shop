"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";
import { filterInputStyles, filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function TicketsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search */}
      <div className="w-full md:flex-1 md:max-w-[500px] relative">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="جستجو بر اساس شماره تیکت یا موضوع..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className={`pr-10 ${filterInputStyles}`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Select value={filters.priority || undefined} onValueChange={(value) => handleFilterChange("priority", value)}>
          <SelectTrigger className={filterSelectTriggerStyles}>
            <SelectValue placeholder="اولویت" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="high">بالا</SelectItem>
            <SelectItem value="medium">متوسط</SelectItem>
            <SelectItem value="low">پایین</SelectItem>
          </SelectContent>
        </Select>
        {/* Status */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className={filterSelectTriggerStyles}>
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="pending">در حال پردازش</SelectItem>
            <SelectItem value="answered">پاسخ داده شده</SelectItem>
            <SelectItem value="closed">بسته شده</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filters.sortBy || undefined} onValueChange={(value) => handleFilterChange("sortBy", value)}>
          <SelectTrigger className={filterSelectTriggerStyles}>
            <SelectValue placeholder="مرتب سازی" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          </SelectContent>
        </Select>

        {/* Priority */}
      </div>

      {/* Search */}
    </div>
  );
}
