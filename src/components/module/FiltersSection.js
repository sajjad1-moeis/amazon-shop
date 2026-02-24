import React, { useState } from "react";
import { Trash } from "iconsax-reactjs";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const shops = [
  { name: "همه", id: "a1", value: "all" },
  { name: "آمازون امارات", id: "a2", value: "uae" },
  { name: "آمازون آمریکا", id: "a3", value: "us" },
];

function FiltersSection({ dynamicFilters, isInventory, filters = {}, onFilterChange }) {
  const hasActiveFilters =
    !!(
      filters.categoryId ||
      filters.brandId ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.inStock ||
      filters.shop
    );

  const handleClearAll = () => {
    if (!onFilterChange) return;
    onFilterChange("categoryId", "");
    onFilterChange("brandId", "");
    onFilterChange("minPrice", "");
    onFilterChange("maxPrice", "");
    onFilterChange("inStock", false);
    onFilterChange("shop", "");
  };

  const selectedShop = filters.shop || "all";

  const isAnyChecked = (filterId) => Boolean(filters[filterId]);

  return (
    <div
      className="p-4 bg-white dark:bg-dark-field rounded-xl"
      style={{
        boxShadow: "0px 1px 6px 0px #0000000F",
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-800 dark:text-dark-title">فیلتر ها</p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={handleClearAll}
            className="flex items-center gap-1 text-red-600 dark:text-red-500 text-xs cursor-pointer hover:text-red-700 dark:hover:text-red-400 transition-colors"
          >
            <Trash size={16} />
            <p>حذف همه</p>
          </button>
        )}
      </div>

      {/* Shops */}
      <div className="mt-7 border-b da border-gray-200 dark:border-[#E5E7EB1F] pb-5">
        <p className="text-gray-900 dark:text-white">فروشگاه</p>
        <div className="flex flex-col gap-5 mt-4">
          {shops.map((shop) => (
            <div key={shop.id} className="flex items-center gap-3">
              <Checkbox
                className="data-[state=checked]:bg-primary-500 dark:data-[state=checked]:bg-blue-500 border rounded"
                checkClassName="text-white"
                id={shop.id}
                checked={selectedShop === shop.value}
                onCheckedChange={() => {
                  if (!onFilterChange) return;
                  const next = selectedShop === shop.value ? "all" : shop.value;
                  onFilterChange("shop", next === "all" ? "" : next);
                }}
              />
              <Label className="cursor-pointer text-gray-700 dark:text-gray-300" htmlFor={shop.id}>
                {shop.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Switch */}
      {isInventory && (
        <div className="mt-4 border-b border-gray-200 dark:border-[#E5E7EB1F]  pb-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="airplane-mode" className="text-gray-900 dark:text-white">
              فقط کالاهای موجود
            </Label>
            <Switch
              className="data-[state=checked]:bg-primary-500 dark:data-[state=checked]:bg-blue-500"
              dir="ltr"
              id="airplane-mode"
              checked={!!filters.inStock}
              onCheckedChange={(val) => onFilterChange && onFilterChange("inStock", Boolean(val))}
            />
          </div>
        </div>
      )}

      {/* Dynamic Filters Accordion */}
      <Accordion type="multiple">
        {dynamicFilters?.map((filter) => (
          <AccordionItem
            key={filter.id}
            value={filter.id}
            className="border-b border-gray-200 dark:border-[#E5E7EB1F] "
          >
            <AccordionTrigger className="flex items-center justify-between text-gray-900 dark:text-white hover:no-underline">
              <span className="flex items-center gap-2">
                {filter.label}
                {isAnyChecked(filter.id) && (
                  <span className="w-2 h-2 bg-primary-400 dark:bg-blue-500 rounded-full"></span>
                )}
              </span>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 mt-2">
              {filter.options.map((option) => {
                const checked = filters[filter.id] === option.id;
                return (
                  <div key={option.id} className="flex items-center gap-2">
                    <Checkbox
                      id={option.id}
                      checked={checked}
                      onCheckedChange={() => {
                        if (!onFilterChange) return;
                        const next = checked ? "" : option.id;
                        onFilterChange(filter.id, next);
                      }}
                      className="data-[state=checked]:bg-primary-500 dark:data-[state=checked]:bg-blue-500"
                    />
                    <Label htmlFor={option.id} className="text-gray-700 dark:text-gray-300 cursor-pointer">
                      {option.label}
                    </Label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FiltersSection;
