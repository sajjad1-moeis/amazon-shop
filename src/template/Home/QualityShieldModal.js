"use client";

import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function QualityShieldModal({ open, onOpenChange }) {
  const features = [
    "بررسی دقیق اصالت و سلامت فیزیکی",
    "ارسال عکس و ویدیو واقعی از کالای شما",
    "تأیید عملکرد و لوازم جانبی کامل",
    "انجام بررسی در انبار امارات پیش از ارسال",
    "گزارش تصویری در پنل کاربر",
  ];

  const price = 12450000;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} dir="rtl">
      <DialogContent
        className="sm:max-w-[400px] max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-box dark:border-dark-stroke p-0 !rounded-2xl"
        dir="rtl"
      >
        <div className="p-4">
          {/* Logo Section - کاربر خودش عکس رو میذاره */}
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32">
              <img src="/image/Home/shield.png" alt="سپر کیفیت میکرولس" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-[#0554DB] dark:text-primary-400 text-center mb-6">
            سپر کیفیت میکرولس
          </h2>

          {/* Description Box */}
          <div className="bg-gray-100 dark:bg-dark-field border border-gray-200 dark:border-dark-stroke rounded-xl p-3 mb-6">
            <p className="text-gray-700 dark:text-dark-text text-sm md:text-base mb-4 text-right">
              با فعال سازی سپر کیفیت، تیم میکرولس محصول شما را به صورت تخصصی بررسی خواهد کرد
            </p>

            {/* Features List */}
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3 text-right">
                  <div className="w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 dark:text-dark-text text-sm md:text-base">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rules Link */}
          <div className="mb-6 text-center">
            <button className="text-sm md:text-base text-gray-600 dark:text-dark-text hover:text-blue-600 dark:hover:text-primary-400 transition-colors">
              مشاهده{" "}
              <span className="text-blue-600 dark:text-primary-400 font-medium hover:underline">قوانین سپر کیفیت</span>
            </button>
          </div>

          {/* Price */}
          <div className="mb-6 text-center">
            <span className="text-gray-600 dark:text-dark-text text-sm md:text-base">هزینه :</span>
            <span className="text-gray-900 dark:text-dark-title font-bold text-lg md:text-xl mr-2">
              {Number(price).toLocaleString("fa-IR")} تومان
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => {
                onOpenChange(false);
              }}
              variant="outline"
              className="bg-gray-200 hover:bg-gray-300 dark:bg-dark-field dark:hover:bg-dark-box dark:text-dark-text dark:border-dark-stroke text-black font-medium rounded-lg py-3 text-sm md:text-base border-0"
            >
              ادامه بدون سپر کیفیت
            </Button>
            <Button
              onClick={() => {
                // TODO: افزودن سپر کیفیت
                console.log("افزودن سپر کیفیت");
                onOpenChange(false);
              }}
              className="bg-yellow-400 hover:bg-yellow-500 dark:bg-yellow-500 dark:hover:bg-yellow-600 text-black font-medium rounded-lg py-3 text-sm md:text-base"
            >
              افزودن سپر کیفیت
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
