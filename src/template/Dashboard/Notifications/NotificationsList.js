"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import NotificationsFilter from "./NotificationsFilter";
import NotificationCard from "./NotificationCard";
import { Button } from "@/components/ui/button";
import { Trash, TickCircle } from "iconsax-reactjs";
import { toast } from "sonner";

const initialNotifications = [
  {
    id: 1,
    type: "order",
    title: "سفارش شما ارسال شد",
    description: "سفارش ۴۵۲۱۹-۸ امروز تحویل پست داده شد.",
    time: "۱۰ دقیقه پیش",
    date: "۱۴۰۳/۱۰/۲۴",
    isPinned: true,
    isRead: false,
    actionUrl: "/dashboard/orders/45219",
    actionText: "مشاهده سفارش",
  },
  {
    id: 2,
    type: "ticket",
    title: "پاسخ جدید در تیکت",
    description: "کارشناس پشتیبانی به پیام شما پاسخ داده است",
    time: "۱۰ دقیقه پیش",
    date: "۱۴۰۳/۱۰/۲۴",
    isPinned: false,
    isRead: false,
    actionUrl: "/dashboard/support/45231",
    actionText: "مشاهده تیکت",
  },
  {
    id: 3,
    type: "ticket",
    title: "پاسخ جدید در تیکت",
    description: "کارشناس پشتیبانی به پیام شما پاسخ داده است",
    time: "۱۰ دقیقه پیش",
    date: "۱۴۰۳/۱۰/۲۴",
    isPinned: false,
    isRead: false,
    actionUrl: "/dashboard/support/45232",
    actionText: "مشاهده تیکت",
  },
  {
    id: 4,
    type: "order",
    title: "سفارش شما ارسال شد",
    description: "سفارش ۴۵۲۱۹-۸ امروز تحویل پست داده شد.",
    time: "۱۰ دقیقه پیش",
    date: "۱۴۰۳/۱۰/۲۴",
    isPinned: false,
    isRead: false,
    actionUrl: "/dashboard/orders/45220",
    actionText: "مشاهده سفارش",
  },
];

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
      // Sort: pinned first, then by id
      return updated.sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
      });
    });
    toast.success("وضعیت پین تغییر کرد");
  };

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="اعلانها"
        description="تمام اعلان های مربوط به سفارشها، تیکت ها، کیف پول و فعالیتهای حساب شما در این بخش نمایش داده میشوند."
      />

      {/* Action Buttons Section */}
      {notifications.length > 0 && (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={handleDeleteAll}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-900/20 border-red-500 dark:border-red-400"
            >
              <Trash size={18} />
              حذف همه اعلانها
            </Button>
            <Button variant="outline" onClick={handleMarkAllAsRead} className="gap-2">
              <TickCircle size={18} />
              علامت گذاری همه به عنوان خوانده شده
            </Button>
          </div>
        </div>
      )}

      {/* Filters Section */}
      {notifications.length > 0 && (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <NotificationsFilter filters={filters} onFiltersChange={setFilters} />
        </div>
      )}

      {/* Notifications List */}
      {notifications.length === 0 ? (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-gray-500 dark:text-gray-400">هیچ اعلانی وجود ندارد</p>
        </div>
      ) : (
        <div className="space-y-4">
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
    </>
  );
}
