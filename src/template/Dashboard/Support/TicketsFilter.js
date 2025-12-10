"use client";

import React from "react";
import { SearchNormal1, ArrowDown2 } from "iconsax-reactjs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function TicketsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {/* Sort By */}
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger className="w-[140px]" dir="rtl">
              <SelectValue placeholder="مرتب سازی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              <SelectItem value="priority">اولویت</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
            <SelectTrigger className="w-[140px]" dir="rtl">
              <SelectValue placeholder="وضعیت" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="reviewing">در حال بررسی</SelectItem>
              <SelectItem value="answered">پاسخ داده شده</SelectItem>
              <SelectItem value="pending">در انتظار</SelectItem>
              <SelectItem value="closed">بسته شده</SelectItem>
            </SelectContent>
          </Select>

          {/* Category Filter */}
          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="w-[140px]" dir="rtl">
              <SelectValue placeholder="دسته بندی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="financial">مالی</SelectItem>
              <SelectItem value="logistics">لجستیک</SelectItem>
              <SelectItem value="technical">فنی</SelectItem>
              <SelectItem value="general">عمومی</SelectItem>
            </SelectContent>
          </Select>

          {/* Search */}
          <div className="flex-1 md:flex-initial min-w-[200px] md:min-w-[300px]">
            <div className="relative">
              <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
                placeholder="جستجو بر اساس عنوان با شماره تیکت..."
                className="pr-10 pl-4"
                dir="rtl"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

