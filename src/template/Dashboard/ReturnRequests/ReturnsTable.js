"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export default function ReturnsTable({ returns, onCancel }) {
  // StatusBadge component is used instead

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50 dark:bg-dark-stroke">
          <TableRow className="border-b border-gray-200 dark:border-dark-stroke text-gray-500 dark:text-dark-titre">
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm  first:rounded-tr-lg">
              شماره درخواست
            </TableHead>
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm ">محصول</TableHead>
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm ">علت مرجوعی</TableHead>
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm ">تاریخ ثبت</TableHead>
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm ">وضعیت</TableHead>
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm ">مبلغ بازگشتی (ت)</TableHead>
            <TableHead className="whitespace-nowrap text-right py-3 px-4 text-sm  last:rounded-tl-lg">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {returns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className=" text-center py-8 ">
                درخواست مرجوعی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            returns.map((returnItem, index) => (
              <TableRow
                key={returnItem.id}
                className={cn(
                  "hover:bg-gray-50 dark:bg-white/5 whitespace-nowrap dark:hover:bg-dark-field/50 transition-colors",
                  index === returns.length - 1 && "last:border-b-0"
                )}
              >
                <TableCell className="whitespace-nowrap text-sm text-gray-900 dark:text-dark-text py-4 px-4">
                  {returnItem.id}
                </TableCell>
                <TableCell className="whitespace-nowrap py-4 px-4">
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
                    <span className="text-sm text-gray-900 dark:text-dark-titre line-clamp-1">
                      {returnItem.product.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm text-gray-600 whitespace-nowrap dark:text-dark-text py-4 px-4">
                  {returnItem.reason}
                </TableCell>
                <TableCell className="text-sm text-gray-600 whitespace-nowrap dark:text-dark-text py-4 px-4">
                  {returnItem.date}
                </TableCell>
                <TableCell className="p-0 whitespace-nowrap">
                  <StatusBadge status={returnItem.status} className="px-1 py-1" />
                </TableCell>
                <TableCell className="whitespace-nowrap text-sm text-gray-900 dark:text-dark-text py-4 px-4">
                  {returnItem.refundAmount || "---"}
                </TableCell>
                <TableCell className="whitespace-nowrap py-4 px-4">
                  <div className="flex items-center gap-2">
                    {returnItem.status === "reviewing" && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onCancel(returnItem.id)}
                        className="border-primary-700 w-1/2 dark:border-primary-300 dark:text-primary-300 text-primary-700 hover:bg-primary-50 "
                      >
                        لغو درخواست
                      </Button>
                    )}
                    {returnItem.status === "approved" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 w-1/2 text-white dark:bg-dark-primary bg-primary-700"
                      >
                        مشاهده فاکتور مرجوعی
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2 w-1/2 bg-gray-200 dark:bg-dark-stroke dark:text-dark-titre"
                    >
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
