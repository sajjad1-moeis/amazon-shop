"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Calendar, Clock, Truck } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import ViewAllTable from "@/components/ViewAllTable";

export default function OrderProgressSection({ productsProgress }) {
  return (
    <div className="bg-white dark:bg-dark-box dark:border-dark-stroke rounded-2xl border border-gray-300 p-3 mb-6">
      <h2 className="text-lg md:text-xl  text-gray-800 dark:text-dark-titre mb-6">پیشرفت سفارش و تقویم رویداد</h2>

      <div className="space-y-6">
        {productsProgress.map((product, index) => (
          <div key={product.id}>
            {/* Product Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <h3 className="text-base text-gray-800 dark:text-dark-titre">{product.name}</h3>
              <div className="flex max-md:justify-between max-md:flex-row-reverse items-center gap-3 sm:gap-5 text-sm text-gray-600 dark:text-dark-text">
                <div className="flex items-center justify-center gap-1 bg-gray-100 dark:border-dark-stroke  border border-gray-200 dark:bg-dark-field p-0.5 rounded-md text-xs">
                  <div className="bg-green-600 dark:bg-green-200 dark:text-dark-box p-0.5 text-white rounded-lg">
                    <Truck size={20} />
                  </div>
                  {product.totalDays}
                </div>
                <div className="max-md:text-xs">
                  <span className="text-gray-500 dark:text-dark-text">
                    تخمین تحویل : <span className="text-primary-400">{product.deliveryEstimate}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className=" relative max-lg:overflow-auto">
              <Timeline
                className={"max-md:min-w-[900px]"}
                currentStep={product.currentStepIndex}
                steps={product.timelineSteps}
              />
            </div>
          </div>
        ))}
        <ViewAllTable />
      </div>
    </div>
  );
}
