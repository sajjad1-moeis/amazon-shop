"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

/**
 * Hook برای مدیریت فیلترها با استفاده از URL
 * فیلترها در URL ذخیره می‌شوند و می‌توانند share شوند
 */
export function useFilterParams(defaultFilters = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // خواندن فیلترها از URL
  const filters = {};

  Object.keys(defaultFilters).forEach((key) => {
    const value = searchParams.get(key);
    filters[key] = value || defaultFilters[key] || "";
  });

  // به‌روزرسانی یک فیلتر
  const updateFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    // اگر مقدار خالی یا "all" باشد، از URL حذف می‌کنیم
    if (!value || value === "all" || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // به‌روزرسانی URL
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // پاک کردن تمام فیلترها
  const clearFilters = () => {
    router.push(pathname, { scroll: false });
  };

  return {
    filters,
    updateFilter,
    clearFilters,
  };
}
