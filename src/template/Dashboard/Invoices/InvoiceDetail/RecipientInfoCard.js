"use client";

import React from "react";
import { Location, Call } from "iconsax-reactjs";

export default function RecipientInfoCard({ recipient }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">اطلاعات گیرنده</h3>

      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">نام: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{recipient.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <Call size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{recipient.phone}</span>
        </div>
        <div className="flex items-start gap-2 pt-2">
          <Location size={16} className="text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">آدرس: </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{recipient.address}</span>
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">نوع ارسال: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{recipient.deliveryType}</span>
        </div>
      </div>
    </div>
  );
}

