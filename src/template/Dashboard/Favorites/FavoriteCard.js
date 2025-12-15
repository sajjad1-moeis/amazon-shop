"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function FavoriteCard({ product }) {
  return (
    <div
      className="w-full bg-white rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm"
      style={{
        boxShadow: "0px 1px 6px 0px #0000000F",
        direction: "rtl",
      }}
    >
      {/* Product Image */}
      <div className="w-full md:w-36 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={product.image} alt={product.title} fill className="object-cover" />
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Product Title */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-6">{product.title}</h3>

        {/* Brand Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          {/* Brand Logo */}
          <div className="w-20 h-6 relative">
            <Image src={product.brandLogo} alt="brand logo" fill className="object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-600 text-sm">وضعیت ردیابی</span>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-lg">فعال</span>
          </div>
        </div>

        {/* Three Gray Boxes Row */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Box 1 */}
          <div className="flex-1 bg-gray-100 px-3 py-2 rounded-xl flex justify-between items-center">
            <span className="text-gray-600 text-sm">قیمت فعلی</span>
            <span className="text-gray-900 font-bold text-base">{product.currentPrice}</span>
          </div>

          {/* Box 2 */}
          <div className="flex-1 bg-gray-100 px-3 py-2 rounded-xl flex justify-between items-center">
            <span className="text-gray-600 text-sm">کمترین قیمت</span>
            <span className="text-gray-900 font-bold text-base">{product.lowestPrice}</span>
          </div>

          {/* Box 3 */}
          <div className="flex-1 bg-gray-100 px-3 py-2 rounded-xl flex justify-between items-center">
            <span className="text-gray-600 text-sm">بیشترین قیمت</span>
            <span className="text-gray-900 font-bold text-base">{product.highestPrice}</span>
          </div>
        </div>
      </div>
      {/* Left Buttons */}
      <div className="flex flex-row md:flex-col gap-2 w-full md:w-32 flex-shrink-0">
        <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium text-sm py-2 rounded-lg">
          مشاهده محصول
        </Button>

        <Button className="w-full bg-primary-700 hover:bg-[#3143D8] text-white font-medium text-sm py-2 rounded-lg">
          تنظیم هشدار قیمت
        </Button>

        <Button className="w-full bg-[#F6F7FB] text-red-500 hover:bg-red-50 font-medium text-sm py-2 rounded-lg border border-red-200">
          حذف
        </Button>
      </div>
    </div>
  );
}
