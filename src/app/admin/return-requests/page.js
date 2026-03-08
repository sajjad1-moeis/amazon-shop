"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { RotateRight } from "iconsax-reactjs";
import ReturnRequestsTable from "@/template/Admin/returnRequests/ReturnRequestsTable";
import ReturnRequestsFilters from "@/template/Admin/returnRequests/ReturnRequestsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { returnRequestService } from "@/services/returnRequest/returnRequestService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function ReturnRequestsPage() {
  const searchParams = useSearchParams();
  const statusParam = searchParams.get("status");
  const [returnRequests, setReturnRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [refundDialogOpen, setRefundDialogOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [refundLoading, setRefundLoading] = useState(false);

  const fetchReturnRequests = async () => {
    try {
      setLoading(true);
      let response;
      if (statusParam) {
        response = await returnRequestService.getByStatus(parseInt(statusParam));
      } else {
        response = await returnRequestService.getAll();
      }
      if (response.success && response.data) {
        const raw = response.data;
        let filtered = Array.isArray(raw) ? raw : (raw?.returnRequests ?? []);
        if (searchTerm.trim()) {
          const term = searchTerm.trim().toLowerCase();
          const match = (s) => s && String(s).toLowerCase().includes(term);
          const matchPhone = (s) => s && String(s).replace(/\s/g, "").includes(term.replace(/\s/g, ""));
          filtered = filtered.filter(
            (request) =>
              match(request.returnNumber) ||
              match(request.orderNumber) ||
              match(request.customerName) ||
              match(request.userFullName) ||
              match(request.userName) ||
              match(request.recipientName) ||
              matchPhone(request.userPhoneNumber) ||
              matchPhone(request.phoneNumber) ||
              matchPhone(request.mobile) ||
              match(request.description)
          );
        }
        const startIndex = (pageNumber - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        setReturnRequests(filtered.slice(startIndex, endIndex));
        setTotalPages(Math.ceil(filtered.length / pageSize));
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت درخواست‌های مرجوعی");
      console.error("Error fetching return requests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [statusParam, searchTerm]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        let response;
        if (statusParam) {
          response = await returnRequestService.getByStatus(parseInt(statusParam));
        } else {
          response = await returnRequestService.getAll();
        }
        if (cancelled) return;
        if (response.success && response.data) {
          const raw = response.data;
          let filtered = Array.isArray(raw) ? raw : (raw?.returnRequests ?? []);
          if (searchTerm.trim()) {
            const term = searchTerm.trim().toLowerCase();
            const match = (s) => s && String(s).toLowerCase().includes(term);
            const matchPhone = (s) => s && String(s).replace(/\s/g, "").includes(term.replace(/\s/g, ""));
            filtered = filtered.filter(
              (request) =>
                match(request.returnNumber) ||
                match(request.orderNumber) ||
                match(request.customerName) ||
                match(request.userFullName) ||
                match(request.userName) ||
                match(request.recipientName) ||
                matchPhone(request.userPhoneNumber) ||
                matchPhone(request.phoneNumber) ||
                matchPhone(request.mobile) ||
                match(request.description)
            );
          }
          const startIndex = (pageNumber - 1) * pageSize;
          const endIndex = startIndex + pageSize;
          setReturnRequests(filtered.slice(startIndex, endIndex));
          setTotalPages(Math.ceil(filtered.length / pageSize));
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "خطا در دریافت درخواست‌های مرجوعی");
          console.error("Error fetching return requests:", error);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [pageNumber, statusParam, searchTerm, pageSize]);

  const handleApprove = async (id, finalRefundAmount) => {
    const amount = finalRefundAmount ?? Number(prompt("مبلغ نهایی بازگشت (تومان) را وارد کنید:") || "0");
    if (!amount || amount <= 0) {
      toast.error("مبلغ بازگشت باید بزرگ‌تر از صفر باشد");
      return;
    }
    try {
      const response = await returnRequestService.approve(id, {
        finalRefundAmount: amount,
      });
      if (response.success) {
        toast.success("درخواست مرجوعی با موفقیت تایید شد");
        fetchReturnRequests();
      }
    } catch (error) {
      toast.error(error.message || "خطا در تایید درخواست");
    }
  };

  const handleReject = async (id, reason) => {
    if (!reason) {
      reason = prompt("لطفاً دلیل رد درخواست را وارد کنید:");
      if (!reason) return;
    }
    try {
      const response = await returnRequestService.reject(id, { rejectionReason: reason });
      if (response.success) {
        toast.success("درخواست مرجوعی با موفقیت رد شد");
        fetchReturnRequests();
      }
    } catch (error) {
      toast.error(error.message || "خطا در رد درخواست");
    }
  };

  const handleProcessRefund = (id) => {
    setSelectedRequestId(id);
    setRefundDialogOpen(true);
  };

  const handleRefundConfirm = async () => {
    if (!selectedRequestId) return;

    setRefundLoading(true);
    try {
      const response = await returnRequestService.processRefund(selectedRequestId);
      if (response.success) {
        toast.success("مبلغ مرجوعی با موفقیت پرداخت شد");
        setRefundDialogOpen(false);
        setSelectedRequestId(null);
        fetchReturnRequests();
      }
    } catch (error) {
      toast.error(error.message || "خطا در پرداخت مبلغ مرجوعی");
    } finally {
      setRefundLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="درخواست‌های مرجوعی" subtitle="تأیید، رد و پرداخت مرجوعی" icon={RotateRight}>
        <ReturnRequestsFilters />
      </AdminPageHeader>
      <AdminSectionCard title="لیست درخواست‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ReturnRequestsTable
              returnRequests={returnRequests}
              onApprove={handleApprove}
              onReject={handleReject}
              onProcessRefund={handleProcessRefund}
            />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </AdminSectionCard>

      <ConfirmDialog
        open={refundDialogOpen}
        onOpenChange={setRefundDialogOpen}
        title="پرداخت مبلغ مرجوعی"
        description="آیا از پرداخت مبلغ مرجوعی اطمینان دارید؟"
        confirmText="پرداخت"
        onConfirm={handleRefundConfirm}
        loading={refundLoading}
        variant="default"
      />
    </div>
  );
}
