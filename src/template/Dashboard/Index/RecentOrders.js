"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import RecentOrderTimeline from "./RecentOrderTimeline";
import {
  TickCircle,
  CardTick1,
  Shop,
  BoxTick,
  Send2,
  Truck,
  TickSquare,
} from "iconsax-reactjs";

// داده نمونه برای سفارش اخیر با تایم‌لاین کامل
const recentOrderWithTimeline = {
  orderNumber: "۱۲۴۴",
  orderDate: "۱۴۰۳/۱۰/۱۸",
  status: "to-iran",
  totalAmount: "۴,۲۸۰,۰۰۰",
  timeline: {
    currentStepIndex: 5,
    steps: [
      { id: "order", label: "ثبت سفارش", Icon: TickCircle },
      { id: "payment", label: "پرداخت موفق", Icon: CardTick1 },
      { id: "purchase", label: "خرید از فروشنده", Icon: Shop },
      { id: "dubai", label: "رسید به انبار دبی", Icon: BoxTick },
      { id: "to-iran", label: "ارسال به ایران", Icon: Send2 },
      { id: "clearance", label: "ترخیص", Icon: Truck },
      { id: "delivery", label: "تحویل مشتری", Icon: TickSquare },
    ],
  },
};

const otherOrders = [
  {
    id: "۱۲۳۴۴",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "در مسیر ایران",
    statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "۱۲۳۴۵",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "تحویل داده شده",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
];

export default function RecentOrders() {
  return (
    <>
      {/* سفارش اخیر با تایم‌لاین */}
      <RecentOrderTimeline order={recentOrderWithTimeline} />

      {/* دکمه مشاهده همه سفارش‌ها */}
      <div className="mb-6">
        <Button
          variant="ghost"
          className="text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 text-sm sm:text-base"
        >
          مشاهده همه سفارش‌ها
        </Button>
      </div>

      {/* جدول سفارش‌های دیگر */}
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mb-6">
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg text-gray-700 dark:text-dark-title mb-2">دیگر سفارش‌ها</h3>
        </div>

        {/* Desktop Table */}
        <div className="block overflow-x-auto border border-gray-200 dark:border-dark-stroke rounded-lg">
          <table className="w-full min-w-[600px]">
            <thead className="bg-gray-50 dark:bg-dark-field/50">
              <tr className="border-b border-gray-200 dark:border-dark-stroke">
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text first:rounded-tr-lg">
                  شماره
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                  تاریخ
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">مبلغ</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
                  وضعیت
                </th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text last:rounded-tl-lg">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {otherOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-b border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                    index === otherOrders.length - 1 && "last:border-b-0"
                  )}
                >
                  <td
                    className={cn(
                      "py-4 px-4 text-sm text-gray-900 dark:text-dark-title",
                      index === otherOrders.length - 1 && "first:rounded-br-lg"
                    )}
                  >
                    {order.id}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600 dark:text-dark-text">{order.date}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-dark-title">{order.amount}</td>
                  <td className="py-4 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium",
                        order.statusColor
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className={cn("py-4 px-4", index === otherOrders.length - 1 && "last:rounded-bl-lg")}>
                    <button className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-dark-field dark:text-dark-text dark:hover:bg-gray-600 transition-colors">
                      <Eye className="h-4 w-4" />
                      پیگیری سفارش
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
