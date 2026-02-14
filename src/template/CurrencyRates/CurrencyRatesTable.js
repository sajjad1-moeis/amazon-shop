"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function CurrencyRatesTable() {
  const currencyRates = [
    {
      id: 1,
      name: "درهم عمارات",
      code: "AED",
      flag: "🇦🇪",
      rate: "۱۳۵",
      date: "۱۴۰۳/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
    {
      id: 2,
      name: "دلار آمریکا",
      code: "USD",
      flag: "🇺🇸",
      rate: "۱۰۰",
      date: "۱۴۰۳/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
    {
      id: 3,
      name: "یورو",
      code: "EUR",
      flag: "🇪🇺",
      rate: "۱۴۴,۰۰۰",
      date: "۱۴۰۳/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
    {
      id: 4,
      name: "پوند انگلستان",
      code: "GBP",
      flag: "🇬🇧",
      rate: "۲۱۳,۰۰۰",
      date: "۱۴۰۳/۰۸/۱۴",
      time: "۱۴:۳۰",
      source: "Telegram",
    },
  ];

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
      <h3 className="text-lg md:text-xl lg:text-2xl text-gray-900 dark:text-dark-title mb-4 md:mb-6 text-right">
        جدول نرخ ارزها
      </h3>

      <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-x-auto [&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-track]:dark:bg-dark-field [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:dark:bg-dark-stroke [&::-webkit-scrollbar-thumb]:rounded-full">
        <Table className="min-w-full">
          <TableHeader className="bg-gray-50 dark:bg-dark-stroke">
            <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
              <TableHead className="text-right py-2 md:py-3 px-4 text-xs md:text-sm text-gray-700 dark:text-dark-text first:rounded-tr-lg">
                ارز
              </TableHead>
              <TableHead className="text-right py-2 md:py-3 px-4 text-xs md:text-sm text-gray-700 dark:text-dark-text">
                نرخ (تومان)
              </TableHead>
              <TableHead className="text-right py-2 md:py-3 px-4 text-xs md:text-sm text-gray-700 dark:text-dark-text">
                تاریخ و ساعت
              </TableHead>
              <TableHead className="text-right py-2 md:py-3 px-4 text-xs md:text-sm text-gray-700 dark:text-dark-text last:rounded-tl-lg">
                منبع
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currencyRates.map((currency, index) => (
              <TableRow
                key={currency.id}
                className={cn(
                  "hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-dark-field/50 transition-colors",
                  index === currencyRates.length - 1 && "last:border-b-0",
                )}
              >
                <TableCell className="p-2 md:p-4  w-full">
                  <div className="flex gap-2 items-center">
                    <span className="text-base md:text-lg flex-shrink-0">
                      <img className="rounded-full size-8 md:size-10" src="/image/emarat.png" alt="" />
                    </span>
                    <div className="text-right flex items-center gap-1">
                      <span className="text-xs md:text-sm font-medium text-gray-900 dark:text-dark-title">
                        {currency.name}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-dark-text">({currency.code})</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="p-2 py-2 ">
                  <span className="text-xs md:text-sm text-gray-500 dark:text-dark-title font-medium">
                    {currency.rate}
                  </span>
                </TableCell>
                <TableCell className="p-2 py-2 ">
                  <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">
                    {currency.date} - {currency.time}
                  </span>
                </TableCell>
                <TableCell className="p-2 py-2">
                  <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">{currency.source}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
