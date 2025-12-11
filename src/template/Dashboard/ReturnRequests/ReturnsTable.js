"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ReturnsTable({ returns, onCancel }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case "reviewing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            تأیید شده
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
            رد شده
          </span>
        );
      case "completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            تکمیل شده
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
              شماره درخواست
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              محصول
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              علت مرجوعی
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              تاریخ ثبت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              وضعیت
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              مبلغ بازگشتی (ت)
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300 last:rounded-tl-lg">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                درخواست مرجوعی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            returns.map((returnItem, index) => (
              <TableRow
                key={returnItem.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                  index === returns.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4">
                  {returnItem.id}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={returnItem.product.image}
                        alt={returnItem.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-white">{returnItem.product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">
                  {returnItem.reason}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-gray-400 py-4 px-4">{returnItem.date}</TableCell>
                <TableCell className="py-4 px-4">{getStatusBadge(returnItem.status)}</TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-white py-4 px-4">
                  {returnItem.refundAmount || "---"}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {returnItem.status === "reviewing" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel(returnItem.id)}
                        className="border-red-500 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        لغو درخواست
                      </Button>
                    )}
                    {returnItem.status === "approved" && (
                      <Button variant="outline" size="sm" className="gap-2">
                        مشاهده فاکتور مرجوعی
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="gap-2">
                      مشاهده جزئیات
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

