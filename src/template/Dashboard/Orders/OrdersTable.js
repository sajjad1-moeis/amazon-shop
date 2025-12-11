"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";

export default function OrdersTable({ orders }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "processing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال پردازش
          </span>
        );
      case "shipped":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
            ارسال شده
          </span>
        );
      case "delivered":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تحویل داده شده
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            لغو شده
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
          <TableRow className="border-b border-gray-200 dark:border-gray-700">
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 first:rounded-tr-lg">
              شماره سفارش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              تاریخ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              تعداد آیتم
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              مبلغ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              وضعیت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 last:rounded-tl-lg">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                سفارشی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
              <TableRow
                key={order.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                  index === orders.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4 font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                  {order.date}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                  {order.items} آیتم
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                  {order.amount}
                </TableCell>
                <TableCell className="py-4 px-4">{getStatusBadge(order.status)}</TableCell>
                <TableCell className="py-4 px-4">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      مشاهده
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

