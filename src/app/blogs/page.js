import React from "react";
import { createMetadata } from "@/utils/metadata";
import IndexLayout from "@/layout/IndexLayout";
import BlogsClient from "@/template/Blogs/BlogsClient";

export async function generateMetadata({ searchParams }) {
  // در Next.js 15، searchParams یک Promise است
  await searchParams; // برای سازگاری، حتی اگر استفاده نمی‌کنیم
  
  return createMetadata({
    title: "بلاگ | مقالات و راهنمای خرید از آمازون | میکرولس",
    description:
      "مقالات و راهنمای خرید از آمازون، نکات خرید آنلاین، بررسی محصولات و آخرین اخبار و اطلاعات در مورد خرید از فروشگاه‌های بین‌المللی.",
    keywords: ["بلاگ", "مقاله", "راهنمای خرید", "آمازون", "خرید آنلاین", "بررسی محصولات"],
    url: "/blogs",
  });
}

export default async function BlogsPage({ searchParams }) {
  // در Next.js 15، searchParams یک Promise است
  const resolvedSearchParams = await searchParams;
  
  return (
    <IndexLayout>
      <BlogsClient searchParams={resolvedSearchParams} />
    </IndexLayout>
  );
}
