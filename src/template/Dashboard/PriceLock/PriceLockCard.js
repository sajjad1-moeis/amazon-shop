"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LockSlash, Timer1 } from "iconsax-reactjs";
import StatusBadge from "@/components/StatusBadge";
import { cn } from "@/lib/utils";

export default function PriceLockCard({ product, onCancelLock, onViewDetails, removeBorder, removeHandler }) {
  const { title, status = "active", countdown = "02:24:12", lockedPrice, downPayment, timeRemaining } = product || {};

  return (
    <div
      className={cn(
        "w-full bg-white dark:bg-dark-box dark:border-dark-stroke rounded-xl  border-gray-200 flex flex-col lg:flex-row items-stretch md:items-center justify-between gap-4",
        removeBorder || "border p-2 "
      )}
    >
      {/* Product Image */}
      <div className="w-full md:w-32 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden max-lg:hidden">
        <Image src={"/image/Home/product.png"} alt={title} fill className="object-cover" />
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col gap-3 md:gap-5 w-full justify-between">
        {/* Title & Countdown */}
        <div class="flex-between gap-2">
          <div className="size-20 relative rounded-xl overflow-hidden lg:hidden">
            <Image src={"/image/Home/product.png"} alt={title} fill className="object-cover" />
          </div>
          <div class="w-full">
            <div className="flex-between">
              <h3 className="text-[15px]  text-gray-900 dark:text-dark-titre leading-6">
                {title || "Apple AirPods Pro (2nd Generation)"}
              </h3>

              <div className="text-primary-500 dark:bg-dark-blue dark:text-primary-300 bg-primary-50 px-2.5 py-1 text-sm rounded-md flex gap-2">
                <Timer1 size={20} />
                {countdown}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3 lg:hidden">
              <span className="text-gray-600 dark:text-dark-text text-sm">وضعیت ردیابی</span>
              <StatusBadge status={status} />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          <div className="flex items-center gap-2 max-lg:hidden">
            <span className="text-gray-600 dark:text-dark-text text-sm">وضعیت ردیابی</span>
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Info Boxes */}
        <div className="w-full flex flex-col md:flex-row md:flex-wrap  justify-between gap-2">
          <InfoBox label="قیمت قفل شده (تومان)" value={lockedPrice} />
          <InfoBox label="پیش‌پرداخت" value={downPayment} />
          <InfoBox label="زمان باقی‌مانده" value={timeRemaining} />
        </div>
      </div>

      {/* Actions */}
      {!removeHandler && (
        <div className="flex flex-row lg:flex-col gap-1 md:gap-2 w-full lg:w-auto overflow-auto">
          <Button className="md:w-full max-md:px-3.5 bg-yellow-400 hover:bg-yellow-500 text-gray-900  font-medium text-sm py-2 rounded-lg">
            ادامه خرید با قیمت قفل <span className="max-md:hidden">شده</span>
          </Button>

          <Button
            onClick={() => onViewDetails?.(product)}
            className="md:w-full max-md:px-3.5 bg-primary-700 dark:bg-dark-primary text-white font-medium text-sm py-2 rounded-lg"
          >
            مشاهده جزئیات
          </Button>

          <Button
            onClick={() => onCancelLock?.(product?.id)}
            className="w-full bg-[#F6F7FB] max-md:w-9 dark:bg-dark-stroke dark:border-0 dark:text-red-400 text-red-500 hover:bg-red-50 font-medium text-sm py-2 rounded-lg border border-red-200"
          >
            <span className="max-md:hidden">لغو قفل</span>
            <LockSlash className="md:hidden" />
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
      <span className="text-gray-900 dark:text-dark-titre text-base">{value || "-"}</span>
    </div>
  );
}
