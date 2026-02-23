"use client";

import React, { useState, useEffect } from "react";
import NotificationsFilter from "./NotificationsFilter";
import NotificationCard from "./NotificationCard";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "../Common/PageHeader";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useAuth } from "@/contexts/AuthContext";
import { notificationService } from "@/services/notification/notificationService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function mapNotification(notif) {
  return {
    id: notif.id,
    type: notif.type ?? "general",
    title: notif.title ?? notif.subject ?? "-",
    description: notif.message ?? notif.content ?? notif.body ?? "",
    time: notif.createdAt ? new Date(notif.createdAt).toLocaleDateString("fa-IR") : "",
    actionUrl: notif.actionUrl ?? notif.link ?? "#",
    actionText: notif.actionText ?? "مشاهده",
    isRead: notif.isRead ?? notif.read ?? false,
    isPinned: notif.isPinned ?? false,
  };
}

export default function NotificationsList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    timeRange: "",
    status: "",
    category: "",
    allCategories: "",
    searchQuery: "",
  });
  const [deleteAllDialogOpen, setDeleteAllDialogOpen] = useState(false);

  const fetchNotifications = () => {
    if (userId == null) return;
    setLoading(true);
    notificationService
      .getNotifications({ userId, pageNumber: 1, pageSize: 20, onlyUnread: filters.status === "unread" })
      .then((res) => {
        const data = unwrapApiData(res);
        const list = data?.notifications ?? data ?? [];
        setNotifications(Array.isArray(list) ? list.map(mapNotification) : []);
      })
      .catch(() => setNotifications([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, [userId, filters.status]);

  const handleDelete = async (notificationId) => {
    if (userId == null) return;
    try {
      await notificationService.delete(notificationId, userId);
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
      toast.success("اعلان حذف شد");
    } catch (e) {
      toast.error(e?.message ?? "خطا در حذف اعلان");
    }
  };

  const handleDeleteAll = () => setDeleteAllDialogOpen(true);

  const handleDeleteAllConfirm = () => {
    setDeleteAllDialogOpen(false);
    setNotifications([]);
    toast.success("همه اعلان‌ها حذف شدند");
  };

  const handleMarkAllAsRead = async () => {
    if (userId == null) return;
    try {
      await notificationService.markAllAsRead(userId);
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      toast.success("همه اعلان‌ها به عنوان خوانده شده علامت گذاری شدند");
    } catch (e) {
      toast.error(e?.message ?? "خطا در به‌روزرسانی");
    }
  };

  const handlePinToggle = (notificationId) => {
    setNotifications((prev) => {
      const updated = prev.map((n) => (n.id === notificationId ? { ...n, isPinned: !n.isPinned } : n));
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

  if (userId == null) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده اعلان‌ها وارد شوید.</div>
    );
  }

  return (
    <div dir="rtl">
      {/* Header Section: Title and Action Buttons */}
      <PageHeader
        title={"اعلان ها"}
        description={
          "تمام اعلان‌های مربوط به سفارش‌ها، تیکت‌ها، کیف پول و فعالیت‌های حساب شما در این بخش نمایش داده می‌شوند."
        }
        actionButton={
          <div className="md:hidden">
            <NotificationBtn />
          </div>
        }
      >
        <div className="max-md:hidden">
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

        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : notifications.length === 0 ? (
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
