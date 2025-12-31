"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DocumentText, Trash, Maximize } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function RecentViewCard({ product, onDelete }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-dark-box rounded-xl md:rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden relative",
        !product.inStock && "border-2 border-red-300"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Product Image */}
      <div className="relative w-full h-40 sm:h-48 bg-gray-100 dark:bg-dark-field">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <button onClick={onDelete} className="absolute top-2 sm:top-4 left-2 sm:left-4 z-10" title="حذف">
          <Trash size={20} className="sm:w-7 sm:h-7 text-red-500" />
        </button>

        {!product.inStock && (
          <div className="absolute top-2 right-2 z-10 bg-red-100 text-red-800 px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs">
            ناموجود
          </div>
        )}
      </div>

      <div className="p-2 sm:p-3">
        {/* Title */}
        <p className="text-xs sm:text-sm text-gray-800 dark:text-dark-titre leading-5 sm:leading-6 mb-2 sm:mb-3 line-clamp-2">
          {product.title}
        </p>

        {/* Price */}
        <div className="mb-2 sm:mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
          <p className="text-[10px] sm:text-xs text-gray-500 dark:text-caption">قیمت فعلی (تومان)</p>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-dark-titre">{product.price}</p>
        </div>

        {/* 3 Boxes Row */}
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
          {/* Amount */}
          <div className="text-[10px] sm:text-xs bg-gray-50 dark:bg-dark-field rounded-xl p-1.5 sm:p-2 text-center flex-1 min-w-[calc(50%-4px)]">
            <div className="text-xs sm:text-sm text-gray-900 dark:text-dark-titre">{product.viewCount} مرتبه</div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-caption mt-1 sm:mt-2 mb-1">تعداد بازدید</div>
          </div>

          <div className="text-[10px] sm:text-xs bg-gray-50 dark:bg-dark-field rounded-xl p-1.5 sm:p-2 text-center flex-1 min-w-[calc(50%-4px)]">
            <div className="text-xs sm:text-sm text-gray-900 dark:text-dark-titre">{product.lastViewed}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 dark:text-caption mt-1 sm:mt-2 mb-1">آخرین بازدید</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            className="p-1.5 sm:p-2 max-md:hidden bg-gray-200 dark:bg-dark-field flex-shrink-0"
            title="مقایسه"
          >
            <Maximize size={16} className="sm:w-[18px] sm:h-[18px] text-[#292D32] dark:text-dark-titre" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 gap-1 sm:gap-2 text-xs sm:text-sm",
              "bg-yellow-400 hover:bg-yellow-500 text-primary-800 border-yellow-500"
            )}
            disabled={!product.inStock}
          >
            <span>افزودن به سبد خرید</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
