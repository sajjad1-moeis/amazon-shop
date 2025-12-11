"use client";

import React from "react";
import { cn } from "@/lib/utils";

const currencies = [
  { code: "USD", name: "دلار آمریکا", flag: "🇺🇸" },
  { code: "EUR", name: "یورو", flag: "🇪🇺" },
  { code: "GBP", name: "پوند انگلیس", flag: "🇬🇧" },
  { code: "AED", name: "درهم امارات", flag: "🇦🇪" },
];

export default function CurrencySelector({ selectedCurrency, onSelect }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {currencies.map((currency) => (
        <button
          key={currency.code}
          onClick={() => onSelect(currency.code)}
          className={cn(
            "p-4 border-2 rounded-lg transition-all text-center",
            selectedCurrency === currency.code
              ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
              : "border-gray-200 dark:border-gray-700 hover:border-primary-300"
          )}
        >
          <div className="text-3xl mb-2">{currency.flag}</div>
          <p
            className={cn(
              "text-sm font-medium",
              selectedCurrency === currency.code
                ? "text-primary-600 dark:text-primary-400"
                : "text-gray-600 dark:text-gray-400"
            )}
          >
            {currency.name}
          </p>
          <p
            className={cn(
              "text-xs mt-1",
              selectedCurrency === currency.code
                ? "text-primary-500 dark:text-primary-400"
                : "text-gray-400"
            )}
          >
            {currency.code}
          </p>
        </button>
      ))}
    </div>
  );
}

