"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TickCircle, CloseCircle } from "iconsax-reactjs";
import { cn } from "@/lib/utils";

const verificationData = [
  {
    key: "mobile",
    label: "شماره موبایل",
    value: "۰۱۹۳۴۵۸۷۶۲۴",
    status: "done",
  },
  {
    key: "nationalId",
    label: "کد ملی",
    value: "",
    status: "not-done",
  },
];

const StatusIcon = ({ status }) => {
  if (status === "done") {
    return <TickCircle size={18} className="sm:w-[22px] sm:h-[22px] text-green-500 shrink-0" variant="Bold" />;
  }

  return <CloseCircle size={18} className="sm:w-5 sm:h-5 text-red-500 shrink-0" variant="Bold" />;
};

export default function IdentityVerification() {
  return (
    <div className="bg-white dark:bg-dark-box dark:border-dark-stroke border border-gray-300 rounded-2xl p-3 sm:p-4 mt-4 sm:mt-6 md:mt-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg md:text-xl text-gray-900 dark:text-dark-titre">احراز هویت</h3>

        <Button className="bg-[#1e3a5f] dark:bg-dark-primary hover:bg-[#2a4a6f] text-white text-xs sm:text-sm w-full sm:w-auto">
          تکمیل احراز هویت
        </Button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {verificationData.map((item) => {
          const isDone = item.status === "done";

          return (
            <div key={item.key} className="space-y-1.5 sm:space-y-2">
              {/* Label خارج از باکس */}
              <span className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">{item.label}</span>

              {/* Box */}
              <div
                className={cn(
                  "flex items-center justify-between p-2.5 sm:p-3 rounded-lg border-2",
                  isDone
                    ? " border-green-500 dark:bg-green-900/20 dark:border-green-300 bg-green-50"
                    : "bg-gray-50 dark:bg-dark-field dark:border-0 border-gray-50"
                )}
              >
                <div className="flex items-center justify-between w-full gap-2 sm:gap-3">
                  {isDone ? (
                    <span className="text-xs sm:text-sm font-medium text-green-700 dark:text-dark-titre break-all">
                      {item.value}
                    </span>
                  ) : (
                    <span className="text-xs sm:text-sm text-primary-600 dark:text-primary-300">انجام نشده</span>
                  )}
                  <StatusIcon status={item.status} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
