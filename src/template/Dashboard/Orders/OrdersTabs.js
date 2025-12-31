"use client";

import React from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "همه" },
  { id: "special-amazon", label: "اختصاصی آمازون" },
  { id: "processing", label: "در حال پردازش" },
  { id: "to-dubai", label: "در مسیر دبی" },
  { id: "to-iran", label: "در مسیر ایران" },
  { id: "delivered", label: "تحویل شده" },
  { id: "returned", label: "مرجوعی" },
];

export default function OrdersTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-nowrap overflow-auto  bg-white dark:bg-dark-box rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 transition-all flex-none",
            activeTab === tab.id
              ? "bg-primary-50 border-primary-500 dark:bg-dark-blue dark:border-dark-title dark:text-dark-title"
              : "border-transparent text-gray-500 dark:text-dark-text hover:bg-gray-200 dark:hover:bg-gray-600"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
