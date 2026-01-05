"use client";

import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ShieldTick } from "iconsax-reactjs";

export default function TwoFactorToggle({ enabled, onToggle }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <Switch
          className="data-[state=checked]:bg-primary-500 dark:data-[state=checked]:bg-dark-title"
          dir="ltr"
          id="twoFactor"
          checked={enabled}
          onCheckedChange={onToggle}
        />
        <div className="">
          <Label htmlFor="twoFactor" className="text-base  text-gray-700 dark:text-dark-titre cursor-pointer">
            ورود دو مرحله ای
          </Label>
          <p className="text-xs text-gray-500 dark:text-dark-text mt-2">امنیت بیشتر با یک کد یک بار مصرف</p>
        </div>
      </div>
    </div>
  );
}
