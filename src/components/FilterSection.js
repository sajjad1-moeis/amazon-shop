"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * کامپوننت wrapper برای سکشن فیلتر - ریسپانسیو با اسکرول افقی در موبایل
 * @param {React.ReactNode} children - محتوای فیلترها (اولین child جستجو، بقیه سلکت‌ها)
 * @param {string} className - کلاس‌های اضافی
 */
export default function FilterSection({ children, className }) {
  // تبدیل children به آرایه برای دسترسی بهتر
  const childrenArray = React.Children.toArray(children);
  const searchInput = childrenArray[0];
  const filterSelects = childrenArray.slice(1);

  return (
    <div className={cn("w-full", className)}>
      <div className="flex  items-center justify-between gap-3 sm:gap-4">
        <div className=" md:flex-1 md:max-w-md lg:max-w-lg">{searchInput}</div>

        <div className="flex items-center gap-2 md:gap-3 overflow-auto  -mx-2 md:mx-0 px-2 md:px-0">
          <div className="flex items-center gap-1 md:gap-3 min-w-max md:min-w-0">{filterSelects}</div>
        </div>
      </div>
    </div>
  );
}
