"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Timeline from "@/components/TimeLine";
import { DocumentText, Send2, Box, ClipboardTick, ReceiptItem, Wallet3 } from "iconsax-reactjs";
import StatusBadge from "@/components/StatusBadge";

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
  // StatusBadge component is used instead

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      <h2 className="text-lg  text-gray-900 dark:text-dark-titre mb-6">وضعیت درخواست‌های در حال بررسی</h2>

      {/* Product Card */}
      <div className="bg-[#E5E8F566] border border-primary-200 dark:border-caption dark:bg-dark-gray-primary rounded-xl p-3 mb-6">
        <div className="flex flex-col  w-full  md:gap-6">
          {/* Product Details */}
          <div className="flex max-md:flex-col gap-3">
            <div className="flex gap-2">
              <div className="relative w-full max-md:h-10 max-md:max-w-10 md:size-14 bg-gray-200 dark:bg-dark-titre rounded-lg overflow-hidden">
                <Image
                  src={returnData.product.image}
                  alt={returnData.product.name}
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
              <h3 className="text-sm text-neutral-800 dark:text-dark-titre md:hidden">{returnData.product.name}</h3>
            </div>
            <div className="flex-1 space-y-3">
              <h3 className="text-base text-neutral-800 dark:text-dark-titre max-md:hidden">
                {returnData.product.name}
              </h3>

              <div className="flex-between flex-wrap gap-4 text-sm w-full">
                <div>
                  <span className="text-gray-600 dark:text-dark-text">شماره درخواست : </span>
                  <span className="font-medium text-gray-900 dark:text-dark-titre">{returnData.id}</span>
                </div>
                <div className="max-md:hidden">
                  <span className="text-gray-600 dark:text-dark-text ">تاریخ ثبت : </span>
                  <span className="font-medium text-gray-900 dark:text-dark-titre">{returnData.date}</span>
                </div>
                <div className="max-md:hidden">
                  <span className="text-gray-600 dark:text-dark-text ">علت مرجوعی : </span>
                  <span className="font-medium text-gray-900 dark:text-dark-titre">{returnData.reason}</span>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-dark-text max-md:hidden">وضعیت : </span>
                  <StatusBadge status={returnData.status} />
                </div>
              </div>
            </div>

            {/* Product Image */}
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-dark-stroke">
          <div className="mb-4 ">
            <h4 className=" text-primary-500 dark:text-dark-text mb-4">روند مرجوعی</h4>
            <div className="max-xl:overflow-auto">
              <Timeline className={"max-md:min-w-[900px]"} currentStep={returnData.currentStep} steps={returnSteps} />
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <div className="mt-6">
          <Button
            variant="outline"
            onClick={() => onCancel(returnData.id)}
            className="border-primary-700 max-md:w-full text-primary-700 h-10 rounded-lg px-10 bg-transparent border-2 hover:bg-primary-50 dark:border-primary-300 dark:text-primary-300 dark:hover:bg-primary-900/20"
          >
            لغو درخواست
          </Button>
        </div>
      </div>
    </div>
  );
}
