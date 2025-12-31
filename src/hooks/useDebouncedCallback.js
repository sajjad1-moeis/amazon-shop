"use client";

import { useRef } from "react";

/**
 * Hook برای ایجاد یک callback با debounce
 * وقتی کاربر تایپ می‌کند، بعد از delay میلی‌ثانیه تابع اجرا می‌شود
 */
export function useDebouncedCallback(callback, delay = 300) {
  const timeoutRef = useRef(null);

  return (...args) => {
    // اگر قبلاً timeout داشتیم، آن را پاک می‌کنیم
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // timeout جدید می‌سازیم
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

