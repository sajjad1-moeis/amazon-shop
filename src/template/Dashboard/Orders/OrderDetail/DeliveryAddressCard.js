"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Location, Call, Edit } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

export default function DeliveryAddressCard({ address, showEditButton = false, onEdit }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">آدرس تحویل</h3>
        {showEditButton && (
          <Button
            onClick={onEdit}
            variant="ghost"
            size="sm"
            className="text-primary-600 hover:text-primary-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 gap-2"
          >
            <Edit size={16} />
            تغییر آدرس
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">گیرنده: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{address.recipientName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Call size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600 dark:text-gray-400">{address.phone}</span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">استان / شهر: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            {address.province} / {address.city}
          </span>
        </div>
        <div>
          <span className="text-sm text-gray-600 dark:text-gray-400">کدپستی: </span>
          <span className="text-sm font-medium text-gray-900 dark:text-white">{address.postalCode}</span>
        </div>
        <div className="flex items-start gap-2 pt-2">
          <Location size={16} className="text-gray-400 mt-1 flex-shrink-0" />
          <div>
            <span className="text-sm text-gray-600 dark:text-gray-400">آدرس: </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">{address.fullAddress}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
