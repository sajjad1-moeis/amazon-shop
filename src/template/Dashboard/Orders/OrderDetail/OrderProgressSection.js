"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Calendar, Clock } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function OrderProgressSection({ productsProgress }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">پیشرفت سفارش و تقویم رویداد</h2>

      <div className="space-y-8">
        {productsProgress.map((product, index) => (
          <div key={product.id} className={cn(index < productsProgress.length - 1 && "pb-8 border-b border-gray-200 dark:border-gray-700")}>
            {/* Product Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">{product.name}</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Clock size={16} />
                <span>تخمین تحویل: {product.deliveryEstimate}</span>
                {product.totalDays && (
                  <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {product.totalDays} روز کاری
                  </span>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="pb-16 min-h-[160px] relative">
              <Timeline currentStep={product.currentStepIndex} steps={product.timelineSteps} />
            </div>

            {/* Current Status Text */}
            {product.currentStatus && (
              <div className="mt-4 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">
                <Calendar size={16} />
                <span>{product.currentStatus}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

