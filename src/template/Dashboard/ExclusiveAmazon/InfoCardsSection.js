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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 mt-6 mb-6">
      {INFO_CARDS.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="bg-white dark:bg-dark-box gap-3 flex items-center rounded-xl shadow-box p-3 md:p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={cn("p-3 rounded-lg bg-primary-700")}>
                <Icon size={32} className={cn("text-primary-50")} variant="Bold" />
              </div>
            </div>
            <div>
              <p className="text-base font-semibold text-primary-700 dark:text-dark-title ">{card.value}</p>
              <p className="text-xs md:text-sm text-gray-500 dark:text-dark-text mt-2">{card.title}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

