"use client";

import React from "react";
import ShippingOptionCard from "./ShippingOptionCard";

const SHIPPING_OPTIONS = [
  {
    value: "normal",
    title: "ارسال عادی",
    description: "تحویل ۲۵ تا ۳۰ روز",
    iconColor: "bg-primary-400",
  },
  {
    value: "express",
    title: "ارسال اکسپرس",
    description: "تحویل ۱۸ تا ۲۲ روز",
    iconColor: "bg-green-500",
  },
];

export default function ShippingMethodSection({ selectedMethod, onMethodChange }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
      <h3 className="text-xl text-gray-700 dark:text-dark-title mb-4">روش ارسال به ایران</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHIPPING_OPTIONS.map((option) => (
          <ShippingOptionCard
            key={option.value}
            option={option}
            isSelected={selectedMethod === option.value}
            onSelect={() => onMethodChange(option.value)}
          />
        ))}
      </div>
    </div>
  );
}
