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
    <div className="bg-white dark:bg-dark-box  rounded-2xl shadow-box p-3 mb-6">
      <div className="mb-6 md:mb-8">
        <h3 className="text-sm md:text-lg text-gray-700 dark:text-dark-titre mb-1">نرخ لحظه ای ارز</h3>
        <p className="text-xs md:text-sm  text-gray-600 dark:text-dark-text">به روز رسانی هر ۵ دقیقه</p>
      </div>

      <div className="space-y-4  grid lg:grid-cols-1 md:grid-cols-2">
        {currencies.map((currency, index) => (
          <div
            key={currency.id}
            className={cn(
              "flex items-center justify-between max-md:pb-4 max-lg:px-4  border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
              currencies.length == index + 1 || " max-lg:border-l  max-md:border-b"
            )}
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl ">{currency.flag}</span>
              <div>
                <p className="text-xs text-gray-500 dark:text-caption">
                  {currency.name} ({currency.code})
                </p>
                <p className="text-lg  text-gray-800 dark:text-dark-titre mt-1">{currency.rate}</p>
              </div>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={cn(
                    "flex items-center gap-1 px-2 py-1 rounded text-lg font-medium",
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
