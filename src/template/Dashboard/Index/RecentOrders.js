"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import RecentOrderTimeline from "./RecentOrderTimeline";
import { TickCircle, CardTick1, Shop, BoxTick, Send2, Truck, TickSquare } from "iconsax-reactjs";

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
    <div className="shadow-box rounded-2xl p-3 bg-white dark:bg-dark-box">
      <div class="">
        <h3 className="text-gray-800 dark:text-dark-titre text-lg">سفارش‌های اخیر</h3>
        <p className="text-sm text-gray-500 dark:text-caption mt-2">آخرین سفارش‌هایی که ثبت کرده‌اید</p>
      </div>
      {/* سفارش اخیر با تایم‌لاین */}
      <RecentOrderTimeline order={recentOrderWithTimeline} />

      {/* جدول سفارش‌های دیگر */}
      <div className="bg-white dark:bg-dark-box rounded-2xl p-3 mb-6">
        <div className="mb-4 md:mb-6">
          <h3 className="text-lg text-gray-700  dark:text-dark-titre mb-2">دیگر سفارش‌ها</h3>
        </div>

        {/* Desktop Table */}
        <div className="block overflow-auto border border-gray-200 dark:border-dark-stroke rounded-lg">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-stroke text-gray-500 dark:text-dark-text">
              <tr className="border-b border-gray-200 dark:border-dark-stroke">
                <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin  first:rounded-tr-lg">شماره</th>
                <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin ">تاریخ</th>
                <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin  ">مبلغ</th>
                <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin  ">وضعیت</th>
                <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin   last:rounded-tl-lg">
                  عملیات
                </th>
              </tr>
            </thead>
            <tbody>
              {otherOrders.map((order, index) => (
                <tr
                  key={order.id}
                  className={cn(
                    "border-b border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-dark-field/50 transition-colors",
                    index === otherOrders.length - 1 && "last:border-b-0"
                  )}
                >
                  <td
                    className={cn(
                      "py-4 whitespace-nowrap px-4 text-sm text-gray-900 dark:text-dark-titre",
                      index === otherOrders.length - 1 && "first:rounded-br-lg"
                    )}
                  >
                    {order.id}
                  </td>
                  <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-600 dark:text-dark-text">
                    {order.date}
                  </td>
                  <td className="py-4 whitespace-nowrap px-4 text-sm font-medium text-gray-900 dark:text-dark-titre">
                    {order.amount}
                  </td>
                  <td className="py-4 whitespace-nowrap px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-3 py-1 rounded-md text-xs font-medium",
                        order.statusColor
                      )}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td
                    className={cn(
                      "py-4 whitespace-nowrap px-4",
                      index === otherOrders.length - 1 && "last:rounded-bl-lg"
                    )}
                  >
                    <Button
                      varant="ghost"
                      className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium text-white bg-primary-700 dark:bg-dark-primary   dark:text-white  "
                    >
                      پیگیری سفارش
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
