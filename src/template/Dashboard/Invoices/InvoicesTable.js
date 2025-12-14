"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InvoicesTable({ invoices, onDownload, onView }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-100 text-green-600  ">
            پرداخت شده
          </button>
        );
      case "pending":
        return (
          <button className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-yellow-100 text-yellow-600 ">
            در انتظار پرداخت
          </button>
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
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">
              شماره فاکتور
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">شماره سفارش</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">نوع سفارش</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">مبلغ فاکتور</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">تاریخ صدور</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">وضعیت</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-700 dark:text-gray-300">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                فاکتوری یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice, index) => (
              <TableRow
                key={`${invoice.id}-${index}`}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                  index === invoices.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4 font-medium">
                  {invoice.id}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                  {invoice.orderNumber}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                  {invoice.orderType || "نماینده"}
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                  {invoice.amount} تومان
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">{invoice.date}</TableCell>
                <TableCell className="py-4 px-4">{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="py-4 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView?.(invoice.id)}
                    className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300  hover:bg-gray-100 dark:hover:bg-gray-600 text-sm h-8"
                  >
                    مشاهده فاکتور
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
