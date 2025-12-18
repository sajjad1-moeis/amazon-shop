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
        params.status = filters.status === "open" ? 1 : 2;
      }

      if (filters.priority && filters.priority !== "all") {
        const priorityMap = { high: 3, medium: 2, low: 1 };
        params.priority = priorityMap[filters.priority];
      }

      if (filters.searchQuery) {
        params.searchTerm = filters.searchQuery;
      }

      if (filters.sortBy && filters.sortBy !== "all") {
        params.sortBy = filters.sortBy === "newest" ? "desc" : "asc";
        params.sortColumn = "createdAt";
      }

      const response = await ticketService.getPaginated(params);

      if (response.success && response.data) {
        setTickets(response.data.tickets || response.data || []);
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

  const handleAddTicket = async (newTicket) => {
    try {
      const priorityMap = { high: 3, medium: 2, low: 1 };
      const ticketData = {
        subject: newTicket.title?.trim() || "",
        categoryId: parseInt(newTicket.category, 10),
        priority: priorityMap[newTicket.priority] || 2,
        message: newTicket.description?.trim() || "",
      };

      if (!ticketData.subject || !ticketData.categoryId || !ticketData.priority || !ticketData.message) {
        toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
        return;
      }

      const response = await ticketService.create(ticketData);

      if (response && response.success) {
        toast.success("تیکت با موفقیت ایجاد شد");
        setIsModalOpen(false);
        fetchTickets();
      } else {
        toast.error(response?.message || "خطا در ایجاد تیکت");
      }
    } catch (error) {
      const errorMessage = error?.response?.data?.message || error?.message || "خطا در ایجاد تیکت";
      toast.error(errorMessage);
      console.error("Error creating ticket:", error);
    }
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
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner size="lg" />
            </div>
          ) : (
            <TicketTable tickets={tickets} onDelete={handleDeleteTicket} />
          )}
        </div>

        {/* Create Ticket Modal */}
        <CreateTicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSubmit={handleAddTicket} />
      </>
    </DashboardLayout>
  );
}

export default Page;
