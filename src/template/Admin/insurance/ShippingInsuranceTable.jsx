"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const STATUS_MAP = {
  1: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  2: { label: "فعال", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  3: { label: "تکمیل شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  4: { label: "درخواست جبران", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  5: { label: "منقضی شده", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
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

export default function ShippingInsuranceTable({ list }) {
  if (!list || list.length === 0) {
    return <div className="p-8 text-center text-gray-400">بیمه‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شناسه</TableHead>
          <TableHead className="text-gray-300">شماره سفارش</TableHead>
          <TableHead className="text-gray-300">کاربر</TableHead>
          <TableHead className="text-gray-300">مبلغ پوشش</TableHead>
          <TableHead className="text-gray-300">حق بیمه</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ خرید</TableHead>
          <TableHead className="text-gray-300">درخواست جبران</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((row) => {
          const statusInfo = STATUS_MAP[row.status] || STATUS_MAP[1];
          return (
            <TableRow key={row.id} className="border-gray-700 hover:bg-gray-700/50">
              <TableCell className="text-white font-medium">{row.id}</TableCell>
              <TableCell className="text-gray-300">{row.orderNumber || row.orderId || "—"}</TableCell>
              <TableCell className="text-gray-300">{row.userId ?? "—"}</TableCell>
              <TableCell className="text-gray-300">{formatMoney(row.coverageAmount)}</TableCell>
              <TableCell className="text-gray-300">{formatMoney(row.insuranceFee)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={statusInfo.className}>
                  {row.statusName || statusInfo.label}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-300">{formatDate(row.purchasedAt)}</TableCell>
              <TableCell className="text-gray-300">
                {row.hasActiveClaim ? (
                  <span className="text-amber-400">فعال ({row.claimCount ?? 0})</span>
                ) : (
                  <span>{row.claimCount ?? 0}</span>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
