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
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4 md:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-title mb-1">
              سفارش شماره {order.orderNumber}
            </h3>
            <p className="text-sm text-gray-600 dark:text-dark-text">تاریخ سفارش: {order.orderDate}</p>
          </div>
          {getStatusBadge(order.status)}
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="text-left sm:text-right">
            <p className="text-sm text-gray-600 dark:text-dark-text">مبلغ کل:</p>
            <p className="text-lg font-bold text-gray-900 dark:text-dark-title">
              {order.totalAmount} <span className="text-sm font-normal">تومان</span>
            </p>
          </div>
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            مشاهده جزئیات
          </Button>
        </div>
      </div>

      {/* Timeline */}
      <div className="pt-4 pb-8">
        <Timeline currentStep={order.timeline.currentStepIndex} steps={order.timeline.steps} />
      </div>
    </div>
  );
}
