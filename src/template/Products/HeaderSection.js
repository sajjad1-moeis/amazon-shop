"use client";

import SwitchButton from "@/components/SwitchButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowDown2, Candle, DiscountShape, Element3, RowVertical, Sort, SearchNormal1 } from "iconsax-reactjs";
import React from "react";
import Link from "next/link";

const VIEW_MODES = [
  { id: "grid", icon: Element3 },
  { id: "list", icon: RowVertical },
];

function HeaderSection({ viewMode, setViewMode, onSearch, searchValue = "", totalCount = 0 }) {
  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="max-lg:px-4 lg:container mt-4">
      <div className="flex-between">
        <div className="flex-between gap-1">
          <p className="text-gray-600 dark:text-[#7B7F86">نتیجه جستجو:</p>
          <p className="text-yellow-700 dark:text-yellow-600">{totalCount} محصول</p>
        </div>

        <div className="flex gap-2 items-center">
          {onSearch && (
            <div className="relative max-md:hidden">
              <SearchNormal1 className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="جستجو محصول..."
                value={searchValue}
                onChange={handleSearchChange}
                className="pr-10 bg-gray-100 dark:bg-dark-field border-gray-300 dark:border-[#7B7F86] rounded-lg"
              />
            </div>
          )}

          <div className="flex-between gap-2 max-md:hidden">
            <Button
              variant="ghost"
              className="max-lg:hidden bg-gray-100 border dark:border-[#7B7F86] dark:text-dark-text dark:bg-dark-field border-gray-300 rounded-lg flex-between text-gray-500"
            >
              <Sort size={20} />
              مرتب سازی
              <ArrowDown2 size={18} />
            </Button>

            {VIEW_MODES.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`border rounded-lg p-2 transition 
                ${
                  viewMode === id
                    ? "bg-primary-500 dark:bg-primary-400 dark:border-primary-400 text-white border-primary-500"
                    : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white"
                }
              `}
              >
                <Icon size={22} />
              </button>
            ))}
          </div>
          <Button
            variant="ghost"
            className="bg-gray-100 rounded-lg flex-between text-gray-600 lg:hidden dark:bg-dark-field dark:text-dark-titre"
          >
            <Candle size={16} />
            فیلترها
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
