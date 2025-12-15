"use client";

import React from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function ReturnRequestsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value === "all" ? "" : value }));
  };

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Search Input */}
      <div className="w-full md:w-1/2 relative">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={filters.searchQuery || ""}
          onChange={(e) => onFiltersChange((prev) => ({ ...prev, searchQuery: e.target.value }))}
          placeholder="جستجو بر اساس شماره درخواست یا نام کالا...."
          className="pr-10"
          dir="rtl"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Sort By */}
        <Select value={filters.sortBy || undefined} onValueChange={(value) => handleFilterChange("sortBy", value)}>
          <SelectTrigger className="w-fit  gap-5" dir="rtl">
            <SelectValue placeholder="مرتب سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-fit  gap-5" dir="rtl">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="reviewing">در حال بررسی</SelectItem>
            <SelectItem value="approved">تأیید شده</SelectItem>
            <SelectItem value="rejected">رد شده</SelectItem>
          </SelectContent>
        </Select>

        {/* Category */}
        <Select value={filters.category || undefined} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="w-fit  gap-5" dir="rtl">
            <SelectValue placeholder="دسته بندی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="electronics">الکترونیک</SelectItem>
            <SelectItem value="clothing">پوشاک</SelectItem>
            <SelectItem value="home">خانه و آشپزخانه</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* New Request Button */}
    </div>
  );
}
