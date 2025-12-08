"use client";

import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

const currencies = [
  {
    id: 1,
    name: "درهم امارات",
    code: "AED",
    rate: "۱۵,۹۰۰ تومان",
    change: "+۰.۳٪",
    isPositive: true,
    flag: "🇦🇪",
  },
  {
    id: 2,
    name: "دلار آمریکا",
    code: "USD",
    rate: "۱۵۱,۹۰۰ تومان",
    change: "-۰.۲٪",
    isPositive: false,
    flag: "🇺🇸",
  },
];

export default function CurrencyRates() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">نرخ لحظه ای ارز</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">به روز رسانی هر ۵ دقیقه</p>
      </div>

      <div className="space-y-4">
        {currencies.map((currency) => (
          <div
            key={currency.id}
            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl">{currency.flag}</span>
              <div>
                <p className="text-sm md:text-base font-semibold text-gray-900 dark:text-white">{currency.name}</p>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">{currency.code}</p>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{currency.rate}</p>
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                    currency.isPositive
                      ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
                      : "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30"
                  )}
                >
                  {currency.isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  <span>{currency.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
