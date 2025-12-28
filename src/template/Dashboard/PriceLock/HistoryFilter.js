"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";

export default function HistoryFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search - Right */}
      <div className="flex-1 md:flex-initial min-w-[200px] md:min-w-[300px]">
        <div className="relative">
          <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={filters.searchQuery || ""}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            placeholder="جستجو نام محصول ..."
            className="pr-10 pl-4"
            dir="rtl"
          />
        </div>
      </div>

      {/* Filters - Left */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
        {/* Time Range */}
        <Select value={filters.timeRange || ""} onValueChange={(value) => handleFilterChange("timeRange", value)}>
          <SelectTrigger className="w-[140px]" dir="rtl">
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">این هفته</SelectItem>
            <SelectItem value="month">این ماه</SelectItem>
            <SelectItem value="year">امسال</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={filters.status || ""} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-[140px]" dir="rtl">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="active">فعال</SelectItem>
            <SelectItem value="inactive">غیر فعال</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}


