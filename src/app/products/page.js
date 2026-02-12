import React from "react";
import { createMetadata } from "@/utils/metadata";
import IndexLayout from "@/layout/IndexLayout";
import ProductsClient from "@/template/Products/ProductsClient";

export async function generateMetadata({ searchParams }) {
  // در Next.js 15، searchParams یک Promise است
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams?.search || "";
  const category = resolvedSearchParams?.category || "";
  
  let title = "محصولات | خرید از آمازون | میکرولس";
  let description = "خرید محصولات از آمازون آمریکا و امارات با ارسال سریع به ایران. هزاران محصول اصل و گارانتی شده با بهترین قیمت.";
  
  if (search) {
    title = `جستجوی "${search}" | محصولات | میکرولس`;
    description = `نتایج جستجو برای "${search}". خرید محصولات از آمازون با ارسال سریع به ایران.`;
  } else if (category) {
    title = `${category} | محصولات | میکرولس`;
    description = `خرید محصولات ${category} از آمازون آمریکا و امارات با ارسال سریع به ایران.`;
  }

  // ساخت URL query string
  const queryString = resolvedSearchParams && Object.keys(resolvedSearchParams).length > 0
    ? `?${new URLSearchParams(resolvedSearchParams).toString()}`
    : "";

  return createMetadata({
    title,
    description,
    keywords: ["محصولات", "آمازون", "خرید", "فروشگاه آنلاین", "محصولات آمریکا", "محصولات امارات"],
    url: `/products${queryString}`,
  });
}

export default async function ProductsPage({ searchParams }) {
  // در Next.js 15، searchParams یک Promise است
  const resolvedSearchParams = await searchParams;
  
  return (
    <IndexLayout>
      <ProductsClient searchParams={resolvedSearchParams} />
    </IndexLayout>
  );
}
