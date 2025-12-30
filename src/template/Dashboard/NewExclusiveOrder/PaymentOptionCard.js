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
        "border-2 rounded-xl p-2 cursor-pointer transition-all relative",
        isSelected
          ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
          : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
      )}
    >
      {/* Suggested Badge */}
      {option.suggested && (
        <span className="absolute -top-2 -rotate-[20deg] -left-2 text-sm bg-primary-100 text-primary-700 border border-primary-300 dark:bg-dark-blue dark:text-dark-title px-2 py-0.5 rounded-md">
          پیشنهادی
        </span>
      )}

      <div className="flex items-center gap-4">
        {/* Radio Button */}
        <div className="flex items-center pt-1 shrink-0">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
              isSelected ? "border-primary-500 dark:border-primary-400" : "border-gray-300 dark:border-dark-stroke"
            )}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400" />}
          </div>
        </div>

        {/* Content Wrapper (مثل ShippingOptionCard) */}
        <div>
          {/* Icon + Title */}
          <div className="flex gap-2 items-center">
            <div className={cn("text-white p-1 rounded-md", isSelected ? "bg-primary-400" : "bg-gray-500")}>
              <Icon size={16} />
            </div>

            <h4
              className={cn(
                "",
                isSelected ? "text-primary-500 dark:text-dark-title" : "text-gray-900 dark:text-dark-titre"
              )}
            >
              {option.title}
            </h4>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-400 dark:text-dark-text mt-2">{option.description}</p>
        </div>
      </div>
    </div>
  );
}
