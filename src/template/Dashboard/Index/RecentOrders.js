"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "۱۲۳۴۴",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۸۰,۰۰۰ تومان",
    status: "در حال پردازش",
    statusColor: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    id: "۱۲۳۴۵",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۸۰,۰۰۰ تومان",
    status: "پرداخت شده",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 md:p-6 mb-6">
      <div className="mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">سفارش های اخیر</h3>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">آخرین سفارش هایی که ثبت کرده اید.</p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">شماره</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">تاریخ</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">مبلغ</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">وضعیت</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <td className="py-4 px-4 text-sm text-gray-900 dark:text-white">{order.id}</td>
                <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{order.amount}</td>
                <td className="py-4 px-4">
                  <span
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium",
                      order.statusColor
                    )}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    مشاهده
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">شماره سفارش:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{order.id}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">تاریخ:</span>
              <span className="text-sm text-gray-900 dark:text-white">{order.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">مبلغ:</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">{order.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">وضعیت:</span>
              <span
                className={cn("inline-flex items-center px-3 py-1 rounded-full text-xs font-medium", order.statusColor)}
              >
                {order.status}
              </span>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2">
              <Eye className="h-4 w-4" />
              مشاهده
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 md:mt-6 text-center">
        <Button
          variant="ghost"
          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
        >
          مشاهده همه سفارش ها
        </Button>
      </div>
    </div>
  );
}
