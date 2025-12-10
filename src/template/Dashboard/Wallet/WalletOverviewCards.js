"use client";

import React from "react";
import { cn } from "@/lib/utils";

const overviewCards = [
  {
    id: "pending",
    title: "موجودی در انتظار تایید",
    value: "۲,۳۵۰,۰۰۰",
    bgColor: "bg-gradient-to-br from-amber-500 to-amber-700",
    textColor: "text-white",
  },
  {
    id: "withdrawable",
    title: "قابل برداشت",
    value: "۱,۸۵۲,۰۰۰",
    bgColor: "bg-gradient-to-br from-green-500 to-green-700",
    textColor: "text-white",
  },
  {
    id: "total",
    title: "کل موجودی",
    value: "۲,۳۵۰,۰۰۰",
    bgColor: "bg-gradient-to-br from-primary-600 to-primary-800",
    textColor: "text-white",
  },
];

export default function WalletOverviewCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8">
      {overviewCards.map((card) => (
        <div
          key={card.id}
          className={cn(
            "rounded-2xl p-6 shadow-md transition-transform hover:scale-105",
            card.bgColor,
            card.textColor
          )}
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <div className="mb-2">
            <p className="text-sm md:text-base opacity-90">{card.title}</p>
          </div>
          <div>
            <p className="text-2xl md:text-3xl font-bold">{card.value}</p>
            <p className="text-xs md:text-sm mt-1 opacity-80">تومان</p>
          </div>
        </div>
      ))}
    </div>
  );
}

