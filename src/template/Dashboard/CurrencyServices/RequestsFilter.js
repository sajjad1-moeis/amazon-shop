"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";

export default function RequestsFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search */}
      <div className="w-full md:max-w-80 md:flex-1 relative">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="جستجو بر اساس کد درخواست..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="pr-10"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {/* Service Type */}
        <Select
          value={filters.serviceType || undefined}
          onValueChange={(value) => handleFilterChange("serviceType", value)}
        >
          <SelectTrigger className="w-full md:w-fit gap-5" dir="rtl">
            <SelectValue placeholder="نوع خدمت" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="transfer">انتقال حواله</SelectItem>
            <SelectItem value="payment">پرداخت سرویس خارجی</SelectItem>
            <SelectItem value="exchange">تبدیل ارز</SelectItem>
          </SelectContent>
        </Select>
        {/* Status */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-full md:w-[140px]" dir="rtl">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent dir="rtl">
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="reviewing">در حال بررسی</SelectItem>
            <SelectItem value="successful">موفق</SelectItem>
            <SelectItem value="failed">ناموفق</SelectItem>
            <SelectItem value="pending">در انتظار</SelectItem>
          </SelectContent>
        </Select>

        {/* Date Range */}
        <Select
          value={filters.dateRange || undefined}
          onValueChange={(value) => handleFilterChange("dateRange", value)}
        >
          <SelectTrigger className="w-full md:w-fit gap-5" dir="rtl">
            <SelectValue placeholder="بازه تاریخ" />
          </SelectTrigger>
          <SelectContent dir="rtl">
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
