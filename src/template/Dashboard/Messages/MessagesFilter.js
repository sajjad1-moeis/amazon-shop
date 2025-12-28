"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchNormal1 } from "iconsax-reactjs";

export default function MessagesFilter({ filters, onFiltersChange }) {
  const handleFilterChange = (key, value) => {
    onFiltersChange((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Search */}
      <div className="w-full md:flex-1 md:max-w-[500px] relative">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="جستجو بر اساس عنوان پیام ..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="pr-10"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Sort By Filter */}
        <Select value={filters.sortBy || undefined} onValueChange={(value) => handleFilterChange("sortBy", value)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="مرتب سازی" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="newest">جدیدترین</SelectItem>
            <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          </SelectContent>
        </Select>

        {/* Message Type Filter */}
        <Select
          value={filters.messageType || undefined}
          onValueChange={(value) => handleFilterChange("messageType", value)}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="نوع پیام" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه</SelectItem>
            <SelectItem value="support">پشتیبانی</SelectItem>
            <SelectItem value="payment">پرداخت</SelectItem>
            <SelectItem value="order">سفارشات</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

