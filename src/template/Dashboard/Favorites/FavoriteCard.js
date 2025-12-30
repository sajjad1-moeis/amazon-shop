"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FavoriteCard({ product }) {
  return (
    <div
      className="w-full bg-white dark:bg-dark-field overflow-hidden rounded-2xl  flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm"
      style={{
        boxShadow: "0px 1px 6px 0px #0000000F",
        direction: "rtl",
      }}
    >
      {/* Product Image */}
      {/* Product Image */}
      <div className="w-full md:w-36 h-40 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 144px"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Middle Content */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Product Title */}
          <h3 className="text-lg  text-gray-900 dark:text-dark-titre leading-6">{product.title}</h3>

          {/* Brand Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
            {/* Brand Logo */}
            <div className="w-20 h-6 relative">
              <Image src={product.brandLogo} alt="brand logo" fill className="object-contain" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-dark-text text-sm">وضعیت ردیابی</span>
              <span className="bg-green-100 dark:bg-dark-green dark: dark:text-green-300 text-green-700 text-xs px-3 py-1 rounded-lg">
                فعال
              </span>
            </div>
          </div>

          {/* Three Gray Boxes Row */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Box 1 */}
            <div className="flex-1 bg-gray-100 dark:bg-dark-stroke px-3 py-2 rounded-xl flex justify-between items-center">
              <span className="text-gray-600 dark:text-dark-text text-sm">قیمت فعلی</span>
              <span className="text-gray-900 dark:text-dark-title font-bold text-base">{product.currentPrice}</span>
            </div>

            {/* Box 2 */}
            <div className="flex-1 bg-gray-100 dark:bg-dark-stroke px-3 py-2 rounded-xl flex justify-between items-center">
              <span className="text-gray-600 dark:text-dark-text text-sm">کمترین قیمت</span>
              <span className="text-gray-900 dark:text-dark-title font-bold text-base">{product.lowestPrice}</span>
            </div>

            {/* Box 3 */}
            <div className="flex-1 bg-gray-100 dark:bg-dark-stroke px-3 py-2 rounded-xl flex justify-between items-center">
              <span className="text-gray-600 dark:text-dark-text text-sm">بیشترین قیمت</span>
              <span className="text-gray-900 dark:text-dark-title font-bold text-base">{product.highestPrice}</span>
            </div>
          </div>
        </div>
        {/* Left Buttons */}
        <div className="flex flex-row md:flex-col gap-2 w-full md:w-32 flex-shrink-0">
          <Button className="w-full h-9 bg-yellow-400 hover:bg-yellow-500 text-gray-900 dark:text-primary-800 font-medium text-sm py-2 rounded-lg">
            مشاهده محصول
          </Button>

          <Button className="w-full h-9 bg-primary-700 hover:bg-[#3143D8] text-white font-medium text-sm py-2 rounded-lg">
            تنظیم هشدار قیمت
          </Button>

          <Button className="w-full h-9 bg-[#F6F7FB] dark:bg-dark-stroke text-red-500 hover:bg-red-50 font-medium text-sm py-2 rounded-lg ">
            حذف
          </Button>
        </div>
      </div>
    </div>
  );
}
