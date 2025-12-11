"use client";

import { Button } from "@/components/ui/button";
import { initialTickets } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import CreateTicketModal from "@/template/Dashboard/Support/CreateTicketModal";
import TicketsFilter from "@/template/Dashboard/Support/TicketsFilter";
import TicketTable from "@/template/Dashboard/Support/TicketTable";
import { Add } from "iconsax-reactjs";
import React, { useState } from "react";

function Page() {
  const [tickets, setTickets] = useState(initialTickets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    priority: "",
    searchQuery: "",
  });

  const handleAddTicket = (newTicket) => {
    const ticketId = `${Math.floor(Math.random() * 90000) + 10000}`;
    const today = new Date();
    const persianDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getDate()
    ).padStart(2, "0")}`;

    const ticket = {
      id: ticketId,
      subject: newTicket.subject,
      priority: newTicket.priority,
      status: "pending",
      date: persianDate,
      lastUpdate: persianDate,
    };

    setTickets([ticket, ...tickets]);
  };

  const handleDeleteTicket = (ticketId) => {
    if (confirm("آیا از حذف این تیکت اطمینان دارید؟")) {
      setTickets(tickets.filter((t) => t.id !== ticketId));
    }
  };

  return (
    <DashboardLayout>
      <>
        {/* Top Section: Header and Create Ticket Button */}
        <PageHeader
          title="تیکت و پشتیبانی"
          description="تمام تیکت‌های پشتیبانی شما در این بخش قابل مشاهده و پیگیری هستند"
        >
          {" "}
          <Button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-600 text-primary-800">
            ایجاد تیکت جدید
            <Add size={24} />
          </Button>
        </PageHeader>

        <TicketsFilter filters={filters} onFiltersChange={setFilters} />

        {/* Tickets Table Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-box p-3 mt-8">
          <h2 className="text-lg  text-gray-900 dark:text-white mb-6">لیست تیکت های ثبت شده</h2>
          <TicketTable tickets={tickets} onDelete={handleDeleteTicket} />
        </div>

        {/* Create Ticket Modal */}
        <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTicket} />
      </>
    </DashboardLayout>
  );
}

export default Page;
