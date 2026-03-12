"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star, X } from "lucide-react";

export default function ProductComparisonColumn({ product, onRemove }) {
  const productId = product?.id ?? product?.productId;
  const title = product?.title ?? product?.name ?? "";
  const slug = product?.slug ?? productId;
  const productHref = slug != null ? `/product/${slug}` : "/products";
  const rating = product?.rating;
  const reviewsCount = product?.reviewsCount ?? product?.reviewCount;
  const price = product?.price ?? product?.priceAfterDiscount ?? product?.finalPrice;
  const retailer = product?.retailer ?? product?.storeName ?? "Amazon";

  return (
    <div className="rounded-2xl bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke p-3 md:p-4 relative shadow-sm">
      <button
        onClick={onRemove}
        className="absolute top-3 left-3 z-10 w-8 h-8 flex items-center justify-center rounded-full transition-colors"
        aria-label="حذف از مقایسه"
      >
        <X size={25} className="text-gray-600 dark:text-dark-text" />
      </button>

      <div className="relative max-h-80 w-full aspect-square mb-2 overflow-hidden">
        <Image
          src={product?.image ?? product?.imageUrl ?? "/image/Home/product.png"}
          alt={title}
          fill
          className="object-cover rounded-2xl"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      <h3 className="font-medium text-neutral-800 dark:text-dark-titre line-clamp-2 min-h-[2.5rem]">
        {title || "—"}
      </h3>

      <div className="flex-between">
        <div className="flex items-center gap-2 mb-3">
          {rating != null && Number(rating) > 0 ? (
            <>
              <div className="flex items-center gap-1">
                <Star size={16} className="text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{rating}</span>
              </div>
              {(reviewsCount != null || product?.reviewCount != null) && (
                <span className="text-xs text-gray-500 dark:text-dark-text">
                  ({reviewsCount ?? product?.reviewCount})
                </span>
              )}
            </>
          ) : (
            <span className="text-xs text-gray-500 dark:text-dark-text">—</span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-medium text-gray-700 dark:text-dark-text">{retailer}</span>
        </div>
      </div>

      <div className="mb-4">
        <span className="text-neutral-800 dark:text-dark-titre">
          {price != null && price !== "" ? `${price} تومان` : "—"}
        </span>
      </div>

      <Link href={productHref} className="block">
        <Button className="w-full bg-primary-700 hover:bg-primary-600 dark:bg-dark-primary text-white">
          مشاهده محصول
        </Button>
      </Link>
    </div>
  );
}
