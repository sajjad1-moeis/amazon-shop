"use client";

import React from "react";
import { ArrowUp, Shop, Diamonds } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const INFO_CARDS = [
  {
    id: 3,
    title: "وضعیت حساب",
    value: "دسترسی (VIP)",
    icon: Diamonds,
  },

  {
    id: 2,
    title: "فروشنده مجاز",
    value: "فقط Amazon Official Seller",
    icon: Shop,
  },
  {
    id: 1,
    title: "سقف هر سفارش",
    value: "حداکثر ۵,۰۰۰ دلار",
    icon: ArrowUp,
  },
];

export default function InfoCardsSection() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 lg:gap-6 mt-6 mb-6">
      {INFO_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-dark-box gap-3 flex items-center rounded-xl shadow-md p-3 lg:p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={cn("p-3 rounded-lg bg-primary-700 dark:bg-dark-title")}>
                <Icon size={32} className={cn(" text-primary-50 dark:text-dark-box")} variant="Bold" />
              </div>
            </div>
            <div>
              <p className="text-sm lg:text-xl  text-primary-700 dark:text-dark-title mb-2">{card.value}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
