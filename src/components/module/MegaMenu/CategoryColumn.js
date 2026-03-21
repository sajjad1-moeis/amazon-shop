"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoryColumn({ title, items, className, onLinkClick, compact = false }) {
  if (!items || items.length === 0) return null;

  return (
    <div className={cn("flex flex-col", compact ? "gap-0" : "gap-1", className)} dir="rtl">
      <h3
        className={cn(
          "text-right",
          compact
            ? "mb-2 border-b border-primary-500/15 pb-1.5 text-[11px] leading-tight text-primary-600 dark:border-primary-400/20 dark:text-primary-400"
            : "mb-3 pb-2 text-base text-primary-600 dark:text-dark-title",
        )}
      >
        <span className="text-primary-400 dark:text-primary-500" aria-hidden>
          |
        </span>{" "}
        {title}
      </h3>
      <ul className={cn("text-right", compact ? "space-y-0.5" : "space-y-2")}>
        {items.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href || "#"}
              onClick={() => onLinkClick?.()}
              className={cn(
                "block text-gray-600 transition-colors hover:text-primary-600 dark:text-dark-text dark:hover:text-primary-400",
                compact
                  ? "py-1.5 text-[11px] leading-5"
                  : "py-1 text-sm text-gray-700 dark:text-dark-text",
              )}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
