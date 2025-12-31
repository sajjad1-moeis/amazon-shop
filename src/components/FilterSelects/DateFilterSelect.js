"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";

export default function DateFilterSelect({
  value,
  onValueChange,
  placeholder = "تاریخ",
  includeAll = false,
  isInDrawer = false,
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={isInDrawer ? "w-full " + filterSelectTriggerStyles : filterSelectTriggerStyles}
        dir="rtl"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={filterSelectContentStyles} dir="rtl">
        {includeAll && <SelectItem value="all">همه</SelectItem>}
        <SelectItem value="today">امروز</SelectItem>
        <SelectItem value="week">این هفته</SelectItem>
        <SelectItem value="month">این ماه</SelectItem>
        <SelectItem value="year">امسال</SelectItem>
      </SelectContent>
    </Select>
  );
}
