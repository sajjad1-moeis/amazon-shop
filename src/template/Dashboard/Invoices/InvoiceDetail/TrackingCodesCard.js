"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DocumentCopy, DocumentText } from "iconsax-reactjs";

export default function TrackingCodesCard({ trackingCodes }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-3 ">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">کدهای رهگیری</h3>

      <div className="space-y-3">
        {trackingCodes.map((tracking, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-gray-100 dark:bg-gray-700/40 rounded-lg px-4 py-3"
          >
            {/* Right Content */}
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-200 flex-1">
              <span className="font-medium">{tracking.label} :</span>
              <span className="text-gray-600 dark:text-gray-300 break-all">{tracking.code}</span>
              <DocumentCopy size={18} className="text-gray-500 flex-shrink-0" />
            </div>

            {/* Left Button */}
            <Button
              onClick={() => window.open(tracking.url, "_blank")}
              className="h-9 px-4 rounded-lg bg-[#D8DADF] text-gray-600 hover:bg-gray-300 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 text-sm w-full sm:w-auto"
            >
              <span className="hidden sm:inline">مشاهده در سایت</span>
              <span className="sm:hidden">مشاهده</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}




