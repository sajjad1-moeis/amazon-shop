"use client";

import React, { useState, useEffect } from "react";
import { SearchNormal1 } from "iconsax-reactjs";
import { Input } from "@/components/ui/input";
import { adminFilterInputStyles, filterInputStyles } from "@/utils/filterStyles";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";

export default function FilterSearchInput({ value = "", isAdmin, onChange, placeholder = "جستجو..." }) {
  const [searchValue, setSearchValue] = useState(value);

  useEffect(() => {
    setSearchValue(value);
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

  return (
    <>
      {/* دسکتاپ: اینپوت عادی */}
      <div className="relative">
        <SearchNormal1 size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={searchValue}
          onChange={handleChange}
          placeholder={placeholder}
          className={`pr-10 pl-4 max-md:placeholder:text-sm   ${isAdmin ? adminFilterInputStyles : filterInputStyles}`}
          dir="rtl"
        />
      </div>
    </>
  );
}
