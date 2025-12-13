"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RequestsTable({ requests }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "reviewing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "successful":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            موفق
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            ناموفق
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            در انتظار
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
              کد درخواست
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              نوع خدمت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              مبلغ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              وضعیت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              تاریخ
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 last:rounded-tl-lg">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                درخواستی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            requests.map((request, index) => (
              <TableRow
                key={request.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                  index === requests.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4 font-medium">
                  {request.id}
                </TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4">{request.serviceType}</TableCell>
                <TableCell className="text-sm font-medium text-gray-900 dark:text-white py-4 px-4">
                  {request.amount}
                </TableCell>
                <TableCell className="py-4 px-4">{getStatusBadge(request.status)}</TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">{request.date}</TableCell>
                <TableCell className="py-4 px-4">
                  <Button variant="outline" size="sm" className="gap-2">
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
