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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-gray-700">
          <Lock1 size={28} variant="Bold" />
          <span className=" text-xl">امنیت حساب</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 px-3 border-2 text-primary-700 rounded-lg border-primary-700"
          onClick={() => setIsModalOpen(true)}
        >
          <Edit2 size={16} />
          ویرایش
        </Button>
      </div>

      {/* Card Content */}
      <div className="flex-between gap-5">
        <Row label="رمز عبور" value={securityInfo.password} />
        <Row label="تأیید دو مرحله ای" value={securityInfo.twoFactorAuthText} />
        <div className=" py-2">
          <span
            onClick={() => setIsDevicesModalOpen(true)}
            className="text-sm md:text-base font-medium text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300 p-0 h-auto"
          >
            {securityInfo.activeDevices} دستگاه متصل
          </span>
          <p className="text-sm text-gray-400 mt-2">تعداد دستگاه‌های فعال</p>
        </div>
        <Row label={"آخرین تغییر رمز"} value={securityInfo.lastPasswordChange} />
      </div>

      {/* Edit Modal */}
      <EditSecurityModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} />

      {/* Connected Devices Modal */}
      <ConnectedDevicesModal isOpen={isDevicesModalOpen} onClose={() => setIsDevicesModalOpen(false)} />
    </div>
  );
}

