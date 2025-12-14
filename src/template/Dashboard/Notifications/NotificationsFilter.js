"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";

export default function NotificationsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex justify-between flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="relative flex gap-2 border rounded-lg p-1">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="جستجو در عنوان اعلان..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="pr-10 border-none py-0  h-8"
        />
        <Select
          value={filters.allCategories || undefined}
          onValueChange={(value) => handleFilterChange("allCategories", value)}
        >
          <SelectTrigger className="w-fit min-w-32 py-0 h-8 border-y-0 border-l-0 rounded-none border-r">
            <SelectValue placeholder="همه دسته ها" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="orders">سفارش‌ها</SelectItem>
            <SelectItem value="tickets">تیکت‌ها</SelectItem>
            <SelectItem value="wallet">کیف پول</SelectItem>
            <SelectItem value="account">حساب کاربری</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div class="flex gap-2">
        {/* Time Range Filter */}
        <Select
          value={filters.timeRange || undefined}
          onValueChange={(value) => handleFilterChange("timeRange", value)}
        >
          <SelectTrigger className="gap-5 w-fit">
            <SelectValue placeholder="بازه زمانی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">این هفته</SelectItem>
            <SelectItem value="month">این ماه</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="gap-5 w-fit">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="read">خوانده شده</SelectItem>
            <SelectItem value="unread">خوانده نشده</SelectItem>
          </SelectContent>
        </Select>

        {/* Category Filter */}
        <Select value={filters.category || undefined} onValueChange={(value) => handleFilterChange("category", value)}>
          <SelectTrigger className="gap-5 w-fit">
            <SelectValue placeholder="دسته بندی" />
          </SelectTrigger>
          <SelectContent>
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
