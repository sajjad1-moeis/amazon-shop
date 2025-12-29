"use client";

import React from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";

export default function ProductCard({ product }) {
  if (!product) return null;

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
      <Label className="text-sm font-medium text-gray-700 dark:text-dark-text mb-4 block">
        محصول وارد شده
      </Label>
      <div className="flex gap-4">
        <div className="flex-1 space-y-3">
          <h3 className="text-base font-bold text-gray-900 dark:text-dark-title">{product.name}</h3>
          <div className="space-y-1.5 text-sm text-gray-600 dark:text-dark-text">
            <p>برند: {product.brand}</p>
            {product.available && (
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                موجود در آمازون امارات
              </span>
            )}
            <p>فروشنده: {product.seller}</p>
            <p>وزن: {product.weight}</p>
            <p>قیمت فعلی: {product.currentPrice}</p>
          </div>
        </div>
        <div className="w-32 h-32 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-field">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

