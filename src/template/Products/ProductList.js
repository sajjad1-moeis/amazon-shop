"use client";

import React from "react";
import ProductRowCard from "./ProductRowCard";
import ProductCard from "@/components/ProductCard";
import ProductNotFoundSection from "./ProductNotFoundSection";
import Link from "next/link";
import NotFoundView from "@/components/NotFoundView";
import { getNotFoundPreset } from "@/data/notFoundPresets";

const PRODUCTS_BEFORE_NOT_FOUND = 9;

export default function ProductList({ viewMode, products = [], totalCount = 0, searchMode = false, searchQuery = "" }) {
  const getProductKey = (product, index) =>
    product?.asin || product?.id || product?.productId || `product-${index}`;

  if (!products || products.length === 0) {
    const preset = getNotFoundPreset("products");
    return (
      <NotFoundView
        title={preset.title}
        description={preset.description}
        primaryButton={preset.primaryButton}
        secondaryButton={preset.secondaryButton}
        className="min-h-0 py-8"
      />
    );
  }

  const useGrid = searchMode || viewMode === "grid";
  const showNotFoundSection = searchMode && searchQuery;
  const firstBatch = showNotFoundSection ? products.slice(0, PRODUCTS_BEFORE_NOT_FOUND) : products;
  const secondBatch = showNotFoundSection ? products.slice(PRODUCTS_BEFORE_NOT_FOUND) : [];

  const renderProductCard = (product, index) => (
    <ProductCard
      key={getProductKey(product, index)}
      className={"h-full border-gray-200 dark:border-dark-stroke border"}
      product={product}
      badges={product.badges}
    />
  );

  const renderProductRow = (product, index) => (
    <Link
      key={getProductKey(product, index)}
      href={`/product/${product?.id ?? product?.asin ?? product?.amazonASIN ?? ""}`}
    >
      <ProductRowCard product={product} />
    </Link>
  );

  return (
    <>
      <div className="max-md:hidden">
        {useGrid ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {firstBatch.map((product, index) => renderProductCard(product, index))}
            </div>
            {showNotFoundSection && (
              <div className="mt-12">
                <ProductNotFoundSection searchQuery={searchQuery} />
              </div>
            )}
            {secondBatch.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
                {secondBatch.map((product, index) => renderProductCard(product, index + PRODUCTS_BEFORE_NOT_FOUND))}
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-4">
            {firstBatch.map((product, index) => renderProductRow(product, index))}
            {showNotFoundSection && (
              <div className="mt-12">
                <ProductNotFoundSection searchQuery={searchQuery} />
              </div>
            )}
            {secondBatch.map((product, index) => renderProductRow(product, index + PRODUCTS_BEFORE_NOT_FOUND))}
          </div>
        )}
      </div>
      <div className="md:hidden">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {firstBatch.map((product, index) => renderProductCard(product, index))}
        </div>
        {showNotFoundSection && (
          <div className="mt-12">
            <ProductNotFoundSection searchQuery={searchQuery} />
          </div>
        )}
        {secondBatch.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {secondBatch.map((product, index) => renderProductCard(product, index + PRODUCTS_BEFORE_NOT_FOUND))}
          </div>
        )}
      </div>
    </>
  );
}
