"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Wallet3 } from "iconsax-reactjs";
import PaymentsTable from "@/template/Admin/payments/PaymentsTable";
import PaymentsFilters from "@/template/Admin/payments/PaymentsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { paymentService } from "@/services/payment/paymentService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function PaymentsPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const statusFilter =
    statusParam && statusParam !== "all"
      ? statusParam === "success"
        ? 1
        : statusParam === "failed"
          ? 2
          : statusParam === "pending"
            ? 3
            : statusParam === "refund"
              ? "refund"
              : undefined
      : undefined;
  const searchTerm = searchParams.get("search") || "";
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, statusFilter]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const response = await paymentService.getPaginated({
          pageNumber,
          pageSize,
          status: statusFilter,
          searchTerm: searchTerm || undefined,
        });

        if (cancelled) return;
        if (response.success && response.data) {
          setPayments(response.data.payments || response.data || []);
          setTotalPages(response.data.totalPages || 1);
        } else {
          setPayments([]);
          setTotalPages(1);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "خطا در دریافت پرداخت‌ها");
          console.error("Error fetching payments:", error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [pageNumber, pageSize, searchTerm, statusFilter]);

  return (
    <div className="space-y-6">
      <AdminPageHeader title="پرداخت‌ها" subtitle="مشاهده تراکنش‌ها و وضعیت پرداخت" icon={Wallet3}>
        <PaymentsFilters />
      </AdminPageHeader>
      <AdminSectionCard title="لیست پرداخت‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <PaymentsTable payments={payments} />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
