"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { staticMainCategories } from "./megaMenuCategoryData";

/**
 * @param {string} props.selectedCategory
 * @param {function} props.onCategoryHover
 */
export default function MainCategoriesSection({ className, selectedCategory, onCategoryHover }) {
  return (
    <div className={cn("", className)} dir="rtl">
      <div className="space-y-2">
        {staticMainCategories.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.label;
          return (
            <div key={index} onMouseEnter={() => onCategoryHover?.(category.label)} className="relative">
              <Link
                href={category.href}
                className={cn(
                  "flex items-center gap-3 p-1 rounded-lg transition-colors group relative",
                  isSelected
                    ? "bg-primary-50 dark:bg-dark-blue border-r-2 border-primary-500 dark:border-primary-300"
                    : "hover:bg-gray-50 dark:hover:bg-dark-field"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-8 h-8 flex items-center justify-center transition-colors",
                    isSelected
                      ? "text-primary-600 dark:text-primary-300"
                      : "text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400"
                  )}
                >
                  <Icon size={20} />
                </div>
                <span
                  className={cn(
                    "text-sm  transition-colors",
                    isSelected
                      ? "text-primary-600 dark:text-primary-300"
                      : "text-gray-900 dark:text-dark-titre group-hover:text-primary-600 dark:group-hover:text-primary-400"
                  )}
                >
                  {category.label}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
