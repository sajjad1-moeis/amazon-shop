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
    <div className="bg-white border-2 border-gray-300 dark:bg-dark-box rounded-2xl p-3 mt-8">
      <div className="flex justify-between">
        <h3 className="text-lg md:text-xl text-gray-900 dark:text-dark-title mb-6">احراز هویت</h3>

        {/* Complete Verification Button */}
        <div className="mb-6">
          <Button className="bg-[#1e3a5f] dark:bg-[#1a2f4a] hover:bg-[#2a4a6f] text-white w-full md:w-auto">
            تکمیل احراز هویت
          </Button>
        </div>
      </div>

      {/* Verification Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* National ID */}
        <div
          className={`flex items-center gap-3 p-4 rounded-lg ${
            verificationData.nationalId.status === "done"
              ? "border-2 border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border border-gray-200 dark:border-dark-stroke"
          }`}
        >
          {verificationData.nationalId.status === "done" && (
            <TickCircle size={24} className="text-green-500 shrink-0" variant="Bold" />
          )}
          <div className="flex items-center gap-3 flex-1">
            <span
              className={`text-sm ${
                verificationData.nationalId.status === "done"
                  ? "text-green-700 dark:text-green-300 font-medium"
                  : "text-gray-600 dark:text-dark-text"
              }`}
            >
              {verificationData.nationalId.label}
            </span>
            {verificationData.nationalId.status === "not-done" && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  {verificationData.nationalId.statusText}
                </span>
                <CloseCircle size={20} className="text-red-500" variant="Bold" />
              </div>
            )}
            {verificationData.nationalId.status === "done" && verificationData.nationalId.value && (
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                {verificationData.nationalId.value}
              </span>
            )}
          </div>
        </div>

        {/* Mobile Number */}
        <div
          className={`flex items-center gap-3 p-4 rounded-lg ${
            verificationData.mobileNumber.status === "done"
              ? "border-2 border-green-500 bg-green-50 dark:bg-green-900/20"
              : "border border-gray-200 dark:border-dark-stroke"
          }`}
        >
          {verificationData.mobileNumber.status === "done" && (
            <TickCircle size={24} className="text-green-500 shrink-0" variant="Bold" />
          )}
          <div className="flex items-center gap-3 flex-1">
            <span
              className={`text-sm ${
                verificationData.mobileNumber.status === "done"
                  ? "text-green-700 dark:text-green-300 font-medium"
                  : "text-gray-600 dark:text-dark-text"
              }`}
            >
              {verificationData.mobileNumber.label}
            </span>
            <span
              className={`text-sm font-medium ${
                verificationData.mobileNumber.status === "done"
                  ? "text-green-700 dark:text-green-300"
                  : "text-gray-900 dark:text-dark-title"
              }`}
            >
              {verificationData.mobileNumber.value}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
