import IndexLayout from "@/layout/IndexLayout";
import { createMetadata } from "@/utils/metadata";
import BestSellingGadgets from "@/template/Categories/BestSellingGadgets";
import BiggestDiscounts from "@/template/Categories/BiggestDiscounts";
import Category from "@/template/Categories/category";
import MicroLessDescription from "@/template/Categories/MicroLessDescription";
import Image from "next/image";
import React from "react";

export async function generateMetadata() {
  return createMetadata({
    title: "دسته‌بندی محصولات | خرید از آمازون به تفکیک دسته",
    description:
      "بررسی و خرید محصولات از آمازون به تفکیک دسته‌بندی. کالای دیجیتال، پوشاک، لوازم خانگی و هزاران محصول دیگر با ارسال سریع به ایران.",
    keywords: [
      "دسته‌بندی محصولات",
      "دسته‌بندی",
      "کالای دیجیتال",
      "محصولات آمازون",
      "خرید آنلاین",
      "میکرولس",
    ],
    url: "/categories",
  });
}

function CateGoryPage() {
  return (
    <IndexLayout>
      <div className="relative w-full h-48 sm:h-60 md:h-[400px] lg:h-[550px] xl:h-[700px]">
        <Image
          src="/image/Category/categoryLogo.png"
          alt="banner"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>
      <div className="max-md:px-4">
        <div
          className="bg-[#FBFBFB] dark:bg-[#2A2A2A] container rounded-[32px] relative  -mt-[10%] p-3 lg:p-6 mb-8 md:mb-22"
          style={{ boxShadow: "0px 0px 20px 0px #00000029" }}
        >
          <Category />
          <BestSellingGadgets />
          <BiggestDiscounts />
          <MicroLessDescription />
        </div>
      </div>
    </IndexLayout>
  );
}

export default CateGoryPage;
