"use client";

import React from "react";

export default function RulesTab() {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4 space-y-10">
      {/* What is Price Lock */}
      <div className="space-y-2">
        <h3 className="text-base text-gray-900 dark:text-dark-title">قفل قیمت چیست؟</h3>
        <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
          قفل قیمت به شما اجازه می‌دهد قیمت یک محصول را برای مدت محدود ثابت نگه دارید و از نوسانات قیمت در امان بمانید.
        </p>
      </div>

      {/* Terms */}
      <div className="space-y-3 bg-gray-100 dark:bg-dark-field p-2 rounded-lg">
        <h3 className="text-base font-bold text-gray-700 dark:text-dark-title">شرایط استفاده</h3>

        <div className=" rounded-xl px-2 mt-3 flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-700"></span>
            <span className="text-yellow-700 ">کاربران طلایی</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
            <span className="text-gray-700 dark:text-dark-text">
              حداکثر قفل همزمان:
              <span className="text-primary-600  mr-1">۳ محصول</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-600"></span>
            <span className="text-gray-700 dark:text-dark-text">
              مدت قفل:
              <span className="text-primary-600  mr-1">حداکثر ۲۴ ساعت</span>
            </span>
          </div>
        </div>
      </div>

      {/* Lock Fee */}
      <div className="space-y-2">
        <h3 className="text-base  text-gray-900 dark:text-dark-title">هزینه قفل</h3>
        <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
          برای فعال‌سازی قفل قیمت، مبلغی به عنوان پیش‌پرداخت دریافت می‌شود که در صورت خرید نهایی از مبلغ کل کسر خواهد
          شد.
        </p>
      </div>

      {/* Non-lockable */}
      <div className="space-y-2">
        <h3 className="text-base  text-gray-900 dark:text-dark-title">محصولات غیرقابل قفل</h3>
        <p className="text-sm text-gray-600 dark:text-dark-text leading-relaxed">
          برخی محصولات پرفروش یا با موجودی محدود امکان قفل قیمت ندارند.
        </p>
      </div>
    </div>
  );
}

