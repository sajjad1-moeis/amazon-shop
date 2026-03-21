"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import CategoryColumn from "@/components/module/MegaMenu/CategoryColumn";
import CategorySearch from "@/components/module/MegaMenu/CategorySearch";
import { staticMainCategories, getColumnsForMainCategory } from "@/components/module/MegaMenu/megaMenuCategoryData";

/**
 * دراور پایین موبایل — تب‌ها دقیقاً مثل OrdersTabs؛ بقیه مثل مگامنو (فاصله‌ها و چیدمان)
 */
export default function MobileCategoriesMegaDrawer({ open, onOpenChange }) {
  const [activeTab, setActiveTab] = useState(staticMainCategories[0]?.label ?? "کالای دیجیتال");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (!open) setSearchValue("");
  }, [open]);

  const columns = getColumnsForMainCategory(activeTab, searchValue);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className={cn(
          "flex max-h-[88dvh] flex-col rounded-t-[20px] border-0 border-t border-gray-200/90 bg-white p-0 shadow-2xl",
          "dark:border-dark-stroke dark:bg-dark-box gap-0",
          "[&>button]:left-3 [&>button]:right-auto [&>button]:top-3 [&>button]:h-8 [&>button]:w-8 [&>button]:rounded-full [&>button]:bg-gray-100/90 [&>button]:opacity-100 hover:[&>button]:bg-gray-200/90 dark:[&>button]:bg-dark-field dark:hover:[&>button]:bg-dark-stroke",
        )}
        dir="rtl"
      >
        <div
          className="mx-auto mt-2.5 h-1 w-9 shrink-0 rounded-full bg-gray-300/90 dark:bg-gray-600"
          aria-hidden
        />

        <SheetHeader className="shrink-0 space-y-0 border-b border-gray-200 px-4 pb-3 pt-3 text-right dark:border-dark-stroke">
          <SheetTitle className="mb-5 text-base font-medium text-gray-900 dark:text-dark-titre">
            دسته‌بندی محصولات
          </SheetTitle>
          {/* عین OrdersTabs — بدون تغییر استایل */}
          <div className="flex flex-nowrap justify-between overflow-auto rounded-lg bg-white dark:bg-dark-box">
            {staticMainCategories.map((tab) => (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveTab(tab.label)}
                className={cn(
                  "flex-none border-b-2 px-4 py-3 text-sm font-medium transition-all lg:flex-1",
                  activeTab === tab.label
                    ? "bg-primary-50 border-primary-500 text-primary-500 dark:bg-dark-blue dark:border-dark-title dark:text-dark-title"
                    : "border-transparent text-gray-500 hover:bg-gray-200 dark:text-dark-text dark:hover:bg-gray-600",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </SheetHeader>

        <div
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex flex-col gap-4">
            <CategorySearch searchValue={searchValue} onSearch={setSearchValue} />

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-gray-200 pb-3 dark:border-dark-stroke">
              <Link
                href="/products"
                onClick={() => onOpenChange?.(false)}
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
              >
                همه محصولات
              </Link>
              <Link
                href="/categories"
                onClick={() => onOpenChange?.(false)}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 dark:text-dark-text dark:hover:text-primary-400"
              >
                صفحه دسته‌بندی‌ها
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
              {columns.length > 0 ? (
                columns.map((col, index) => (
                  <CategoryColumn
                    key={`${col.title}-${index}`}
                    title={col.title}
                    items={col.items}
                    onLinkClick={() => onOpenChange?.(false)}
                  />
                ))
              ) : (
                <div className="col-span-full py-8 text-center text-sm text-gray-500 dark:text-dark-text">
                  نتیجه‌ای یافت نشد
                </div>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
