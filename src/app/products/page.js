"use client";

import React from "react";
import IndexLayout from "@/layout/IndexLayout";
import ProductsClient from "@/template/Products/ProductsClient";

/**
 * صفحهٔ محصولات — فقط فلوی لوکال: ProductsClient (جستجو از اسکرپر، prefetch، اسکلتون، mock وقتی جستجو خالی).
 * بنرها، سئو و بقیهٔ تغییرات فرانت کار دیگر در layout/سایر صفحات می‌ماند؛ اینجا فقط سورس خودت.
 */
export default function ProductsPage({ searchParams }) {
  return (
    <IndexLayout>
      <ProductsClient searchParams={searchParams} />
    </IndexLayout>
  );
}
