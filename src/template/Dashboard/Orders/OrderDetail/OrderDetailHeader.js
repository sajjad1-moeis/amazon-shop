"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload, CloseCircle } from "iconsax-reactjs";
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
    returned: {
      label: "مرجوعی",
      className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    },
  };

  const config = statusConfig[status] || statusConfig.processing;
  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export default function OrderDetailHeader({ order, onDownloadInvoice, onCancelOrder }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Order Information */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">سفارش </span>
              <span className="text-base font-bold text-gray-900 dark:text-white">#{order.orderNumber}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ سفارش: </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{order.orderDate}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">تعداد محصول: </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{order.itemsCount}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کل: </span>
              <span className="text-base font-bold text-gray-900 dark:text-white">{order.totalAmount} تومان</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">روش پرداخت: </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{order.paymentMethod || "آنلاین"}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت: </span>
              {getStatusBadge(order.status)}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-shrink-0">
          <Button
            onClick={onDownloadInvoice}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2"
          >
            <DocumentDownload size={18} />
            دانلود فاکتور
          </Button>
          <Button
            onClick={onCancelOrder}
            variant="outline"
            className="border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2"
          >
            <CloseCircle size={18} />
            لغو سفارش
          </Button>
        </div>
      </div>
    </div>
  );
}

