"use client";

import React from "react";

export default function PaymentInfoCard({ paymentInfo }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">اطلاعات پرداخت</h3>

      <div className="space-y-3">
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کالاها:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {paymentInfo.itemsPrice.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">تخفیف‌ها:</span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {paymentInfo.discount.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">وزن کل سفارش:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{paymentInfo.totalWeight} kg</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">نوع حمل:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{paymentInfo.shippingType}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">هزینه حمل دبی به ایران:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {paymentInfo.shippingCostDubai.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">مالیات / خدمات:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {paymentInfo.tax.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">هزینه ارسال داخلی:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {paymentInfo.domesticShipping.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm font-bold text-gray-900 dark:text-white">مبلغ نهایی:</span>
          <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
            {paymentInfo.finalAmount.toLocaleString("fa-IR")} تومان
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-400">طرح اعتماد (اقساط):</span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {paymentInfo.installmentPlan || "غیرفعال"}
          </span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ پرداخت شده:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {paymentInfo.paidPercentage}% {paymentInfo.paidAmount.toLocaleString("fa-IR")} تومان
          </span>
        </div>
      </div>
    </div>
  );
}

