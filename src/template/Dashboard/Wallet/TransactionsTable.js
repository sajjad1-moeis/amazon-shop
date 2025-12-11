"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import DashboardLayout from "@/layout/DashboardLayout";

export default function TransactionsTable({ transactions }) {
  const getTypeBadge = (type) => {
    switch (type) {
      case "charge":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            شارژ
          </span>
        );
      case "withdraw":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            برداشت
          </span>
        );
      case "payment":
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            پرداخت
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تکمیل شده
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            در انتظار
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            ناموفق
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 first:rounded-tr-lg">
                شماره تراکنش
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                نوع
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                مبلغ
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                تاریخ
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
                وضعیت
              </TableHead>
              <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 last:rounded-tl-lg">
                توضیحات
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  تراکنشی یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              transactions?.map((transaction, index) => (
                <TableRow
                  key={transaction.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                    index === transactions.length - 1 && "last:border-b-0"
                  )}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4">{transaction.id}</TableCell>
                  <TableCell className="py-4 px-4">{getTypeBadge(transaction.type)}</TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                    {transaction.amount} تومان
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                    {transaction.date}
                  </TableCell>
                  <TableCell className="py-4 px-4">{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                    {transaction.description}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  );
}
