"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogoutCurve, Refresh, Close } from "iconsax-reactjs";
import { toast } from "sonner";

// Mock data for devices
const initialDevices = [
  {
    id: 1,
    name: "Windows PC - Chrome",
    os: "Windows 10",
    browser: "Chrome 120",
    location: "تهران، ایران",
    ipAddress: "185.123.45.67",
    lastActive: "هم اکنون",
    isCurrent: true,
  },
  {
    id: 2,
    name: "iPhone 13 - Safari",
    os: "iOS 17.2",
    browser: "Safari",
    location: "تهران، ایران",
    ipAddress: "185.123.45.68",
    lastActive: "۲ ساعت پیش",
    isCurrent: false,
  },
  {
    id: 3,
    name: "MacBook Pro - Chrome",
    os: "macOS Sonoma",
    browser: "Chrome 119",
    location: "اصفهان، ایران",
    ipAddress: "185.123.45.69",
    lastActive: "۳ روز پیش",
    isCurrent: false,
  },
];

export default function ConnectedDevicesModal({ isOpen, onClose }) {
  const [devices, setDevices] = useState(initialDevices);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleLogoutDevice = (deviceId) => {
    setDevices((prev) => prev.filter((device) => device.id !== deviceId));
    toast.success("دستگاه با موفقیت خارج شد");
  };

  const handleLogoutAll = () => {
    const currentDevice = devices.find((d) => d.isCurrent);
    setDevices([currentDevice]);
    toast.success("تمام دستگاه‌ها (به جز دستگاه فعلی) با موفقیت خارج شدند");
  };

  const handleUpdateList = () => {
    setIsUpdating(true);
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      toast.success("لیست دستگاه‌ها به‌روزرسانی شد");
    }, 1000);
  };

  const currentDevice = devices.find((d) => d.isCurrent);
  const otherDevices = devices.filter((d) => !d.isCurrent);

  return (
    <Dialog open={isOpen} onOpenChange={onClose} dir="rtl">
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto dark:bg-dark-box px-4 sm:px-6" dir="rtl">
        <DialogHeader className="px-0">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center sm:text-right">دستگاه‌های متصل</DialogTitle>
          <DialogDescription className="text-xs sm:text-sm text-gray-600 dark:text-dark-text text-center sm:text-right">
            مدیریت دستگاه‌هایی که به حساب کاربری شما متصل هستند
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 sm:space-y-6 py-4">
          {/* Current Device */}
          {currentDevice && (
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-dark-text">دستگاه فعلی</h4>
              <div className="border border-gray-200 dark:border-dark-stroke rounded-lg p-3 sm:p-4 bg-gray-50 dark:bg-dark-box/50">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div className="flex-1">
                    <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-dark-title mb-1 sm:mb-2">
                      {currentDevice.name}
                    </p>
                    <div className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-dark-text">
                      <p>
                        <span className="font-medium">سیستم عامل:</span> {currentDevice.os}
                      </p>
                      <p>
                        <span className="font-medium">مرورگر:</span> {currentDevice.browser}
                      </p>
                      <p>
                        <span className="font-medium">موقعیت تقریبی:</span> {currentDevice.location}
                      </p>
                      <p>
                        <span className="font-medium">آدرس IP:</span> {currentDevice.ipAddress}
                      </p>
                      <p>
                        <span className="font-medium">آخرین فعالیت:</span> {currentDevice.lastActive}
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center justify-center sm:justify-start px-2 sm:px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 w-fit">
                    دستگاه فعلی
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Other Devices */}
          {otherDevices.length > 0 && (
            <div className="space-y-2 sm:space-y-3">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-dark-text">سایر دستگاه‌ها</h4>
              <div className="space-y-3">
                {otherDevices.map((device) => (
                  <div
                    key={device.id}
                    className="border border-gray-200 dark:border-dark-stroke rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-dark-box/50 transition-colors"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex-1">
                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-dark-title mb-1 sm:mb-2">{device.name}</p>
                        <div className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-dark-text">
                          <p>
                            <span className="font-medium">سیستم عامل:</span> {device.os}
                          </p>
                          <p>
                            <span className="font-medium">مرورگر:</span> {device.browser}
                          </p>
                          <p>
                            <span className="font-medium">موقعیت تقریبی:</span> {device.location}
                          </p>
                          <p>
                            <span className="font-medium">آدرس IP:</span> {device.ipAddress}
                          </p>
                          <p>
                            <span className="font-medium">آخرین فعالیت:</span> {device.lastActive}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleLogoutDevice(device.id)}
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 w-full sm:w-auto text-xs sm:text-sm"
                      >
                        <LogoutCurve size={14} className="sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">خروج از این دستگاه</span>
                        <span className="sm:hidden">خروج</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Logout All Button */}
          {otherDevices.length > 0 && (
            <div className="pt-4 border-t border-gray-200 dark:border-dark-stroke">
              <Button
                variant="outline"
                onClick={handleLogoutAll}
                className="w-full gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 text-xs sm:text-sm"
              >
                <LogoutCurve size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden sm:inline">خروج از تمام دستگاه‌ها (به جز دستگاه فعلی)</span>
                <span className="sm:hidden">خروج از تمام دستگاه‌ها</span>
              </Button>
            </div>
          )}

          {devices.length === 0 && (
            <div className="text-center py-8 text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ دستگاهی یافت نشد</div>
          )}
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-0">
          <Button type="button" variant="outline" onClick={handleUpdateList} disabled={isUpdating} className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
            <Refresh size={14} className={isUpdating ? "animate-spin" : ""} />
            <span className="hidden sm:inline">به‌روزرسانی لیست دستگاه‌ها</span>
            <span className="sm:hidden">به‌روزرسانی</span>
          </Button>
          <Button type="button" variant="outline" onClick={onClose} className="w-full sm:flex-initial text-xs sm:text-sm">
            بستن
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
