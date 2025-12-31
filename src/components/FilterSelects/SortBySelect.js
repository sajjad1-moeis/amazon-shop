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
  isInDrawer = false,
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={isInDrawer ? "w-full " + filterSelectTriggerStyles : filterSelectTriggerStyles} dir="rtl">
        {isInDrawer ? (
          <SelectValue placeholder={placeholder} />
        ) : (
          <div className="flex items-center gap-2 w-full">
            <Sort size={20} className="md:hidden text-gray-400 flex-shrink-0" />
            <SelectValue placeholder={placeholder} className="flex-1" />
          </div>
        )}
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
