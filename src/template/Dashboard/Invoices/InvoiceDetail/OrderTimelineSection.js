"use client";

import React from "react";
import { TickCircle, CardTick1, Shop } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function OrderTimelineSection({ timelineSteps }) {
  if (!timelineSteps || timelineSteps.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-title mb-6">مراحل سفارش</h3>

      <div className="relative pl-8">
        {/* Vertical Line - کلفت و سفید مثل Timeline اصلی (عمودی) */}
        <div className="absolute top-[21px] right-6 bottom-[21px] w-2.5 bg-black/10 dark:bg-dark-field rounded-full" />

        {/* Completed Steps Line - خط پر شده (عمودی) */}
        {timelineSteps.filter((step) => step.completed).length > 0 && (
          <div
            className="absolute top-[21px] right-6 w-2.5 bg-primary-600 dark:bg-primary-400 rounded-full transition-all duration-300"
            style={{
              height: `${(timelineSteps.filter((step) => step.completed).length - 1) * 96 + 24}px`,
            }}
          />
        )}

        {/* Timeline Steps */}
        <div className="space-y-8">
          {timelineSteps.map((step, index) => {
            const isCompleted = step.completed !== false;

            return (
              <div key={step.id} className="relative flex items-start gap-4">
                {/* Circle - بک‌گراند سفید برای همه */}
                <div
                  style={{ boxShadow: "0px 1px 5px -1px #0000001F" }}
                  className={cn(
                    "relative z-10 size-[52px] flex items-center bg-white dark:bg-dark-field justify-center rounded-full shadow-md transition-all duration-300",
                    isCompleted ? "text-primary-600 dark:text-primary-400" : "text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <TickCircle className="w-6 h-6 text-primary-600 dark:text-primary-300" variant="Bold" />
                  ) : (
                    <step.Icon className="w-6 h-6 text-gray-400" variant="Bold" />
                  )}
                </div>

                {/* Content - Text and Date */}
                <div className="flex-1 pt-2">
                  <div className="flex flex-col gap-1">
                    <h4
                      className={cn(
                        "text-sm",
                        isCompleted ? "text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-[#4B5563]"
                      )}
                    >
                      {step.label}
                    </h4>
                    {step.date && isCompleted && (
                      <span className="text-sm text-gray-600 dark:text-dark-text">{step.date}</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
