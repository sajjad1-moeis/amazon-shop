"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ExclusiveAmazonTable({ orders }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            در انتظار بررسی
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تأیید شده
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            رد شده
          </span>
        );
      case "processing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال پردازش
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-dark-field/50">
            <TableHead className="text-right first:rounded-tr-lg">شماره سفارش</TableHead>
            <TableHead className="text-right">ASIN/لینک</TableHead>
            <TableHead className="text-right">مبلغ نهایی</TableHead>
            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right">آخرین بروزرسانی</TableHead>
            <TableHead className="text-right last:rounded-tl-lg">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-dark-text">
                موردی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order, index) => (
              <TableRow
                key={order.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                  index === orders.length - 1 && "last:border-b-0"
                )}
              >
                {/* Order Number */}
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">
                  #{order.orderNumber}
                </TableCell>

                {/* ASIN/Link */}
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">
                  {order.asin}
                </TableCell>

                {/* Final Amount */}
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">
                  {order.finalAmount} تومان
                </TableCell>

                {/* Status */}
                <TableCell>{getStatusBadge(order.status)}</TableCell>

                {/* Last Update */}
                <TableCell className="text-sm text-gray-600 dark:text-dark-text">
                  {order.lastUpdate}
                </TableCell>

                {/* Operations */}
                <TableCell>
                  <Link href="#">
                    <Button variant="outline" size="sm" className="gap-2">
                      مشاهده جزئیات
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


