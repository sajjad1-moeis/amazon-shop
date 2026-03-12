"use client";

import React from "react";
import { ArrowLeft2, ArrowRight2 } from "iconsax-reactjs";

/**
 * دکمه ناوبری اسلایدر — طراحی یکپارچه و مدرن
 * @param {'prev'|'next'} direction
 * @param {string} [className] - کلاس‌های اضافی برای موقعیت (مثلاً absolute left-0)
 * @param {number} [size=20] - اندازه آیکون
 */
export default function SliderNavButton({ direction, className = "", size = 20, ...props }) {
  const baseClass =
    "flex items-center justify-center w-9 h-9 rounded-full " +
    "bg-white dark:bg-dark-box border border-gray-200/80 dark:border-dark-stroke/60 " +
    "shadow-lg shadow-black/5 dark:shadow-black/20 " +
    "text-gray-600 dark:text-gray-400 " +
    "hover:bg-primary-50 dark:hover:bg-primary-800/30 hover:border-primary-300 dark:hover:border-primary-600 " +
    "hover:text-primary-600 dark:hover:text-primary-400 " +
    "active:scale-95 hover:scale-105 " +
    "transition-all duration-200 ease-out " +
    "focus:outline-none focus:ring-2 focus:ring-primary-400/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg";

  return (
    <button
      type="button"
      className={`${baseClass} ${className}`}
      aria-label={direction === "next" ? "اسلاید بعدی" : "اسلاید قبلی"}
      {...props}
    >
      {direction === "next" ? <ArrowLeft2 size={size} /> : <ArrowRight2 size={size} />}
    </button>
  );
}
