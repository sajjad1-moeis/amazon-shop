"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Eye } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/StatusBadge";

export default function OrdersTable({ orders }) {
  // StatusBadge component is used instead

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-field/50">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text first:rounded-tr-lg">
              شماره سفارش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              تاریخ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              تعداد آیتم
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              مبلغ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              وضعیت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text last:rounded-tl-lg">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-dark-text">
                سفارشی یافت نشد
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
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4 font-medium">
                  {order.orderNumber}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {order.date}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {order.items} آیتم
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-title py-4 px-4">
                  {order.amount}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <StatusBadge status={order.status} variant="rounded-full" />
                </TableCell>
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

