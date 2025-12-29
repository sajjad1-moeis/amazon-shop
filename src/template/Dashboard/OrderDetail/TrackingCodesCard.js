"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalDrive } from "iconsax-reactjs";

export default function TrackingCodesCard({ trackingCodes }) {
  return (
    <div
      className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-dark-title mb-4">کدهای رهگیری</h3>

      <div className="space-y-3">
        {trackingCodes.map((tracking, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 dark:bg-dark-field/30 rounded-lg border border-gray-200 dark:border-dark-stroke"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-gray-900 dark:text-dark-title mb-1">{tracking.label}</div>
              <div className="text-xs text-gray-600 dark:text-dark-text font-mono break-all">{tracking.code}</div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 dark:border-dark-stroke text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-field gap-2 text-xs w-full sm:w-auto"
              onClick={() => window.open(tracking.url, "_blank")}
            >
              <ExternalDrive size={16} />
              <span className="hidden sm:inline">مشاهده در سایت</span>
              <span className="sm:hidden">مشاهده</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
