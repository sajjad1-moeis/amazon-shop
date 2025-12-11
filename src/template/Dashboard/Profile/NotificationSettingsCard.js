"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Notification } from "iconsax-reactjs";
import EditNotificationSettingsModal from "./EditNotificationSettingsModal";

const notificationData = {
  notificationTypes: ["orders", "tickets"],
  notificationMethods: ["sms", "email"],
  telegramConnected: true,
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
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
      style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
            <Notification size={24} className="text-primary-600 dark:text-primary-400" variant="Bold" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">تنظیمات نوتیفیکیشن</h3>
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
        {/* Notification Types */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">نوع اعلان ها</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            {getNotificationTypesText(notificationInfo.notificationTypes)}
          </p>
        </div>

        {/* Notification Methods */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">روش دریافت نوتیفیکیشن</p>
          <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">
            {getNotificationMethodsText(notificationInfo.notificationMethods)}
          </p>
        </div>

        {/* Telegram Connection */}
        <div className="flex items-center justify-between py-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">اتصال به تلگرام</p>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            {notificationInfo.telegramConnected ? "متصل شده" : "متصل نشده"}
          </span>
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
