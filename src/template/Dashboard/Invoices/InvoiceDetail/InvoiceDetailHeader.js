"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function InvoiceDetailHeader({ invoice }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        {/* Left Side - Invoice Info */}
        <div className="flex-1 space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              فاکتور شماره {invoice.invoiceNumber}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت:</span>
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                invoice.status === "paid"
                  ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
              )}
            >
              {invoice.statusText}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ فاکتور: </span>
              <span className="text-lg font-bold text-gray-900 dark:text-white">
                {invoice.totalAmount.toLocaleString("fa-IR")} تومان
              </span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">Order ID: </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{invoice.orderId}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ صدور: </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{invoice.issueDate}</span>
            </div>
            <div>
              <span className="text-sm text-gray-600 dark:text-gray-400">نوع سفارش: </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{invoice.orderType}</span>
            </div>
          </div>
        </div>

        {/* Right Side - Download Button */}
        <div className="flex-shrink-0">
          <Button
            onClick={() => invoice.onDownload?.()}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 px-6 py-6"
          >
            <DocumentDownload size={20} />
            دانلود PDF
          </Button>
        </div>
      </div>
    </div>
  );
}




