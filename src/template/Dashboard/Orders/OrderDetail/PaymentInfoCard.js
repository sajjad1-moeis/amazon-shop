"use client";

import React from "react";

const Row = ({ label, value, valueClass = "text-gray-900 dark:text-white", bold = false, border = true }) => (
  <div
    className={`flex justify-between items-center py-4 ${
      border ? "border-b border-gray-200 dark:border-gray-700" : ""
    }`}
  >
    <span
      className={`text-sm ${bold ? "font-bold text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
    >
      {label}
    </span>
    <span className={`text-sm font-medium ${valueClass}`}>{value}</span>
  </div>
);

export default function PaymentInfoCard({ paymentInfo }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-3">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">اطلاعات پرداخت</h3>

      <div className="grid grid-cols-2 gap-8">
        {/* Right Column */}
        <div>
          <Row label="مبلغ کالاها:" value={`${paymentInfo.itemsPrice.toLocaleString("fa-IR")} تومان`} />

          <Row label="وزن کل سفارش:" value={`${paymentInfo.totalWeight} kg`} />

          <Row
            label="هزینه حمل دبی به ایران:"
            value={`${paymentInfo.shippingCostDubai.toLocaleString("fa-IR")} تومان`}
          />

          <Row label="هزینه ارسال داخلی:" value={`${paymentInfo.domesticShipping.toLocaleString("fa-IR")} تومان`} />

          <Row
            label="طرح اعتماد (اقساط):"
            value={paymentInfo.installmentPlan || "غیرفعال"}
            valueClass="text-green-600 dark:text-green-400 bg-primary-100 text-primary-800 px-2.5 py-0.5 rounded"
            border={false}
          />
        </div>

        {/* Left Column */}
        <div>
          <Row
            label="تخفیف‌ها:"
            value={`${paymentInfo.discount.toLocaleString("fa-IR")} تومان`}
            valueClass="text-green-600 dark:text-green-400"
          />

          <Row label="نوع حمل:" value={paymentInfo.shippingType} />

          <Row label="مالیات / خدمات:" value={`${paymentInfo.tax.toLocaleString("fa-IR")} تومان`} />

          <Row
            label="مبلغ نهایی:"
            value={`${paymentInfo.finalAmount.toLocaleString("fa-IR")} تومان`}
            bold
            border={false}
          />

          <Row
            label="مبلغ پرداخت شده:"
            value={`${paymentInfo.paidPercentage}% ${paymentInfo.paidAmount.toLocaleString("fa-IR")} تومان`}
            border={false}
            valueClass="text-primary-600 dark:text-primary-400"
          />
        </div>
      </div>
    </div>
  );
}
