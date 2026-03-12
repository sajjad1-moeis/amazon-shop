"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import CreateTicketModal from "@/template/Dashboard/Support/CreateTicketModal";
import TicketsFilter from "@/template/Dashboard/Support/TicketsFilter";
import TicketTable from "@/template/Dashboard/Support/TicketTable";
import { Spinner } from "@/components/ui/spinner";
import { Add } from "iconsax-reactjs";
import React, { useState, useEffect, useCallback } from "react";
import { ticketService } from "@/services/ticket/ticketService";
import { toast } from "sonner";
import { formatDate } from "@/utils/dateFormatter";

function Page() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    priority: "",
    searchQuery: "",
  });

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        pageNumber: 1,
        pageSize: 100,
      };

      if (filters.status && filters.status !== "all") {
        const statusMap = { pending: 1, reviewing: 1, answered: 4, closed: 5 };
        params.status = statusMap[filters.status];
      }

      if (filters.priority && filters.priority !== "all") {
        const priorityMap = { high: 3, medium: 2, low: 1 };
        params.priority = priorityMap[filters.priority];
      }

      if (filters.searchQuery) {
        params.searchTerm = filters.searchQuery;
      }

      // ارسال sortBy به سرور
      if (filters.sortBy && filters.sortBy !== "all") {
        params.sortBy = filters.sortBy === "newest" ? "desc" : "asc";
        params.sortColumn = "createdAt";
      }

      const response = await ticketService.getPaginated(params);

      if (response.success && response.data) {
        const rawList = response.data.tickets || response.data || [];
        const formattedTickets = rawList.map((ticket) => {
          const statusNum = ticket.status;
          const statusStr =
            statusNum === 5 ? "closed" : statusNum === 4 ? "answered" : statusNum === 1 || statusNum === 2 || statusNum === 3 ? "reviewing" : "pending";
          return {
            id: ticket.id,
            ticketNumber: ticket.ticketNumber || `TKT-${ticket.id}`,
            subject: ticket.subject || ticket.title || "-",
            title: ticket.subject || ticket.title || "-",
            date: formatDate(ticket.createdAt),
            category: ticket.categoryName || ticket.category || "-",
            categoryName: ticket.categoryName || ticket.category || "-",
            priority: ticket.priority,
            status: statusStr,
            createdAt: ticket.createdAt,
          };
        });

        setTickets(formattedTickets);
      } else {
        toast.error(response.message || "خطا در دریافت تیکت‌ها");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت‌ها");
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  /** بعد از ایجاد تیکت در مودال: بستن مودال و بروزرسانی لیست */
  const handleTicketCreated = () => {
    setIsModalOpen(false);
    fetchTickets();
  };

  const handleDeleteTicket = async (ticketId) => {
    if (!confirm("آیا از حذف این تیکت اطمینان دارید؟")) return;

    try {
      const response = await ticketService.softDelete(ticketId);
      if (response.success) {
        toast.success("تیکت با موفقیت حذف شد");
        fetchTickets();
      } else {
        toast.error(response.message || "خطا در حذف تیکت");
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف تیکت");
      console.error("Error deleting ticket:", error);
    }
  };

  const TicketBtn = () => (
    <Button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 w-full hover:bg-yellow-600 text-primary-800">
      ایجاد تیکت جدید
      <Add size={24} />
    </Button>
  );

  return (
    <DashboardLayout>
      <>
        {/* Top Section: Header and Create Ticket Button */}
        <PageHeader
          title="تیکت و پشتیبانی"
          description="تمام تیکت‌های پشتیبانی شما در این بخش قابل مشاهده و پیگیری هستند"
          actionButton={
            <div className=" md:hidden">
              <TicketBtn />
            </div>
          }
        >
          {" "}
          <div className="max-md:hidden">
            <TicketBtn />
          </div>
        </PageHeader>

        <TicketsFilter filters={filters} onFiltersChange={setFilters} />

        {/* Tickets Table Section */}
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-3 mt-8">
          <h2 className="text-lg  text-gray-900 dark:text-white mb-6">لیست تیکت های ثبت شده</h2>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner size="lg" />
            </div>
          ) : (
            <TicketTable tickets={tickets} onDelete={handleDeleteTicket} />
          )}
        </div>

        {/* Create Ticket Modal */}
        <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleTicketCreated} />
      </>
    </DashboardLayout>
  );
}

export default Page;
