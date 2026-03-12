"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Notification, Add, TickCircle, NotificationBing } from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/contexts/AuthContext";
import { notificationService } from "@/services/notification/notificationService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import AdminPagination from "@/components/ui/AdminPagination";
import { formatDateTimeFa } from "@/utils/adminDateUtils";
import CreateNotificationModal from "@/template/Admin/notifications/CreateNotificationModal";
import { cn } from "@/lib/utils";

export default function NotificationsPage() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const fetchNotifications = async () => {
    if (userId == null) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await notificationService.getPaginated({
        userId,
        pageNumber,
        pageSize,
      });
      const data = unwrapApiData(response);
      const list = data?.notifications ?? (Array.isArray(data) ? data : []);
      setNotifications(Array.isArray(list) ? list : []);
      setTotalPages(Math.max(1, data?.totalPages ?? 1));
    } catch (error) {
      toast.error(error.message || "خطا در دریافت اعلان‌ها");
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [pageNumber, userId]);

  const handleMarkAsRead = async (id) => {
    if (userId == null) return;
    try {
      await notificationService.markAsRead(id, userId);
      fetchNotifications();
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی اعلان");
    }
  };

  const handleCreateNotification = async (body) => {
    try {
      await notificationService.create(body);
      toast.success("اعلان با موفقیت ارسال شد");
      setCreateModalOpen(false);
      fetchNotifications();
    } catch (error) {
      toast.error(error.message || "خطا در ارسال اعلان");
      throw error;
    }
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Hero */}
      <div className="relative rounded-2xl border border-gray-600/80 bg-gradient-to-br from-gray-700/60 via-gray-800/40 to-gray-900/30 p-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/20">
              <Notification size={28} className="text-red-400" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-0.5">اعلان‌ها</h1>
              <p className="text-gray-400 text-sm">مدیریت و مشاهده اعلان‌های سیستم</p>
            </div>
          </div>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-red-600 hover:bg-red-700 text-white shrink-0"
          >
            <Add size={18} className="ml-1" />
            ارسال اعلان
          </Button>
        </div>
      </div>

      <CreateNotificationModal
        open={createModalOpen}
        onOpenChange={setCreateModalOpen}
        onSubmit={handleCreateNotification}
      />

      <AdminSectionCard title="اعلان‌های اخیر">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Spinner size="lg" />
            <p className="mt-3 text-sm">در حال بارگذاری...</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <NotificationBing size={48} className="mb-3 opacity-40" />
            <p className="text-sm">هیچ اعلانی وجود ندارد</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-600/80">
            <div className="divide-y divide-gray-600/60">
              {notifications.map((notif) => {
                const title = notif.title || notif.subject || "—";
                const message = notif.message || notif.content || notif.body || "—";
                const isUnread = !notif.isRead;

                return (
                  <div
                    key={notif.id}
                    className={cn(
                      "flex items-start gap-4 p-5 transition-colors hover:bg-gray-700/20",
                      isUnread && "bg-red-500/5"
                    )}
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-600/50 flex items-center justify-center shrink-0 mt-0.5">
                      <Notification
                        size={20}
                        className={isUnread ? "text-red-400" : "text-gray-400"}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3
                          className={cn(
                            "font-semibold line-clamp-1",
                            isUnread ? "text-white" : "text-gray-300"
                          )}
                          title={title}
                        >
                          {title}
                        </h3>
                        {isUnread && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
                            جدید
                          </span>
                        )}
                      </div>
                      <p
                        className="text-gray-400 text-sm line-clamp-2 leading-relaxed"
                        title={message}
                      >
                        {message}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        {notif.createdAt ? formatDateTimeFa(notif.createdAt) : notif.date || "—"}
                      </p>
                    </div>
                    {isUnread && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="shrink-0 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10"
                      >
                        <TickCircle size={18} className="ml-1" />
                        خوانده شد
                      </Button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {!loading && notifications.length > 0 && (
          <div className="pt-4 mt-4 border-t border-gray-600">
            <AdminPagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={setPageNumber}
            />
          </div>
        )}
      </AdminSectionCard>
    </div>
  );
}
