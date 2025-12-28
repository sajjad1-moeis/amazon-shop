"use client";

import React from "react";

export default function PaymentInfoCard({ paymentInfo }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-title mb-6">اطلاعات پرداخت</h3>

      <div className="space-y-4">
        {/* Total Invoice Amount */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">مبلغ کلی فاکتور ها:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
            {paymentInfo?.totalAmount?.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* Paid Amount */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">مبلغ پرداخت شده:</span>
          <span className="text-sm font-medium text-green-600 dark:text-green-400">
            {paymentInfo?.paidAmount?.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* Remaining Amount */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">مبلغ باقی مانده:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
            {paymentInfo?.remainingAmount?.toLocaleString("fa-IR")} تومان
          </span>
        </div>

        {/* Payment Date */}
        {paymentInfo?.paymentDate && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">تاریخ پرداخت:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{paymentInfo.paymentDate}</span>
          </div>
        )}

        {/* Transaction Number */}
        {paymentInfo?.transactionNumber && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">شماره تراکنش:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{paymentInfo.transactionNumber}</span>
          </div>
        )}

        {/* Payment Method */}
        {paymentInfo?.paymentMethod && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">روش پرداخت:</span>
            <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{paymentInfo.paymentMethod}</span>
          </div>
        )}
      </div>
    </div>
  );
}

