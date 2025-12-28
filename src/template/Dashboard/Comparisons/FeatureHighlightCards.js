"use client";

import React from "react";
import { CloseCircle, Wallet3 } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function FeatureHighlightCards({ products }) {
  const highlights = [
    {
      icon: CloseCircle,
      title: "ظرفیت ذخیره سازی بیشتر",
      description: "Xbox Series X حافظه داخلی بیشتری ارائه میدهد",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      titleColor: "text-blue-700 dark:text-blue-300",
    },
    {
      icon: Wallet3,
      title: "قیمت اقتصادی تر",
      description: "PS5 Digital با حذف درایو دیسک قیمت مناسب تری دارد",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      titleColor: "text-green-700 dark:text-green-300",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {highlights.map((highlight, index) => {
        const Icon = highlight.icon;
        return (
          <div key={index} className={cn("rounded-2xl p-6 shadow-sm", highlight.bgColor)}>
            <div className="flex flex-col items-center text-center">
              {/* Icon in dark blue square */}
              <div className="w-14 h-14 bg-blue-700 dark:bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Icon size={28} className="text-white" variant="Bold" />
              </div>

              {/* Title */}
              <h3 className={cn("text-base font-bold mb-2", highlight.titleColor)}>{highlight.title}</h3>

              {/* Description */}
              <p className="text-sm text-gray-600 dark:text-dark-text">{highlight.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
