"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogoutCurve, Refresh } from "iconsax-reactjs";
import { toast } from "sonner";
import { userService } from "@/services/user/userService";
import { unwrapApiData } from "@/services/api/client";

function formatDeviceDate(isoStr) {
  if (!isoStr) return "—";
  try {
    return new Date(isoStr).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return isoStr;
  }
}

export default function ConnectedDevicesModal({ isOpen, onClose, onDevicesUpdated }) {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [loggingOutId, setLoggingOutId] = useState(null);

  const fetchDevices = useCallback(async () => {
    if (!isOpen) return;
    setLoading(true);
    try {
      const res = await userService.getConnectedDevices();
      const data = unwrapApiData(res);
      setDevices(Array.isArray(data) ? data : []);
    } catch {
      toast.error("خطا در دریافت لیست دستگاه‌ها");
      setDevices([]);
    } finally {
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  const handleLogoutDevice = async (deviceId) => {
    setLoggingOutId(deviceId);
    try {
      const res = await userService.logoutDevice(deviceId);
      unwrapApiData(res);
      setDevices((prev) => prev.filter((d) => d.id !== deviceId));
      if (onDevicesUpdated) onDevicesUpdated();
      toast.success("دستگاه با موفقیت خارج شد");
    } catch (err) {
      toast.error(err?.message || err?.data?.message || "خطا در خروج از دستگاه");
    } finally {
      setLoggingOutId(null);
    }
  };

  const handleUpdateList = () => {
    setIsUpdating(true);
    fetchDevices().finally(() => {
      setIsUpdating(false);
      toast.success("لیست دستگاه‌ها به‌روزرسانی شد");
    });
  };

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
          {loading ? (
            <div className="py-8 text-center text-gray-500 dark:text-dark-text">در حال بارگذاری...</div>
          ) : (
            <>
              {devices.length > 0 ? (
                <div className="space-y-3">
                  {devices.map((device) => (
                    <div
                      key={device.id}
                      className="border border-gray-200 dark:border-dark-stroke rounded-lg p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-dark-box/50 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    >
                      <div className="flex-1 space-y-1">
                        <p className="text-sm sm:text-base font-semibold text-gray-900 dark:text-dark-title">
                          دستگاه #{device.id}
                          {device.isCurrent && (
                            <span className="mr-2 inline-flex px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                              دستگاه فعلی
                            </span>
                          )}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">
                          <span className="font-medium">IP:</span> {device.createdByIp || "—"}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-dark-text">
                          <span className="font-medium">زمان ورود:</span> {formatDeviceDate(device.createdAt)}
                        </p>
                        {device.isActive === false && (
                          <span className="text-xs text-amber-600 dark:text-amber-400">غیرفعال</span>
                        )}
                      </div>
                      {!device.isCurrent && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleLogoutDevice(device.id)}
                          disabled={loggingOutId === device.id}
                          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20 w-full sm:w-auto text-xs sm:text-sm"
                        >
                          <LogoutCurve size={14} className={loggingOutId === device.id ? "animate-pulse" : ""} />
                          {loggingOutId === device.id ? "در حال خروج..." : "خروج از این دستگاه"}
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ دستگاهی یافت نشد</div>
              )}
            </>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-3 px-0">
            <Button type="button" variant="outline" onClick={handleUpdateList} disabled={isUpdating || loading} className="gap-2 w-full sm:w-auto text-xs sm:text-sm">
              <Refresh size={14} className={isUpdating ? "animate-spin" : ""} />
              به‌روزرسانی لیست
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="w-full sm:flex-initial text-xs sm:text-sm">
              بستن
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
