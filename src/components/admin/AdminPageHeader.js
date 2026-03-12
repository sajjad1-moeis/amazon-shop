"use client";

import { cn } from "@/lib/utils";
import React from "react";

/**
 * هدر یکدست پنل ادمین
 * ردیف ۱: عنوان + آیکون (راست) | دکمه‌های اکشن (چپ)
 * ردیف ۲: فیلترها (جستجو و فیلتر) — جای خودشون
 * استفاده: <AdminPageHeader title="..." subtitle="..." actions={<>دکمه‌ها</>}>فیلترها</AdminPageHeader>
 */
export default function AdminPageHeader({ title, subtitle, icon: Icon, accentLine = true, actions, children, className }) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-gray-600/80 bg-gradient-to-b from-gray-700/40 to-gray-800/20 overflow-hidden",
        "px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5",
        className
      )}
    >
      {accentLine && (
        <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-amber-500/70 to-transparent rounded-r-full" />
      )}
      <div className="relative flex flex-col gap-3 sm:gap-4">
        {/* ردیف ۱: عنوان + دکمه‌های اکشن — موبایل: اجازه wrap تا به هم نزنند */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-3 min-w-0 flex-1 basis-0">
            {Icon && (
              <div className="p-1.5 sm:p-2.5 rounded-lg sm:rounded-xl bg-gray-600/50 shrink-0">
                <Icon size={18} className="text-amber-400 sm:w-[22px] sm:h-[22px]" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-xs sm:text-lg md:text-2xl font-bold text-white truncate">{title}</h1>
              {subtitle && (
                <p className="text-gray-400 text-[10px] sm:text-xs md:text-sm mt-0.5 line-clamp-1">{subtitle}</p>
              )}
            </div>
          </div>
          {actions && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-3 shrink-0 [&_button:has(svg)]:max-md:!p-2 [&_button:has(svg)]:max-md:!min-w-9 [&_button:has(svg)]:max-md:!h-9 [&_button:has(svg)]:max-md:!text-[0] [&_button:has(svg)_svg]:max-md:!w-5 [&_button:has(svg)_svg]:max-md:!h-5 [&_button:has(svg)_svg]:max-md:!shrink-0 [&_a:has(svg)]:max-md:!p-2 [&_a:has(svg)]:max-md:!min-w-9 [&_a:has(svg)]:max-md:!h-9 [&_a:has(svg)]:max-md:!inline-flex [&_a:has(svg)]:max-md:!items-center [&_a:has(svg)]:max-md:!justify-center [&_a:has(svg)]:max-md:!text-[0] [&_a:has(svg)_svg]:max-md:!w-5 [&_a:has(svg)_svg]:max-md:!h-5 [&_a:has(svg)_svg]:max-md:!shrink-0">
              {actions}
            </div>
          )}
        </div>
        {/* ردیف ۲: موبایل ادمین = فقط دکمه فیلترها (جستجو و سلکت‌ها توی دراور) */}
        {children && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0 w-full">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
