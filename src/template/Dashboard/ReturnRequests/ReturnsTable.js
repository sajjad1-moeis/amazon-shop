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
        return "در حال بررسی";
      case "approved":
        return "تأیید شده";
      case "rejected":
        return "رد شده";
      case "completed":
        return "تکمیل شده";
      default:
        return null;
    }
  };

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-field/50">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke">
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text first:rounded-tr-lg">
              شماره درخواست
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">محصول</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">علت مرجوعی</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">تاریخ ثبت</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">وضعیت</TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text">
              مبلغ بازگشتی (ت)
            </TableHead>
            <TableHead className="text-right py-3 px-4 text-sm text-gray-500 dark:text-dark-text last:rounded-tl-lg">
              عملیات
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-dark-text">
                درخواست مرجوعی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            returns.map((returnItem, index) => (
              <TableRow
                key={returnItem.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                  index === returns.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">{returnItem.id}</TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 bg-gray-100 dark:bg-dark-field rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={returnItem.product.image}
                        alt={returnItem.product.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-dark-title">{returnItem.product.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">
                  {returnItem.reason}
                </TableCell>
                <TableCell className="text-sm text-gray-600 dark:text-dark-text py-4 px-4">{returnItem.date}</TableCell>
                <TableCell className="p-0">
                  <span className="inline-flex items-center px-1 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    {getStatusBadge(returnItem.status)}
                  </span>
                </TableCell>
                <TableCell className="text-sm text-gray-900 dark:text-dark-title py-4 px-4">
                  {returnItem.refundAmount || "---"}
                </TableCell>
                <TableCell className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    {returnItem.status === "reviewing" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel(returnItem.id)}
                        className="border-primary-700 w-1/2 text-primary-700 hover:bg-primary-50 "
                      >
                        لغو درخواست
                      </Button>
                    )}
                    {returnItem.status === "approved" && (
                      <Button variant="ghost" size="sm" className="gap-2 w-1/2 text-white bg-primary-700">
                        مشاهده فاکتور مرجوعی
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="gap-2 w-1/2 bg-gray-200">
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
