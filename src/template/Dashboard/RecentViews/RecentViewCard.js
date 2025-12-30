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
        "bg-white dark:bg-dark-box rounded-2xl shadow-md hover:shadow-lg transition-shadow overflow-hidden relative",
        !product.inStock && "border-2 border-red-300"
      )}
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Product Image */}
      <div className="relative w-full h-48 bg-gray-100 dark:bg-dark-field">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <button onClick={onDelete} className="absolute top-4 left-4 z-10 " title="حذف">
          <Trash size={28} className="text-red-500" />
        </button>

        {!product.inStock && (
          <div className="absolute top-2 right-2 z-10 bg-red-100 text-red-800 px-3 py-1 rounded-md text-xs ">
            ناموجود
          </div>
        )}
      </div>

      <div className="p-3">
        {/* Title */}
        <p className="text-sm text-gray-800 dark:text-dark-titre leading-6 mb-3">{product.title}</p>

        {/* Price */}
        <div className="mb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <p className="text-xs text-gray-500 dark:text-caption ">قیمت فعلی (تومان)</p>
          <p className="text-sm  text-gray-700 dark:text-dark-titre">{product.price}</p>
        </div>

        {/* 3 Boxes Row */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Purchase Date */}

          {/* Amount */}
          <div className="text-xs bg-gray-50 dark:bg-dark-field rounded-xl p-2 text-center flex-1">
            <div className=" text-gray-900 dark:text-dark-titre">{product.viewCount} مرتبه</div>
            <div className=" text-gray-500 dark:text-caption mt-3 mb-1">تعداد بازدید</div>
          </div>

          <div className="text-xs bg-gray-50 dark:bg-dark-field rounded-xl p-2 text-center flex-1">
            <div className=" text-gray-900 dark:text-dark-titre">{product.lastViewed}</div>
            <div className=" text-gray-500 dark:text-caption mt-3 mb-1">آخرین بازدید</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="p-2 bg-gray-200 dark:bg-dark-field" title="مقایسه">
            <Maximize size={18} className="text-[#292D32] dark:text-dark-titre" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn("flex-1 gap-2", "bg-yellow-400 hover:bg-yellow-500 text-primary-800 border-yellow-500")}
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-4 w-4" />
            افزودن به سبد خرید
          </Button>
        </div>
      </div>
    </div>
  );
}
