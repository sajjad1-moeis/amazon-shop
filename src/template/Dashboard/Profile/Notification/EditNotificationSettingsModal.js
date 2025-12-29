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
import { InfoCircle, Warning2 } from "iconsax-reactjs";
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
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">تنظیمات نوتیفیکیشن</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-dark-text">
            نوع و روش دریافت اعلان‌ها را تنظیم کنید
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Notification Types */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 dark:text-dark-text">نوع اعلان ها</Label>
            <div className="space-y-2">
              {notificationTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={type.id}
                    checked={formData.notificationTypes.includes(type.id)}
                    onCheckedChange={() => handleTypeToggle(type.id)}
                  />
                  <Label
                    htmlFor={type.id}
                    className="text-sm font-normal cursor-pointer text-gray-700 dark:text-dark-text"
                  >
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Notification Methods */}
          <div className="space-y-3">
            <Label className="text-sm font-semibold text-gray-700 dark:text-dark-text">روش دریافت اعلان</Label>
            <div className="space-y-2">
              {notificationMethods.map((method) => (
                <div key={method.id} className="flex items-center space-x-2 space-x-reverse">
                  <Checkbox
                    id={method.id}
                    checked={formData.notificationMethods.includes(method.id)}
                    onCheckedChange={() => handleMethodToggle(method.id)}
                  />
                  <Label
                    htmlFor={method.id}
                    className="text-sm font-normal cursor-pointer text-gray-700 dark:text-dark-text flex items-center gap-2"
                  >
                    {method.label}
                    {method.id === "telegram" && !formData.telegramConnected && (
                      <Warning2 size={16} className="text-yellow-500" />
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Telegram Connection */}
          {formData.notificationMethods.includes("telegram") && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 space-y-3">
              <div>
                <Label className="text-sm font-semibold text-gray-700 dark:text-dark-text">اتصال به تلگرام</Label>
                <p className="text-xs text-gray-600 dark:text-dark-text mt-1">
                  برای دریافت اعلان ها در تلگرام باید حساب خود را به ربات ما متصل کنید.
                </p>
              </div>
              {!formData.telegramConnected ? (
                <Button
                  type="button"
                  onClick={handleTelegramConnect}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white gap-2"
                >
                  <InfoCircle size={16} />
                  اتصال به تلگرام
                </Button>
              ) : (
                <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  متصل شده
                </div>
              )}
            </div>
          )}

          <DialogFooter className="flex gap-3 sm:gap-0">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 sm:flex-initial">
              لغو
            </Button>
            <Button type="submit" className="bg-primary-600 hover:bg-primary-700 text-white flex-1 sm:flex-initial">
              ذخیره تغییرات
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

