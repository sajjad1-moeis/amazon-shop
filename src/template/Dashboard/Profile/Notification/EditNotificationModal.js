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
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const initialData = {
  notificationTypes: ["orders", "tickets"],
  notificationMethods: ["sms", "email"],
  telegramConnected: true,
};

export default function EditNotificationModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState(initialData);
  const [errors, setErrors] = useState({});

  React.useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
      setErrors({});
    }
  }, [isOpen]);

  const handleNotificationTypeChange = (value) => {
    const types = formData.notificationTypes.includes(value)
      ? formData.notificationTypes.filter((t) => t !== value)
      : [...formData.notificationTypes, value];
    setFormData((prev) => ({ ...prev, notificationTypes: types }));
  };

  const handleNotificationMethodChange = (value) => {
    const methods = formData.notificationMethods.includes(value)
      ? formData.notificationMethods.filter((m) => m !== value)
      : [...formData.notificationMethods, value];
    setFormData((prev) => ({ ...prev, notificationMethods: methods }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.notificationTypes.length === 0) {
      setErrors({ notificationTypes: "حداقل یک نوع اعلان را انتخاب کنید" });
      return;
    }

    if (formData.notificationMethods.length === 0) {
      setErrors({ notificationMethods: "حداقل یک روش دریافت را انتخاب کنید" });
      return;
    }

    if (onSave) {
      onSave(formData);
    }

    toast.success("تنظیمات نوتیفیکیشن با موفقیت به‌روزرسانی شد");
    onClose();
  };

  const getNotificationTypeLabel = (type) => {
    const labels = {
      orders: "سفارش ها",
      tickets: "تیکت و پشتیبانی",
      payments: "پرداخت ها",
      promotions: "تخفیف ها",
    };
    return labels[type] || type;
  };

  const getNotificationMethodLabel = (method) => {
    const labels = {
      sms: "پیامک",
      email: "ایمیل",
      push: "اعلان مرورگر",
    };
    return labels[method] || method;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto dark:bg-dark-box" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold ">ویرایش تنظیمات نوتیفیکیشن</DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-dark-text">
            تنظیمات اعلان‌های خود را تغییر دهید
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Notification Types */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">نوع اعلان ها</Label>
            <div className="space-y-2">
              {["orders", "tickets", "payments", "promotions"].map((type) => (
                <div
                  key={type}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-stroke rounded-lg"
                >
                  <Label htmlFor={type} className="text-sm cursor-pointer">
                    {getNotificationTypeLabel(type)}
                  </Label>
                  <Switch
                    id={type}
                    checked={formData.notificationTypes.includes(type)}
                    onCheckedChange={() => handleNotificationTypeChange(type)}
                  />
                </div>
              ))}
            </div>
            {errors.notificationTypes && <p className="text-sm text-red-500">{errors.notificationTypes}</p>}
          </div>

          {/* Notification Methods */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">روش دریافت نوتیفیکیشن</Label>
            <div className="space-y-2">
              {["sms", "email", "push"].map((method) => (
                <div
                  key={method}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-stroke rounded-lg"
                >
                  <Label htmlFor={method} className="text-sm cursor-pointer">
                    {getNotificationMethodLabel(method)}
                  </Label>
                  <Switch
                    id={method}
                    checked={formData.notificationMethods.includes(method)}
                    onCheckedChange={() => handleNotificationMethodChange(method)}
                  />
                </div>
              ))}
            </div>
            {errors.notificationMethods && <p className="text-sm text-red-500">{errors.notificationMethods}</p>}
          </div>

          {/* Telegram Connection */}
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-dark-stroke rounded-lg">
            <div className="flex-1">
              <Label htmlFor="telegram" className="text-sm font-semibold block mb-1">
                اتصال به تلگرام
              </Label>
              <p className="text-xs text-gray-600 dark:text-dark-text">دریافت اعلان‌ها از طریق ربات تلگرام</p>
            </div>
            <Switch
              id="telegram"
              checked={formData.telegramConnected}
              onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, telegramConnected: checked }))}
            />
          </div>

          <DialogFooter className="flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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
