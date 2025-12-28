"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Box, Heart, Sms, Wallet } from "iconsax-reactjs";

const overviewCards = [
  {
    id: 1,
    title: "علاقه مندی ها",
    value: "۱۲ کالا",
    icon: Heart,
    iconColor: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
  {
    id: 2,
    title: "تیکت های باز",
    value: "۱ تیکت",
    icon: Sms,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: 3,
    title: "سفارش های فعال",
    value: "۳ سفارش",
    icon: Box,
    iconColor: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    id: 4,
    title: "موجودی کیف پول",
    value: "۴۵۰,۰۰۰ تومان",
    icon: Wallet,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
  },
];

export default function OverviewCards() {
  return (
    <div className="mb-8">
      <div className="mb-8 pb-4 border-gray-200 border-b">
        <h2 className="text-2xl  text-primary-700 dark:text-dark-title mb-2">داشبورد</h2>
        <p className="text-sm  text-[#6B7280] dark:text-dark-text">وضعیت کلی حساب شما در یک نگاه</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white dark:bg-dark-box gap-3 flex items-center rounded-2xl shadow-md p-3 md:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={cn("p-3 rounded-lg bg-primary-700")}>
                  <Icon size={32} className={cn(" text-primary-50")} variant="Bold" />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-primary-700 dark:text-dark-title mb-1">{card.value}</p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text mt-1">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
