"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";
import { Filter, Sort } from "iconsax-reactjs";

export default function SortBySelect({
  value,
  onValueChange,
  placeholder = "مرتب سازی",
  includeAll = false,
  includePrice = false,
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={filterSelectTriggerStyles} dir="rtl">
        <div className="flex items-center gap-2">
          <Sort size={20} className="md:hidden text-gray-400" />
          <div className="max-md:hidden">
            <SelectValue placeholder={placeholder} />
          </div>
        </div>
      </SelectTrigger>
      <SelectContent className={filterSelectContentStyles} dir="rtl">
        {includeAll && <SelectItem value="all">همه</SelectItem>}
        <SelectItem value="newest">جدیدترین</SelectItem>
        <SelectItem value="oldest">قدیمی‌ترین</SelectItem>
        {includePrice && (
          <>
            <SelectItem value="price-high">قیمت: بالا به پایین</SelectItem>
            <SelectItem value="price-low">قیمت: پایین به بالا</SelectItem>
          </>
        )}
      </SelectContent>
    </Select>
  );
}
