"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function PaymentStatusCard({ paymentStatus }) {
  const { paidPercentage, paidAmount, remainingPercentage, remainingAmount } = paymentStatus;

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-3 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-base font-bold text-gray-900 dark:text-dark-title">وضعیت پرداخت</h3>
        <span className="text-sm text-primary-500 cursor-pointer">مشاهده جزییات</span>
      </div>

      {/* Progress */}
      <div className="relative w-full h-2 rounded-full bg-gray-200 dark:bg-dark-field mb-6">
        {/* Blue (Remaining) → RIGHT */}
        <div
          className="absolute right-0 top-0 h-full bg-primary-500 rounded-full"
          style={{ width: `${remainingPercentage}%` }}
        />

        {/* Gray (Paid) → LEFT */}
        <div
          className="absolute left-0 top-0 h-full bg-gray-300 rounded-full"
          style={{ width: `${paidPercentage}%` }}
        />

        {/* Right Dot (35%) */}
        <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary-500 rounded-full" />

        {/* Left Dot */}
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-300 rounded-full" />
      </div>

      {/* Percent & Amount */}
      <div className="flex justify-between text-sm">
        {/* Paid → LEFT */}

        {/* Remaining → RIGHT */}
        <div className="text-right">
          <div className="text-primary-500 font-medium">{remainingPercentage}%</div>
          <div className="text-primary-500 mt-1">{remainingAmount} ت</div>
        </div>

        <div className="text-left">
          <div className="text-gray-400">{paidPercentage}%</div>
          <div className="text-gray-500 dark:text-dark-text mt-1">{paidAmount} ت</div>
        </div>
      </div>
    </div>
  );
}
