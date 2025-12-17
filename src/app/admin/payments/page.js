"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import PaymentsTable from "@/template/Admin/payments/PaymentsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { paymentService } from "@/services/payment/paymentService";

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const status = statusParam === "success" ? 1 : statusParam === "failed" ? 2 : undefined;
      const response = await paymentService.getPaginated({
        pageNumber,
        pageSize,
        status,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        setPayments(response.data.payments || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت پرداخت‌ها");
      console.error("Error fetching payments:", error);
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
    fetchPayments();
  }, [pageNumber, searchTerm, statusParam]);

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeader
          title="پرداخت‌ها"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <PaymentsTable payments={payments} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
