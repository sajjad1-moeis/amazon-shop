import React from "react";
import Link from "next/link";
import { staticMainCategories } from "@/components/module/MegaMenu/megaMenuCategoryData";
import { cn } from "@/lib/utils";

/** صفحه دسته‌بندی — نسخه استاتیک (بدون API) */
export default function CategorySection() {
  return (
    <div className="">
      <div className="container relative w-full">
        <h2 className="mb-4 text-center text-lg text-gray-700 dark:text-dark-title md:mb-8 md:text-3xl">دسته‌بندی</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 md:gap-4">
          {staticMainCategories.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className={cn(
                "rounded-xl border border-gray-200 bg-white p-4 text-center text-sm font-medium shadow-sm transition-colors",
                "hover:border-primary-400 hover:text-primary-600 dark:border-dark-stroke dark:bg-dark-box dark:text-dark-titre dark:hover:border-primary-500"
              )}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
