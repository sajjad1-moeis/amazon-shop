"use client";

import React from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowDown, DocumentDownload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

// StatusBadge component is used instead

export default function InvoiceHeaderCard({ invoice = {}, onDownloadInvoice, onCancelOrder }) {
  console.log(invoice);
  return (
    <div className=" mb-6 pb-4 border-b-2 border-gray-200 dark:border-dark-stroke">
      {/* Order Information */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-xl sm:text-2xl font-bold text-primary-700">
          <span>فاکتور شماره </span>
          <span>{invoice.id}</span>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 sm:gap-3">
          <Button
            onClick={onDownloadInvoice}
            variant="outline"
            className="bg-primary-700 rounded-lg text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2 text-sm"
          >
            <ArrowDown size={18} />
            <span className="hidden sm:inline">دانلود PDF</span>
            <span className="sm:hidden">دانلود</span>
          </Button>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4">
        <div>
          <span className="text-sm text-gray-500 dark:text-dark-text">تاریخ صدور: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{invoice.orderDate}</span>
        </div>
        <div>
          <span className="text-sm text-gray-500 dark:text-dark-text">نوع سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">{invoice.orderType}</span>
        </div>
        <div>
          <span className="text-base  text-yellow-600 ">{invoice.orderId} </span>
          <span className="text-sm text-gray-500 dark:text-dark-text">:Order ID </span>
        </div>

        <div>
          <span className="text-sm text-gray-500 dark:text-dark-text">مبلغ فاکتور: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-title">
            {invoice.paymentInfo?.paidAmount?.toLocaleString() || "آنلاین"} تومان
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500 dark:text-dark-text">وضعیت: </span>
          <StatusBadge
            status={invoice.status}
            customClassName={
              invoice.status === "to-iran"
                ? "bg-primary-100 text-primary-800 dark:bg-green-900/30 dark:text-green-400"
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
}
