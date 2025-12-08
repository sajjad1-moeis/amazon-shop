"use client";

import React, { useState } from "react";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import TicketsTable from "@/template/Admin/tickets/TicketsTable";

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

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch
          title="تیکت ها"
          searchPlaceholder="جستجو نام"
          onSearchChange={setSearchTerm}
        />

        <TicketsTable tickets={filteredTickets} />
      </div>
    </div>
  );
}

