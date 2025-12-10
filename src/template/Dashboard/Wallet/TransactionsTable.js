"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

const transactions = [
  {
    id: 1,
    type: "شارژ کیف پول",
    amount: "۵۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۰۹",
    time: "۰۹:۱۲",
    description: "پرداخت آنلاین",
    status: "reviewing",
    statusText: "در حال بررسی",
    isPositive: true,
  },
  {
    id: 2,
    type: "برداشت",
    amount: "۳۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۰۸",
    time: "۱۲:۴۲",
    description: "انتقال به شماره شبا",
    status: "completed",
    statusText: "تکمیل شده",
    isPositive: false,
  },
  {
    id: 3,
    type: "شارژ کیف پول",
    amount: "۱,۲۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۰۷",
    time: "۱۴:۳۰",
    description: "پرداخت آنلاین",
    status: "completed",
    statusText: "تکمیل شده",
    isPositive: true,
  },
  {
    id: 4,
    type: "برداشت",
    amount: "۱۵۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۰۶",
    time: "۱۰:۱۵",
    description: "انتقال به شماره شبا",
    status: "reviewing",
    statusText: "در حال بررسی",
    isPositive: false,
  },
];

export default function TransactionsTable() {
  const getStatusBadge = (status) => {
    switch (status) {
      case "reviewing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تکمیل شده
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
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-gray-700/50">
          <TableRow className="border-b border-gray-200 dark:border-gray-700">
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 first:rounded-tr-lg">
              نوع تراکنش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              مبلغ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              ساعت/تاریخ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              توضیحات
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 last:rounded-tl-lg">
              وضعیت
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              className={cn(
                "border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                index === transactions.length - 1 && "last:border-b-0"
              )}
            >
              <TableCell className={cn("py-4 px-4 text-sm text-gray-900 dark:text-white", index === transactions.length - 1 && "first:rounded-br-lg")}>
                {transaction.type}
              </TableCell>
              <TableCell className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      transaction.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {transaction.isPositive ? "+" : "-"}
                    {transaction.amount} تومان
                  </span>
                </div>
              </TableCell>
              <TableCell className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                {transaction.date} - {transaction.time}
              </TableCell>
              <TableCell className="py-4 px-4 text-sm text-gray-600 dark:text-gray-400">
                {transaction.description}
              </TableCell>
              <TableCell className={cn("py-4 px-4", index === transactions.length - 1 && "last:rounded-bl-lg")}>
                {getStatusBadge(transaction.status)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

