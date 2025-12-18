"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import TicketsTable from "@/template/Admin/tickets/TicketsTable";
import TicketsFilters from "@/template/Admin/tickets/TicketsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { ticketService } from "@/services/ticket/ticketService";

export default function TicketsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const pageParam = searchParams.get("page");

  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(pageParam ? parseInt(pageParam) : 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const status = statusParam === "open" ? 1 : statusParam === "closed" ? 2 : undefined;

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) {
      setPageNumber(parseInt(page));
    } else {
      setPageNumber(1);
    }
  }, [searchParams]);

  const fetchTickets = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ticketService.getPaginated({
        pageNumber,
        pageSize,
        status,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setTickets(response.data.tickets || response.data || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.totalCount || 0);
      } else {
        toast.error(response.message || "خطا در دریافت تیکت‌ها");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت‌ها");
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, status, searchTerm]);

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
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeaderWithSearch title="تیکت ها" searchPlaceholder="جستجو نام" onSearchChange={setSearchTerm}>
          <TicketsFilters />
        </PageHeaderWithSearch>

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <TicketsTable tickets={tickets} onView={handleView} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
