"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  SERVICES_MEGA_MENU_TABS,
  SERVICES_MEGA_MENU_CONTENT,
} from "@/data/servicesMegaMenuData";

export default function ServicesMegaMenu() {
  const [activeTab, setActiveTab] = useState("payment");
  const sections = SERVICES_MEGA_MENU_CONTENT[activeTab] || [];

  return (
    <div className="w-full bg-white dark:bg-dark-box" dir="rtl">
      {/* تب‌ها — تقسیم مساوی به ۳ بخش، تب فعال با خط آبی کوچیک زیرش (فیگما) */}
      <div className="grid grid-cols-3 border-b border-gray-100 dark:border-dark-stroke">
        {SERVICES_MEGA_MENU_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "py-2.5 text-[13px] font-medium transition-colors border-b-2 -mb-px text-center",
              activeTab === tab.id
                ? "border-primary-500 text-primary-600 dark:text-primary-400 bg-white dark:bg-dark-box"
                : "border-transparent text-gray-500 dark:text-dark-text hover:text-gray-700 dark:hover:text-dark-titre"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* محتوا — خط عمودی نازک خاکستری بین ستون‌ها (فیگما) */}
      <div className="px-4 py-4 max-h-[70vh] overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3  gap-y-5">
          {sections.map((section, idx) => (
            <div
              key={idx}
              className="min-w-0 border-s border-gray-100 dark:border-dark-stroke ps-4 first:border-s-0 first:ps-0"
            >
              <h3 className=" font-semibold text-primary-600 dark:text-dark-titre mb-1.5 relative pr-3">
                <div className="absolute -right-0 h-full w-1 bg-primary-600 dark:bg-dark-titre rounded-full"></div>
                {section.title}
              </h3>
              <Link
                href={section.viewAllHref}
                className="text-[11px] text-primary-600 dark:text-primary-400 hover:underline block mb-2"
              >
                مشاهده همه
              </Link>
              <ul className="space-y-1">
                {section.items.map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="text-[12px] text-gray-600 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
