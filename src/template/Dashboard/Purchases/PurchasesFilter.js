"use client";

import React from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { filterInputStyles, filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function PurchasesFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Filters */}

        {/* Search */}
        <div className="flex-1 md:flex-initial min-w-[200px] md:min-w-[300px]">
          <div className="relative">
            <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
              placeholder="جستجو بر اساس نام محصول ..."
              className={`pr-10 pl-4 ${filterInputStyles}`}
              dir="rtl"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sort By */}
          {/* Date Filter */}
          <Select value={filters.dateFilter} onValueChange={(value) => handleFilterChange("dateFilter", value)}>
            <SelectTrigger className={filterSelectTriggerStyles} dir="rtl">
              <SelectValue placeholder="تاریخ" />
            </SelectTrigger>
            <SelectContent className={filterSelectContentStyles}>
              <SelectItem value="today">امروز</SelectItem>
              <SelectItem value="week">این هفته</SelectItem>
              <SelectItem value="month">این ماه</SelectItem>
              <SelectItem value="year">امسال</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger className={filterSelectTriggerStyles} dir="rtl">
              <SelectValue placeholder="مرتب سازی" />
            </SelectTrigger>
            <SelectContent className={filterSelectContentStyles}>
              <SelectItem value="newest">جدیدترین</SelectItem>
              <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
              <SelectItem value="price-high">قیمت: بالا به پایین</SelectItem>
              <SelectItem value="price-low">قیمت: پایین به بالا</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
