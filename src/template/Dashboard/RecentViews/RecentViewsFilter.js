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

export default function RecentViewsFilter({ filters, onFiltersChange }) {
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
          placeholder="جستجو در بازدیدهای اخیر..."
          value={filters.searchQuery || ""}
          onChange={(e) => handleFilterChange("searchQuery", e.target.value)}
          className="pr-10"
        />
      </div>

      {/* Date Range Filter */}
      <Select
        value={filters.dateRange || undefined}
        onValueChange={(value) => handleFilterChange("dateRange", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="بازه زمانی" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="today">امروز</SelectItem>
          <SelectItem value="week">این هفته</SelectItem>
          <SelectItem value="month">این ماه</SelectItem>
        </SelectContent>
      </Select>

      {/* Sort By Filter */}
      <Select
        value={filters.sortBy || undefined}
        onValueChange={(value) => handleFilterChange("sortBy", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="مرتب سازی" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">جدیدترین</SelectItem>
          <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
          <SelectItem value="price-high">بیشترین قیمت</SelectItem>
          <SelectItem value="price-low">کمترین قیمت</SelectItem>
        </SelectContent>
      </Select>

      {/* Date Range Filter */}
      <Select
        value={filters.dateRange || undefined}
        onValueChange={(value) => handleFilterChange("dateRange", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="بازه زمانی" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="today">امروز</SelectItem>
          <SelectItem value="week">این هفته</SelectItem>
          <SelectItem value="month">این ماه</SelectItem>
        </SelectContent>
      </Select>

      {/* Category Filter */}
      <Select
        value={filters.category || undefined}
        onValueChange={(value) => handleFilterChange("category", value)}
      >
        <SelectTrigger className="w-full md:w-48">
          <SelectValue placeholder="دسته بندی" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">همه</SelectItem>
          <SelectItem value="electronics">الکترونیک</SelectItem>
          <SelectItem value="clothing">پوشاک</SelectItem>
          <SelectItem value="home">خانه و آشپزخانه</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

