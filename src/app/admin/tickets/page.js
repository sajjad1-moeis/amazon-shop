"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import TicketsTable from "@/template/Admin/tickets/TicketsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { ticketService } from "@/services/ticket/ticketService";

export default function TicketsPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const status = statusParam === "open" ? 1 : statusParam === "closed" ? 2 : undefined;
      const response = await ticketService.getPaginated({
        pageNumber,
        pageSize,
        status,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setTickets(response.data.tickets || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تیکت‌ها");
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchTickets();
  }, [pageNumber, searchTerm, statusParam]);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch
          title="تیکت ها"
          searchPlaceholder="جستجو نام"
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <TicketsTable tickets={tickets} />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

