"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";

export default function InvoicesFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <SearchNormal1
          size={20}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
        />
        <Input
          type="text"
          placeholder="جستجو بر اساس شماره فاکتور..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Status Filter */}
      <Select
        value={filters.status || undefined}
        onValueChange={(value) => handleFilterChange("status", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="وضعیت پرداخت" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="paid">پرداخت شده</SelectItem>
          <SelectItem value="pending">در انتظار پرداخت</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Filter */}
      <Select
        value={filters.dateRange || undefined}
        onValueChange={(value) => handleFilterChange("dateRange", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="بازه تاریخ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="today">امروز</SelectItem>
          <SelectItem value="week">این هفته</SelectItem>
          <SelectItem value="month">این ماه</SelectItem>
          <SelectItem value="year">امسال</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By Filter */}
      <Select
        value={filters.sortBy || undefined}
        onValueChange={(value) => handleFilterChange("sortBy", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="مرتب‌سازی" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">جدیدترین</SelectItem>
          <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          <SelectItem value="amount-high">بیشترین مبلغ</SelectItem>
          <SelectItem value="amount-low">کمترین مبلغ</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

