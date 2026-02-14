import React from "react";
import { createMetadata } from "@/utils/metadata";
import CateGoryPage from "../page";

export async function generateMetadata({ params }) {
  // در Next.js 15، params یک Promise است
  const resolvedParams = await params;
  const categoryName = resolvedParams?.categoryName || "دسته‌بندی";
  const decodedCategoryName = decodeURIComponent(categoryName);

  return createMetadata({
    title: `${decodedCategoryName} | خرید از آمازون | میکرولس`,
    description: `خرید محصولات ${decodedCategoryName} از آمازون آمریکا و امارات با ارسال سریع به ایران. بهترین قیمت و تضمین اصالت کالا.`,
    keywords: [decodedCategoryName, "خرید", "آمازون", "محصولات", "میکرولس"],
    url: `/categories/${categoryName}`,
  });
}

function Page() {
  return <CateGoryPage />;
}

export default Page;
