"use client";

import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { filterSelectTriggerStyles, filterSelectContentStyles } from "@/utils/filterStyles";
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

const chartConfig = {
  value: {
    label: "نرخ",
    color: "hsl(var(--chart-1))",
  },
};

export default function RateChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("1year");

  const currentData = chartData[selectedPeriod];

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl p-4 md:p-6 shadow-md border border-gray-200 dark:border-dark-stroke">
      {/* Tabs */}
      <div className="flex-between flex-col md:flex-row gap-4 mb-6 md:mb-8">
        <p className="text-sm md:text-lg lg:text-2xl text-gray-900 dark:text-dark-title text-right w-full md:w-auto">
          نمودار تغییرات نرخ درهم امارات
        </p>
        {/* Mobile: Select */}
        <div className="w-full md:hidden">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod} dir="rtl">
            <SelectTrigger className={cn("!w-full", filterSelectTriggerStyles)}>
              <SelectValue placeholder="انتخاب بازه زمانی" />
            </SelectTrigger>
            <SelectContent className={filterSelectContentStyles} dir="rtl">
              {timePeriods.map((period) => (
                <SelectItem key={period.id} value={period.id}>
                  {period.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Desktop: Buttons */}
        <div className="hidden md:flex flex-wrap border border-gray-200 dark:border-dark-stroke bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden">
          {timePeriods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={cn(
                "px-4 py-2 text-sm lg:text-base font-medium transition-colors",
                selectedPeriod === period.id
                  ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                  : "bg-white dark:bg-dark-box text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-stroke",
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Container */}
      <div className="bg-gray-50 dark:bg-dark-field p-2 md:p-4 rounded-lg border border-gray-200 dark:border-dark-stroke">
        <ChartContainer config={chartConfig} className="h-48 md:h-64 lg:h-80 w-full">
          <LineChart data={currentData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="0 0" stroke="#e5e7eb" className="dark:stroke-dark-stroke" />
            <XAxis
              dataKey="name"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              className="dark:text-dark-text"
            />
            <YAxis
              direction={"ltr"}
              domain={[100, 500]}
              ticks={[100, 200, 300, 400, 500]}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
              tickFormatter={(value) => value.toLocaleString("fa-IR")}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#6171C8"
              strokeWidth={2}
              dot={{ fill: "#fff", r: 4, strokeWidth: 2, stroke: "#8995D6" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Source Label */}
      <div className="mt-4 text-xs md:text-sm text-gray-500 dark:text-gray-400 text-right">
        مرجع: آمازون (امارات)
      </div>
    </div>
  );
}
