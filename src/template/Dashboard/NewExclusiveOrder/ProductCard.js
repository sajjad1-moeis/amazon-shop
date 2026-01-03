"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Timer1 } from "iconsax-reactjs";
import StatusBadge from "@/components/StatusBadge";

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
        <div className="w-full md:w-32 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden max-md:hidden">
          <Image src={"/image/Home/product.png"} alt={title} fill className="object-cover" />
        </div>

        {/* Middle Content */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Title & Countdown */}
          <div class="flex-between gap-2 w-full">
            <div className="size-20 relative flex-shrink-0 rounded-xl overflow-hidden md:hidden">
              <Image src={"/image/Home/product.png"} alt={title} fill className="object-cover" />
            </div>
            <div className="w-full">
              <div className="flex-between w-full">
                <h3 className="text-[15px]  text-gray-900 dark:text-dark-titre leading-6">
                  {title || "Apple AirPods Pro (2nd Generation)"}
                </h3>

                <div className="text-green-800 max-md:hidden dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2.5 py-1 text-sm rounded-md flex gap-2">
                  موجود در آمازون امارات
                </div>
              </div>
              <div class="flex-between  mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 dark:text-dark-text text-xs">برند:</span>
                  <p className="text-primary-500 dark:text-dark-title">SONY</p>
                </div>
                <div className="flex items-center gap-2 md:hidden">
                  <span className="text-gray-600 dark:text-dark-text text-xs max-md:hidden">وضعیت ردیابی</span>

                  <StatusBadge status={status} />
                </div>
              </div>
            </div>
          </div>

          {/* Info Boxes */}
          <div className="w-full flex flex-col md:flex-row md:flex-wrap  justify-between gap-2">
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
