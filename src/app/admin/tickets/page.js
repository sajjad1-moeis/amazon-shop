"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { MessageQuestion } from "iconsax-reactjs";
import TicketsTable from "@/template/Admin/tickets/TicketsTable";
import TicketsFilters from "@/template/Admin/tickets/TicketsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { adminTicketService } from "@/services/ticket/adminTicketService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function TicketsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const queryKey = searchParams.toString();

  // فیلتر وضعیت برای سرچ ادمین: open => 1 (Open), closed => 5 (Closed)
  const status = statusParam === "open" ? 1 : statusParam === "closed" ? 5 : undefined;

  useEffect(() => {
    const page = searchParams.get("page");
    const parsedPage = page ? parseInt(page, 10) : NaN;
    if (!Number.isNaN(parsedPage) && parsedPage > 0) {
      setPageNumber(parsedPage);
    } else {
      setPageNumber(1);
    }
  }, [searchParams]);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const searchTermValue = searchParams.get("search") || "";
      const priorityParam = searchParams.get("priority");
      const categoryIdParam = searchParams.get("categoryId");
      const phoneNumberParam = searchParams.get("phoneNumber");
      const assignedParam = searchParams.get("assignedToUserId");
      const response = await adminTicketService.getPaginated({
        pageNumber,
        pageSize,
        status,
        searchTerm: searchTermValue || undefined,
        priority: priorityParam ? parseInt(priorityParam, 10) : undefined,
        categoryId: categoryIdParam ? parseInt(categoryIdParam, 10) : undefined,
        phoneNumber: phoneNumberParam ? phoneNumberParam.trim() : undefined,
        assignedToUserId: assignedParam ? parseInt(assignedParam, 10) : undefined,
      });

      const data = unwrapApiData(response);
      const list = Array.isArray(data?.tickets)
        ? data.tickets
        : Array.isArray(data?.Tickets)
          ? data.Tickets
          : Array.isArray(data)
            ? data
            : [];
      setTickets(list);
      setTotalPages(data?.totalPages ?? data?.TotalPages ?? 1);
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت‌ها");
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, status, queryKey]);

  const handleView = (ticketId) => {
    router.push(`/admin/tickets/${ticketId}`);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/tickets?${params.toString()}`);
  };

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="تیکت‌ها و پشتیبانی" subtitle="مشاهده و پاسخ به تیکت‌های کاربران" icon={MessageQuestion}>
        <TicketsFilters />
      </AdminPageHeader>
      <AdminSectionCard title="لیست تیکت‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <TicketsTable tickets={tickets} onView={handleView} />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
