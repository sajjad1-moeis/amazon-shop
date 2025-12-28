"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentDownload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function InvoiceDetailHeader({ invoice, onDownload }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      {/* Download Button */}
      <Button
        onClick={() => onDownload?.(invoice?.id)}
        className="bg-primary-700 hover:bg-primary-600 text-white gap-2 h-10"
      >
        <DocumentDownload className="h-5 w-5" />
        دانلود PDF
      </Button>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 dark:text-dark-text">وضعیت:</span>
        <span
          className={cn(
            "text-sm font-medium",
            invoice?.status === "paid"
              ? "text-green-600 dark:text-green-400"
              : "text-yellow-600 dark:text-yellow-400"
          )}
        >
          {invoice?.status === "paid" ? "پرداخت شده" : "در انتظار پرداخت"}
        </span>
      </div>
    </div>
  );
}
