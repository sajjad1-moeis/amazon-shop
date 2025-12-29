"use client";

import React from "react";

export default function PriceCalculationDetails({ product }) {
  if (!product) return null;

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-6">
      <h3 className="text-base font-bold text-gray-900 dark:text-dark-title mb-4">جزئیات محاسبه قیمت</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">قیمت کالا در آمازون:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{product.amazonPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">هزینه حمل بین المللی:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{product.shippingCost}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">هزینه گمرک و ترخیص:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
            {product.customsFee} تومان
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600 dark:text-dark-text">کارمزد خدمات خرید اختصاصی:</span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
            {product.serviceFee} تومان
          </span>
        </div>
        <div className="border-t border-gray-200 dark:border-dark-stroke pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-base font-bold text-gray-900 dark:text-dark-title">مبلغ نهایی تخمینی:</span>
            <span className="text-base font-bold text-primary-700 dark:text-primary-400">
              {product.estimatedTotal} AED
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 dark:text-dark-text mt-3 leading-relaxed">
          مبلغ نهایی پس از بررسی ادمین و خرید کالا ممکن است تغییر جزئی داشته باشد. هرگونه تغییر قبل از پرداخت نهایی
          به شما اطلاع داده می‌شود.
        </p>
      </div>
    </div>
  );
}

