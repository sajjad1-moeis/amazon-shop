"use client";

import React from "react";
import StatusBadge from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InvoicesTable({ invoices, onView }) {
  // StatusBadge component is used instead

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden bg-white dark:bg-dark-box">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-field/50">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              شماره فاکتور
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              شماره سفارش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              نوع سفارش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              مبلغ فاکتور
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              تاریخ صدور
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              وضعیت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm whitespace-nowrap text-gray-500 dark:text-dark-text">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-dark-text">
                فاکتوری یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                className={cn(
                  "bg-white dark:bg-dark-box hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                  index === invoices.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">
                  {invoice.invoiceNumber || invoice.id}
                </TableCell>
                <TableCell className="text-sm text-yellow-600 dark:text-yellow-400 py-4 px-4">
                  {invoice.orderNumber}
                </TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">
                  {invoice.orderType || "-"}
                </TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">
                  {invoice.amount ? `${invoice.amount} تومان` : "-"}
                </TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">
                  {invoice.issueDate || invoice.date}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <StatusBadge status={invoice.status} />
                </TableCell>
                <TableCell className="py-4 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onView?.(invoice.id)}
                    className="bg-gray-100 hover:bg-whitespace-nowrap text-gray-500 dark:bg-dark-field dark:hover:bg-dark-field/80 dark:text-dark-text border-gray-200 dark:border-dark-stroke rounded-lg text-sm font-medium px-4 py-2"
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
