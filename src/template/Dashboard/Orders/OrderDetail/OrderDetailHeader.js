"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload, CloseCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export default function OrderDetailHeader({ order, onDownloadInvoice, onCancelOrder }) {
  return (
    <div className=" mb-6 pb-4 border-b-2 border-gray-200 dark:border-dark-stroke">
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
            className="bg-gray-200 dark:bg-dark-field text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2 text-sm"
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
          <span className="text-sm text-gray-600 dark:text-dark-text">تاریخ سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{order.orderDate}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-dark-text">تعداد محصول: </span>
          <span className="text-sm font-medium  bg-primary-100 px-1 rounded text-primary-500 dark:text-dark-title">
            {order.itemsCount}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-dark-text">مبلغ کل: </span>
          <span className="text-base  text-gray-900 dark:text-dark-title">{order.totalAmount} تومان</span>
        </div>

        <div>
          <span className="text-sm text-gray-600 dark:text-dark-text">روش پرداخت: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{order.paymentMethod || "آنلاین"}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-dark-text">وضعیت: </span>
          <StatusBadge status={order.status} customClassName="bg-primary-100 text-primary-800 dark:bg-green-900/30 dark:text-green-400" />
        </div>
      </div>
    </div>
  );
}
