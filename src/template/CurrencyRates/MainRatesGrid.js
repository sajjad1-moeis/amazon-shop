"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "iconsax-reactjs";

const mainRates = [
  {
    id: 1,
    name: "پوند",
    code: "GBP",
    flag: "🇬🇧",
    rate: "۱۵,۹۰۰",
    change: "۲۵۰",
    changeType: "positive",
    comparison: "نسبت به دیروز",
  },
  {
    id: 2,
    name: "یورو",
    code: "EUR",
    flag: "🇪🇺",
    rate: "۱۵,۹۰۰",
    change: "۲۵۰",
    changeType: "positive",
    comparison: "نسبت به دیروز",
  },
  {
    id: 3,
    name: "دلار آمریکا",
    code: "USD",
    flag: "🇺🇸",
    rate: "۱۵,۹۰۰",
    change: "۲۵۰",
    changeType: "negative",
    comparison: "نسبت به دیروز",
  },
  {
    id: 4,
    name: "درهم امارات",
    code: "AED",
    flag: "🇦🇪",
    rate: "۱۵,۹۰۰",
    change: "۲۵۰",
    changeType: "positive",
    comparison: "نسبت به دیروز",
  },
];

export default function MainRatesGrid() {
  return (
    <div class="">
      <h3 className="text-lg md:text-xl lg:text-3xl text-center mb-8 mt-10">نرخ ارزهای اصلی</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {mainRates.map((currency) => (
          <div
            key={currency.id}
            className="bg-white dark:bg-dark-box rounded-xl p-4 shadow-md border border-gray-200 dark:border-dark-stroke hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl md:text-4xl">
                {" "}
                <img className="rounded-full size-10" src="/image/emarat.png" alt="" />
              </span>

              <div class="">
                <p className="text-gray-400 dark:text-white text-xs md:text-sm">{currency.name}</p>
                <p className="text-gray-900 dark:text-white text-xl md:text-2xl mb-1">{currency.rate} تومان</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {currency.changeType === "positive" ? (
                <div className="flex-between gap-1 bg-green-100 w-full p-2 rounded-lg text-green-600 dark:text-green-400">
                  <span className="text-sm md:text-base">
                    +{currency.change}% {currency.comparison}
                  </span>
                  <ArrowUp />
                </div>
              ) : (
                <div className="flex-between gap-1 bg-red-100 w-full p-2 rounded-lg text-red-600 dark:text-red-400">
                  <span className="text-sm md:text-base">
                    -{currency.change}% {currency.comparison}
                  </span>
                  <ArrowDown />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
