"use client";

import React from "react";
import { cn } from "@/lib/utils";

export default function PaymentStatusCard({ paymentStatus }) {
  const { paidPercentage, paidAmount, remainingPercentage, remainingAmount } = paymentStatus;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">وضعیت پرداخت</h3>

      {/* Progress Bar */}
      <div className="relative w-full h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-4">
        {/* Paid Portion */}
        <div
          className="absolute right-0 top-0 h-full bg-gray-400 dark:bg-gray-600 transition-all duration-300"
          style={{ width: `${paidPercentage}%` }}
        >
          <div className="h-full flex items-center justify-center text-white text-xs font-medium">
            {paidPercentage}%
          </div>
        </div>
        {/* Remaining Portion */}
        <div
          className="absolute left-0 top-0 h-full bg-purple-500 dark:bg-purple-600 transition-all duration-300"
          style={{ width: `${remainingPercentage}%` }}
        >
          <div className="h-full flex items-center justify-center text-white text-xs font-medium">
            {remainingPercentage}%
          </div>
        </div>
      </div>

      {/* Amount Details */}
      <div className="flex justify-between text-sm">
        <div>
          <span className="text-gray-600 dark:text-gray-400">پرداخت شده: </span>
          <span className="font-medium text-gray-900 dark:text-white">{paidAmount} ت</span>
        </div>
        <div>
          <span className="text-gray-600 dark:text-gray-400">باقی‌مانده: </span>
          <span className="font-medium text-gray-900 dark:text-white">{remainingAmount} ت</span>
        </div>
      </div>
    </div>
  );
}

