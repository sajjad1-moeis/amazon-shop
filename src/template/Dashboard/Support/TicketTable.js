"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

export default function TicketTable({ tickets, onDelete }) {
  const handleDelete = (ticketId) => {
    if (confirm("آیا از حذف این تیکت اطمینان دارید؟")) {
      onDelete(ticketId);
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 3:
        return (
          <div className="flex items-center gap-2 bg-red-100 w-max py-1 px-2 rounded">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700 dark:text-dark-text">بالا</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-2 bg-yellow-100 px-2 py-1 w-max rounded">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700 dark:text-dark-text">متوسط</span>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center gap-2 w-max bg-green-100 px-2 py-1 rounded">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700 dark:text-dark-text">پایین</span>
          </div>
        );
      default:
        return null;
    }
  };

  // StatusBadge component is used instead

  return (
    <div>
      <div className="border border-gray-200 dark:border-dark-stroke rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 dark:bg-dark-field/50">
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
                <TableCell colSpan={7} className="text-center py-8 text-gray-500 dark:text-dark-text">
                  تیکتی یافت نشد
                </TableCell>
              </TableRow>
            ) : (
              tickets.map((ticket, index) => (
                <TableRow
                  key={ticket.id}
                  className={cn(
                    "hover:bg-gray-50 dark:hover:bg-dark-field/50 transition-colors",
                    index === tickets.length - 1 && "last:border-b-0"
                  )}
                >
                  <TableCell className="text-sm text-gray-900 dark:text-dark-title">
                    {ticket.ticketNumber || `TKT-${ticket.id}`}
                  </TableCell>
                  <TableCell className="text-sm text-gray-900 dark:text-dark-title">
                    {ticket.subject || "-"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-dark-text">
                    {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString("fa-IR") : "-"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 dark:text-dark-text">
                    {ticket.categoryName || "-"}
                  </TableCell>
                  <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                  <TableCell>
                    <StatusBadge status={ticket.status} variant="rounded-lg" />
                  </TableCell>
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
