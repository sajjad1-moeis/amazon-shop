"use client";

import React from "react";
import Timeline from "@/components/TimeLine";

export default function OrderTimelineCard({ timeline }) {
  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 mb-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">مراحل سفارش</h3>

      <div className="pb-16 min-h-[160px] relative">
        <Timeline currentStep={timeline.currentStepIndex} steps={timeline.steps} />
      </div>
    </div>
  );
}

