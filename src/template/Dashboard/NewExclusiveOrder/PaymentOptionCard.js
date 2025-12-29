"use client";

import React from "react";
import { Wallet3, Card } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const ICONS = {
  "two-stage": Wallet3,
  full: Card,
};

export default function PaymentOptionCard({ option, isSelected, onSelect }) {
  const Icon = ICONS[option.value] || Wallet3;

  return (
    <div
      onClick={onSelect}
      className={cn(
        "border-2 rounded-xl p-4 cursor-pointer transition-all relative",
        isSelected
          ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
          : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
      )}
    >
      {/* Suggested Badge */}
      {option.suggested && (
        <span className="absolute top-2 left-2 text-xs bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 px-2 py-0.5 rounded">
          پیشنهادی
        </span>
      )}
      <div className="flex items-start gap-4">
        {/* Radio Button */}
        <div className="flex items-center pt-1 shrink-0">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
              isSelected
                ? "border-primary-500 dark:border-primary-400"
                : "border-gray-300 dark:border-dark-stroke"
            )}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>}
          </div>
        </div>

        {/* Icon */}
        <div
          className={cn(
            "shrink-0 text-white p-2 rounded-md",
            isSelected ? "bg-primary-400" : "bg-gray-500"
          )}
        >
          <Icon size={20} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <h4
            className={cn(
              "font-semibold mb-1",
              isSelected
                ? "text-primary-500 dark:text-dark-title"
                : "text-gray-900 dark:text-dark-titre"
            )}
          >
            {option.title}
          </h4>
          <p className="text-sm text-gray-600 dark:text-dark-text">{option.description}</p>
        </div>
      </div>
    </div>
  );
}

