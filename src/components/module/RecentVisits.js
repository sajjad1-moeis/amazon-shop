"use client";

import Image from "next/image";
import React from "react";

function RecentVisits() {
  return (
    <div>
      <h3 className="md:text-2xl font-semibold text-right mb-6 text-gray-700 dark:text-white">بازدید های اخیر شما</h3>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 md:gap-6 mb-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="relative aspect-square bg-white rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
          >
            <Image
              src="/image/Home/product.png"
              alt={`محصول بازدید شده شماره ${i}`}
              fill
              className="object-cover rounded-md"
              priority={i === 1} // سئو بهتر برای اولین تصویر
            />
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-6" />
    </div>
  );
}

export default RecentVisits;
