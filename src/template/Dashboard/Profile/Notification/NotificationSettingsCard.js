"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Lock1, Notification, NotificationBing } from "iconsax-reactjs";
import EditNotificationSettingsModal from "./EditNotificationSettingsModal";
import { Row } from "../BasicInfo/BasicInfoCard";

const notificationData = {
  notificationTypes: ["orders"], // فقط سفارش‌ها انتخاب شده
  notificationMethods: ["site", "telegram"], // نوتیفیکیشن داخل سایت و تلگرام
  telegramConnected: false, // تلگرام متصل نشده
};

const getNotificationTypesText = (types) => {
  const labels = {
    orders: "سفارش ها",
    tickets: "تیکت و پشتیبانی",
    wallet: "کیف پول و تراکنش ها",
    currency: "خدمات ارزی",
  };
  return types.map((type) => labels[type] || type).join(" / ");
};

const getNotificationMethodsText = (methods) => {
  const labels = {
    site: "نوتیفیکیشن داخل سایت",
    sms: "پیامک",
    email: "ایمیل",
    telegram: "تلگرام",
  };
  return methods.map((method) => labels[method] || method).join(" / ");
};

export default function NotificationSettingsCard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationInfo, setNotificationInfo] = useState(notificationData);

  const handleSave = (data) => {
    setNotificationInfo(data);
  };

  return (
    <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
      {/* Header */}
      <div className="flex items-start sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 text-gray-700 dark:text-dark-titre">
          <NotificationBing size={24} className="sm:w-7 sm:h-7" variant="Bold" />
          <span className="text-lg sm:text-xl">تنظیمات نوتیفیکیشن</span>
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-5">
        <Row label="نوع اعلان ها" value={getNotificationTypesText(notificationInfo.notificationTypes)} className="" />
        <Row
          label="روش دریافت نوتیفیکیشن"
          value={getNotificationMethodsText(notificationInfo.notificationMethods)}
          className=""
        />

        <div className="text-xs sm:text-sm flex flex-col gap-1">
          <p className="mb-1 sm:mb-2 px-2 sm:px-3 py-1 w-max rounded-md dark:bg-green-900/30 dark:text-green-300 bg-green-100 text-green-700 text-xs font-medium">
            {notificationInfo.telegramConnected ? "متصل شده" : "متصل نشده"}
          </p>
          <p className="text-gray-400 dark:text-caption text-xs">اتصال به تلگرام</p>
        </div>
      </div>

      {/* Edit Modal */}
      <EditNotificationSettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={notificationInfo}
        onSave={handleSave}
      />
    </div>
  );
}
