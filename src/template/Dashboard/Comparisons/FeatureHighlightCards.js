"use client";

import React from "react";
import { Save2, Tag } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function FeatureHighlightCards({ products }) {
  const highlights = [
    {
      icon: Save2,
      title: "ظرفیت ذخیره سازی بیشتر",
      description: "PS5 Standard حافظه داخلی بیشتری ارائه می‌دهد.",
    },
    {
      icon: Tag,
      title: "قیمت اقتصادی تر",
      description: "PS5 Digital با حذف درایو دیسک قیمت مناسب تری دارد.",
    },
  ];

  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 dark:text-dark-titre mb-6">تفاوت های کلیدی</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {highlights.map((highlight, index) => {
          const Icon = highlight.icon;
          return (
            <div
              key={index}
              className={cn(
                "rounded-xl p-4 shadow-sm bg-white dark:bg-dark-box dark:border-primary-400/50 border-2 border-primary-400"
              )}
            >
              <div className="flex flex-col">
                {/* Icon in dark primary square */}
                <div className="w-14 h-14 bg-primary-700 dark:bg-dark-title rounded-lg flex items-center justify-center mb-4">
                  <Icon size={28} className="text-primary-50 dark:text-dark-box" variant="Bold" />
                </div>

                {/* Title */}
                <h3 className={cn("text-base font-bold mb-2 text-primary-700 dark:text-dark-title")}>
                  {highlight.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 dark:text-caption">{highlight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
