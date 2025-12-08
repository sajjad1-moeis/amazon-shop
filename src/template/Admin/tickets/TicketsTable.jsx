"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageText } from "iconsax-reactjs";
import TableActions from "../TableActions";

export default function TicketsTable({ tickets }) {
  const getPriorityBadge = (priority) => {
    const colors = {
      high: "destructive",
      medium: "outline",
      low: "secondary",
    };
    const labels = {
      high: "بالا",
      medium: "متوسط",
      low: "پایین",
    };
    return <Badge variant={colors[priority]}>{labels[priority]}</Badge>;
  };

  if (tickets.length === 0) {
    return <div className="p-8 text-center text-gray-400">تیکتی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">شماره تیکت</TableHead>
          <TableHead className="text-gray-300">مشتری</TableHead>
          <TableHead className="text-gray-300">موضوع</TableHead>
          <TableHead className="text-gray-300">اولویت</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تعداد پیام‌ها</TableHead>
          <TableHead className="text-gray-300">آخرین بروزرسانی</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tickets.map((ticket) => (
          <TableRow key={ticket.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{ticket.ticketNumber}</TableCell>
            <TableCell className="text-gray-300">{ticket.customerName}</TableCell>
            <TableCell className="text-gray-300">{ticket.subject}</TableCell>
            <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
            <TableCell>
              <Badge variant={ticket.status === "open" ? "default" : "secondary"}>
                {ticket.status === "open" ? "باز" : "بسته"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-300">{ticket.messagesCount}</TableCell>
            <TableCell className="text-gray-300">{ticket.lastUpdate}</TableCell>
            <TableCell>
              <TableActions
                showDelete={false}
                customActions={
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-400/20">
                    <MessageText size={18} />
                  </Button>
                }
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

