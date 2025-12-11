"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { TickCircle, CloseCircle } from "iconsax-reactjs";

const verificationData = {
  nationalId: {
    label: "کد ملی",
    value: "",
    status: "not-done",
    statusText: "انجام نشده",
  },
  mobileNumber: {
    label: "شماره موبایل",
    value: "۰۱۹۳۴۵۸۷۶۲۴",
    status: "done",
    statusText: "تکمیل شده",
  },
};

export default function IdentityVerification() {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">احراز هویت</h3>

      {/* Complete Verification Button */}
      <div className="mb-6">
        <Button className="bg-[#1e3a5f] dark:bg-[#1a2f4a] hover:bg-[#2a4a6f] text-white w-full md:w-auto">
          تکمیل احراز هویت
        </Button>
      </div>

      {/* Verification Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* National ID */}
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">{verificationData.nationalId.label}</span>
            {verificationData.nationalId.status === "not-done" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {verificationData.nationalId.statusText}
                </span>
                <CloseCircle size={20} className="text-red-500" variant="Bold" />
              </div>
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {verificationData.mobileNumber.label}
            </span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {verificationData.mobileNumber.value}
            </span>
          </div>
          {verificationData.mobileNumber.status === "done" && (
            <TickCircle size={20} className="text-green-500" variant="Bold" />
          )}
        </div>
      </div>
    </div>
  );
}
