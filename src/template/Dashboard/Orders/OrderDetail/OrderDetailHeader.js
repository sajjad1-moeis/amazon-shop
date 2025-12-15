"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload, CloseCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const getStatusBadge = (status) => {
  const statusConfig = {
    "to-iran": {
      label: "در مسیر ایران",
      className: "bg-primary-100 text-primary-800 dark:bg-green-900/30 dark:text-green-400",
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
    <span className={cn("inline-flex items-center px-3 py-1 rounded-md text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export default function OrderDetailHeader({ order, onDownloadInvoice, onCancelOrder }) {
  return (
    <div className=" mb-6 pb-4 border-b-2 border-gray-200">
      {/* Order Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xl sm:text-2xl text-primary-700">
          <span>سفارش </span>
          <span>#{order.orderNumber}</span>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button
            onClick={onCancelOrder}
            className="bg-gray-200 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2 text-sm"
          >
            <CloseCircle size={18} />
            <span className="hidden sm:inline">لغو سفارش</span>
            <span className="sm:hidden">لغو</span>
          </Button>
          <Button
            onClick={onDownloadInvoice}
            variant="outline"
            className="bg-primary-700 rounded-lg text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2 text-sm"
          >
            <DocumentDownload size={18} />
            <span className="hidden sm:inline">دانلود فاکتور</span>
            <span className="sm:hidden">دانلود</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{order.orderDate}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">تعداد محصول: </span>
          <span className="text-sm font-medium  bg-primary-100 px-1 rounded text-primary-500 dark:text-white">
            {order.itemsCount}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ کل: </span>
          <span className="text-base  text-gray-900 dark:text-white">{order.totalAmount} تومان</span>
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
  );
}
