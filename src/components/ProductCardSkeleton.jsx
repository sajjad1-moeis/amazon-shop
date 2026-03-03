"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * اسکلتون کارت محصول — هم‌ریخت با ProductCard برای استفاده در لودینگ همهٔ صفحات و اسلایدرها.
 * @param {string} [className] - کلاس اضافه برای کانتینر (مثل border یا bg)
 */
function ProductCardSkeleton({ className }) {
  return (
    <div
      className={cn(
        "rounded-xl flex flex-col overflow-hidden bg-white dark:bg-dark-box h-full border border-gray-200 dark:border-dark-stroke shadow-[0px_2px_4px_0px_#0000001A]",
        className,
      )}
    >
      <Skeleton className="aspect-square flex-shrink-0 rounded-none rounded-t-xl w-full dark:bg-dark-bg" />
      <div className="p-3 lg:p-4 flex flex-col gap-2.5 flex-grow">
        <Skeleton className="h-4 w-full rounded dark:bg-dark-bg" />
        <Skeleton className="h-4 w-2/3 rounded dark:bg-dark-bg" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16 rounded dark:bg-dark-bg" />
          <Skeleton className="h-3 w-10 rounded dark:bg-dark-bg" />
        </div>
        <div className="flex flex-col gap-1.5 mt-auto">
          <div className="flex justify-between items-center">
            <Skeleton className="h-5 w-24 rounded dark:bg-dark-bg" />
            <Skeleton className="h-4 w-8 rounded dark:bg-dark-bg" />
          </div>
          <Skeleton className="h-3 w-28 rounded mt-1 dark:bg-dark-bg" />
        </div>
      </div>
    </div>
  );
}

/**
 * چند اسکلتون کارت برای لودینگ لیست/اسلایدر.
 * @param {number} [count=6] - تعداد کارت
 * @param {string} [className] - کلاس برای هر کارت
 * @param {React.ElementType} [Wrapper] - کامپوننت دور هر کارت (مثلاً SwiperSlide)
 */
function ProductCardSkeletonList({ count = 6, className, Wrapper }) {
  const items = Array.from({ length: Math.max(1, count) }, (_, i) => (
    <ProductCardSkeleton key={i} className={className} />
  ));
  if (Wrapper) {
    return items.map((el, i) => <Wrapper key={i}>{el}</Wrapper>);
  }
  return <>{items}</>;
}

export { ProductCardSkeletonList, ProductCardSkeleton };
