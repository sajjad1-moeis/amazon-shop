"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit } from "iconsax-reactjs";

const STATUS_MAP = {
  1: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  2: { label: "در حال بررسی", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  3: { label: "تأیید شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  4: { label: "در حال پردازش", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  5: { label: "تکمیل شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  6: { label: "رد شده", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  7: { label: "لغو شده", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

function formatDate(str) {
  if (!str) return "—";
  try {
    return new Date(str).toLocaleDateString("fa-IR");
  } catch {
    return str;
  }
}

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

export default function CurrencyServicesTable({ requests, onUpdateStatus }) {
  const list = Array.isArray(requests) ? requests : [];
  if (list.length === 0) {
    return <div className="p-8 text-center text-gray-400">درخواستی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شماره</TableHead>
          <TableHead className="text-gray-300">کاربر</TableHead>
          <TableHead className="text-gray-300">نوع</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">مبلغ / ارز</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => {
          const statusInfo = STATUS_MAP[row.status] || STATUS_MAP[1];
          return (
            <TableRow key={row.id} className="border-gray-700 hover:bg-gray-700/50">
              <TableCell className="text-white font-medium">
                {row.referenceNumber || `#${row.id}`}
              </TableCell>
              <TableCell className="text-gray-300">{row.userId ?? "—"}</TableCell>
              <TableCell className="text-gray-300">
                {(row.serviceTypeName || row.serviceType) ?? "—"}
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={statusInfo.className}>
                  {row.statusName || statusInfo.label}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-300">
                {row.amount != null && row.fromCurrency
                  ? `${formatNum(row.amount)} ${row.fromCurrency}`
                  : row.amountInToman != null
                  ? `${formatNum(row.amountInToman)} تومان`
                  : "—"}
              </TableCell>
              <TableCell className="text-gray-300">{formatDate(row.createdAt)}</TableCell>
              <TableCell>
                {onUpdateStatus && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-400 hover:bg-blue-400/20"
                    onClick={() => onUpdateStatus(row)}
                    title="تغییر وضعیت"
                  >
                    <Edit size={18} />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
