import React from "react";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

const orders = [
  {
    id: "۱۲۳۴۴",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "در حال پردازش",
    statusColor: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: "۱۲۳۴۵",
    date: "۱۴۰۳/۱۰/۰۷",
    amount: "۸۹۰,۰۰۰ تومان",
    status: "پرداخت شده",
    statusColor: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  },
];

export default function RecentOrders() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-box p-3 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4 md:mb-6">
        <div>
          <h3 className="text-lg text-gray-700 dark:text-white mb-2">سفارش های اخیر</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">آخرین سفارش هایی که ثبت کرده اید.</p>
        </div>
        <Button
          variant="ghost"
          className="text-yellow-600 dark:text-blue-400 hover:text-yellow-500 dark:hover:text-blue-300 text-sm sm:text-base"
        >
          مشاهده همه سفارشها
        </Button>
      </div>

      {/* Desktop Table */}
      <div className="block overflow-x-auto border border-gray-200 dark:border-gray-700 rounded-lg">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 dark:bg-gray-700/50">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 first:rounded-tr-lg">
                شماره
              </th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">تاریخ</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">مبلغ</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">وضعیت</th>
              <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 last:rounded-tl-lg">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={cn(
                  "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                  index === orders.length - 1 && "last:border-b-0"
                )}
              >
                <td
                  className={cn(
                    "py-4 px-4 text-sm text-gray-900 dark:text-white",
                    index === orders.length - 1 && "first:rounded-br-lg"
                  )}
                >
                  {order.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">{order.date}</td>
                <td className="py-4 px-4 text-sm font-medium text-gray-900 dark:text-white">{order.amount}</td>
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
                <td className={cn("py-4 px-4", index === orders.length - 1 && "last:rounded-bl-lg")}>
                  <button className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors">
                    <Eye className="h-4 w-4" />
                    مشاهده
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
