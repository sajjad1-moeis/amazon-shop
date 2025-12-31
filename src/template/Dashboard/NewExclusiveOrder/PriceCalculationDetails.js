"use client";

import React from "react";

export default function PriceCalculationDetails({ product }) {
  if (!product) return null;

  return (
    <div className="pb-6 border-b border-gray-200 dark:border-dark-stroke">
      <div className="space-y-4 bg-gray-50 dark:bg-dark-field border-gray-200 dark:border-dark-stroke p-4 rounded-xl">
        {/* کارت اصلی */}
        <div>
          {/* عنوان */}
          <h3 className="text-lg text-neutral-800 dark:text-dark-titre mb-4 text-right">جزئیات محاسبه قیمت</h3>

          {/* ردیف دو ستونه */}
          <div className="grid md:grid-cols-2 gap-y-3 text-sm">
            {/* ستون راست */}
            <div className="space-y-3 text-right">
              <div className="flex gap-3  max-md:w-full max-md:flex-between ">
                <span className="text-gray-500 dark:text-dark-text">قیمت کالا در آمازون:</span>
                <span className="font-medium text-gray-600 dark:text-dark-titre">{product.amazonPrice}</span>
              </div>

              <div className="flex gap-3  max-md:w-full max-md:flex-between">
                <span className="text-gray-500 dark:text-dark-text">هزینه گمرک و ترخیص:</span>
                <span className="font-medium text-gray-600 dark:text-dark-titre">{product.customsFee} تومان</span>
              </div>
            </div>

            {/* ستون چپ */}
            <div className="space-y-3 text-right">
              <div className="flex gap-3  max-md:w-full max-md:flex-between ">
                <span className="text-gray-500 dark:text-dark-text">هزینه حمل بین‌المللی:</span>
                <span className="font-medium text-gray-600 dark:text-dark-titre">{product.shippingCost}</span>
              </div>

              <div className="flex gap-3  max-md:w-full max-md:flex-between">
                <span className="text-gray-500 dark:text-dark-text">کارمزد خدمات خرید اختصاصی:</span>
                <span className="font-medium text-gray-600 dark:text-dark-titre">{product.serviceFee} تومان</span>
              </div>
            </div>
          </div>

          {/* خط جداکننده */}
          <div className="border-t border-gray-200 dark:border-dark-stroke my-4" />

          {/* مبلغ نهایی */}
          <div className="fl ex gap-3 items-center">
            <span className="text-sm text-gray-500 dark:text-dark-text">مبلغ نهایی تخمینی: </span>
            <span className="text-lg text-primary-600 dark:text-dark-title">{product.estimatedTotal} AED</span>
          </div>
        </div>
      </div>
      {/* باکس اطلاع‌رسانی پایین */}
      <div className="rounded-xl mt-3 border border-primary-200  bg-[#EDEFF799] dark:border-dark-blue  dark:bg-dark-title/15 px-4 py-3">
        <p className="text-sm text-primary-300 dark:text-dark-title leading-relaxed text-right">
          مبلغ نهایی پس از بررسی ادمین و خرید کالا ممکن است تغییر جزئی داشته باشد.
          <br />
          هرگونه تغییر قبل از پرداخت نهایی به شما اطلاع داده می‌شود.
        </p>
      </div>
    </div>
  );
}
