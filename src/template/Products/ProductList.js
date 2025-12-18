"use client";

import React from "react";
import ProductRowCard from "./ProductRowCard";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

export default function ProductList({ viewMode, products = [], totalCount = 0 }) {
  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400">
        <p>محصولی یافت نشد</p>
      </div>
    );
  }

  const formatPrice = (price) => {
    if (!price && price !== 0) return "قیمت نامشخص";
    return `${Number(price).toLocaleString("fa-IR")} تومان`;
  };

  return (
    <>
      <div className="max-md:hidden">
        {viewMode === "list" ? (
          <div className="w-full space-y-4 bg-white dark:bg-transparent">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
                  <div className="flex gap-4">
                    <div className="w-32 h-32 relative flex-shrink-0">
                      {product.mainImage ? (
                        <Image
                          src={product.mainImage}
                          alt={product.name || product.title}
                          fill
                          className="object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                          <span className="text-gray-400">بدون تصویر</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {product.name || product.title}
                      </h3>
                      {product.shortDescription && (
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">
                            {formatPrice(product.discountPrice || product.price)}
                          </p>
                          {product.discountPrice && product.price && product.discountPrice < product.price && (
                            <p className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</p>
                          )}
                        </div>
                        {product.rating && (
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {product.rating.toFixed(1)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative mb-3">
                    {product.mainImage ? (
                      <Image
                        src={product.mainImage}
                        alt={product.name || product.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">بدون تصویر</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name || product.title}
                  </h3>
                  <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                    {formatPrice(product.discountPrice || product.price)}
                  </p>
                  {product.discountPrice && product.price && product.discountPrice < product.price && (
                    <p className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:hidden">
        {products.map((product) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:shadow-lg transition-shadow">
              <div className="aspect-square relative mb-3">
                {product.mainImage ? (
                  <Image
                    src={product.mainImage}
                    alt={product.name || product.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">بدون تصویر</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">
                {product.name || product.title}
              </h3>
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                {formatPrice(product.discountPrice || product.price)}
              </p>
              {product.discountPrice && product.price && product.discountPrice < product.price && (
                <p className="text-xs text-gray-400 line-through">{formatPrice(product.price)}</p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
