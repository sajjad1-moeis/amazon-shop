"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoryColumn({ title, items, className }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("flex flex-col gap-1", className)} dir="rtl">
      <h3 className="text-base text-primary-600 dark:text-dark-title mb-3 pb-2 text-right ">| {title}</h3>
      <ul className="space-y-2 text-right">
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href || "#"}
              className="text-sm text-gray-700 dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 transition-colors block py-1"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
