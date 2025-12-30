"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Timer1 } from "iconsax-reactjs";

export default function ProductCard({ product, onCancelLock, onViewDetails }) {
  const {
    title,
    image,
    status = "active",
    countdown = "02:24:12",
    lockedPrice,
    downPayment,
    timeRemaining,
  } = product || {};

  return (
    <>
      <p className="mt-6 mb-4 text-primary-800 dark:text-primary-300">محصول وارد شده</p>
      <div className="w-full bg-gray-50 dark:bg-dark-field rounded-xl p-2 border border-gray-200 dark:border-dark-stroke flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Product Image */}
        <div className="w-full md:w-32 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-dark-box">
          <Image src={"/Home/product.png" || image} alt={title} fill className="object-cover" />
        </div>

        {/* Middle Content */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Title & Countdown */}
          <div className="flex-between">
            <h3 className="text-[15px] font-bold text-gray-900 dark:text-dark-titre leading-6">
              {title || "Apple AirPods Pro (2nd Generation)"}
            </h3>

            <div className="text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 text-sm rounded-md flex gap-2">
              موجود در آمازون امارات
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-dark-text text-sm">وضعیت ردیابی</span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded-lg">
                {status === "active" ? "فعال" : "غیرفعال"}
              </span>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
            <InfoBox label="قیمت قفل شده (تومان)" value={lockedPrice} />
            <InfoBox label="پیش‌پرداخت" value={downPayment} />
            <InfoBox label="زمان باقی‌مانده" value={timeRemaining} />
          </div>
        </div>
      </div>
    </>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-dark-stroke px-2 py-1 rounded-lg flex justify-between items-center">
      <span className="text-gray-600 dark:text-dark-text text-xs">{label}</span>
      <span className="text-gray-900 dark:text-dark-titre text-base">{value || "-"}</span>
    </div>
  );
}
