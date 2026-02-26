"use client";

import React from "react";
import ProductRowCard from "./ProductRowCard";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";

export default function ProductList({ viewMode, products = [], totalCount = 0, searchMode = false }) {
  const getProductKey = (product, index) =>
    product?.asin || product?.id || product?.productId || `product-${index}`;

  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center text-gray-400 dark:text-gray-500">
        <p>محصولی یافت نشد</p>
        {searchMode && (
          <p className="mt-2 text-sm">عبارت جستجو را تغییر دهید یا بعداً تلاش کنید.</p>
        )}
      </div>
    );
  }

  const useGrid = searchMode || viewMode === "grid";

  return (
    <>
      <div className="max-md:hidden">
        {useGrid ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product, index) => (
              <ProductCard
                key={getProductKey(product, index)}
                className={"h-full border-gray-200 dark:border-dark-stroke border"}
                product={product}
                badges={product.badges}
              />
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {products.map((product, index) => (
              <Link
                key={getProductKey(product, index)}
                href={`/product/${product?.id ?? product?.asin ?? product?.amazonASIN ?? ""}`}
              >
                <ProductRowCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <div className="md:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product, index) => (
            <ProductCard
              key={getProductKey(product, index)}
              product={product}
              badges={product.badges}
            />
          ))}
        </div>
      </div>
    </>
  );
}
