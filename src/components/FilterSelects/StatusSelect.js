"use client";

import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  filterSelectTriggerStyles,
  filterSelectContentStyles,
  adminFilterSelectTriggerStyles,
  adminFilterSelectContentStyles,
} from "@/utils/filterStyles";

export default function StatusSelect({
  value,
  onValueChange,
  placeholder = "وضعیت",
  options = [],
  includeAll = true,
  isInDrawer = false,
  isAdmin,
}) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger
        className={
          isAdmin
            ? adminFilterSelectTriggerStyles
            : isInDrawer
            ? "w-full " + filterSelectTriggerStyles
            : filterSelectTriggerStyles
        }
        dir="rtl"
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className={isAdmin ? adminFilterSelectContentStyles : filterSelectContentStyles} dir="rtl">
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
