"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import TicketTable from "./TicketTable";
import TicketsFilter from "./TicketsFilter";
import CreateTicketModal from "./CreateTicketModal";
import PageHeader from "@/template/Dashboard/Common/PageHeader";

const initialTickets = [
  {
    id: "۴۵۲۳۱",
    title: "مشکل در پرداخت سفارش",
    date: "۱۴۰۳/۱۰/۰۹",
    category: "مالی",
    priority: "high",
    status: "reviewing",
  },
  {
    id: "۱۲۳۴۵",
    title: "تاخیر در ارسال محصول",
    date: "۱۴۰۳/۱۰/۰۹",
    category: "لجستیک",
    priority: "medium",
    status: "answered",
  },
];

export default function TicketsList() {
  const [tickets, setTickets] = useState(initialTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    category: "",
    searchQuery: "",
  });

  const handleAddTicket = (newTicket) => {
    const ticketNumber = String(Math.floor(Math.random() * 90000) + 10000);
    const today = new Date();
    const persianDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

    const categoryMap = {
      financial: "مالی",
      logistics: "لجستیک",
      technical: "فنی",
      general: "عمومی",
    };

    const ticket = {
      id: ticketNumber,
      title: newTicket.title,
      date: persianDate,
      category: categoryMap[newTicket.category] || newTicket.category,
      priority: newTicket.priority,
      status: "reviewing",
    };

    setTickets([ticket, ...tickets]);
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketId));
  };

  return (
    <>
      {/* Top Section: Header and Add Button */}
      <PageHeader
        title="تیکت و پشتیبانی"
        description="لیست تیکت‌های پشتیبانی شما و امکان ایجاد تیکت جدید."
        actionButton={
          <Button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-white">
            <Add size={20} className="ml-2" />
            ایجاد تیکت جدید
          </Button>
        }
      />

      {/* Bottom Section: Filter and Tickets Table */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        {/* Filter Section */}
        <TicketsFilter filters={filters} onFiltersChange={setFilters} />

        {/* Tickets Table */}
        <div className="mt-6">
          <TicketTable tickets={tickets} onDelete={handleDeleteTicket} />
        </div>
      </div>

      {/* Create Ticket Modal */}
      <CreateTicketModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddTicket}
      />
    </>
  );
}
