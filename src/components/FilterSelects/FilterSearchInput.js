"use client";

import React, { useState, useEffect } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { Input } from "@/components/ui/input";
import { filterInputStyles } from "@/utils/filterStyles";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function FilterSearchInput({ value = "", onChange, placeholder = "جستجو..." }) {
  // State محلی برای نمایش فوری در input
  const [searchValue, setSearchValue] = useState(value);
  const [popoverSearchValue, setPopoverSearchValue] = useState(value);

  // همگام‌سازی با URL params
  useEffect(() => {
    setSearchValue(value);
    setPopoverSearchValue(value);
  }, [value]);

  // Debounce برای جستجو
  const debouncedSearch = useDebouncedCallback((val) => {
    onChange(val);
  }, 300);

  const handleChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);
    debouncedSearch(val);
  };

  const handlePopoverChange = (e) => {
    const val = e.target.value;
    setPopoverSearchValue(val);
    debouncedSearch(val);
  };

  return (
    <>
      {/* دسکتاپ: اینپوت عادی */}
      <div className="relative hidden md:block">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`pr-10 pl-4 ${filterInputStyles}`}
          dir="rtl"
        />
      </div>

      {/* موبایل: Popover برای جستجو */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "md:hidden relative p-2.5 dark:bg-dark-field rounded-lg dark:border-dark-stroke border flex items-center justify-center w-full"
            )}
          >
            <SearchNormal1 size={20} className="text-gray-400" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[calc(100vw-3rem)] mt-1 p-0 sm:w-80" align="start">
          <div className="relative">
            <Input
              type="text"
              value={popoverSearchValue}
              onChange={handlePopoverChange}
              placeholder={placeholder}
              className={`ring-0 ${filterInputStyles}`}
              dir="rtl"
              autoFocus
            />
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
