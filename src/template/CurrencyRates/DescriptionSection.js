"use client";

import React from "react";

export default function DescriptionSection() {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
      <h4 className="text-base  md:text-2xl font-semibold  text-dark-primary dark:text-primary-400 mb-3 md:mb-4 text-right">
        نرخ درهم امروز در ایران
      </h4>
      <p className="text-sm md:text-base text-gray-700 dark:text-dark-text leading-relaxed text-right">
        نرخ درهم امارات امروز بر اساس آخرین داده‌های دریافت شده از کانال‌های معتبر تلگرام به صورت لحظه‌ای در{" "}
        <span className="text-yellow-600 mx-1">Microless</span>
        بروزرسانی می‌شود. کاربران می‌توانند قیمت درهم، دلار و سایر ارزهای جهانی را همراه با نمودار تغییرات و آرشیو
        تاریخی مشاهده کنند.
      </p>
    </div>
  );
}
