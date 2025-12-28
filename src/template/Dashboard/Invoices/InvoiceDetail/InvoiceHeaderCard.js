"use client";

import React from "react";

export default function InvoiceHeaderCard({ invoice }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4 md:p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Right Column */}
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600 dark:text-dark-text">فاکتور شماره </span>
            <span className="text-base font-semibold text-gray-900 dark:text-dark-title">{invoice?.invoiceNumber}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-dark-text">تاریخ صدور: </span>
            <span className="text-base font-medium text-gray-900 dark:text-dark-title">{invoice?.issueDate}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-dark-text">نوع سفارش: </span>
            <span className="text-base font-medium text-gray-900 dark:text-dark-title">{invoice?.orderType}</span>
          </div>
        </div>

        {/* Left Column */}
        <div className="space-y-4">
          <div>
            <span className="text-sm text-gray-600 dark:text-dark-text">Order ID: </span>
            <span className="text-base font-medium text-gray-900 dark:text-dark-title">{invoice?.orderId}</span>
          </div>
          <div>
            <span className="text-sm text-gray-600 dark:text-dark-text">مبلغ فاکتور: </span>
            <span className="text-base font-semibold text-gray-900 dark:text-dark-title">
              {invoice?.totalAmount?.toLocaleString("fa-IR")} تومان
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



