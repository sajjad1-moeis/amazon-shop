"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ReturnRequestsTable from "@/template/Admin/returnRequests/ReturnRequestsTable";
import ReturnRequestsFilters from "@/template/Admin/returnRequests/ReturnRequestsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { returnRequestService } from "@/services/returnRequest/returnRequestService";

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
        let filtered = response.data;
        if (searchTerm) {
          filtered = filtered.filter(
            (request) =>
              request.returnNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              request.orderNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              request.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              request.userFullName?.toLowerCase().includes(searchTerm.toLowerCase())
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
    fetchReturnRequests();
  }, [pageNumber, searchParams, statusParam]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchParams, statusParam]);

  const handleApprove = async (id) => {
    try {
      const response = await returnRequestService.approve(id);
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
      const response = await returnRequestService.reject(id, reason);
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
      <div className="">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">درخواست‌های مرجوعی</h1>
          <ReturnRequestsFilters />
        </div>

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
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>

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
