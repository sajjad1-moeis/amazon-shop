"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DocumentDownload, Eye } from "iconsax-reactjs";

export default function InvoicesTable({ invoices, onDownload, onView }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            پرداخت شده
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            در انتظار پرداخت
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-field/50">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text first:rounded-tr-lg">
              شماره فاکتور
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              شماره سفارش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              تاریخ
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
          {invoices.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-dark-text">
                فاکتوری یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            invoices.map((invoice, index) => (
              <TableRow
                key={invoice.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                  index === invoices.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4 font-medium">
                  {invoice.id}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {invoice.orderNumber}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">{invoice.date}</TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-title py-4 px-4">
                  {invoice.amount}
                </TableCell>
                <TableCell className="py-4 px-4">{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDownload?.(invoice.id)}
                      className="gap-2 text-xs"
                    >
                      <DocumentDownload className="h-4 w-4" />
                      <span className="hidden sm:inline">دانلود</span>
                      <span className="sm:hidden">↓</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => onView?.(invoice.id)} className="gap-2 text-xs">
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">مشاهده</span>
                      <span className="sm:hidden">👁</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
