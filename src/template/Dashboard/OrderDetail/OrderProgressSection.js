"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Calendar, Clock, Truck } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function OrderProgressSection({ productsProgress }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl border border-gray-300 p-3 mb-6">
      <h2 className="text-xl  text-gray-800 dark:text-dark-title mb-6">پیشرفت سفارش و تقویم رویداد</h2>

      <div className="space-y-6">
        {productsProgress.map((product, index) => (
          <div key={product.id}>
            {/* Product Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-base text-gray-800 dark:text-dark-title">{product.name}</h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 text-sm text-gray-600 dark:text-dark-text">
                <div className="flex items-center justify-center gap-1 bg-gray-100 dark:bg-dark-field border border-gray-200 dark:bg-dark-field p-0.5 rounded-md text-xs">
                  <div className="bg-green-600 p-0.5 text-white rounded-lg">
                    <Truck size={20} />
                  </div>
                  {product.totalDays}
                </div>
                <div>
                  <span className="text-gray-500 dark:text-dark-text">
                    تخمین تحویل : <span className="text-primary-400">{product.deliveryEstimate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="pb-16 min-h-[100px] relative">
              <Timeline currentStep={product.currentStepIndex} steps={product.timelineSteps} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
