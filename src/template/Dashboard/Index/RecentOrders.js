"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RecentOrderTimeline from "./RecentOrderTimeline";
import ViewAllTable from "@/components/ViewAllTable";
import Link from "next/link";
import { userDashboardService } from "@/services/userDashboard/userDashboardService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function formatOrderStatus(status) {
  const map = { pending: "در انتظار", processing: "در حال پردازش", shipped: "ارسال شده", delivered: "تحویل داده شده", cancelled: "لغو شده" };
  return map[status] || status || "-";
}

function formatDate(val) {
  if (!val) return "-";
  try {
    const d = new Date(val);
    return d.toLocaleDateString("fa-IR");
  } catch {
    return String(val);
  }
}

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    userDashboardService
      .getRecentOrders(5)
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        setOrders(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setOrders([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  const firstOrder = orders[0];
  const otherOrders = orders.slice(1);

  if (loading) {
    return (
      <div className="shadow-box rounded-2xl p-3 bg-white dark:bg-dark-box">
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="shadow-box rounded-2xl p-3 bg-white dark:bg-dark-box">
      <div>
        <h3 className="text-gray-800 dark:text-dark-titre md:text-lg">سفارش‌های اخیر</h3>
        <p className="text-xs md:text-sm text-gray-500 dark:text-caption mt-2">آخرین سفارش‌هایی که ثبت کرده‌اید</p>
      </div>
      {firstOrder && (
        <RecentOrderTimeline
          order={{
            orderNumber: firstOrder.orderNumber ?? firstOrder.id,
            orderDate: formatDate(firstOrder.orderDate ?? firstOrder.createdAt),
            status: firstOrder.status ?? "processing",
            totalAmount: firstOrder.totalAmount ?? firstOrder.amount ?? "۰",
            timeline: firstOrder.timeline,
          }}
        />
      )}

      <div className="bg-white dark:bg-dark-box rounded-2xl p-3">
        <div className="flex-between mb-4 md:mb-6">
          <h3 className="text-sm md:text-lg text-gray-700 dark:text-dark-titre">دیگر سفارش‌ها</h3>
          <Link href="/dashboard/orders" className="max-md:text-sm text-yellow-600">
            مشاهده همه سفارش ها
          </Link>
        </div>

        {otherOrders.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-dark-text py-4">سفارش دیگری وجود ندارد</p>
        ) : (
          <div className="block overflow-auto border border-gray-200 dark:border-dark-stroke rounded-lg">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-dark-stroke text-gray-500 dark:text-dark-text">
                <tr className="border-b border-gray-200 dark:border-dark-stroke">
                  <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin first:rounded-tr-lg">شماره</th>
                  <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin">تاریخ</th>
                  <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin">مبلغ</th>
                  <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin">وضعیت</th>
                  <th className="text-right whitespace-nowrap py-3 px-4 text-sm font-thin last:rounded-tl-lg">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {otherOrders.map((order, index) => (
                  <tr
                    key={order.id}
                    className={cn(
                      "border-b border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-white/5",
                      index === otherOrders.length - 1 && "last:border-b-0"
                    )}
                  >
                    <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-900 dark:text-dark-titre">
                      {order.orderNumber ?? order.id}
                    </td>
                    <td className="py-4 whitespace-nowrap px-4 text-sm text-gray-600 dark:text-dark-text">
                      {formatDate(order.orderDate ?? order.createdAt)}
                    </td>
                    <td className="py-4 whitespace-nowrap px-4 text-sm font-medium text-gray-900 dark:text-dark-titre">
                      {order.totalAmount ?? order.amount ?? "-"}
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {formatOrderStatus(order.status)}
                      </span>
                    </td>
                    <td className="py-4 whitespace-nowrap px-4">
                      <Link href={`/dashboard/orders/${order.id}`}>
                        <Button
                          variant="ghost"
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium text-white bg-primary-700 dark:bg-dark-primary dark:text-white"
                        >
                          پیگیری سفارش
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ViewAllTable />
    </div>
  );
}
