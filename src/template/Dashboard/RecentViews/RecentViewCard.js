"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingCart, DocumentText, Trash } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function RecentViewCard({ product, onDelete }) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden relative",
        !product.inStock && "border-2 border-red-500"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        {/* Delete Button - Top Left */}
        <button
          onClick={onDelete}
          className="absolute top-2 left-2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          title="حذف"
        >
          <Trash size={18} className="text-red-500" variant="Bold" />
        </button>

        {/* Out of Stock Badge - Over Image */}
        {!product.inStock && (
          <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
            ناموجود
          </div>
        )}
      </div>

      <div className="p-4">
        {/* Product Title */}
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.title}
        </h4>

        {/* Price */}
        <div className="mb-3">
          <p className="text-lg font-bold text-gray-900 dark:text-white">
            {product.price}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">قیمت فعلی (تومان)</p>
        </div>

        {/* Last Viewed */}
        <div className="mb-2">
          <span className="text-xs text-gray-600 dark:text-gray-400">آخرین بازدید </span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">{product.lastViewed}</span>
        </div>

        {/* View Count */}
        <div className="mb-4">
          <span className="text-xs text-gray-600 dark:text-gray-400">تعداد بازدید </span>
          <span className="text-xs font-medium text-gray-900 dark:text-white">{product.viewCount} مرتبه</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "flex-1 gap-2",
              product.inStock
                ? "bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            )}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            افزودن به سبد خرید
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="p-2 border-gray-300 dark:border-gray-600"
            title="مقایسه"
          >
            <DocumentText size={18} className="text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
}
