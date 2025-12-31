"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import ViewAllTable from "@/components/ViewAllTable";

export default function RecentOrderTimeline({ order }) {
  if (!order || !order.timeline) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-3 sm:p-4 md:p-6 my-4 sm:my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg md:text-xl text-gray-800 dark:text-dark-titre font-semibold">
          سفارش شماره {order.orderNumber}
        </h3>
        <div className="flex flex-row items-center justify-between gap-4 flex-wrap">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text">
            تاریخ سفارش:{" "}
            <span className="text-xs sm:text-sm text-gray-700 dark:text-dark-titre font-medium">{order.orderDate}</span>
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text">
            وضعیت: <StatusBadge status={order.status} />
          </p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-text">
            مبلغ کل:{" "}
            <span className="text-xs sm:text-sm text-gray-700 dark:text-dark-titre font-medium">
              {order.totalAmount} تومان
            </span>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="pt-2 sm:pt-4 pb-4 sm:pb-8 w-full max-lg:overflow-auto ">
        <Timeline
          className={"max-lg:min-w-[900px]"}
          currentStep={order.timeline.currentStepIndex}
          steps={order.timeline.steps}
        />
        <ViewAllTable />
      </div>
    </div>
  );
}
