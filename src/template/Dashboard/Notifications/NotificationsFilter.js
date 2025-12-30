"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";
import { filterInputStyles, filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function NotificationsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search */}
      <div
        className={`relative flex flex-col sm:flex-row gap-2 border rounded-lg p-1 w-full md:w-auto  ${filterInputStyles}`}
      >
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="جستجو در عنوان اعلان..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className={`pr-10 border-none py-0 h-8 bg-transparent`}
        />
        <Select
          value={filters.allCategories || undefined}
          onValueChange={(value) => handleFilterChange("allCategories", value)}
        >
          <SelectTrigger className="w-fit min-w-32 py-0 h-8 bg-transparent border-y-0 border-l-0 dark:border-dark-stroke rounded-none border-r">
            <SelectValue placeholder="همه دسته ها" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="orders">سفارش‌ها</SelectItem>
            <SelectItem value="tickets">تیکت‌ها</SelectItem>
            <SelectItem value="wallet">کیف پول</SelectItem>
            <SelectItem value="account">حساب کاربری</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Time Range Filter */}
        <Select
          value={filters.timeRange || undefined}
          onValueChange={(value) => handleFilterChange("timeRange", value)}
        >
          <SelectTrigger className={filterSelectTriggerStyles}>
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">این هفته</SelectItem>
            <SelectItem value="month">این ماه</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className={filterSelectTriggerStyles}>
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="read">خوانده شده</SelectItem>
            <SelectItem value="unread">خوانده نشده</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={filters.category || undefined} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className={filterSelectTriggerStyles}>
            <SelectValue placeholder="دسته بندی" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles}>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="orders">سفارش‌ها</SelectItem>
            <SelectItem value="tickets">تیکت‌ها</SelectItem>
            <SelectItem value="wallet">کیف پول</SelectItem>
            <SelectItem value="account">حساب کاربری</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
