"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalDrive } from "iconsax-reactjs";

export default function TrackingCodesCard({ trackingCodes }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">کدهای رهگیری</h3>

      <div className="space-y-3">
        {trackingCodes.map((tracking, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">{tracking.label}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">{tracking.code}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 gap-2"
              onClick={() => window.open(tracking.url, "_blank")}
            >
              <ExternalDrive size={16} />
              مشاهده در سایت
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}




