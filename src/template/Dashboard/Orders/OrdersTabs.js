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
    <div className="flex flex-wrap  bg-white rounded-lg  overflow-hidden">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            "px-4 py-3 text-sm font-medium border-b-2 transition-all flex-1",
            activeTab === tab.id
              ? "bg-primary-50 border-primary-500"
              : "border-transparent text-gray-500 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}




