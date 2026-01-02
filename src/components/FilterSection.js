"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FilterDrawerContent from "@/components/FilterDrawer/FilterDrawerContent";
import { Candle } from "iconsax-reactjs";

/**
 * کامپوننت wrapper برای سکشن فیلتر - ریسپانسیو با Drawer در موبایل
 * @param {React.ReactNode} children - محتوای فیلترها (اولین child جستجو، بقیه سلکت‌ها)
 * @param {string} className - کلاس‌های اضافی
 */
export default function FilterSection({ children, className }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  // تبدیل children به آرایه برای دسترسی بهتر
  const childrenArray = React.Children.toArray(children);
  const searchInput = childrenArray[0];
  const filterSelects = childrenArray.slice(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="md:flex-1 md:max-w-md lg:max-w-lg">{searchInput}</div>

        {/* Desktop: نمایش فیلترها */}
        <div className="hidden md:flex items-center gap-2 md:gap-3">{filterSelects}</div>

        {/* Mobile: دکمه فیلتر برای باز کردن Drawer */}
        {filterSelects.length > 0 && (
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen} direction="rtl">
            <DrawerTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden p-2.5 dark:bg-dark-field rounded-lg dark:border-dark-stroke border flex items-center justify-center"
              >
                <Candle size={20} />
                <span className="mr-2">فیلتر ها</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-h-[85vh] dark:bg-dark-box" dir="rtl">
              <DrawerHeader className="border-b border-gray-200 dark:border-dark-stroke pb-4">
                <DrawerTitle className="text-lg font-semibold text-gray-900 dark:text-dark-titre text-right">
                  فیلترها
                </DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto">
                <FilterDrawerContent filterSelects={filterSelects} />
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </div>
  );
}
