"use client";

import React from "react";
import { Save2, Tag } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { buildHighlightCards } from "@/utils/compareUtils";

const ICON_MAP = { Save2, Tag };

export default function FeatureHighlightCards({ products }) {
  const highlights = buildHighlightCards(products);

  if (highlights.length === 0) return null;

  return (
    <div className="mt-10">
      <h2 className="md:text-xl text-gray-900 dark:text-dark-titre mb-6">تفاوت‌های کلیدی</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => {
          const Icon = ICON_MAP[highlight.iconKey] ?? Tag;
          return (
            <div
              key={index}
              className={cn(
                "rounded-xl p-4 shadow-sm bg-white dark:bg-dark-box dark:border-primary-400/50 border-2 border-primary-400"
              )}
            >
              <div className="flex flex-col">
                <div className="w-14 h-14 bg-primary-700 dark:bg-dark-title rounded-lg flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary-50 dark:text-dark-box" variant="Bold" />
                </div>
                <h3 className={cn("text-base font-bold mb-2 text-primary-700 dark:text-dark-title")}>
                  {highlight.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-caption">{highlight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
