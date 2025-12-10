"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function FavoriteCard({ product }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 hover:shadow-lg transition-shadow"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Product Image */}
        <div className="relative w-full md:w-48 h-48 md:h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 200px"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left: Product Info */}
          <div className="flex-1">
            {/* Product Name */}
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-2">
              {product.title}
            </h3>

            {/* Brand Logo */}
            <div className="mb-3">
              <span className="text-sm md:text-base font-bold text-gray-700 dark:text-gray-300">{product.brand}</span>
            </div>

            {/* Price Info */}
            <div className="space-y-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">قیمت فعلی (تومان)</span>
                <span className="text-base md:text-lg font-bold text-gray-900 dark:text-white">
                  {product.currentPrice}
                </span>
              </div>

              {/* Price Change */}
              <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-md">
                <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">تغییر قیمت اخیر</span>
                <span className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400">
                  {product.priceChange}%
                </span>
              </div>
            </div>

            {/* Tracking Status and Last Checked */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                  "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                )}
              >
                وضعیت ردیابی فعال
              </span>
              <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                آخرین بررسی {product.lastChecked}
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-col gap-2 md:w-auto w-full">
            <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium py-2">
              مشاهده محصول
            </Button>
            <Button
              variant="outline"
              className="w-full border-primary-600 bg-primary-600 text-white hover:bg-primary-700 dark:border-primary-500 dark:bg-primary-500 dark:hover:bg-primary-600 text-sm font-medium py-2"
            >
              تنظیم هشدار قیمت
            </Button>
            <Button
              variant="outline"
              className="w-full border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20 text-sm font-medium py-2"
            >
              حذف
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

