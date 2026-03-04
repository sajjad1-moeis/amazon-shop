"use client";

import React from "react";
import StatusBadge from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const STATUS_LABELS = {
  1: "در انتظار",
  2: "در حال بررسی",
  3: "تأیید شده",
  4: "در حال پردازش",
  5: "تکمیل شده",
  6: "رد شده",
  7: "لغو شده",
};

function formatDate(val) {
  if (!val) return "—";
  try {
    const d = new Date(val);
    return isNaN(d.getTime()) ? String(val) : d.toLocaleDateString("fa-IR");
  } catch {
    return String(val);
  }
}

function formatAmount(row) {
  if (row.amount != null && row.fromCurrency) {
    const n = Number(row.amount);
    return Number.isFinite(n) ? `${n.toLocaleString("fa-IR")} ${row.fromCurrency}` : "—";
  }
  if (row.amountInToman != null) {
    const n = Number(row.amountInToman);
    return Number.isFinite(n) ? `${n.toLocaleString("fa-IR")} تومان` : "—";
  }
  return row.amount ?? "—";
}

export default function RequestsTable({ requests }) {
  const list = Array.isArray(requests) ? requests : [];

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-stroke">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text first:rounded-tr-lg">
              کد درخواست
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              نوع خدمت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              مبلغ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              وضعیت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text">
              تاریخ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-dark-text last:rounded-tl-lg">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {list.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-dark-text">
                درخواستی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            list.map((request, index) => {
              const code = request.referenceNumber ?? request.id ?? "—";
              const serviceType = request.serviceTypeName ?? request.serviceType ?? "—";
              const amount = formatAmount(request);
              const status = request.status;
              const statusLabel = request.statusName ?? STATUS_LABELS[status] ?? status;
              const date = formatDate(request.createdAt ?? request.date);

              return (
                <TableRow
                  key={request.id}
                  className={cn(
                    "hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-dark-field/50 transition-colors",
                    index === list.length - 1 && "last:border-b-0"
                  )}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-dark-titre py-4 px-4 font-medium">
                    {code}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-dark-titre py-4 px-4">
                    {serviceType}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-titre py-4 px-4">
                    {amount}
                  </TableCell>
                  <TableCell className="py-4 px-4">
                    <StatusBadge status={status} label={statusLabel} />
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">{date}</TableCell>
                  <TableCell className="py-4 px-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 bg-gray-200 dark:bg-dark-stroke dark:to-dark-titre"
                    >
                      مشاهده جزئیات
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
