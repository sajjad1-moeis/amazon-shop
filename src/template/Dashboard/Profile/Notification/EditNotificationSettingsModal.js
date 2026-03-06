"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Send2 } from "iconsax-reactjs";
import { toast } from "sonner";
import { userService } from "@/services/user/userService";
import { unwrapApiData } from "@/services/api/client";

/** فیلدهای API — api/Users/NotificationSettings (Phase 20) */
const SETTINGS_FIELDS = [
  { key: "emailOrderUpdates", label: "به‌روزرسانی سفارش از طریق ایمیل" },
  { key: "emailPromotions", label: "پیشنهادها و تخفیف‌ها از طریق ایمیل" },
  { key: "smsOrderUpdates", label: "به‌روزرسانی سفارش از طریق پیامک" },
  { key: "telegramOrderUpdates", label: "به‌روزرسانی سفارش از طریق تلگرام" },
  { key: "pushNotifications", label: "نوتیفیکیشن داخل سایت" },
];

const defaultSettings = {
  emailOrderUpdates: false,
  emailPromotions: false,
  smsOrderUpdates: false,
  telegramOrderUpdates: false,
  pushNotifications: true,
  telegramChatId: "",
};

export default function EditNotificationSettingsModal({ isOpen, onClose, initialData, onSave, onUpdated }) {
  const [formData, setFormData] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    userService
      .getNotificationSettings()
      .then((res) => {
        const data = unwrapApiData(res);
        if (data) {
          const b = (v) => (typeof v === "boolean" ? v : undefined);
          setFormData({
            emailOrderUpdates: b(data.emailOrderUpdates ?? data.EmailOrderUpdates) ?? defaultSettings.emailOrderUpdates,
            emailPromotions: b(data.emailPromotions ?? data.EmailPromotions) ?? defaultSettings.emailPromotions,
            smsOrderUpdates: b(data.smsOrderUpdates ?? data.SmsOrderUpdates) ?? defaultSettings.smsOrderUpdates,
            telegramOrderUpdates: b(data.telegramOrderUpdates ?? data.TelegramOrderUpdates) ?? defaultSettings.telegramOrderUpdates,
            pushNotifications: b(data.pushNotifications ?? data.PushNotifications) ?? defaultSettings.pushNotifications,
            telegramChatId: data.telegramChatId ?? data.TelegramChatId ?? "",
          });
        }
      })
      .catch(() => toast.error("خطا در دریافت تنظیمات نوتیفیکیشن"))
      .finally(() => setLoading(false));
  }, [isOpen]);


  const handleToggle = (key) => {
    setFormData((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        emailOrderUpdates: formData.emailOrderUpdates,
        emailPromotions: formData.emailPromotions,
        smsOrderUpdates: formData.smsOrderUpdates,
        telegramOrderUpdates: formData.telegramOrderUpdates,
        pushNotifications: formData.pushNotifications,
      };
      if (formData.telegramChatId?.trim()) body.telegramChatId = formData.telegramChatId.trim();

      const res = await userService.updateNotificationSettings(body);
      unwrapApiData(res);
      if (onSave) onSave(formData);
      if (onUpdated) onUpdated();
      toast.success("تنظیمات نوتیفیکیشن با موفقیت به‌روزرسانی شد");
      onClose();
    } catch (err) {
      toast.error(err?.message || err?.data?.message || "خطا در ذخیره تنظیمات");
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    setFormData(defaultSettings);
    onClose();
  };

  const handleTelegramConnect = () => {
    toast.info("در حال اتصال به ربات تلگرام...");
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} dir="rtl">
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto dark:bg-dark-box px-4 sm:px-6" dir="rtl">
        <DialogHeader className="px-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-primary-700 dark:text-dark-title text-center sm:text-right">
            تنظیمات نوتیفیکیشن
          </DialogTitle>
        </DialogHeader>
        <p className="text-base sm:text-lg font-bold text-primary-700 dark:text-dark-text text-center sm:text-right">تنظیمات اعلان‌ها</p>

        {loading ? (
          <div className="py-8 text-center text-gray-500 dark:text-dark-text">در حال بارگذاری...</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 py-4">
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">روش و نوع اعلان‌ها</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                {SETTINGS_FIELDS.map(({ key, label }) => (
                  <label
                    key={key}
                    htmlFor={key}
                    className="flex items-center space-x-2 space-x-reverse border border-gray-300 bg-gray-100 dark:border-dark-stroke dark:bg-dark-field rounded-lg p-2 sm:p-3 hover:bg-gray-200 dark:hover:bg-dark-field/80 transition-colors cursor-pointer"
                  >
                    <Checkbox
                      id={key}
                      checked={!!formData[key]}
                      onCheckedChange={() => handleToggle(key)}
                      className="flex-shrink-0"
                    />
                    <span className="text-xs sm:text-sm font-normal cursor-pointer text-gray-700 dark:text-dark-text flex-1">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs sm:text-sm text-gray-700 dark:text-dark-text">شناسه چت تلگرام (اختیاری)</Label>
              <Input
                value={formData.telegramChatId}
                onChange={(e) => setFormData((prev) => ({ ...prev, telegramChatId: e.target.value }))}
                placeholder="Telegram Chat ID"
                className="max-w-xs"
                dir="ltr"
              />
            </div>

            <div className="space-y-3 bg-gray-100 dark:bg-dark-field p-3 sm:p-4 rounded-xl">
              <Label className="text-base font-bold text-primary-700 dark:text-dark-title block">اتصال به تلگرام</Label>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">
                برای دریافت اعلان‌ها در تلگرام، حساب خود را به ربات متصل کنید و در صورت نیاز شناسه چت را وارد کنید.
              </p>
              <Button type="button" variant="outline" size="sm" onClick={handleTelegramConnect} className="gap-2">
                <Send2 size={16} variant="Bold" />
                اتصال به تلگرام
              </Button>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 px-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="w-full dark:border-primary-400 border-2 dark:text-primary-400 text-sm sm:text-base"
              >
                لغو
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="bg-primary-600 w-full hover:bg-primary-700 text-white text-sm sm:text-base"
              >
                {saving ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
