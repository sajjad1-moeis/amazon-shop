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
          <div className="w-full flex flex-col gap-4 bg-white dark:bg-transparent">
            {products.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`}>
                <ProductRowCard />
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                className={"h-full border-gray-200 dark:border-dark-stroke border"}
                product={product}
                badges={product.badges}
              />
            ))}
          </div>
        )}
      </div>
      <div className="md:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} badges={product.badges} />
          ))}
        </div>
      </div>
    </>
  );
}
