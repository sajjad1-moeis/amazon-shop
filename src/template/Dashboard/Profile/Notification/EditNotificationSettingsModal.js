"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { InfoCircle, Warning2, Send2 } from "iconsax-reactjs";
import { toast } from "sonner";

const notificationTypes = [
  { id: "orders", label: "سفارش ها" },
  { id: "tickets", label: "تیکت ها" },
  { id: "wallet", label: "کیف پول و تراکنش ها" },
  { id: "currency", label: "خدمات ارزی" },
];

const notificationMethods = [
  { id: "site", label: "نوتیفیکیشن داخل سایت" },
  { id: "sms", label: "پیامک" },
  { id: "email", label: "ایمیل" },
  { id: "telegram", label: "تلگرام" },
];

export default function EditNotificationSettingsModal({ isOpen, onClose, initialData, onSave }) {
  const [formData, setFormData] = useState({
    notificationTypes: initialData?.notificationTypes || ["orders"],
    notificationMethods: initialData?.notificationMethods || ["site", "telegram"],
    telegramConnected: initialData?.telegramConnected || false,
  });

  const handleTypeToggle = (typeId) => {
    setFormData((prev) => ({
      ...prev,
      notificationTypes: prev.notificationTypes.includes(typeId)
        ? prev.notificationTypes.filter((id) => id !== typeId)
        : [...prev.notificationTypes, typeId],
    }));
  };

  const handleMethodToggle = (methodId) => {
    setFormData((prev) => ({
      ...prev,
      notificationMethods: prev.notificationMethods.includes(methodId)
        ? prev.notificationMethods.filter((id) => id !== methodId)
        : [...prev.notificationMethods, methodId],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.notificationTypes.length === 0) {
      toast.error("لطفا حداقل یک نوع اعلان را انتخاب کنید");
      return;
    }

    if (formData.notificationMethods.length === 0) {
      toast.error("لطفا حداقل یک روش دریافت را انتخاب کنید");
      return;
    }

    if (onSave) {
      onSave(formData);
    }

    toast.success("تنظیمات نوتیفیکیشن با موفقیت به‌روزرسانی شد");
    onClose();
  };

  const handleClose = () => {
    setFormData({
      notificationTypes: initialData?.notificationTypes || ["orders"],
      notificationMethods: initialData?.notificationMethods || ["site", "telegram"],
      telegramConnected: initialData?.telegramConnected || false,
    });
    onClose();
  };

  const handleTelegramConnect = () => {
    // In real app, this would open Telegram bot connection
    toast.info("در حال اتصال به ربات تلگرام...");
    setFormData((prev) => ({ ...prev, telegramConnected: true }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} dir="rtl">
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-700 dark:text-dark-title text-center">
            تنظیمات نوتیفیکیشن
          </DialogTitle>
        </DialogHeader>
        <p className="text-lg font-bold text-primary-700 dark:text-dark-text">تنظیمات اعلان‌ها</p>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Notification Types */}
          <div className="space-y-3">
            <Label className="text-sm  text-gray-700 dark:text-dark-text">نوع اعلان ها</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {notificationTypes.map((type) => (
                <label
                  key={type.id}
                  htmlFor={type.id}
                  className="flex items-center space-x-2 space-x-reverse border border-gray-300 bg-gray-100 dark:border-dark-stroke dark:bg-dark-field rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-dark-field/80 transition-colors cursor-pointer"
                >
                  <Checkbox
                    id={type.id}
                    checked={formData.notificationTypes.includes(type.id)}
                    onCheckedChange={() => handleTypeToggle(type.id)}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm font-normal cursor-pointer text-gray-700 dark:text-dark-text flex-1">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Notification Methods */}
          <div className="space-y-3 pb-6 border-b border-gray-200">
            <Label className="text-sm  text-gray-700 dark:text-dark-text">روش دریافت اعلان</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              {notificationMethods.map((method) => (
                <label
                  key={method.id}
                  htmlFor={method.id}
                  className="flex items-center space-x-2 space-x-reverse border border-gray-300 bg-gray-100 dark:bg-dark-field dark:border-dark-stroke rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-dark-field/80 transition-colors cursor-pointer"
                >
                  <Checkbox
                    id={method.id}
                    checked={formData.notificationMethods.includes(method.id)}
                    onCheckedChange={() => handleMethodToggle(method.id)}
                    className="flex-shrink-0"
                  />
                  <span className="text-sm font-normal cursor-pointer text-gray-700 dark:text-dark-text flex items-center gap-2 flex-1">
                    {method.label}
                    {method.id === "telegram" && !formData.telegramConnected && (
                      <Warning2 size={16} className="text-yellow-500 flex-shrink-0" />
                    )}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Telegram Connection */}
          {formData.notificationMethods.includes("telegram") && (
            <div className="space-y-3 bg-gray-100 dark:bg-dark-field p-3 rounded-xl flex-between">
              <div className="">
                <Label className="text-lg font-bold text-primary-700 dark:text-dark-title">اتصال به تلگرام</Label>
                <p className="text-sm mt-2 text-gray-600 dark:text-dark-text">
                  برای دریافت اعلان‌ها در تلگرام، باید حساب خود را به ربات ما متصل کنید
                </p>
              </div>
              <Button
                type="button"
                onClick={handleTelegramConnect}
                className="bg-yellow-500 px-10 hover:bg-yellow-600 text-primary-800 gap-2 rounded-lg"
              >
                <Send2 size={18} variant="Bold" />
                اتصال به تلگرام
              </Button>
            </div>
          )}

          <DialogFooter className="flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="w-full dark:border-primary-400 border-2 dark:text-primary-400"
            >
              لغو
            </Button>
            <Button type="submit" className="bg-primary-600 w-full hover:bg-primary-700 text-white">
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
