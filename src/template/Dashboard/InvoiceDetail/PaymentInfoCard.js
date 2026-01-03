"use client";

import { cn } from "@/lib/utils";
import React from "react";

export default function PaymentInfoCard({ paymentInfo = {} }) {
  const items = [
    {
      label: "مبلغ کلی فاکتورها",
      value: paymentInfo.totalAmount,
      suffix: "تومان",
    },
    {
      label: "مبلغ پرداخت شده",
      value: paymentInfo.paidAmount,
      suffix: "تومان",
      valueClass: "text-primary-500 dark:text-primary-300",
    },
    {
      label: "مبلغ باقی‌مانده",
      value: paymentInfo.remainingAmount,
      suffix: "تومان",
    },
    {
      label: "تاریخ پرداخت",
      value: paymentInfo.paymentDate,
    },
    {
      label: "شماره تراکنش",
      value: paymentInfo.transactionNumber,
    },
    {
      label: "روش پرداخت",
      value: paymentInfo.paymentMethod,
    },
  ].filter((item) => item.value !== undefined && item.value !== null);

  return (
    <div className="bg-white dark:border-dark-stroke h-full dark:bg-dark-box rounded-xl border border-gray-200  p-3">
      <h3 className="text-lg text-gray-800 dark:text-dark-titre mb-6">اطلاعات پرداخت</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
        {items.map((item, index) => (
          <div
            key={index}
            className={cn(
              "flex justify-between items-center  py-4",
              [4, 5].includes(index) || " border-b border-gray-200 dark:border-dark-stroke"
            )}
          >
            <span className="text-sm text-gray-500 dark:text-caption">{item.label}:</span>

            <span className={`text-sm font-medium text-gray-900 dark:text-dark-titre ${item.valueClass || ""}`}>
              {typeof item.value === "number" ? item.value.toLocaleString("fa-IR") : item.value}
              {item.suffix && ` ${item.suffix}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
