"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Box, Heart, Sms, Wallet } from "iconsax-reactjs";

const overviewCards = [
  {
    id: 4,
    title: "موجودی کیف پول",
    value: "۴۵۰,۰۰۰",
    type: "تومان",
    icon: Wallet,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    id: 3,
    title: "سفارش های فعال",
    value: "۳",
    type: "سفارش",
    icon: Box,
    iconColor: "text-green-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
  {
    id: 2,
    title: "تیکت های باز",
    value: "۱",
    type: "تیکت",
    icon: Sms,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
  },
  {
    id: 1,
    title: "علاقه مندی ها",
    value: "۱۲",
    type: "کالا",
    icon: Heart,
    iconColor: "text-red-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
  },
];

export default function OverviewCards() {
  return (
    <div className="my-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {overviewCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-white dark:bg-dark-box gap-2 flex items-center rounded-xl shadow-md p-2 md:p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className={cn("p-2.5 md:p-3 rounded-lg bg-primary-700 dark:bg-dark-title")}>
                  <Icon size={32} className={cn("max-md:size-6 text-primary-50 dark:text-dark-box")} variant="Bold" />
                </div>
              </div>
              <div>
                <p className="text-lg md:text-xl  text-primary-700 dark:text-dark-title mb-2">
                  {card.value} <span className="text-xs md:text-sm">{card.type}</span>
                </p>
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{card.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
