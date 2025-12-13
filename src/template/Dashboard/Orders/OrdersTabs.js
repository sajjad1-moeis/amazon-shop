"use client";

import React from "react";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "all", label: "همه" },
  { id: "processing", label: "در حال پردازش" },
  { id: "to-dubai", label: "در مسیر دبی" },
  { id: "to-iran", label: "در مسیر ایران" },
  { id: "clearance", label: "ترخیص" },
  { id: "delivered", label: "تحویل شده" },
  { id: "returned", label: "مرجوعی" },
];

export default function OrdersTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
            activeTab === tab.id
              ? "bg-blue-600 text-white"
              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

