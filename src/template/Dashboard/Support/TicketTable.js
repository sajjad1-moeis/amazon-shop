"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function TicketTable({ tickets, onDelete }) {
  const handleDelete = (ticketId) => {
    if (confirm("آیا از حذف این تیکت اطمینان دارید؟")) {
      onDelete(ticketId);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">بالا</span>
          </div>
        );
      case "medium":
        return (
          <div className="flex items-center gap-2 bg-yellow-100 p-2 w-max">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">متوسط</span>
          </div>
        );
      case "low":
        return (
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700 dark:text-gray-300">پایین</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "reviewing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            در حال بررسی
          </span>
        );
      case "answered":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            پاسخ داده شده
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            در انتظار
          </span>
        );
      case "closed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
            بسته شده
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-gray-700/50">
              <TableHead className="text-right first:rounded-tr-lg">شماره تیکت</TableHead>
              <TableHead className="text-right">عنوان</TableHead>
              <TableHead className="text-right">تاریخ</TableHead>
              <TableHead className="text-right">دسته بندی</TableHead>
              <TableHead className="text-right">اولویت</TableHead>
              <TableHead className="text-right">وضعیت</TableHead>
              <TableHead className="text-right last:rounded-tl-lg">عملیات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  تیکتی یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket, index) => (
                <TableRow
                  key={ticket.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors",
                    index === tickets.length - 1 && "last:border-b-0"
                  )}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-white">{ticket.id}</TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-white">{ticket.title}</TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-gray-400">{ticket.date}</TableCell>
                  <TableCell className="text-sm text-gray-700 dark:text-gray-300">{ticket.category}</TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/support/${ticket.id}`}>
                        <Button variant="outline" size="sm" className="gap-2">
                          <Eye className="h-4 w-4" />
                          مشاهده
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
