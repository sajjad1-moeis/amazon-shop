"use client";

import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

// تابع برای تبدیل نام رنگ به hex code
const getColorHex = (colorName) => {
  const colorMap = {
    white: "#ffffff",
    سفید: "#ffffff",
    gold: "#fbbf24",
    طلایی: "#fbbf24",
    navy: "#1e3a8a",
    "سرمه ای": "#1e3a8a",
    black: "#000000",
    مشکی: "#000000",
    silver: "#c0c0c0",
    نقره‌ای: "#c0c0c0",
  };
  return colorMap[colorName] || colorName;
};

function SelectColor({ colors, selectedColor, setSelectedColor }) {
  return (
    <div className="my-10">
      <label className="text-sm font-bold block mb-3 text-right text-gray-900 dark:text-white">رنگ</label>
      <RadioGroup
        value={selectedColor}
        onValueChange={setSelectedColor}
        className="flex flex-row-reverse gap-3 justify-end  flex-wrap"
      >
        {colors.map((color) => {
          const isSelected = selectedColor === color.value;
          const colorHex = color.colorHex || getColorHex(color.value) || getColorHex(color.label);

          return (
            <div key={color.id} className="relative">
              <RadioGroupItem value={color.value} id={color.id} className="peer sr-only" />
              <Label
                htmlFor={color.id}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer transition-all",
                  "hover:border-gray-400 dark:hover:border-gray-500",
                  isSelected
                    ? "border-primary-300 dark:bg-dark-field dark:border-[#B3B3FF99] bg-primary-50 "
                    : "border-gray-300 dark:bg-transparent bg-white dark:border-dark-stroke"
                )}
              >
                {/* Color Circle */}
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                    isSelected ? "border-gray-400 dark:border-gray-300" : "border-gray-300 dark:border-gray-600"
                  )}
                  style={{ backgroundColor: colorHex }}
                >
                  {isSelected && (
                    <Check
                      className={cn(
                        "w-3 h-3 stroke-[3]",
                        colorHex === "#ffffff" || colorHex === "#fff" || colorHex.toLowerCase() === "white"
                          ? "text-gray-800"
                          : "text-white"
                      )}
                    />
                  )}
                </div>

                {/* Color Label */}
                <span
                  className={cn(
                    "text-sm font-medium transition-colors",
                    isSelected ? "text-blue-700 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {color.label}
                </span>
              </Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export default SelectColor;
