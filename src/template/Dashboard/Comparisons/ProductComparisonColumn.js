"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, X } from "lucide-react";

export default function ProductComparisonColumn({ product, onRemove }) {
  return (
    <div className="rounded-2xl  relative">
      {/* Remove Button */}
      <button
        onClick={onRemove}
        className="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full  transition-colors"
      >
        <X size={25} className="text-gray-600 dark:text-dark-text" />
      </button>

      {/* Product Image */}
      <div className="relative max-h-80 w-full aspect-square mb-2  overflow-hidden">
        <Image
          src={product.image || "/image/Home/product.png"}
          alt={product.title}
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* Product Title */}
      <h3 className="font-medium text-neutral-800 dark:text-dark-titre  line-clamp-2 min-h-[2.5rem]">
        {product.title}
      </h3>

      {/* Retailer Badge */}

      {/* Rating */}
      <div class="flex-between">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={16} className="text-yellow-500 fill-yellow-500" variant="Bold" />
            <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 dark:text-dark-text">({product.reviewsCount})</span>
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-gray-700 dark:text-dark-text">Amazon</span>
          <span className="text-xs">🇦🇪</span>
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <span className=" text-neutral-800 dark:text-dark-titre">{product.price} تومان</span>
      </div>

      {/* View Product Button */}
      <Link href={`/product/${product.id}`} className="block">
        <Button className="w-full bg-primary-700 hover:bg-primary-600 dark:bg-dark-primary text-white">
          مشاهده محصول
        </Button>
      </Link>
    </div>
  );
}
