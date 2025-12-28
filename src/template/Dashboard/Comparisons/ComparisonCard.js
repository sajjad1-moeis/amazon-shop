"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Eye } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function ComparisonCard({ comparison, onDelete, onView }) {
  const firstProduct = comparison.products?.[0];
  const secondProduct = comparison.products?.[1];

  return (
    <div
      className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Header - Category Tag and Title */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            {comparison.category}
          </span>
        </div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-dark-title">{comparison.title}</h3>
      </div>

      {/* Products Comparison - VS Layout */}
      <div className="flex items-center justify-between gap-3 mb-4">
        {/* First Product */}
        {firstProduct && (
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full aspect-square max-h-32 bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
              <Image
                src={firstProduct.image || "/image/Home/product.png"}
                alt={firstProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-dark-text text-center line-clamp-2">{firstProduct.title}</p>
          </div>
        )}

        {/* VS Icon */}
        <div className="flex-shrink-0">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-dark-field flex items-center justify-center">
            <span className="text-xs font-bold text-gray-600 dark:text-dark-text">VS</span>
          </div>
        </div>

        {/* Second Product */}
        {secondProduct && (
          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="relative w-full aspect-square max-h-32 bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
              <Image
                src={secondProduct.image || "/image/Home/product.png"}
                alt={secondProduct.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <p className="text-xs text-gray-600 dark:text-dark-text text-center line-clamp-2">{secondProduct.title}</p>
          </div>
        )}
      </div>

      {/* Info Boxes - Date and Products Count */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {/* Save Date */}
        <div className="bg-gray-100 dark:bg-dark-field/50 rounded-lg p-3">
          <div className="text-xs text-gray-600 dark:text-dark-text mb-1">تاریخ ذخیره</div>
          <div className="text-sm font-medium text-gray-900 dark:text-dark-title">{comparison.saveDate}</div>
        </div>

        {/* Products Count */}
        <div className="bg-gray-100 dark:bg-dark-field/50 rounded-lg p-3">
          <div className="text-xs text-gray-600 dark:text-dark-text mb-1">تعداد محصولات</div>
          <div className="text-sm font-medium text-gray-900 dark:text-dark-title">{comparison.productsCount} محصول</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          onClick={() => onView?.(comparison.id)}
          className="flex-1 bg-primary-700 hover:bg-primary-600 text-white gap-2"
        >
          <Eye size={18} />
          مشاهده مقایسه
        </Button>
        <Button
          variant="outline"
          onClick={onDelete}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 border-red-300 dark:border-red-800 gap-2"
        >
          <Trash2 size={18} />
          حذف
        </Button>
      </div>
    </div>
  );
}
