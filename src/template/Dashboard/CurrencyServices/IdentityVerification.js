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
    return <TickCircle size={22} className="text-green-500 shrink-0" variant="Bold" />;
  }

  return <CloseCircle size={20} className="text-red-500 shrink-0" variant="Bold" />;
};

export default function IdentityVerification() {
  return (
    <div className="bg-white dark:bg-dark-box dark:border-dark-stroke border border-gray-300 rounded-2xl p-4 mt-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg md:text-xl text-gray-900 dark:text-dark-titre">احراز هویت</h3>

        <Button className="bg-[#1e3a5f] dark:bg-dark-primary hover:bg-[#2a4a6f] text-white">تکمیل احراز هویت</Button>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {verificationData.map((item) => {
          const isDone = item.status === "done";

          return (
            <div key={item.key} className="space-y-2">
              {/* Label خارج از باکس */}
              <span className="text-sm text-gray-600 dark:text-dark-text">{item.label}</span>

              {/* Box */}
              <div
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border-2",
                  isDone
                    ? " border-green-500 dark:bg-dark-green dark:border-green-300 bg-green-50 dark:bg-green-900/20"
                    : "bg-gray-50 dark:bg-dark-field dark:border-0 border-gray-50"
                )}
              >
                <div className="flex-between w-full gap-3">
                  {isDone ? (
                    <span className="text-sm font-medium text-green-700 dark:text-dark-titre">{item.value}</span>
                  ) : (
                    <span className="text-sm text-primary-600 dark:text-primary-300">انجام نشده</span>
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
