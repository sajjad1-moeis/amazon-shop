"use client";

import React from "react";
import { CardEdit, Wallet3 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const paymentMethods = [
  { id: "card", label: "کارت بانکی", icon: CardEdit },
  { id: "wallet", label: "کیف پول", icon: Wallet3 },
];

export default function PaymentMethodSelector({ selectedMethod, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {paymentMethods.map((method) => {
        const Icon = method.icon;
        return (
          <button
            key={method.id}
            onClick={() => onSelect(method.id)}
            className={cn(
              "p-4 border-2 rounded-lg transition-all",
              selectedMethod === method.id
                ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                : "border-gray-200 dark:border-dark-stroke hover:border-primary-300"
            )}
          >
            <Icon
              size={24}
              className={cn(
                "mb-2",
                selectedMethod === method.id ? "text-primary-600 dark:text-primary-400" : "text-gray-400"
              )}
            />
            <p
              className={cn(
                "text-sm font-medium",
                selectedMethod === method.id
                  ? "text-primary-600 dark:text-primary-400"
                  : "text-gray-600 dark:text-dark-text"
              )}
            >
              {method.label}
            </p>
          </button>
        );
      })}
    </div>
  );
}
