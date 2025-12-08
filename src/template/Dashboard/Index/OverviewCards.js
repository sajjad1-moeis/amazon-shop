"use client";

import React from "react";
import { Heart, Mail, Package, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";

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
    icon: Mail,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: 3,
    title: "سفارش های فعال",
    value: "۳ سفارش",
    icon: Package,
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
      <div className="mb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">داشبورد</h2>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">وضعیت کلی حساب شما در یک نگاه</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={cn("p-3 rounded-lg", card.bgColor)}>
                  <Icon className={cn("h-6 w-6", card.iconColor)} />
                </div>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{card.value}</p>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
