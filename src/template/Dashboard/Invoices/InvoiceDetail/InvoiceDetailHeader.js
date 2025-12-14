"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const getStatusBadge = (status) => {
  const statusConfig = {
    paid: {
      label: "پرداخت شده",
      className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    },
    pending: {
      label: "در انتظار پرداخت",
      className: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
    },
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={cn("inline-flex items-center px-3 py-1.5 rounded text-xs font-medium", config.className)}>
      {config.label}
    </span>
  );
};

export default function InvoiceDetailHeader({ invoice }) {
  const formatAmount = (amount) => {
    return amount.toLocaleString("fa-IR");
  };

  const totalAmount =
    invoice?.products?.reduce((sum, product) => sum + product.subtotal, 0) || invoice?.totalAmount || 0;

  return (
    <div className="mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-700">
      <div class="flex-between">
        <div className="text-2xl font-bold text-primary-700 dark:text-white mb-2">
          فاکتور شماره {invoice?.invoiceNumber}
        </div>
        <Button
          onClick={invoice?.onDownload}
          className="bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 text-white rounded-lg px-4 py-2.5 gap-2 whitespace-nowrap"
        >
          <DocumentDownload size={18} />
          دانلود PDF
        </Button>
      </div>

      <div class="flex-between mt-4">
        {/* Date and Order Type Row */}
        <div className="flex items-center gap-6 mb-1">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            تاریخ صدور: <span className="text-gray-900 dark:text-white font-medium">{invoice?.issueDate}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            نوع سفارش: <span className="text-gray-900 dark:text-white font-medium">{invoice?.orderType}</span>
          </div>
        </div>

        {/* Order ID - Yellow/Orange */}
        <div className="text-sm text-yellow-600 dark:text-yellow-500 font-medium">Order ID: {invoice?.orderId}</div>

        <div className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
          مبلغ فاکتور:{" "}
          <span className="text-gray-900 dark:text-white font-medium">{formatAmount(totalAmount)} تومان</span>
        </div>
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت:</span>
          {getStatusBadge(invoice?.status)}
        </div>
      </div>

      {/* Left Side - Download Button */}
    </div>
  );
}
