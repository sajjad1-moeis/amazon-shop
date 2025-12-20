"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageText } from "iconsax-reactjs";
import TableActions from "../TableActions";

const getPriorityBadge = (priority) => {
  const priorityMap = {
    1: { label: "پایین", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    2: { label: "متوسط", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    3: { label: "بالا", className: "bg-red-500/20 text-red-400 border-red-500/30" },
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
    2: { label: "بسته", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
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
            <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
            <TableCell>{getTicketStatusBadge(ticket.status)}</TableCell>
            <TableCell className="text-gray-300">{ticket.messagesCount || ticket.messageCount || 0}</TableCell>
            <TableCell className="text-gray-300">
              {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString("fa-IR") : ticket.lastUpdate || "-"}
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
