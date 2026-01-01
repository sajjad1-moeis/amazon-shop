"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share } from "iconsax-reactjs";

export default function ReferralCodeBox({ referralCode, referralLink, onShareClick, onRewardConditionsClick }) {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl p-6 shadow-lg">
      <h3 className="text-white text-lg font-bold mb-6">کد دعوت اختصاصی شما</h3>

      <div className="space-y-4 ">
        {/* Referral Code Input */}
        <div>
          <Label htmlFor="referral-code" className="text-white text-sm mb-2 block">
            کد دعوت
          </Label>
          <Input
            id="referral-code"
            type="text"
            value={referralCode}
            readOnly
            className="bg-white dark:bg-dark-box/90 text-gray-900 dark:text-dark-title font-medium text-center"
            dir="ltr"
          />
        </div>

        {/* Referral Link Input */}
        <div>
          <Label htmlFor="referral-link" className="text-white text-sm mb-2 block">
            لینک دعوت
          </Label>
          <Input
            id="referral-link"
            type="text"
            value={referralLink}
            readOnly
            className="bg-white dark:bg-dark-box/90 text-gray-900 dark:text-dark-title"
            dir="ltr"
          />
        </div>

        {/* Share Button */}
        <Button
          onClick={onShareClick}
          className="w-full bg-white dark:bg-dark-box text-purple-600 hover:bg-white dark:bg-dark-box/90 font-medium gap-2"
        >
          <Share size={18} />
          اشتراک گذاری
        </Button>

        {/* Reward Conditions Button */}
        <Button
          onClick={onRewardConditionsClick}
          variant="outline"
          className="w-full bg-white dark:bg-dark-box/10 border-white/30 text-white hover:bg-white dark:bg-dark-box/20 font-medium gap-2"
        >
          شرایط دریافت پاداش
        </Button>

        {/* Description Text */}
        <p className="text-white/90 text-xs mt-4 leading-relaxed">
          با ارسال لینک به دوستان خود میتوانید طبق شرایط دریافت پاداش امتیاز بگیرید
        </p>
      </div>
    </div>
  );
}
