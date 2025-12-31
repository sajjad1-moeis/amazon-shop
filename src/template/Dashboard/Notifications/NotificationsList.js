"use client";

import React, { useState } from "react";
import NotificationsFilter from "./NotificationsFilter";
import NotificationCard from "./NotificationCard";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "../Common/PageHeader";

// Mock data - should be replaced with API call
const initialNotifications = [
  {
    id: 1,
    type: "order",
    title: "سفارش شما تحویل داده شد",
    description: "سفارش شماره #12345 با موفقیت به آدرس شما تحویل داده شد. لطفاً در صورت رضایت، نظر خود را ثبت کنید.",
    time: "۲ ساعت پیش",
    actionUrl: "/dashboard/orders/12345",
    actionText: "مشاهده سفارش",
    isRead: false,
    isPinned: true,
  },
  {
    id: 2,
    type: "ticket",
    title: "پاسخ جدید به تیکت شما",
    description: "پشتیبانی به تیکت شماره #789 پاسخ داده است. لطفاً پاسخ را بررسی کنید.",
    time: "۵ ساعت پیش",
    actionUrl: "/dashboard/support/789",
    actionText: "مشاهده تیکت",
    isRead: false,
    isPinned: false,
  },

  {
    id: 4,
    type: "wallet",
    title: "شارژ کیف پول",
    description: "مبلغ ۵۰۰,۰۰۰ تومان به کیف پول شما اضافه شد. موجودی فعلی: ۱,۲۰۰,۰۰۰ تومان",
    time: "۲ روز پیش",
    actionUrl: "/dashboard/wallet",
    actionText: "مشاهده کیف پول",
    isRead: true,
    isPinned: false,
  },
  {
    id: 5,
    type: "ticket",
    title: "تیکت شما بسته شد",
    description: "تیکت شماره #788 با رضایت شما بسته شد. در صورت نیاز می‌توانید تیکت جدیدی ایجاد کنید.",
    time: "۳ روز پیش",
    actionUrl: "/dashboard/support",
    actionText: "مشاهده تیکت‌ها",
    isRead: true,
    isPinned: false,
  },
  {
    id: 6,
    type: "order",
    title: "سفارش شما ارسال شد",
    description: "سفارش شماره #12347 با کد پیگیری 1234567890 ارسال شد. می‌توانید وضعیت آن را پیگیری کنید.",
    time: "۴ روز پیش",
    actionUrl: "/dashboard/orders/12347",
    actionText: "پیگیری سفارش",
    isRead: false,
    isPinned: false,
  },
  {
    id: 7,
    type: "currency",
    title: "درخواست خدمات ارزی",
    description: "درخواست شما برای تبدیل ارز با موفقیت ثبت شد. کارشناسان ما در حال بررسی هستند.",
    time: "۵ روز پیش",
    actionUrl: "/dashboard/currency-services",
    actionText: "مشاهده درخواست",
    isRead: true,
    isPinned: false,
  },
  {
    id: 8,
    type: "wallet",
    title: "برداشت از کیف پول",
    description: "مبلغ ۲۰۰,۰۰۰ تومان از کیف پول شما برداشت شد. موجودی فعلی: ۷۰۰,۰۰۰ تومان",
    time: "۱ هفته پیش",
    actionUrl: "/dashboard/wallet",
    actionText: "مشاهده تراکنش‌ها",
    isRead: true,
    isPinned: false,
  },
];
import ConfirmDialog from "@/components/ConfirmDialog";

export default function NotificationsList() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filters, setFilters] = useState({
    timeRange: "",
    status: "",
    category: "",
    allCategories: "",
    searchQuery: "",
  });
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

  const handleDelete = (notificationId) => {
    setNotifications(notifications.filter((n) => n.id !== notificationId));
    toast.success("اعلان حذف شد");
  };

  const handleDeleteAll = () => {
    setDeleteAllDialogOpen(true);
  };

  const handleDeleteAllConfirm = () => {
    setNotifications([]);
    setDeleteAllDialogOpen(false);
    toast.success("همه اعلان‌ها حذف شدند");
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

  const NotificationBtn = () => (
    <Button
      variant="outline"
      onClick={handleDeleteAll}
      className="gap-2 max-md:w-full text-red-600 dark:bg-dark-field dark:border-0 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-900/20 border-red-500 dark:border-red-400"
    >
      <Trash size={18} />
      حذف همه اعلانها
    </Button>
  );

  return (
    <div dir="rtl">
      {/* Header Section: Title and Action Buttons */}
      <PageHeader
        title={"اعلان ها"}
        description={
          "تمام اعلان‌های مربوط به سفارش‌ها، تیکت‌ها، کیف پول و فعالیت‌های حساب شما در این بخش نمایش داده می‌شوند."
        }
        actionButton={
          <div class="md:hidden">
            <NotificationBtn />
          </div>
        }
      >
        <div class="max-md:hidden">
          <NotificationBtn />
        </div>
      </PageHeader>
      <div className="bg-white dark:bg-dark-box p-3 sm:p-4 rounded-xl">
        <div className="mb-4 sm:mb-6">
          {/* Section Header */}
          <div className="flex-between gap-3 sm:gap-4 mb-3 sm:mb-4">
            {notifications.length > 0 && (
              <h2 className="text-base sm:text-lg text-gray-700 dark:text-dark-titre">لیست اعلانها</h2>
            )}
            <Button
              variant="ghost"
              onClick={handleMarkAllAsRead}
              className="gap-1 sm:gap-2 h-7 p-1 text-xs sm:text-sm text-primary-700 bg-transparent dark:text-primary-300"
            >
              علامت گذاری همه <span className="max-md:hidden">به عنوان خوانده شده</span>
            </Button>
          </div>
        </div>

        {notifications.length > 0 && <NotificationsFilter filters={filters} onFiltersChange={setFilters} />}

        {notifications.length === 0 ? (
          <div
            className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-6 sm:p-8 text-center mt-4 sm:mt-6"
            style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
          >
            <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ اعلانی وجود ندارد</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4 mt-4 sm:mt-6">
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

      <ConfirmDialog
        open={deleteAllDialogOpen}
        onOpenChange={setDeleteAllDialogOpen}
        title="حذف همه اعلان‌ها"
        description="آیا از حذف همه اعلان‌ها اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteAllConfirm}
      />
    </div>
  );
}
