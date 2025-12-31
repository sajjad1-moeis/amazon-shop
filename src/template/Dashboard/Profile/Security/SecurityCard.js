"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Lock, Devices, Profile, Lock1 } from "iconsax-reactjs";
import EditSecurityModal from "./EditSecurityModal";
import ConnectedDevicesModal from "./ConnectedDevicesModal";
import { Row } from "../BasicInfo/BasicInfoCard";

const securityData = {
  password: "******",
  twoFactorAuth: "active",
  twoFactorAuthText: "فعال",
  activeDevices: 1,
  activeDevicesText: "۱ دستگاه متصل",
  lastPasswordChange: "۳ ماه پیش",
};

export default function SecurityCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDevicesModalOpen, setIsDevicesModalOpen] = useState(false);
  const [securityInfo, setSecurityInfo] = useState(securityData);

  const handleSave = (data) => {
    setSecurityInfo((prev) => ({
      ...prev,
      twoFactorAuthText: data.twoFactorEnabled ? "فعال" : "غیرفعال",
    }));
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-dark-titre">
          <Lock1 size={24} className="sm:w-7 sm:h-7" variant="Bold" />
          <span className="text-lg sm:text-xl">امنیت حساب</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 sm:gap-2 px-2 sm:px-3 border-2 text-primary-700 rounded-lg border-primary-700 dark:text-dark-title dark:border-dark-title text-xs sm:text-sm"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit2 size={14} className="sm:w-4 sm:h-4" />
          ویرایش
        </Button>
      </div>

      {/* Card Content */}
      <div className=" grid grid-cols-2 xl:flex flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
        <Row label="رمز عبور" value={securityInfo.password} className="w-full sm:w-auto" />
        <Row label="تأیید دو مرحله ای" value={securityInfo.twoFactorAuthText} className="w-full sm:w-auto" />
        <div className="py-2 flex flex-col items-start">
          <span
            onClick={() => setIsDevicesModalOpen(true)}
            className="text-xs sm:text-sm md:text-base font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 p-0 h-auto cursor-pointer"
          >
            {securityInfo.activeDevices} دستگاه متصل
          </span>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-caption mt-1 sm:mt-2">تعداد دستگاه‌های فعال</p>
        </div>
        <Row label={"آخرین تغییر رمز"} value={securityInfo.lastPasswordChange} className="w-full sm:w-auto" />
      </div>

      {/* Edit Modal */}
      <EditSecurityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />

      {/* Connected Devices Modal */}
      <ConnectedDevicesModal isOpen={isDevicesModalOpen} onClose={() => setIsDevicesModalOpen(false)} />
    </div>
  );
}
