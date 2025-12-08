"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, MessageText } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

// داده‌های تستی
const mockTickets = [
  {
    id: 1,
    ticketNumber: "TKT-001",
    customerName: "علی محمدی",
    subject: "مشکل در ارسال سفارش",
    status: "open",
    priority: "high",
    lastUpdate: "1403/09/20",
    messagesCount: 5,
  },
  {
    id: 2,
    ticketNumber: "TKT-002",
    customerName: "مریم احمدی",
    subject: "سوال درباره محصول",
    status: "open",
    priority: "medium",
    lastUpdate: "1403/09/20",
    messagesCount: 3,
  },
  {
    id: 3,
    ticketNumber: "TKT-003",
    customerName: "حسین رضایی",
    subject: "درخواست بازگشت وجه",
    status: "closed",
    priority: "high",
    lastUpdate: "1403/09/19",
    messagesCount: 8,
  },
  {
    id: 4,
    ticketNumber: "TKT-004",
    customerName: "فاطمه کریمی",
    subject: "مشکل در پرداخت",
    status: "open",
    priority: "low",
    lastUpdate: "1403/09/19",
    messagesCount: 2,
  },
];

export default function TicketsPage() {
  const [tickets] = useState(mockTickets);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">تیکت‌ها و پشتیبانی</h1>
        <p className="text-gray-400">مدیریت و پاسخ به تیکت‌های کاربران</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="pt-6">
          <Input
            placeholder="جستجو در تیکت‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          {filteredTickets.length === 0 ? (
            <div className="p-8 text-center text-gray-400">تیکتی یافت نشد</div>
          ) : (
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
                {filteredTickets.map((ticket) => (
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
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                          <Eye size={18} />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-400/20">
                          <MessageText size={18} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

