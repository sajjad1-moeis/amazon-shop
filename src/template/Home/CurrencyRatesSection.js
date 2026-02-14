"use client";

import React from "react";

export default function CurrencyRatesSection() {
  // داده‌های مقایسه نرخ درهم
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

  // داده‌های جدول نرخ ارزها
  const currencyRates = [
    {
      id: 1,
      name: "درهم عمارات",
      code: "AED",
      flag: "🇦🇪",
      rate: "۱۳,۰۵۰",
      date: "۱۴۰۴/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
    {
      id: 2,
      name: "دلار آمریکا",
      code: "USD",
      flag: "🇺🇸",
      rate: "۱۵۰,۰۰۰",
      date: "۱۴۰۴/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
    {
      id: 3,
      name: "یورو",
      code: "EUR",
      flag: "🇪🇺",
      rate: "۱۴۴,۰۰۰",
      date: "۱۴۰۴/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
    {
      id: 4,
      name: "پوند انگلستان",
      code: "GBP",
      flag: "🇬🇧",
      rate: "۲۱۲,۰۰۰",
      date: "۱۴۰۴/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
  ];

  return (
    <div className="w-full bg-gray-50 dark:bg-dark-bg py-8 md:py-12">
      <div className="container px-4">
        {/* دو کارت اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-8">
          {/* کارت سمت چپ: مقایسه نرخ درهم */}
          <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-dark-title mb-4 md:mb-6 text-right">
              مقایسه نرخ درهم با منابع معتبر
            </h3>

            <div className="space-y-3 md:space-y-4">
              {/* باکس میکرولس */}
              <div
                className={`border-2 ${dirhamComparison[0].borderColor} rounded-xl p-3 md:p-4 bg-gray-50 dark:bg-dark-field`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-base md:text-lg font-bold ${dirhamComparison[0].color}`}>
                    {dirhamComparison[0].rate} ت
                  </span>
                  <span className="text-sm md:text-base text-gray-700 dark:text-dark-text font-medium">
                    {dirhamComparison[0].name}
                  </span>
                </div>
              </div>

              {/* دو باکس پایین */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {/* باکس BONBAST */}
                <div
                  className={`border-2 ${dirhamComparison[1].borderColor} rounded-xl p-3 md:p-4 bg-gray-50 dark:bg-dark-field`}
                >
                  <div className="flex flex-col items-end gap-2">
                    <span className={`text-base md:text-lg font-bold ${dirhamComparison[1].color}`}>
                      {dirhamComparison[1].rate} ت
                    </span>
                    <span className="text-xs md:text-sm text-gray-700 dark:text-dark-text font-medium">
                      {dirhamComparison[1].name}
                    </span>
                  </div>
                </div>

                {/* باکس tgju */}
                <div
                  className={`border-2 ${dirhamComparison[2].borderColor} rounded-xl p-3 md:p-4 bg-gray-50 dark:bg-dark-field`}
                >
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1">
                      <span className={`text-base md:text-lg font-bold ${dirhamComparison[2].color}`}>
                        {dirhamComparison[2].rate} ت
                      </span>
                      {dirhamComparison[2].icon && (
                        <span className="text-lg md:text-xl">{dirhamComparison[2].icon}</span>
                      )}
                    </div>
                    <span className="text-xs md:text-sm text-gray-700 dark:text-dark-text font-medium">
                      {dirhamComparison[2].name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* کارت سمت راست: جدول نرخ ارزها */}
          <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-dark-title mb-4 md:mb-6 text-right">
              جدول نرخ ارزها
            </h3>

            {/* جدول */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-stroke">
                    <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-dark-text">
                      ارز
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-dark-text">
                      نرخ (تومان)
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-dark-text">
                      تاریخ و ساعت
                    </th>
                    <th className="text-right py-3 px-2 md:px-4 text-xs md:text-sm font-semibold text-gray-700 dark:text-dark-text">
                      منبع
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currencyRates.map((currency) => (
                    <tr
                      key={currency.id}
                      className="border-b border-gray-100 dark:border-dark-stroke/50 hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors"
                    >
                      <td className="py-3 px-2 md:px-4">
                        <div className="flex items-center gap-2 justify-end">
                          <span className="text-base md:text-lg">{currency.flag}</span>
                          <div className="text-right">
                            <p className="text-xs md:text-sm font-medium text-gray-900 dark:text-dark-title">
                              {currency.name}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-dark-text">{currency.code}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <span className="text-xs md:text-sm font-bold text-gray-900 dark:text-dark-title">
                          {currency.rate}
                        </span>
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <span className="text-xs md:text-sm text-gray-700 dark:text-dark-text">
                          {currency.date} - {currency.time}
                        </span>
                      </td>
                      <td className="py-3 px-2 md:px-4">
                        <span className="text-xs md:text-sm text-gray-700 dark:text-dark-text">
                          {currency.source}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* بخش توضیحات پایین */}
        <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
          <h4 className="text-base md:text-lg font-bold text-blue-600 dark:text-primary-400 mb-3 md:mb-4 text-right">
            نرخ درهم امروز در ایران
          </h4>
          <p className="text-sm md:text-base text-gray-700 dark:text-dark-text leading-relaxed text-right">
            نرخ درهم امارات امروز بر اساس آخرین داده‌های دریافت شده از کانال‌های معتبر تلگرام به صورت لحظه‌ای در
            Microless بروزرسانی می‌شود. کاربران می‌توانند قیمت درهم، دلار و سایر ارزهای جهانی را همراه با نمودار تغییرات
            و آرشیو تاریخی مشاهده کنند.
          </p>
        </div>
      </div>
    </div>
  );
}

