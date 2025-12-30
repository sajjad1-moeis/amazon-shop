"use client";

import React from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterInputStyles, filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function TransactionsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (name, value) => {
    onFiltersChange((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Search */}
      <div className="w-full md:flex-1 md:max-w-md">
        <div className="relative">
          <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            value={filters.searchQuery || ""}
            onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
            placeholder="جستجو بر اساس عنوان یا شماره تیکت..."
            className={`pr-10 ${filterInputStyles}`}
            dir="rtl"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Date Range */}

        {/* Transaction Type */}
        <Select
          value={filters.transactionType || undefined}
          onValueChange={(value) => handleFilterChange("transactionType", value)}
        >
          <SelectTrigger className={filterSelectTriggerStyles} dir="rtl">
            <SelectValue placeholder="نوع تراکنش" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles} dir="rtl">
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="charge">شارژ کیف پول</SelectItem>
            <SelectItem value="withdraw">برداشت</SelectItem>
            <SelectItem value="payment">پرداخت</SelectItem>
          </SelectContent>
        </Select>
        {/* Status */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className={filterSelectTriggerStyles} dir="rtl">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles} dir="rtl">
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="reviewing">در حال بررسی</SelectItem>
            <SelectItem value="answered">پاسخ داده شده</SelectItem>
            <SelectItem value="completed">تکمیل شده</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filters.dateRange || undefined}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
        >
          <SelectTrigger className={filterSelectTriggerStyles} dir="rtl">
            <SelectValue placeholder="بازه تاریخ" />
          </SelectTrigger>
          <SelectContent className={filterSelectContentStyles} dir="rtl">
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="today">امروز</SelectItem>
            <SelectItem value="week">این هفته</SelectItem>
            <SelectItem value="month">این ماه</SelectItem>
            <SelectItem value="year">امسال</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
