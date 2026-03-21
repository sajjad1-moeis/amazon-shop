"use client";

import React from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function CategorySearch({
  onSearch,
  searchValue,
  placeholder = "جستجو دسته بندی",
  compact = false,
}) {
  return (
    <div className="relative" dir="rtl">
      <div
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500",
          compact ? "right-2.5" : "right-3",
        )}
      >
        <SearchNormal1 size={compact ? 15 : 18} variant="Outline" />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearch?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-gray-200 bg-white text-right text-gray-900 transition-shadow placeholder:text-gray-400 focus:border-primary-400 focus:outline-none focus:ring-1 focus:ring-primary-500/40 dark:border-dark-stroke dark:bg-dark-field dark:text-dark-titre dark:placeholder:text-gray-500",
          compact
            ? "py-2 pr-9 pl-3 text-xs leading-normal dark:focus:ring-primary-400/30"
            : "py-2.5 pr-10 pl-4 text-sm focus:ring-2",
        )}
        dir="rtl"
      />
    </div>
  );
}

