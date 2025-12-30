"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

const transactions = [
  {
    id: "TRX-001",
    type: "charge",
    amount: "۵۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۰۹ - ۰۹:۱۲",
    description: "پرداخت آنلاین",
    status: "reviewing",
  },
  {
    id: "TRX-002",
    type: "withdraw",
    amount: "۳۰۰,۰۰۰",
    date: "۱۴۰۳/۱۰/۰۸ - ۱۲:۴۲",
    description: "انتقال به شماره شبا",
    status: "answered",
  },
];

export default function TransactionsTable() {
  const getTypeLabel = (type) => {
    switch (type) {
      case "charge":
        return "شارژ کیف پول";
      case "withdraw":
        return "برداشت";
      case "payment":
        return "پرداخت";
      default:
        return type;
    }
  };

  // StatusBadge component is used instead

  const getAmountColor = (type) => {
    switch (type) {
      case "charge":
        return "text-green-600 dark:text-green-400";
      case "withdraw":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-900 dark:text-dark-title";
    }
  };

  const getAmountSign = (type) => {
    switch (type) {
      case "charge":
        return "+";
      case "withdraw":
        return "-";
      default:
        return "";
    }
  };

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-stroke">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm  text-gray-700 dark:text-dark-text first:rounded-tr-lg">
              نوع تراکنش
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm  text-gray-700 dark:text-dark-text">مبلغ</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm  text-gray-700 dark:text-dark-text">
              ساعت_تاریخ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm  text-gray-700 dark:text-dark-text">توضیحات</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm  text-gray-700 dark:text-dark-text last:rounded-tl-lg">
              وضعیت
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-dark-text">
                تراکنشی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((transaction, index) => (
              <TableRow
                key={transaction.id}
                className={cn(
                  "hover:bg-gray-50  dark:bg-white/5 dark:hover:bg-dark-field/50 transition-colors",
                  index === transactions.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">
                  {getTypeLabel(transaction.type)}
                </TableCell>
                <TableCell className={cn("text-sm font-medium py-4 px-4", getAmountColor(transaction.type))}>
                  {getAmountSign(transaction.type)}
                  {transaction.amount} تومان
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {transaction.description}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <StatusBadge status={transaction.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
