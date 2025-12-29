"use client";

import React from "react";
import { cn } from "@/lib/utils";

const STATUS_CONFIG = {
  // Common statuses
  reviewing: {
    label: "در حال بررسی",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  answered: {
    label: "پاسخ داده شده",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  completed: {
    label: "تکمیل شده",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  pending: {
    label: "در انتظار بررسی",
    className: "bg-primary-100 text-primary-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  approved: {
    label: "تأیید شده",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  rejected: {
    label: "رد شده",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  processing: {
    label: "در حال پردازش",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  // Order statuses
  "to-iran": {
    label: "در مسیر ایران",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  "to-dubai": {
    label: "در مسیر دبی",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  clearance: {
    label: "ترخیص",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  delivered: {
    label: "تحویل شده",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  returned: {
    label: "مرجوعی",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  // Invoice statuses
  paid: {
    label: "پرداخت شده",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  // PriceLock statuses
  active: {
    label: "فعال",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  inactive: {
    label: "غیر فعال",
    className: "bg-gray-100 dark:bg-dark-field text-gray-700 dark:bg-dark-field dark:text-dark-text",
  },
  // Order statuses (additional)
  shipped: {
    label: "ارسال شده",
    className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
  },
  cancelled: {
    label: "لغو شده",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  // Currency service statuses
  successful: {
    label: "موفق",
    className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  },
  failed: {
    label: "ناموفق",
    className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  },
  // Invoice status (pending payment)
  "pending-payment": {
    label: "در انتظار پرداخت",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  // Ticket statuses (numeric)
  0: {
    label: "در انتظار",
    className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  1: {
    label: "در حال بررسی",
    className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  2: {
    label: "بسته شده",
    className: "bg-gray-100 dark:bg-dark-field text-gray-700 dark:bg-dark-field dark:text-dark-text",
  },
  // Ticket statuses (string)
  closed: {
    label: "بسته شده",
    className: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  },
};

export default function StatusBadge({
  status,
  label,
  className,
  variant = "default", // "default" | "rounded-md" | "rounded-lg" | "rounded-full"
  padding = "default", // "default" (py-1) | "medium" (py-1.5)
  customClassName,
}) {
  const config = STATUS_CONFIG[status];
  const statusLabel = label || config?.label;
  const statusClassName = customClassName || config?.className || "";

  if (!statusLabel) return null;

  const roundedClass =
    {
      default: "rounded-md",
      "rounded-md": "rounded-md",
      "rounded-lg": "rounded-lg",
      "rounded-full": "rounded-full",
    }[variant] || "rounded-md";

  const paddingClass = padding === "medium" ? "py-1.5" : "py-1";

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 text-xs font-medium",
        roundedClass,
        paddingClass,
        statusClassName,
        className
      )}
    >
      {statusLabel}
    </span>
  );
}
