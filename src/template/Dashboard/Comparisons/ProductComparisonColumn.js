"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CloseCircle, Star } from "iconsax-reactjs";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ProductComparisonColumn({ product, onRemove }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl border border-gray-200 dark:border-dark-stroke p-4 relative">
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-dark-box shadow-md hover:bg-gray-100 dark:hover:bg-dark-field transition-colors"
      >
        <CloseCircle size={20} className="text-gray-600 dark:text-dark-text" />
      </button>

      {/* Product Image */}
      <div className="relative w-full aspect-square mb-4 bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
        <Image
          src={product.image || "/image/Home/product.png"}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Title */}
      <h3 className="text-sm font-medium text-gray-900 dark:text-dark-title mb-3 line-clamp-2 min-h-[2.5rem]">
        {product.title}
      </h3>

      {/* Retailer Badge */}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-gray-700 dark:text-dark-text">Amazon</span>
        <span className="text-xs">🇦🇪</span>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-yellow-500 fill-yellow-500" variant="Bold" />
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{product.rating}</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-dark-text">({product.reviewsCount})</span>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className="text-lg font-bold text-gray-900 dark:text-dark-title">
          {product.price} تومان
        </span>
      </div>

      {/* View Product Button */}
      <Link href={`/product/${product.id}`} className="block">
        <Button className="w-full bg-primary-700 hover:bg-primary-600 text-white">
          مشاهده محصول
        </Button>
      </Link>
    </div>
  );
}

