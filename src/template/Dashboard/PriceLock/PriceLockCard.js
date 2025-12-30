"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Timer1 } from "iconsax-reactjs";

export default function PriceLockCard({ product, onCancelLock, onViewDetails, removeHandler }) {
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
    <div className="w-full bg-white dark:bg-dark-box rounded-xl p-2 border border-gray-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
      {/* Product Image */}
      <div className="w-full md:w-32 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={"/Home/product.png" || image} alt={title} fill className="object-cover" />
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Title & Countdown */}
        <div className="flex-between">
          <h3 className="text-[15px] font-bold text-gray-900 dark:text-dark-title leading-6">
            {title || "Apple AirPods Pro (2nd Generation)"}
          </h3>

          <div className="text-primary-500 bg-primary-50 px-2.5 py-1 text-sm rounded-md flex gap-2">
            <Timer1 size={20} />
            {countdown}
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-dark-text text-sm">وضعیت ردیابی</span>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-lg">
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

      {/* Actions */}
      {!removeHandler && (
        <div className="flex flex-row md:flex-col gap-2 w-fit">
          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 dark:text-dark-title font-medium text-sm py-2 rounded-lg">
            ادامه خرید با قیمت قفل شده
          </Button>

          <Button
            onClick={() => onViewDetails?.(product)}
            className="w-full bg-primary-700 hover:bg-[#3143D8] text-white font-medium text-sm py-2 rounded-lg"
          >
            مشاهده جزئیات
          </Button>

          <Button
            onClick={() => onCancelLock?.(product?.id)}
            className="w-full bg-[#F6F7FB] text-red-500 hover:bg-red-50 font-medium text-sm py-2 rounded-lg border border-red-200"
          >
            لغو قفل
          </Button>
        </div>
      )}
    </div>
  );
}

function InfoBox({ label, value }) {
  return (
    <div className="flex-1 bg-gray-100 dark:bg-dark-field px-2 py-1 rounded-lg flex justify-between items-center">
      <span className="text-gray-600 dark:text-dark-text text-xs">{label}</span>
      <span className="text-gray-900 dark:text-dark-title text-base">{value || "-"}</span>
    </div>
  );
}
