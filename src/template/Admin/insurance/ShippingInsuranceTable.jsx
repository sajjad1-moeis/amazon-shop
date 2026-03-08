"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ShieldTick } from "iconsax-reactjs";
import { formatDateFa } from "@/utils/adminDateUtils";

const STATUS_MAP = {
  1: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  2: { label: "فعال", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  3: { label: "تکمیل شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  4: { label: "درخواست جبران", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  5: { label: "منقضی شده", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

function formatMoney(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR") + " تومان";
}

export default function ShippingInsuranceTable({ list }) {
  if (!list || list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-400">
        <ShieldTick size={40} className="opacity-50 mb-3" />
        <p>بیمه‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-600 bg-gray-800/30 overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-600 hover:bg-transparent bg-gray-700/50">
            <TableHead className="text-gray-300 font-semibold">شناسه</TableHead>
            <TableHead className="text-gray-300 font-semibold">شماره سفارش</TableHead>
            <TableHead className="text-gray-300 font-semibold">کاربر</TableHead>
            <TableHead className="text-gray-300 font-semibold">مبلغ پوشش</TableHead>
            <TableHead className="text-gray-300 font-semibold">حق بیمه</TableHead>
            <TableHead className="text-gray-300 font-semibold">وضعیت</TableHead>
            <TableHead className="text-gray-300 font-semibold">تاریخ خرید</TableHead>
            <TableHead className="text-gray-300 font-semibold">درخواست جبران</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.map((row) => {
            const statusInfo = STATUS_MAP[row.status] || STATUS_MAP[1];
            return (
              <TableRow key={row.id} className="border-gray-600 hover:bg-gray-700/30">
                <TableCell className="text-white font-medium">{row.id}</TableCell>
                <TableCell className="text-gray-300">{row.orderNumber || row.orderId || "—"}</TableCell>
                <TableCell className="text-gray-300">{row.userId ?? row.userName ?? "—"}</TableCell>
                <TableCell className="text-gray-300">{formatMoney(row.coverageAmount)}</TableCell>
                <TableCell className="text-gray-300">{formatMoney(row.insuranceFee)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={statusInfo.className}>
                    {row.statusName || statusInfo.label}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-300">{formatDateFa(row.purchasedAt)}</TableCell>
                <TableCell className="text-gray-300">
                  {row.hasActiveClaim ? (
                    <span className="text-amber-400 font-medium">فعال ({row.claimCount ?? 0})</span>
                  ) : (
                    <span>{row.claimCount ?? 0}</span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
