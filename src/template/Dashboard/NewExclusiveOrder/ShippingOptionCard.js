"use client";

import React from "react";
import { Truck } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function ShippingOptionCard({ option, isSelected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "border-2 rounded-xl p-2 cursor-pointer transition-all",
        isSelected
          ? "bg-primary-50 dark:bg-[#8893BF3D] border-primary-300 dark:border-primary-400"
          : "bg-white dark:bg-white/10 border-gray-200 dark:border-dark-stroke hover:border-gray-300"
      )}
    >
      <div className="flex items-center gap-4">
        {/* Radio Button */}
        <div className="flex items-center pt-1 shrink-0">
          <div
            className={cn(
              "w-5 h-5 rounded-full border-2 bg-white dark:bg-transparent flex items-center justify-center transition-all",
              isSelected ? "border-primary-500 dark:border-primary-400" : "border-gray-300 dark:border-dark-stroke"
            )}
          >
            {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-primary-500 dark:bg-primary-400"></div>}
          </div>
        </div>
        <div className="">
          {/* Icon */}
          <div className="flex gap-2">
            <div className={cn(" text-white p-1 rounded-md", isSelected ? option.iconColor : "bg-gray-500")}>
              <Truck size={16} />
            </div>
            <h4
              className={cn(
                "max-lg:text-sm",
                isSelected ? "text-primary-500 dark:text-dark-title" : "text-gray-900 dark:text-dark-titre"
              )}
            >
              {option.title}
            </h4>
          </div>

          {/* Content */}
          <p className="text-xs lg:text-sm text-gray-400 dark:text-dark-text mt-2">{option.description}</p>
        </div>
      </div>
    </div>
  );
}
