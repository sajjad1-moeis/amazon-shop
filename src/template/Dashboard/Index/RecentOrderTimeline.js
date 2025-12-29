"use client";

import React from "react";
import Timeline from "@/components/TimeLine";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getStatusBadge = (status) => {
  const statusConfig = {
    "to-iran": {
      label: "در مسیر ایران",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    processing: {
      label: "در حال پردازش",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    },
    "to-dubai": {
      label: "در مسیر دبی",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    },
    clearance: {
      label: "ترخیص",
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
    delivered: {
      label: "تحویل شده",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
  };

  const config = statusConfig[status] || statusConfig.processing;

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-md text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export default function RecentOrderTimeline({ order }) {
  if (!order || !order.timeline) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-dark-box rounded-2xl p-3 my-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h3 className=" text-gray-800 dark:text-dark-title">سفارش شماره {order.orderNumber}</h3>
        <div class="flex gap-4">
          <p className="text-sm text-gray-500 dark:text-dark-text">
            تاریخ سفارش: <span className="text-sm  text-gray-700 dark:text-dark-title">{order.orderDate}</span>
          </p>
          <p className="text-sm text-gray-500 dark:text-dark-text">وضعیت: {getStatusBadge(order.status)}</p>
          <p className="text-sm text-gray-500 dark:text-dark-text">
            مبلغ کل: <span className="text-sm  text-gray-700 dark:text-dark-title">{order.totalAmount}تومان</span>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="pt-4 pb-8">
        <Timeline currentStep={order.timeline.currentStepIndex} steps={order.timeline.steps} />
      </div>
    </div>
  );
}
