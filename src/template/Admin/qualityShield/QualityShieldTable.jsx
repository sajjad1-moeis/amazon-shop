"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlayCircle, TickCircle } from "iconsax-reactjs";

const STATUS_MAP = {
  1: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  2: { label: "در حال بررسی", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  3: { label: "تکمیل شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  4: { label: "لغو شده", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  5: { label: "ناموفق", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const RESULT_MAP = {
  1: { label: "قبول", className: "bg-green-500/20 text-green-400" },
  2: { label: "رد", className: "bg-red-500/20 text-red-400" },
  3: { label: "مشروط", className: "bg-amber-500/20 text-amber-400" },
};

function formatDate(str) {
  if (!str) return "—";
  try {
    return new Date(str).toLocaleDateString("fa-IR");
  } catch {
    return str;
  }
}

function formatMoney(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR") + " تومان";
}

export default function QualityShieldTable({ list, onStartInspection, onCompleteInspection }) {
  if (!list || list.length === 0) {
    return <div className="p-8 text-center text-gray-400">سرویس سپر کیفیتی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شناسه</TableHead>
          <TableHead className="text-gray-300">سفارش / محصول</TableHead>
          <TableHead className="text-gray-300">کاربر</TableHead>
          <TableHead className="text-gray-300">مبلغ</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">نتیجه</TableHead>
          <TableHead className="text-gray-300">تاریخ خرید</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => {
          const statusInfo = STATUS_MAP[row.status] || STATUS_MAP[1];
          const resultInfo = row.result != null ? RESULT_MAP[row.result] : null;
          return (
            <TableRow key={row.id} className="border-gray-700 hover:bg-gray-700/50">
              <TableCell className="text-white font-medium">{row.id}</TableCell>
              <TableCell className="text-gray-300">
                <div className="text-sm">{row.orderNumber || `سفارش ${row.orderId}`}</div>
                <div className="text-xs text-gray-500 truncate max-w-[180px]" title={row.productTitle}>
                  {row.productTitle || `محصول ${row.productId}`}
                </div>
              </TableCell>
              <TableCell className="text-gray-300">{row.userId ?? "—"}</TableCell>
              <TableCell className="text-gray-300">{formatMoney(row.amount)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusInfo.className}>
                  {row.statusName || statusInfo.label}
                </Badge>
              </TableCell>
              <TableCell>
                {resultInfo ? (
                  <Badge variant="outline" className={resultInfo.className}>
                    {row.resultName || resultInfo.label}
                  </Badge>
                ) : (
                  "—"
                )}
              </TableCell>
              <TableCell className="text-gray-300">{formatDate(row.purchasedAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {row.status === 1 && onStartInspection && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-blue-400 hover:bg-blue-400/20"
                      onClick={() => onStartInspection(row)}
                      title="شروع بررسی"
                    >
                      <PlayCircle size={18} />
                    </Button>
                  )}
                  {row.status === 2 && onCompleteInspection && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-green-400 hover:bg-green-400/20"
                      onClick={() => onCompleteInspection(row)}
                      title="تکمیل بررسی"
                    >
                      <TickCircle size={18} />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
