"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TickCircle } from "iconsax-reactjs";

export default function ContactDetailHeader({ isRead, onMarkAsRead, markAsReadLoading }) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-700">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">جزئیات درخواست ارتباط با ما</h1>
        <div className="flex items-center gap-2 mt-2">
          <Badge
            variant="outline"
            className={
              isRead
                ? "bg-green-500/20 text-green-400 border-green-500/30"
                : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
            }
          >
            {isRead ? "خوانده شده" : "خوانده نشده"}
          </Badge>
        </div>
      </div>
      <div className="flex gap-2">
        {!isRead && (
          <Button onClick={onMarkAsRead} disabled={markAsReadLoading} className="bg-green-600 hover:bg-green-700">
            <TickCircle size={18} className="ml-2" />
            {markAsReadLoading ? "در حال پردازش..." : "علامت‌گذاری به عنوان خوانده شده"}
          </Button>
        )}
        <Button variant="outline" onClick={() => router.push("/admin/contact-us")}>
          بازگشت به لیست
        </Button>
      </div>
    </div>
  );
}






