"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Calendar, Clock, Truck } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function OrderProgressSection({ productsProgress }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 p-3 mb-6">
      <h2 className="text-xl  text-gray-800 dark:text-white mb-6">پیشرفت سفارش و تقویم رویداد</h2>

      <div className="space-y-6">
        {productsProgress.map((product, index) => (
          <div key={product.id}>
            {/* Product Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base  text-gray-800 dark:text-white">{product.name}</h3>
              <div className="flex items-center gap-5 text-sm text-gray-600 dark:text-gray-400">
                <div className="text-xs flex-center gap-1 bg-gray-100 border border-gray-200 dark:bg-gray-700 p-0.5 rounded-md">
                  <div className="bg-green-600 p-0.5 text-white rounded-lg">
                    <Truck size={20} />
                  </div>
                  {product.totalDays}
                </div>
                <div class="flex">
                  <span className="text-gray-500">
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
