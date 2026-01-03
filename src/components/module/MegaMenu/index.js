"use client";

import React, { useState } from "react";
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
import { megaMenuData } from "./megaMenuData";

export default function MegaMenu({ trigger }) {
  const [searchValue, setSearchValue] = useState("");

  // فیلتر کردن دسته‌بندی‌ها بر اساس جستجو
  const filteredData = searchValue
    ? megaMenuData
        .map((category) => ({
          ...category,
          items: category.items.filter((item) => item.label.toLowerCase().includes(searchValue.toLowerCase())),
        }))
        .filter((category) => category.items.length > 0)
    : megaMenuData;

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
              {/* Content Layout */}
              <div className="flex">
                {/* Right Side: Main Categories + Search */}
                <div className="p-4 flex flex-col gap-4 min-w-[220px] border-l border-gray-200 dark:border-dark-stroke ">
                  {/* Search Section */}
                  <CategorySearch searchValue={searchValue} onSearch={setSearchValue} />

                  {/* Main Categories */}
                  <MainCategoriesSection />
                </div>

                {/* Left Side: Category Columns */}
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-y-6 p-4">
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
