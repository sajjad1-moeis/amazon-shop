"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { notificationService } from "@/services/notification/notificationService";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await notificationService.getPaginated({
        pageNumber,
        pageSize,
      });

      if (response.success && response.data) {
        setNotifications(response.data.notifications || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت اعلان‌ها");
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [pageNumber]);

  const handleMarkAsRead = async (id) => {
    try {
      const response = await notificationService.markAsRead(id);
      if (response.success) {
        fetchNotifications();
      }
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی اعلان");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">اعلان‌ها</h1>
        <p className="text-gray-400">مدیریت اعلان‌های سیستم</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">اعلان‌های اخیر</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-lg border ${
                      notif.isRead ? "bg-gray-700/50 border-gray-600" : "bg-gray-700 border-gray-500"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-white font-medium">{notif.title || notif.subject || "-"}</h3>
                          {!notif.isRead && <Badge variant="default">جدید</Badge>}
                        </div>
                        <p className="text-gray-400 text-sm">{notif.message || notif.content || notif.body || "-"}</p>
                        <p className="text-gray-500 text-xs mt-2">
                          {notif.createdAt
                            ? new Date(notif.createdAt).toLocaleDateString("fa-IR")
                            : notif.date || "-"}
                        </p>
                      </div>
                      {!notif.isRead && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notif.id)}
                          className="text-green-400 hover:text-green-300"
                        >
                          خوانده شد
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-gray-700">
                <AdminPagination
                  currentPage={pageNumber}
                  totalPages={totalPages}
                  onPageChange={setPageNumber}
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

