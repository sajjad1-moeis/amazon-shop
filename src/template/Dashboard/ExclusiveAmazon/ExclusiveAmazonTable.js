"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export default function ExclusiveAmazonTable({ orders }) {
  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-dark-stroke">
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
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">#{order.orderNumber}</TableCell>

                {/* ASIN/Link */}
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">{order.asin}</TableCell>

                {/* Final Amount */}
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">{order.finalAmount} تومان</TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={order.status} />
                </TableCell>

                {/* Last Update */}
                <TableCell className="text-sm text-gray-600 dark:text-dark-text">{order.lastUpdate}</TableCell>

                {/* Operations */}
                <TableCell>
                  <Link href="#">
                    <Button variant="secondary" size="sm" className="gap-2 bg-gray-100">
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
