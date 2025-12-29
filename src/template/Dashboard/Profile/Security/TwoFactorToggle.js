"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldTick } from "iconsax-reactjs";

export default function TwoFactorToggle({ enabled, onToggle }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="twoFactor" className="text-sm font-semibold text-gray-700 dark:text-dark-text cursor-pointer">
          ورود دو مرحله ای
        </Label>
        <Switch
          className="data-[state=checked]:bg-primary-500"
          dir="ltr"
          id="twoFactor"
          checked={enabled}
          onCheckedChange={onToggle}
        />
      </div>
      <p className="text-xs text-gray-500 dark:text-dark-text">امنیت بیشتر با یک کد یک بار مصرف</p>
    </div>
  );
}

