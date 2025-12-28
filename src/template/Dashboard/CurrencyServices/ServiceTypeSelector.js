"use client";

import React from "react";
import { ArrowDown2, ArrowUp2 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const serviceTypes = [
  { id: "buy", label: "خرید ارز", icon: ArrowDown2 },
  { id: "sell", label: "فروش ارز", icon: ArrowUp2 },
];

export default function ServiceTypeSelector({ selectedType, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {serviceTypes.map((type) => {
        const Icon = type.icon;
        return (
          <button
            key={type.id}
            onClick={() => onSelect(type.id)}
            className={cn(
              "p-4 border-2 rounded-lg transition-all",
              selectedType === type.id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-dark-stroke hover:border-primary-300"
            )}
          >
            <Icon
              size={24}
              className={cn(
                "mb-2",
                selectedType === type.id
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-400"
              )}
            />
            <p
              className={cn(
                "text-sm font-medium",
                selectedType === type.id
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-600 dark:text-dark-text"
              )}
            >
              {type.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}

