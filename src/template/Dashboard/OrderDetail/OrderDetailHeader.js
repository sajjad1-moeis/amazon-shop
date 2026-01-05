"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload, CloseCircle, ArrowDown } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import { X } from "lucide-react";
import PageHeader from "../Common/PageHeader";

export default function OrderDetailHeader({ order, onDownloadInvoice, onCancelOrder }) {
  const ActionBtns = () => (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <Button
        onClick={onCancelOrder}
        className="bg-gray-200 max-md:flex-1 dark:bg-dark-field dark:text-red-400 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 gap-2 text-sm"
      >
        <X size={18} />
        <span className="hidden sm:inline">لغو سفارش</span>
        <span className="sm:hidden">لغو</span>
      </Button>
      <Button
        onClick={onDownloadInvoice}
        variant="outline"
        className="bg-primary-700 max-md:flex-1 dark:bg-dark-primary rounded-lg text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2 text-sm"
      >
        <ArrowDown size={18} />
        <span className="hidden sm:inline">دانلود فاکتور</span>
        <span className="sm:hidden">دانلود</span>
      </Button>
    </div>
  );

  return (
    <div className=" mb-6 pb-4 md:border-b-2 border-gray-200 dark:border-dark-stroke">
      {/* Order Information */}

      <div className="md:hidden">
        <PageHeader
          description={"تاریخچه و وضعیت تمام سفارش‌های شما"}
          title={
            <div className="text-xl sm:text-2xl text-primary-700 dark:text-dark-title">
              <span>سفارش </span>
              <span>#{order.orderNumber}</span>
            </div>
          }
          actionButton={
            <div className="md:hidden">
              <ActionBtns />
            </div>
          }
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-md:hidden">
        <div className="text-xl sm:text-2xl text-primary-700 dark:text-dark-title">
          <span>سفارش </span>
          <span>#{order.orderNumber}</span>
        </div>
        {/* Action Buttons */}
        <ActionBtns />
      </div>
      <div className="max-md:p-3 max-md:border-dark-stroke max-md:border rounded-xl max-md:grid grid-cols-2 max-md:dark:bg-dark-box flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4">
        <div>
          <span className="text-xs md:text-sm text-gray-600 dark:text-dark-text">تاریخ سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{order.orderDate}</span>
        </div>
        <div className="max-md:mr-auto md:hidden lg:block">
          <span className="text-xs md:text-sm text-gray-600 dark:text-dark-text">تعداد محصول: </span>
          <span className="text-sm font-medium  bg-primary-100 px-1 rounded text-primary-500 dark:text-dark-title dark:bg-dark-blue">
            {order.itemsCount}
          </span>
        </div>
        <div>
          <span className="text-xs md:text-sm text-gray-600 dark:text-dark-text">مبلغ کل: </span>
          <span className="text-base  text-gray-900 dark:text-dark-titre">{order.totalAmount} تومان</span>
        </div>

        <div className="max-md:mr-auto">
          <span className="text-xs md:text-sm text-gray-600 dark:text-dark-text">روش پرداخت: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">
            {order.paymentMethod || "آنلاین"}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs md:text-sm text-gray-600 dark:text-dark-text">وضعیت: </span>
          <StatusBadge
            status={order.status}
            // customClassName="bg-primary-100 text-primary-800 dark:bg-green-900/30 dark:text-green-400"
          />
        </div>
      </div>
    </div>
  );
}
