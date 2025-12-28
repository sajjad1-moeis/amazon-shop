"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/TimeLine";
import { DocumentText, Send2, Box, ClipboardTick, ReceiptItem, Wallet3 } from "iconsax-reactjs";

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
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <h2 className="text-lg  text-gray-900 dark:text-dark-title mb-6">وضعیت درخواستهای در حال بررسی</h2>

      {/* Product Card */}
      <div className="bg-[#E5E8F566] border border-primary-200 dark:bg-dark-field/50 rounded-xl p-3 mb-6">
        <div className="flex flex-col  w-full  md:gap-6">
          {/* Product Details */}
          <div className="flex gap-3">
            <div className="relative w-full md:size-14 bg-gray-200 dark:bg-dark-field rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={returnData.product.image}
                alt={returnData.product.name}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-base text-neutral-800 dark:text-dark-title">{returnData.product.name}</h3>

              <div className="flex-between text-sm w-full">
                <div>
                  <span className="text-gray-600 dark:text-dark-text">شماره درخواست : </span>
                  <span className="font-medium text-gray-900 dark:text-dark-title">{returnData.id}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-dark-text">تاریخ ثبت : </span>
                  <span className="font-medium text-gray-900 dark:text-dark-title">{returnData.date}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-dark-text">علت مرجوعی : </span>
                  <span className="font-medium text-gray-900 dark:text-dark-title">{returnData.reason}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-dark-text">وضعیت : </span>
                  {getStatusBadge(returnData.status)}
                </div>
              </div>
            </div>

            {/* Product Image */}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-stroke">
          <div className="mb-4">
            <h4 className=" text-primary-500 dark:text-dark-text mb-4">روند مرجوعی</h4>
            <Timeline currentStep={returnData.currentStep} steps={returnSteps} />
          </div>
        </div>

        {/* Cancel Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => onCancel(returnData.id)}
            className="border-primary-700 text-primary-700 h-10 rounded-lg px-10 bg-transparent hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            لغو درخواست
          </Button>
        </div>
      </div>
    </div>
  );
}
