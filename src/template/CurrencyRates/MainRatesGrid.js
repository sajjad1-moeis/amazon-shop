"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {mainRates.map((currency) => (
        <div
          key={currency.id}
          className="bg-white dark:bg-dark-box rounded-xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke hover:shadow-lg transition-shadow"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl md:text-4xl">{currency.flag}</span>
            <p className="text-gray-900 dark:text-white text-base md:text-lg font-semibold">
              {currency.name}
            </p>
          </div>

          <div className="mb-4">
            <p className="text-gray-900 dark:text-white text-xl md:text-2xl font-bold mb-1">
              {currency.rate} تومان
            </p>
          </div>

          <div className="flex items-center gap-2">
            {currency.changeType === "positive" ? (
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm md:text-base font-medium">
                  {currency.change} {currency.comparison}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                <TrendingDown className="h-4 w-4" />
                <span className="text-sm md:text-base font-medium">
                  {currency.change} {currency.comparison}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

