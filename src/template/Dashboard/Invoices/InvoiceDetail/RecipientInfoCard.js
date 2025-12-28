"use client";

import React from "react";

export default function RecipientInfoCard({ recipient }) {
  return (
    <div className="bg-white dark:bg-dark-box rounded-xl border border-gray-200 dark:border-dark-stroke p-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-title mb-4">اطلاعات گیرنده</h3>

      <div>
        {/* Grid for first 4 items - 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b border-gray-200 dark:border-dark-stroke pb-4">
          {/* Name */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">نام گیرنده:</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-dark-title">{recipient?.name}</span>
          </div>

          {/* Phone */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">شماره تماس:</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-dark-title">{recipient?.phone}</span>
          </div>

          {/* National ID */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">کد ملی:</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-dark-title">{recipient?.nationalId}</span>
          </div>

          {/* Delivery Type */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-dark-text">نوع تحویل:</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-dark-title">{recipient?.deliveryType}</span>
          </div>
        </div>

        {/* Address - Full Width */}
        <div className="flex justify-between items-start pt-4">
          <span className="text-sm text-gray-600 dark:text-dark-text">آدرس:</span>
          <span className="text-sm font-semibold text-gray-900 dark:text-dark-title text-left max-w-[70%]">
            {recipient?.address}
          </span>
        </div>
      </div>
    </div>
  );
}
