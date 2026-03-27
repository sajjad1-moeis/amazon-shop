"use client";

import React from "react";
import Link from "next/link";
import { DiscountShape, Shop } from "iconsax-reactjs";

const CATEGORY_CHIPS = [
  "خانه",
  "مد و پوشاک",
  "زیبایی",
  "لوازم",
  "اسباب‌بازی",
];

export default function DealsTopSection({ activeTab = "today" }) {
  return (
    <>
      <div className="bg-[#E5E7EB80] border-b border-gray-300 dark:border-dark-stroke dark:bg-dark-box overflow-hidden">
        <div className="flex items-center md:container max-md:text-sm h-max">
          <Link
            href="/today-deals"
            className={`md:w-max w-1/2 h-max  max-md:justify-center items-center md:px-5 pt-3 pb-2 text-center border-b transition-colors ${
              activeTab === "today"
                ? "text-primary-700 dark:text-primary-300 border-b-2 border-primary-600 bg-primary-400/20 dark:bg-primary-500/10"
                : "text-gray-600 dark:text-dark-text  border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field"
            }`}
          >
            <div className="inline-flex items-center gap-1 h-max">
              <DiscountShape variant="Bold" className="max-md:size-4.5" />
              تخفیف‌های امروز
            </div>
          </Link>
          <Link
            href="/outlet"
            className={`md:w-max w-1/2 h-max  max-md:justify-center items-center md:px-5 pt-3 pb-2 text-center transition-colors ${
              activeTab === "outlet"
                ? "text-primary-700 dark:text-primary-300 border-b-2 border-primary-600 bg-primary-400/20 dark:bg-primary-500/10"
                : "text-gray-600 dark:text-dark-text  border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field"
            }`}
          >
            <div className="inline-flex items-center gap-1 h-max">
              <Shop variant="Bold" className="max-md:size-4.5" />
              حراجی
            </div>
          </Link>
        </div>
      </div>


      {activeTab == "outlet" && (
<div className="px-4 py-8 md:pt-10 md:pb-22 md:container">

        <img
          src="/image/Outlet/outletBg.jpg"
          alt="بنر تخفیف"
          className="w-full  object-cover rounded-lg md:rounded-[28px]"
        />
          </div>
        )}

       
    </>
  );
}
