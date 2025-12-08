"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const mockNotifications = [
  { id: 1, title: "سفارش جدید", message: "سفارش جدید دریافت شد", type: "order", isRead: false, date: "1403/09/20" },
  { id: 2, title: "موجودی کم", message: "محصول لپ تاپ Dell موجودی کم دارد", type: "inventory", isRead: false, date: "1403/09/19" },
  { id: 3, title: "تیکت جدید", message: "تیکت جدید از کاربر علی محمدی", type: "ticket", isRead: true, date: "1403/09/18" },
];

export default function NotificationsPage() {
  const [notifications] = useState(mockNotifications);

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
                      <h3 className="text-white font-medium">{notif.title}</h3>
                      {!notif.isRead && <Badge variant="default">جدید</Badge>}
                    </div>
                    <p className="text-gray-400 text-sm">{notif.message}</p>
                    <p className="text-gray-500 text-xs mt-2">{notif.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

