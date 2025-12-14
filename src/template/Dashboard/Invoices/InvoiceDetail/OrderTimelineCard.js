"use client";

import React from "react";
import Timeline from "@/components/TimeLine";

export default function OrderTimelineCard({ timeline }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 p-3 ">
      <h3 className="text-lg text-gray-800 dark:text-white mb-6">مراحل سفارش</h3>

      <div className="pb-16 min-h-[100px] relative">
        <Timeline currentStep={timeline.currentStepIndex + 1} steps={timeline.steps} />
      </div>
    </div>
  );
}
