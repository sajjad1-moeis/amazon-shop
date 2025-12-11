"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Share, Gift } from "iconsax-reactjs";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

const referralCode = "MICROLS-12345";
const referralLink = `https://microls.com/invite/${referralCode}`;

const rewards = [
  {
    title: "برای شما",
    description: "۱۰,۰۰۰ تومان اعتبار",
    icon: Gift,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
  },
  {
    title: "برای دوست شما",
    description: "۵,۰۰۰ تومان اعتبار",
    icon: Gift,
    color: "text-green-600",
    bgColor: "bg-green-50 dark:bg-green-950/20",
  },
];

export default function InviteFriends() {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("لینک دعوت کپی شد");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("کد دعوت کپی شد");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "دعوت به میکرولس",
          text: "به میکرولس بپیوندید و از تخفیف‌های ویژه بهره‌مند شوید",
          url: referralLink,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader title="دعوت دوستان" description="دوستان خود را دعوت کنید و از پاداش‌های ویژه بهره‌مند شوید" />

      {/* Rewards Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {rewards.map((reward, index) => {
          const Icon = reward.icon;
          return (
            <Card
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6"
              style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
            >
              <CardContent className="p-0">
                <div className={`flex items-center gap-4 p-4 rounded-lg ${reward.bgColor} mb-4`}>
                  <Icon size={32} className={reward.color} variant="Bold" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">{reward.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{reward.description}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  برای هر دعوت موفق، این پاداش به حساب شما واریز می‌شود
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Referral Link Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">لینک دعوت شما</h3>
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Input type="text" value={referralLink} readOnly className="flex-1 bg-gray-50 dark:bg-gray-700" dir="ltr" />
            <Button onClick={handleCopyLink} className="gap-2" variant="outline">
              <Copy size={18} />
              {copied ? "کپی شد!" : "کپی لینک"}
            </Button>
            <Button onClick={handleShare} className="gap-2 bg-primary-600 hover:bg-primary-700 text-white">
              <Share size={18} />
              اشتراک‌گذاری
            </Button>
          </div>
        </div>
      </div>

      {/* Referral Code Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">کد دعوت شما</h3>
        <div className="flex flex-col md:flex-row gap-2">
          <Input
            type="text"
            value={referralCode}
            readOnly
            className="flex-1 bg-gray-50 dark:bg-gray-700 text-center text-lg font-bold"
            dir="ltr"
          />
          <Button onClick={handleCopyCode} className="gap-2" variant="outline">
            <Copy size={18} />
            کپی کد
          </Button>
        </div>
      </div>

      {/* Statistics Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">آمار دعوت‌های شما</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400 mb-1">۱۲</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">تعداد دعوت‌ها</p>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">۸</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">دعوت‌های موفق</p>
          </div>
          <div className="text-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mb-1">۸۰,۰۰۰ تومان</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">کل پاداش دریافت شده</p>
          </div>
        </div>
      </div>
    </>
  );
}
