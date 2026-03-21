"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import CategoryColumn from "./CategoryColumn";
import CategorySearch from "./CategorySearch";
import MainCategoriesSection from "./MainCategoriesSection";
import { getColumnsForMainCategory } from "./megaMenuCategoryData";

export default function MegaMenu({ trigger }) {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("کالای دیجیتال");

  const filteredData = getColumnsForMainCategory(selectedCategory, searchValue);

  return (
    <NavigationMenu open={true} className="relative z-[5555]" dir="rtl">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="bg-transparent hover:bg-transparent data-[state=open]:bg-transparent h-auto p-0">
            {trigger}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="!w-[95vw] max-w-7xl !right-0 !top-full !mt-2 !p-0 !h-auto !z-50" dir="rtl">
            <div
              className="w-full p-0 bg-white dark:bg-dark-box rounded-xl shadow-xl border border-gray-200 dark:border-dark-stroke relative z-50"
              dir="rtl"
            >
              <div className="px-4 py-3 border-b border-gray-200 dark:border-dark-stroke bg-gray-50 dark:bg-dark-field/50 flex flex-wrap items-center gap-x-4 gap-y-2">
                <Link
                  href="/products"
                  className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
                >
                  همه محصولات
                </Link>
                <Link
                  href="/categories"
                  className="text-sm font-medium text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 hover:underline"
                >
                  صفحه دسته‌بندی‌ها
                </Link>
              </div>
              <div className="flex">
                <div className="p-4 flex flex-col gap-4 min-w-[220px] border-l border-gray-200 dark:border-dark-stroke ">
                  <CategorySearch searchValue={searchValue} onSearch={setSearchValue} />
                  <MainCategoriesSection selectedCategory={selectedCategory} onCategoryHover={setSelectedCategory} />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-6 p-4">
                  {filteredData.length > 0 ? (
                    filteredData.map((category, index) => (
                      <CategoryColumn key={index} title={category.title} items={category.items} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8 text-gray-500 dark:text-dark-text">
                      نتیجه‌ای یافت نشد
                    </div>
                  )}
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
