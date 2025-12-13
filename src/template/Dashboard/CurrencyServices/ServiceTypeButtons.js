"use client";

import React from "react";
import { Global, CardPos, MoneyRecive, Gift, DollarCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const serviceTypes = [
  { id: "payment", label: "پرداخت ارزی", icon: Global },
  { id: "credit", label: "صدور کردیت کارت", icon: CardPos },
  { id: "paypal", label: "پی پال", icon: CardPos },
  { id: "swift", label: "سوئیفت", icon: MoneyRecive },
  { id: "gift", label: "گیفت کارت", icon: Gift },
  { id: "other", label: "خدمات دیگر", icon: DollarCircle },
];

export default function ServiceTypeButtons({ selectedType, onTypeChange }) {
  return (
    <div className="flex flex-wrap  gap-2">
      {serviceTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;
        return (
          <Button
            variant="ghost"
            key={type.id}
            type="button"
            onClick={() => onTypeChange(type.id)}
            className={cn(
              "flex items-center gap-2 py-4 rounded-lg border-b-2 transition-all",
              isSelected
                ? "bg-primary-50 border-primary-500  text-primary-600"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-300"
            )}
          >
            <Icon size={20} variant={isSelected ? "Bold" : "Outline"} />
            <span className="text-sm font-medium">{type.label}</span>
          </Button>
        );
      })}
    </div>
  );
}
