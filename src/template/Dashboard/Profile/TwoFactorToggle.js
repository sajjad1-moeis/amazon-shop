"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldTick } from "iconsax-reactjs";

export default function TwoFactorToggle({ enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-3 flex-1">
        <Switch
          className="data-[state=checked]:bg-primary-500"
          dir="ltr"
          id="twoFactor"
          checked={enabled}
          onCheckedChange={onToggle}
        />
        <div className="flex-1">
          <Label htmlFor="twoFactor" className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer">
            ورود دو مرحله‌ای
          </Label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">امنیت بیشتر با یک کد یک‌بار مصرف</p>
        </div>
      </div>
    </div>
  );
}
