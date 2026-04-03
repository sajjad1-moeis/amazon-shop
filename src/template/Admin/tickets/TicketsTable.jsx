"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../TableActions";
import { formatDateFa } from "@/utils/adminDateUtils";

const getPriorityBadge = (priority) => {
  const priorityMap = {
    1: { label: "پایین", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    2: { label: "متوسط", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    3: { label: "بالا", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    4: { label: "فوری", className: "bg-rose-600/25 text-rose-300 border-rose-500/35" },
  };
  const priorityInfo = priorityMap[priority] || priorityMap[2];
  return (
    <Badge variant="outline" className={priorityInfo.className}>
      {priorityInfo.label}
    </Badge>
  );
};

const getTicketStatusBadge = (status) => {
  const statusMap = {
    1: { label: "باز", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "در حال بررسی", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    3: { label: "در انتظار کاربر", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    4: { label: "حل شده", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
    5: { label: "بسته", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[1];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function TicketsTable({ tickets, onView }) {
  if (tickets.length === 0) {
    return <div className="p-8 text-center text-gray-400">تیکتی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300 whitespace-nowrap">شماره تیکت</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">مشتری</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">موضوع</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">اولویت</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">وضعیت</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">تعداد پیام‌ها</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">آخرین بروزرسانی</TableHead>
          <TableHead className="text-gray-300 whitespace-nowrap">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {ticket.ticketNumber || ticket.number || `TKT-${ticket.id}`}
            </TableCell>
            <TableCell className="text-gray-300">
              {ticket.customerName || ticket.userFullName || ticket.userName || "-"}
            </TableCell>
            <TableCell className="text-gray-300">{ticket.subject || ticket.title || "-"}</TableCell>
            <TableCell>{getPriorityBadge(Number(ticket.priority))}</TableCell>
            <TableCell>{getTicketStatusBadge(Number(ticket.status))}</TableCell>
            <TableCell className="text-gray-300">{ticket.messagesCount || ticket.messageCount || 0}</TableCell>
            <TableCell className="text-gray-300">
              {ticket.updatedAt ? formatDateFa(ticket.updatedAt) : ticket.lastUpdate || "-"}
            </TableCell>
            <TableCell>
              <TableActions onView={() => onView(ticket.id)} showEdit={false} showDelete={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
