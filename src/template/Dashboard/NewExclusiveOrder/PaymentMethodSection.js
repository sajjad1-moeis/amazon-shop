"use client";

import React from "react";
import PaymentOptionCard from "./PaymentOptionCard";

const PAYMENT_OPTIONS = [
  {
    value: "two-stage",
    title: "پرداخت دو مرحله ای",
    description: "پرداخت اولیه برای ثبت سفارش، پرداخت نهایی پس از خرید کالا",
    suggested: true,
  },
  {
    value: "full",
    title: "پرداخت کامل",
    description: "پرداخت کل مبلغ به صورت یکجا (در صورت تأیید ادمین)",
    suggested: false,
  },
];

export default function PaymentMethodSection({ selectedMethod, onMethodChange }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
      <h3 className="text-xl text-gray-700 dark:text-dark-title mb-4">نحوه پرداخت</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PAYMENT_OPTIONS.map((option) => (
          <PaymentOptionCard
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

