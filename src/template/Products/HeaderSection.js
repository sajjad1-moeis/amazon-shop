"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Candle, Element3, RowVertical, SearchNormal1 } from "iconsax-reactjs";
import SortBySelect from "@/components/FilterSelects/SortBySelect";
import React from "react";

const VIEW_MODES = [
  { id: "grid", icon: Element3 },
  { id: "list", icon: RowVertical },
];

function HeaderSection({
  viewMode,
  setViewMode,
  onSearch,
  searchValue = "",
  totalCount = 0,
  sortBy = "",
  onSortChange,
  onOpenFilterDrawer,
  searchTermOriginal = null,
  searchTermTranslated = null,
}) {
  const handleSearchChange = (e) => {
    if (onSearch) onSearch(e.target.value);
  };

  const showTranslatedHint = Boolean(searchTermOriginal && searchTermTranslated && searchTermOriginal !== searchTermTranslated);

  return (
    <div className="max-lg:px-4 lg:container mt-4">
      {showTranslatedHint && (
        <div className="mb-2 text-sm text-gray-600 dark:text-[#7B7F86]" aria-live="polite">
          <span>نتایج برای: </span>
          <span className="font-medium text-gray-800 dark:text-dark-titre">{searchTermOriginal}</span>
          <span className="mr-1"> — </span>
          <span className="text-gray-500 dark:text-gray-400" dir="ltr">{searchTermTranslated}</span>
        </div>
      )}
      {/* دسکتاپ: یک ردیف */}
      <div className="hidden md:flex flex-between flex-wrap gap-3">
        <div className="flex-between gap-1">
          <p className="text-gray-600 dark:text-[#7B7F86]">نتیجه جستجو:</p>
          <p className="text-yellow-700 dark:text-yellow-600">{totalCount} محصول</p>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          {onSearch && (
            <div className="relative w-48 lg:w-56">
              <SearchNormal1 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="جستجو محصول..."
                value={searchValue}
                onChange={handleSearchChange}
                className="pr-10 bg-gray-100 dark:bg-dark-field border-gray-300 dark:border-[#7B7F86] rounded-lg"
              />
            </div>
          )}
          {onSortChange && (
            <SortBySelect
              value={sortBy || ""}
              onValueChange={(v) => onSortChange(v === "all" ? "" : v)}
              placeholder="مرتب سازی"
              includeAll
              includePrice
            />
          )}
          {VIEW_MODES.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setViewMode(id)}
              className={`border rounded-lg p-2 transition ${
                viewMode === id
                  ? "bg-primary-500 dark:bg-primary-400 dark:border-primary-400 text-white border-primary-500"
                  : "bg-gray-100 text-gray-500 border-gray-200 hover:bg-primary-500 dark:hover:bg-primary-400 hover:text-white"
              }`}
            >
              <Icon size={22} />
            </button>
          ))}
          {onOpenFilterDrawer && (
            <Button
              variant="ghost"
              onClick={onOpenFilterDrawer}
              className="bg-gray-100  md:hidden rounded-lg flex-between text-gray-600 lg:hidden dark:bg-dark-field dark:text-dark-titre"
            >
              <Candle size={16} />
              فیلترها
            </Button>
          )}
        </div>
      </div>

      {/* موبایل: چند ردیف خوانا */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="flex-between gap-1">
          <p className="text-gray-600 dark:text-[#7B7F86] text-sm">نتیجه جستجو:</p>
          <p className="text-yellow-700 dark:text-yellow-600 text-sm font-medium">{totalCount} محصول</p>
        </div>

        <div className="flex-between gap-2">
          {onSearch && (
            <div className="relative md:w-full  w-fit">
              <SearchNormal1 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="جستجو محصول..."
                value={searchValue}
                onChange={handleSearchChange}
                className="w-full pr-10 bg-gray-100 dark:bg-dark-field border-gray-300 dark:border-[#7B7F86] rounded-lg text-base"
              />
            </div>
          )}
          {onOpenFilterDrawer && (
            <Button
              variant="ghost"
              onClick={onOpenFilterDrawer}
              className="bg-gray-100 rounded-lg flex items-center gap-2 text-gray-600 dark:bg-dark-field dark:text-dark-titre text-sm py-2 px-3"
            >
              <Candle size={18} />
              فیلترها
            </Button>
          )}
          {onSortChange && (
            <div className="flex-1 min-w-[140px] max-md:hidden">
              <SortBySelect
                value={sortBy || ""}
                onValueChange={(v) => onSortChange(v === "all" ? "" : v)}
                placeholder="مرتب‌سازی"
                includeAll
                includePrice
              />
            </div>
          )}
          <div className="flex gap-1 max-md:hidden">
            {VIEW_MODES.map(({ id, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setViewMode(id)}
                className={`border rounded-lg p-2 transition ${
                  viewMode === id
                    ? "bg-primary-500 dark:bg-primary-400 text-white border-primary-500"
                    : "bg-gray-100 text-gray-500 border-gray-200 dark:bg-dark-field dark:border-dark-stroke"
                }`}
              >
                <Icon size={20} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
