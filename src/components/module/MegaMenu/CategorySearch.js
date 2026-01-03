"use client";

import React from "react";
import { SearchNormal1 } from "iconsax-reactjs";

export default function CategorySearch({ onSearch, searchValue, placeholder = "جستجو دسته بندی" }) {
  return (
    <div className="relative" dir="rtl">
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
        <SearchNormal1 size={18} />
      </div>
      <input
        type="text"
        value={searchValue}
        onChange={(e) => onSearch?.(e.target.value)}
        placeholder={placeholder}
        className="w-full pr-10 pl-4 py-2.5 border border-gray-300 dark:border-dark-stroke rounded-lg bg-white dark:bg-dark-field text-sm text-gray-900 dark:text-dark-titre placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-right"
        dir="rtl"
      />
    </div>
  );
}

