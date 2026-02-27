"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

const fallbackTransactions = [
  {
    id: "TRX-001",
    type: "charge",
    amount: 500000,
    date: "۱۴۰۳/۱۰/۰۹ - ۰۹:۱۲",
    description: "پرداخت آنلاین",
    status: "reviewing",
  },
  {
    id: "TRX-002",
    type: "withdraw",
    amount: 300000,
    date: "۱۴۰۳/۱۰/۰۸ - ۱۲:۴۲",
    description: "انتقال به شماره شبا",
    status: "answered",
  },
];

export default function TransactionsTable({ transactions = fallbackTransactions }) {
  const normalizeType = (type) => {
    if (type === 1 || type === "1") return "charge";
    if (type === 2 || type === "2") return "withdraw";
    if (type === 3 || type === "3") return "refund";
    if (type === 4 || type === "4") return "reward";
    if (type === 5 || type === "5") return "discount";
    return String(type || "").toLowerCase();
  };

  const getTypeLabel = (type) => {
    const t = normalizeType(type);
    switch (t) {
      case "charge":
        return "شارژ کیف پول";
      case "withdraw":
        return "برداشت";
      case "payment":
        return "پرداخت";
      case "refund":
        return "بازگشت وجه";
      case "reward":
        return "پاداش";
      case "discount":
        return "تخفیف";
      default:
        return t || "-";
    }
  };

  const getAmountColor = (type) => {
    const t = normalizeType(type);
    switch (t) {
      case "charge":
      case "refund":
      case "reward":
        return "text-green-600 dark:text-green-400";
      case "withdraw":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-900 dark:text-dark-title";
    }
  };

  const getAmountSign = (type) => {
    const t = normalizeType(type);
    switch (t) {
      case "charge":
      case "refund":
      case "reward":
        return "+";
      case "withdraw":
        return "-";
      default:
        return "";
    }
  };

  const formatAmount = (val) => {
    if (val == null) return "۰";
    const n = typeof val === "number" ? val : Number(val);
    if (!Number.isFinite(n)) return String(val);
    return n.toLocaleString("fa-IR");
  };

  const formatDate = (val) => {
    if (!val) return "-";
    if (val instanceof Date) return val.toLocaleString("fa-IR");
    try {
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        return `${d.toLocaleDateString("fa-IR")} - ${d.toLocaleTimeString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        })}`;
      }
    } catch {
      // ignore
    }
    return String(val);
  };

  return (
    <div className "border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
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
                <TableCell className="text-sm text-gray-900 dark:text-dark-titre py-4 px-4">
                  {getTypeLabel(transaction.type ?? transaction.transactionType)}
                </TableCell>
                <TableCell
                  className={cn(
                    "text-sm font-medium py-4 px-4",
                    getAmountColor(transaction.type ?? transaction.transactionType)
                  )}
                >
                  {getAmountSign(transaction.type ?? transaction.transactionType)}
                  {formatAmount(transaction.amount ?? transaction.value)} تومان
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {formatDate(transaction.date ?? transaction.createdAt)}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {transaction.description ?? transaction.note ?? "-"}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <StatusBadge status={transaction.status ?? "reviewing"} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
