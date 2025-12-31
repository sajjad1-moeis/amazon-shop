"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

/**
 * سلکت وضعیت - قابل استفاده مجدد با options مختلف
 * @param {string} value - مقدار انتخاب شده
 * @param {function} onValueChange - تابع تغییر مقدار
 * @param {string} placeholder - متن placeholder (پیش‌فرض: "وضعیت")
 * @param {array} options - آرایه options به صورت [{value: "value", label: "label"}, ...]
 * @param {boolean} includeAll - آیا گزینه "همه" را شامل شود (پیش‌فرض: true)
 */
export default function StatusSelect({
  value,
  onValueChange,
  placeholder = "وضعیت",
  options = [],
  includeAll = true,
  isInDrawer = false,
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={isInDrawer ? "w-full " + filterSelectTriggerStyles : filterSelectTriggerStyles} dir="rtl">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={filterSelectContentStyles} dir="rtl">
        {includeAll && <SelectItem value="all">همه</SelectItem>}
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

