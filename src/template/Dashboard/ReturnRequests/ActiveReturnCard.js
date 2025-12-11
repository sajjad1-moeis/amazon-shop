"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/TimeLine";
import {
  DocumentText,
  Send2,
  Box,
  ClipboardTick,
  ReceiptItem,
  Wallet3,
} from "iconsax-reactjs";

const returnSteps = [
  {
    id: 1,
    label: "ثبت درخواست",
    Icon: DocumentText,
  },
  {
    id: 2,
    label: "بررسی کارشناسان",
    Icon: Send2,
  },
  {
    id: 3,
    label: "ارسال کالا به دفتر",
    Icon: Box,
  },
  {
    id: 4,
    label: "بررسی نهایی کالا",
    Icon: ClipboardTick,
  },
  {
    id: 5,
    label: "صدور فاکتور مرجوعی",
    Icon: ReceiptItem,
  },
  {
    id: 6,
    label: "بازگشت مبلغ به کیف پول",
    Icon: Wallet3,
  },
];

export default function ActiveReturnCard({ returnData, onCancel }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "reviewing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">
        وضعیت درخواستهای در حال بررسی
      </h2>

      {/* Product Card */}
      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Product Details */}
          <div className="flex-1 space-y-3">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white">
              {returnData.product.name}
            </h3>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600 dark:text-gray-400">شماره درخواست : </span>
                <span className="font-medium text-gray-900 dark:text-white">{returnData.id}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">تاریخ ثبت : </span>
                <span className="font-medium text-gray-900 dark:text-white">{returnData.date}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">علت مرجوعی : </span>
                <span className="font-medium text-gray-900 dark:text-white">{returnData.reason}</span>
              </div>
              <div>
                <span className="text-gray-600 dark:text-gray-400">وضعیت : </span>
                {getStatusBadge(returnData.status)}
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="relative w-full md:w-48 h-48 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden flex-shrink-0">
            <Image
              src={returnData.product.image}
              alt={returnData.product.name}
              fill
              className="object-cover"
              sizes="192px"
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">روند مرجوعی</h4>
            <Timeline currentStep={returnData.currentStep} steps={returnSteps} />
          </div>
        </div>

        {/* Cancel Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => onCancel(returnData.id)}
            className="border-blue-500 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            لغو درخواست
          </Button>
        </div>
      </div>
    </div>
  );
}

