"use client";

import React from "react";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { ArrowDown, DocumentDownload } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import PageHeader from "../Common/PageHeader";

export default function InvoiceHeaderCard({ invoice = {}, onDownloadInvoice, onCancelOrder }) {
  const ActionBtns = () => (
    <div className="flex flex-wrap gap-2 sm:gap-3">
      <Button
        onClick={onDownloadInvoice}
        variant="outline"
        className="bg-primary-700 max-md:flex-1 dark:bg-dark-primary rounded-lg text-white hover:bg-blue-50 dark:hover:bg-blue-900/20 gap-2 text-sm"
      >
        <ArrowDown size={18} />
        <span className="hidden sm:inline">دانلود PDF</span>
        <span className="sm:hidden">دانلود</span>
      </Button>
    </div>
  );

  return (
    <div className=" md:mb-6 pb-4 md:border-b-2 border-gray-200 dark:border-dark-stroke">
      {/* Invoice Information */}
      <div className="md:hidden">
        <PageHeader
          description={"جزئیات و اطلاعات فاکتور شما"}
          title={
            <div className="text-xl sm:text-2xl text-primary-700 dark:text-dark-title">
              <span>فاکتور شماره </span>
              <span>#{invoice.id}</span>
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
          <span>فاکتور شماره </span>
          <span>#{invoice.id}</span>
        </div>
        {/* Action Buttons */}
        <ActionBtns />
      </div>
      <div className="max-md:p-2 max-md:border-dark-stroke max-md:border rounded-xl flex-wrap max-md:grid grid-cols-2 max-md:dark:bg-dark-box flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-3 sm:gap-4 mt-4">
        <div>
          <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">تاریخ صدور: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{invoice.orderDate}</span>
        </div>
        <div>
          <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">نوع سفارش: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">{invoice.orderType}</span>
        </div>
        <div className="max-md:hidden">
          <span className="text-base  text-yellow-600 ">{invoice.orderId} </span>
          <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">:Order ID </span>
        </div>

        <div className=" max-md:border-y py-4 dark:border-dark-stroke border-gray-200">
          <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">مبلغ فاکتور: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-dark-titre">
            {invoice.paymentInfo?.paidAmount?.toLocaleString() || "آنلاین"} تومان
          </span>
        </div>

        <div className="flex items-center justify-end max-md:mr-auto max-md:w-full gap-2 max-md:border-y py-4 dark:border-dark-stroke border-gray-200">
          <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text max-md:hidden">وضعیت: </span>
          <StatusBadge
            status={invoice.status}
            customClassName={
              invoice.status === "to-iran"
                ? "bg-primary-100 text-primary-800 dark:bg-green-900/30 dark:text-green-400"
                : undefined
            }
          />
        </div>

        <div className="md:hidden flex flex-col-reverse">
          <span className="text-base  text-yellow-600 ">{invoice.orderId} </span>
          <span className="text-xs md:text-sm text-gray-500 dark:text-dark-text">Order ID:</span>
        </div>
      </div>
    </div>
  );
}
