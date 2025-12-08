"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, AlertCircle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const tickets = [
  {
    id: 1,
    title: "پاسخ داده شده",
    status: "answered",
    icon: CheckCircle2,
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950/30",
  },
  {
    id: 2,
    title: "در حال پردازش",
    status: "processing",
    icon: Clock,
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950/30",
    active: true,
  },
  {
    id: 3,
    title: "مشکل در پرداخت",
    status: "payment",
    icon: AlertCircle,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-50 dark:bg-orange-950/30",
    date: "۱۴۰۳/۱۰/۰۸",
  },
  {
    id: 4,
    title: "تاخیر در ارسال",
    status: "shipping",
    icon: Truck,
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950/30",
    date: "۱۴۰۳/۱۰/۰۹",
  },
];

export default function SupportTickets() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">آخرین تیکت های پشتیبانی</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">وضعیت آخرین درخواست های شما</p>
      </div>

      <div className="space-y-3 mb-4 md:mb-6">
        {tickets.map((ticket) => {
          const Icon = ticket.icon;
          return (
            <div
              key={ticket.id}
              className={cn(
                "flex items-center justify-between p-3 md:p-4 rounded-lg border transition-colors",
                ticket.active
                  ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                  : "bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              )}
            >
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-lg", ticket.bgColor)}>
                  <Icon className={cn("h-5 w-5", ticket.color)} />
                </div>
                <div>
                  <p className="text-sm md:text-base font-medium text-gray-900 dark:text-white">{ticket.title}</p>
                  {ticket.date && (
                    <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">{ticket.date}</p>
                  )}
                </div>
              </div>
              {ticket.active && (
                <Button size="sm" variant="default" className="text-xs md:text-sm">
                  مشاهده تیکت
                </Button>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
        <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
          نمایش
        </Button>
        <div className="text-center sm:text-right">
          <Button
            variant="ghost"
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
          >
            مشاهده همه تیکت ها
          </Button>
        </div>
      </div>
    </div>
  );
}
