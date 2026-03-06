"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Edit2, Lock1, Notification, NotificationBing } from "iconsax-reactjs";
import EditNotificationSettingsModal from "./EditNotificationSettingsModal";
import { Row } from "./BasicInfoCard";

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
    <div className="bg-white rounded-2xl shadow-box p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3 text-[#292D32CC]">
          <NotificationBing size={28} variant="Bold" />
          <span className=" text-xl">تنظیمات نوتیفیکیشن</span>
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
        <Row label="نوع اعلان ها" value={getNotificationTypesText(notificationInfo.notificationTypes)} />
        <Row label="روش دریافت نوتیفیکیشن" value={getNotificationMethodsText(notificationInfo.notificationMethods)} />

        <div className=" text-sm">
          <p className="mb-2 px-3 py-1 size-max mx-auto rounded-md bg-green-100 text-green-700 text-xs font-medium">
            {notificationInfo.telegramConnected ? "متصل شده" : "متصل نشده"}
          </p>
          <p className="text-gray-400">اتصال به تلگرام</p>
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
