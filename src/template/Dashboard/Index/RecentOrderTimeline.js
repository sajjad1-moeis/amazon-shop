"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export default function RecentOrderTimeline({ order }) {
  if (!order || !order.timeline) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-white/5 rounded-2xl p-3 my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className=" text-gray-800 dark:text-dark-titre">سفارش شماره {order.orderNumber}</h3>
        <div class="flex gap-4 flex-wrap">
          <p className="text-sm text-gray-500 dark:text-dark-text">
            تاریخ سفارش: <span className="text-sm  text-gray-700 dark:text-dark-titre">{order.orderDate}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-dark-text">
            وضعیت: <StatusBadge status={order.status} />
          </p>
          <p className="text-sm text-gray-500 dark:text-dark-text">
            مبلغ کل: <span className="text-sm  text-gray-700 dark:text-dark-titre">{order.totalAmount}تومان</span>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="pt-4 pb-8 max-md:overflow-auto">
        <Timeline
          className={"max-md:min-w-[900px]"}
          currentStep={order.timeline.currentStepIndex}
          steps={order.timeline.steps}
        />
      </div>
    </div>
  );
}
