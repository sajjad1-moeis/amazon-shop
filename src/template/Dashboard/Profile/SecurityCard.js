"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Lock } from "iconsax-reactjs";
import EditSecurityModal from "./EditSecurityModal";
import ConnectedDevicesModal from "./ConnectedDevicesModal";

const securityData = {
  password: "*******",
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
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Lock size={24} className="text-primary-600 dark:text-primary-400" variant="Bold" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">امنیت حساب</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsModalOpen(true)}
          className="gap-2"
        >
          <Edit2 size={16} />
          ویرایش
        </Button>
      </div>

      {/* Card Content */}
      <div className="space-y-4">
        {/* Password */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">رمز عبور</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white font-mono">
            {securityInfo.password}
          </p>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">تأیید دو مرحله ای</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {securityInfo.twoFactorAuthText}
          </span>
        </div>

        {/* Active Devices */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">تعداد دستگاه های فعال</p>
          <Button
            variant="link"
            size="sm"
            onClick={() => setIsDevicesModalOpen(true)}
            className="text-sm md:text-base font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 p-0 h-auto"
          >
            {securityInfo.activeDevicesText}
          </Button>
        </div>

        {/* Last Password Change */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">آخرین تغییر رمز</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            {securityInfo.lastPasswordChange}
          </p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditSecurityModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      {/* Connected Devices Modal */}
      <ConnectedDevicesModal
        isOpen={isDevicesModalOpen}
        onClose={() => setIsDevicesModalOpen(false)}
      />
    </div>
  );
}

