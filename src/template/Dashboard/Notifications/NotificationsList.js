"use client";

import React, { useState } from "react";
import NotificationsFilter from "./NotificationsFilter";
import NotificationCard from "./NotificationCard";
import { Button } from "@/components/ui/button";
import { Trash, TickCircle } from "iconsax-reactjs";
import { toast } from "sonner";
import { initialNotifications } from "@/data";
import PageHeader from "../Common/PageHeader";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filters, setFilters] = useState({
    timeRange: "",
    status: "",
    category: "",
    allCategories: "",
    searchQuery: "",
  });

  const handleDelete = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
    toast.success("اعلان حذف شد");
  };

  const handleDeleteAll = () => {
    if (confirm("آیا از حذف همه اعلان‌ها اطمینان دارید؟")) {
      setNotifications([]);
      toast.success("همه اعلان‌ها حذف شدند");
    }
  };

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    toast.success("همه اعلان‌ها به عنوان خوانده شده علامت گذاری شدند");
  };

  const handlePinToggle = (notificationId) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === notificationId ? { ...n, isPinned: !n.isPinned } : n));
      // Sort: pinned first, then by id (newest first)
      return updated.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
    });
  };

  return (
    <div dir="rtl">
      {/* Header Section: Title and Action Buttons */}
      <PageHeader
        title={"اعلان ها"}
        description={
          "تمام اعلان‌های مربوط به سفارش‌ها، تیکت‌ها، کیف پول و فعالیت‌های حساب شما در این بخش نمایش داده می‌شوند."
        }
      >
        <Button
          variant="outline"
          onClick={handleDeleteAll}
          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-900/20 border-red-500 dark:border-red-400"
        >
          <Trash size={18} />
          حذف همه اعلانها
        </Button>
      </PageHeader>
      <div class="bg-white p-4 rounded-xl">
        <div className="mb-6">
          {/* Section Header */}
          <div class="flex-between  mb-4">
            {notifications.length > 0 && <h2 className="text-lg  text-gray-700 dark:text-white">لیست اعلانها</h2>}
            <Button
              variant="ghost"
              onClick={handleMarkAllAsRead}
              className="gap-2 h-7 p-1 text-primary-700 bg-transparent"
            >
              <TickCircle size={18} />
              علامت گذاری همه به عنوان خوانده شده
            </Button>
          </div>
        </div>

        {notifications.length > 0 && <NotificationsFilter filters={filters} onFiltersChange={setFilters} />}

        {notifications.length === 0 ? (
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center mt-6"
            style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
          >
            <p className="text-gray-500 dark:text-gray-400">هیچ اعلانی وجود ندارد</p>
          </div>
        ) : (
          <div className="space-y-4  mt-6">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onDelete={() => handleDelete(notification.id)}
                onPinToggle={handlePinToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
