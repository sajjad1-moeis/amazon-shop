"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";

export default function OrdersFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col justify-between md:flex-row gap-4 mt-10">
      {/* Search */}
      <div className="min-w-80 relative">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="جستجو بر اساس شماره سفارش یا نام محصول..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="pr-10"
        />
      </div>

      <div class="flex-center gap-3">
        {/* Time Range Filter */}
        <Select
          value={filters.timeRange || undefined}
          onValueChange={(value) => handleFilterChange("timeRange", value)}
        >
          <SelectTrigger className="w-fit gap-4">
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

        {/* Status Filter */}
        <Select value={filters.status || undefined} onValueChange={(value) => handleFilterChange("status", value)}>
          <SelectTrigger className="w-fit gap-4">
            <SelectValue placeholder="وضعیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="processing">در حال پردازش</SelectItem>
            <SelectItem value="to-dubai">در مسیر دبی</SelectItem>
            <SelectItem value="to-iran">در مسیر ایران</SelectItem>
            <SelectItem value="clearance">ترخیص</SelectItem>
            <SelectItem value="delivered">تحویل شده</SelectItem>
            <SelectItem value="returned">مرجوعی</SelectItem>
          </SelectContent>
        </Select>

        {/* Payment Status Filter */}
        <Select
          value={filters.paymentStatus || undefined}
          onValueChange={(value) => handleFilterChange("paymentStatus", value)}
        >
          <SelectTrigger className="w-fit gap-4">
            <SelectValue placeholder="وضعیت پرداخت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="full">پرداخت کامل</SelectItem>
            <SelectItem value="partial">پرداخت جزئی</SelectItem>
            <SelectItem value="pending">در انتظار پرداخت</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
