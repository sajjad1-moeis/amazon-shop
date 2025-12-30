"use client";

import React from "react";
import StatusBadge from "@/components/StatusBadge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RequestsTable({ requests }) {
  // StatusBadge component is used instead

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
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-dark-text">
                درخواستی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request, index) => (
              <TableRow
                key={request.id}
                className={cn(
                  "hover:bg-gray-50 dark:bg-white/5 dark:hover:bg-dark-field/50 transition-colors",
                  index === requests.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-dark-titre py-4 px-4 font-medium">
                  {request.id}
                </TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-dark-titre py-4 px-4">
                  {request.serviceType}
                </TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-dark-titre py-4 px-4">
                  {request.amount}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <StatusBadge status={request.status} />
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">{request.date}</TableCell>
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
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
