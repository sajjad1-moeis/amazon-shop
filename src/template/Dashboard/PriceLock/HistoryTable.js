"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export default function HistoryTable({ locks }) {
  // StatusBadge component is used instead

  return (
    <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-dark-stroke">
            <TableHead className="text-right first:rounded-tr-lg">محصول</TableHead>
            <TableHead className="text-right">قیمت قفل شده</TableHead>
            <TableHead className="text-right">تاریخ ایجاد</TableHead>
            <TableHead className="text-right">تاریخ پایان</TableHead>
            <TableHead className="text-right">وضعیت</TableHead>
            <TableHead className="text-right last:rounded-tl-lg">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-dark-text">
                موردی یافت نشد
              </TableCell>
            </TableRow>
          ) : (
            locks.map((lock, index) => (
              <TableRow
                key={lock.id}
                className={cn(
                  "hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                  index === locks.length - 1 && "last:border-b-0"
                )}
              >
                {/* Product */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-field">
                      <Image src={lock.productImage} alt={lock.productName} fill className="object-cover" />
                    </div>
                    <span className="text-sm text-gray-900 dark:text-dark-title">{lock.productName}</span>
                  </div>
                </TableCell>

                {/* Locked Price */}
                <TableCell className="text-sm text-gray-900 dark:text-dark-title">{lock.lockedPrice} تومان</TableCell>

                {/* Creation Date */}
                <TableCell className="text-sm text-gray-600 dark:text-dark-text">{lock.creationDate}</TableCell>

                {/* End Date */}
                <TableCell className="text-sm text-gray-600 dark:text-dark-text">{lock.endDate}</TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge status={lock.status} variant="rounded-lg" />
                </TableCell>

                {/* Operations */}
                <TableCell>
                  <Link href="#">
                    <Button variant="outline" size="sm" className="gap-2">
                      مشاهده جزئیات
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
