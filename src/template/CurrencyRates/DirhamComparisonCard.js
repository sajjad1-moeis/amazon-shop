"use client";

import React from "react";

export default function DirhamComparisonCard() {
  const dirhamComparison = [
    {
      id: 1,
      name: "میکرولس",
      rate: "۴۲,۹۰۰",
      color: "text-green-600 dark:text-green-500",
      borderColor: "border-green-500",
    },
    {
      id: 2,
      name: "BONBAST",
      rate: "۴۳,۱۰۰",
      color: "text-blue-700 dark:text-blue-400",
      borderColor: "border-blue-700 dark:border-blue-400",
    },
    {
      id: 3,
      name: "tgju",
      rate: "۴۵,۹۰۰",
      color: "text-red-600 dark:text-red-500",
      borderColor: "border-red-600 dark:border-red-500",
      icon: "🥇",
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
      <h3 className="text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-dark-title mb-4 md:mb-6 text-right">
        مقایسه نرخ درهم با منابع معتبر
      </h3>

      <div className="space-y-3 md:space-y-4 h-full">
        {/* باکس میکرولس */}
        <div
          className={`border bg-green-50 dark:bg-dark-green border-green-300 dark:border-green-500 rounded-xl p-3 md:p-4`}
        >
          <div className="flex-center flex-col justify-between h-full">
            <img src="/image/logo-black.png" className="max-w-16 md:max-w-20 lg:max-w-24 dark:invert" alt="" />
            <p
              className={`text-base md:text-2xl lg:text-3xl font-bold mt-3 md:mt-5 text-green-600 dark:text-green-300`}
            >
              {dirhamComparison[0].rate} ت
            </p>
          </div>
        </div>

        {/* دو باکس پایین */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {/* باکس BONBAST */}
          <div className={`bg-gray-100 dark:bg-dark-field rounded-xl p-3 md:p-4`}>
            <div className="flex-center flex-col justify-between h-full">
              <img src="/image/tala.png" className="max-w-16 md:max-w-20 lg:max-w-24" alt="" />

              <p className={`text-sm md:text-xl lg:text-2xl mt-3 md:mt-5 text-red-600 dark:text-red-300`}>
                {dirhamComparison[0].rate} ت
              </p>
            </div>
          </div>

          {/* باکس tgju */}
          <div className={`bg-gray-100 dark:bg-dark-field h-full rounded-xl p-3 md:p-4`}>
            <div className="flex-center flex-col justify-between h-full">
              <p className="text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-white">BONBAST</p>
              <p className={`text-sm md:text-xl lg:text-2xl mt-3 md:mt-5 text-dark-primary dark:text-dark-title`}>
                {dirhamComparison[0].rate} ت
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
