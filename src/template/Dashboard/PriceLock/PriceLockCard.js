"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Clock, Trash } from "iconsax-reactjs";
import PriceLockDetailModal from "./PriceLockDetailModal";

export default function PriceLockCard({ lock, onCancelLock }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="w-full bg-white dark:bg-dark-box rounded-2xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm"
      style={{
        boxShadow: "0px 1px 6px 0px #0000000F",
        direction: "rtl",
      }}
    >
      {/* Product Image */}
      <div className="w-full md:w-36 h-48 md:h-28 relative flex-shrink-0 rounded-xl overflow-hidden">
        <Image src={lock.productImage} alt={lock.productName} fill className="object-cover" />
      </div>

      {/* Middle Content */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Product Title */}
        <h3 className="text-[15px] font-bold text-gray-900 dark:text-dark-title leading-6">{lock.productName}</h3>

        {/* Brand Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 w-full">
          {/* Brand Logo - Optional */}
          {lock.brandLogo && (
            <div className="w-20 h-6 relative">
              <Image src={lock.brandLogo} alt="brand logo" fill className="object-contain" />
            </div>
          )}
          <div className="flex items-center gap-2">
            <span className="text-gray-600 dark:text-dark-text text-sm">وضعیت</span>
            <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-lg">فعال</span>
          </div>
        </div>

        {/* Three Gray Boxes Row */}
        <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Box 1 - Locked Price */}
          <div className="flex-1 bg-gray-100 dark:bg-dark-field px-3 py-2 rounded-xl flex justify-between items-center">
            <span className="text-gray-600 dark:text-dark-text text-sm">قیمت قفل شده (تومان)</span>
            <span className="text-gray-900 dark:text-dark-title font-bold text-base">{lock.lockedPrice}</span>
          </div>

          {/* Box 2 - Down Payment */}
          <div className="flex-1 bg-gray-100 dark:bg-dark-field px-3 py-2 rounded-xl flex justify-between items-center">
            <span className="text-gray-600 dark:text-dark-text text-sm">پیش پرداخت</span>
            <span className="text-gray-900 dark:text-dark-title font-bold text-base">{lock.downPayment}</span>
          </div>

          {/* Box 3 - Time Remaining */}
          <div className="flex-1 bg-gray-100 dark:bg-dark-field px-3 py-2 rounded-xl flex justify-between items-center">
            <span className="text-gray-600 dark:text-dark-text text-sm">زمان باقی مانده</span>
            <span className="text-gray-900 dark:text-dark-title font-bold text-base">{lock.timeRemaining}</span>
          </div>
        </div>

        {/* Countdown Banner */}
        <div className="bg-yellow-400 rounded-lg p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-gray-900 dark:text-dark-title" />
            <span className="text-sm font-medium text-gray-900 dark:text-dark-title">ادامه خرید با قیمت قفل شده</span>
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-dark-title">{lock.countdown}</span>
        </div>
      </div>

      {/* Left Buttons */}
      <div className="flex flex-row md:flex-col gap-2 w-full md:w-32 flex-shrink-0">
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm py-2 rounded-lg"
          onClick={() => setIsModalOpen(true)}
        >
          مشاهده جزئیات
        </Button>

        <Button
          className="w-full bg-[#F6F7FB] text-red-500 hover:bg-red-50 font-medium text-sm py-2 rounded-lg border border-red-200 gap-2"
          onClick={() => {
            if (confirm("آیا از لغو قفل قیمت اطمینان دارید؟")) {
              onCancelLock?.(lock.id);
            }
          }}
        >
          <Trash size={18} />
          لغو قفل
        </Button>
      </div>

      {/* Detail Modal */}
      <PriceLockDetailModal lock={lock} open={isModalOpen} onOpenChange={setIsModalOpen} onCancelLock={onCancelLock} />
    </div>
  );
}
