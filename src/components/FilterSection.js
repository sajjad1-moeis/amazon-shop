"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import FilterDrawerContent from "@/components/FilterDrawer/FilterDrawerContent";
import { Candle } from "iconsax-reactjs";
import { adminFilterDrawer } from "@/utils/filterStyles";

export default function FilterSection({ children, isAdmin, className }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // تبدیل children به آرایه برای دسترسی بهتر
  const childrenArray = React.Children.toArray(children);
  const searchInput = childrenArray[0];
  const filterSelects = childrenArray.slice(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        {/* لپ‌تاپ (lg+): جستجو نمایان — موبایل/تبلت ادمین: جستجو فقط توی دراور */}
        <div className={cn("flex-1 max-w-md lg:max-w-lg", isAdmin && "hidden lg:block")}>
          {searchInput}
        </div>

        {/* لپ‌تاپ (lg+): فیلترها در ردیف — موبایل: فقط دکمه فیلترها */}
        {!isAdmin && (
          <div className="hidden md:flex items-center gap-2 md:gap-3">{filterSelects}</div>
        )}
        {isAdmin && (
          <div className="hidden lg:flex items-center gap-2 lg:gap-3">{filterSelects}</div>
        )}

        {/* موبایل/تبلت: دکمه فیلترها — لپ‌تاپ ادمین این دکمه مخفی */}
        {(filterSelects.length > 0 || isAdmin) && (
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="rtl">
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className={cn(
                  "h-9 px-3 rounded-lg flex items-center justify-center gap-1.5 text-sm font-normal",
                  isAdmin ? "lg:hidden inline-flex" : "md:hidden",
                  isAdmin
                    ? "border-gray-600 bg-gray-700/50 text-gray-300 hover:bg-gray-600/50 hover:text-white"
                    : " dark:bg-dark-field dark:border-dark-stroke border "
                )}
              >
                <Candle size={18} />
                <span>فیلترها</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className={isAdmin ? "bg-gray-900 border-gray-800" : "max-h-[85vh] dark:bg-dark-box"} dir="rtl">
              <DrawerHeader
                className={
                  isAdmin ? "border-b border-gray-700 pb-4" : "border-b border-gray-200 dark:border-dark-stroke pb-4"
                }
              >
                <DrawerTitle
                  className={
                    isAdmin
                      ? "text-lg font-medium text-white text-right"
                      : "text-lg font-medium text-gray-900 dark:text-dark-titre text-right"
                  }
                >
                  فیلترها
                </DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto">
                <FilterDrawerContent
                  filterSelects={filterSelects}
                  searchInput={searchInput}
                />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
