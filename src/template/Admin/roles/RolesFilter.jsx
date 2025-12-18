"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { SearchNormal1, Filter, CloseCircle } from "iconsax-reactjs";

export default function RolesFilter({ filters, onFiltersChange, onClear }) {
  const handleSearchChange = (value) => {
    onFiltersChange({ ...filters, searchTerm: value });
  };

  const handleStatusChange = (value) => {
    onFiltersChange({ ...filters, isActive: value === "all" ? null : value === "active" });
  };

  const handleSortByChange = (value) => {
    onFiltersChange({ ...filters, sortBy: value });
  };

  const handleSortOrderChange = (value) => {
    onFiltersChange({ ...filters, sortDescending: value === "desc" });
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter size={20} className="text-gray-400" />
        <h3 className="text-gray-300 font-medium">فیلترها</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* جستجو */}
        <div className="space-y-2">
          <Label className="text-gray-300">جستجو</Label>
          <div className="relative">
            <Input
              value={filters.searchTerm || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="جستجو در نام و توضیحات..."
              className="bg-gray-800 bg-opacity-50 border-gray-700 text-white pr-10"
              dir="rtl"
            />
            <SearchNormal1 size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* فیلتر وضعیت */}
        <div className="space-y-2">
          <Label className="text-gray-300">وضعیت</Label>
          <Select
            value={filters.isActive === null ? "all" : filters.isActive ? "active" : "inactive"}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="bg-gray-800 bg-opacity-50 border-gray-700 text-white">
              <SelectValue placeholder="همه" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">همه</SelectItem>
              <SelectItem value="active">فعال</SelectItem>
              <SelectItem value="inactive">غیرفعال</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* مرتب‌سازی بر اساس */}
        <div className="space-y-2">
          <Label className="text-gray-300">مرتب‌سازی بر اساس</Label>
          <Select value={filters.sortBy || "createdAt"} onValueChange={handleSortByChange}>
            <SelectTrigger className="bg-gray-800 bg-opacity-50 border-gray-700 text-white">
              <SelectValue placeholder="تاریخ ایجاد" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="createdAt">تاریخ ایجاد</SelectItem>
              <SelectItem value="name">نام نقش</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ترتیب مرتب‌سازی */}
        <div className="space-y-2">
          <Label className="text-gray-300">ترتیب</Label>
          <Select value={filters.sortDescending !== false ? "desc" : "asc"} onValueChange={handleSortOrderChange}>
            <SelectTrigger className="bg-gray-800 bg-opacity-50 border-gray-700 text-white">
              <SelectValue placeholder="نزولی" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">نزولی</SelectItem>
              <SelectItem value="asc">صعودی</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* دکمه پاک کردن فیلترها */}
      {(filters.searchTerm || filters.isActive !== null) && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClear}
            className="text-gray-300 border-gray-600 hover:bg-gray-700"
          >
            <CloseCircle size={16} className="ml-2" />
            پاک کردن فیلترها
          </Button>
        </div>
      )}
    </div>
  );
}
