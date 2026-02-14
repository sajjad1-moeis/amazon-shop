"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { cn } from "@/lib/utils";

const timePeriods = [
  { id: "1year", label: "۱ سال گذشته" },
  { id: "90days", label: "۹۰ روز گذشته" },
  { id: "30days", label: "۳۰ روز گذشته" },
  { id: "7days", label: "۷ روز گذشته" },
];

// داده‌های نمونه برای نمودار (ماه‌های شمسی) - مقادیر بین 100 تا 500
const chartData = {
  "1year": [
    { name: "فروردین", value: 150 },
    { name: "اردیبهشت", value: 180 },
    { name: "خرداد", value: 200 },
    { name: "تیر", value: 220 },
    { name: "مرداد", value: 250 },
    { name: "شهریور", value: 280 },
    { name: "مهر", value: 300 },
    { name: "آبان", value: 320 },
    { name: "آذر", value: 350 },
    { name: "دی", value: 380 },
    { name: "بهمن", value: 400 },
    { name: "اسفند", value: 420 },
  ],
  "90days": [
    { name: "روز 1", value: 350 },
    { name: "روز 30", value: 380 },
    { name: "روز 60", value: 400 },
    { name: "روز 90", value: 420 },
  ],
  "30days": [
    { name: "روز 1", value: 400 },
    { name: "روز 10", value: 410 },
    { name: "روز 20", value: 415 },
    { name: "روز 30", value: 420 },
  ],
  "7days": [
    { name: "شنبه", value: 415 },
    { name: "یکشنبه", value: 418 },
    { name: "دوشنبه", value: 420 },
    { name: "سه‌شنبه", value: 422 },
    { name: "چهارشنبه", value: 420 },
    { name: "پنج‌شنبه", value: 425 },
    { name: "جمعه", value: 420 },
  ],
};

// Custom Tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-dark-box border border-gray-200 dark:border-dark-stroke rounded-lg p-3 shadow-lg">
        <p className="text-sm font-semibold text-gray-900 dark:text-dark-title">
          {payload[0].payload.name}
        </p>
        <p className="text-sm text-primary-600 dark:text-primary-400">
          نرخ: {payload[0].value.toLocaleString("fa-IR")} تومان
        </p>
      </div>
    );
  }
  return null;
};

export default function RateChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1year");

  const currentData = chartData[selectedPeriod];

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 md:gap-4 mb-6 md:mb-8">
        {timePeriods.map((period) => (
          <button
            key={period.id}
            onClick={() => setSelectedPeriod(period.id)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm md:text-base font-medium transition-colors",
              selectedPeriod === period.id
                ? "bg-primary-500 text-white"
                : "bg-gray-100 dark:bg-dark-field text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-stroke",
            )}
          >
            {period.label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="h-64 md:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="dark:stroke-dark-stroke" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              className="dark:text-dark-text"
              stroke="#9ca3af"
            />
            <YAxis
              domain={[100, 500]}
              ticks={[100, 200, 300, 400, 500]}
              tick={{ fill: "#6b7280", fontSize: 12 }}
              className="dark:text-dark-text"
              stroke="#9ca3af"
              tickFormatter={(value) => value.toLocaleString("fa-IR")}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#ffffff" }}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Source Label */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-right">مرجع: آمازون (امارات)</div>
    </div>
  );
}
