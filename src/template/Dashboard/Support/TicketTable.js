"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import ViewAllTable from "@/components/ViewAllTable";

export default function TicketTable({ tickets, onDelete }) {
  const handleDelete = (ticketId) => {
    if (confirm("آیا از حذف این تیکت اطمینان دارید؟")) {
      onDelete(ticketId);
    }
  };

  const getPriorityBadge = (priority) => {
    const p = priority != null ? Number(priority) : null;
    switch (p) {
      case 4:
      case 3:
        return (
          <div className="flex items-center gap-2 bg-red-100 w-max py-1 px-2 rounded dark:bg-red-950/30">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5">بالا</span>
          </div>
        );
      case 2:
        return (
          <div className="flex items-center gap-2 bg-yellow-100 px-2 py-1 w-max rounded dark:bg-yellow-950/30">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5">متوسط</span>
          </div>
        );
      case 1:
        return (
          <div className="flex items-center gap-2 w-max bg-green-100 px-2 py-1 rounded dark:bg-green-950/30">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5">پایین</span>
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
            <TableRow className="bg-gray-50 dark:bg-dark-stroke">
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
                  <TableCell className="text-sm text-gray-900 dark:text-dark-title">{ticket.subject ?? ticket.title ?? "-"}</TableCell>
                  <TableCell className="text-sm text-gray-600 dark:text-dark-text">
                    {ticket.createdAt ? new Date(ticket.createdAt).toLocaleDateString("fa-IR") : "-"}
                  </TableCell>
                  <TableCell className="text-sm text-gray-700 dark:text-dark-text dark:bg-white/5">
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
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                          onClick={() => handleDelete(ticket.id)}
                          aria-label="حذف تیکت"
                        >
                          <Trash2 className="h-4 w-4" />
                          حذف
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <ViewAllTable />
    </div>
  );
}
