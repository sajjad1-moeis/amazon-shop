"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldTick } from "iconsax-reactjs";

export default function TwoFactorToggle({ enabled, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50">
      <div className="flex items-center gap-3 flex-1">
        <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
          <ShieldTick size={20} className="text-primary-600 dark:text-primary-400" variant="Bold" />
        </div>
        <div className="flex-1">
          <Label htmlFor="twoFactor" className="text-sm font-semibold text-gray-900 dark:text-white cursor-pointer">
            تأیید دو مرحله‌ای
          </Label>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            برای امنیت بیشتر حساب کاربری خود، تأیید دو مرحله‌ای را فعال کنید
          </p>
        </div>
      </div>
      <Switch id="twoFactor" checked={enabled} onCheckedChange={onToggle} />
    </div>
  );
}

