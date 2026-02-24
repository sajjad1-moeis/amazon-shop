"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import CurrencyServicesFilters from "@/template/Admin/currencyServices/CurrencyServicesFilters";
import CurrencyServicesTable from "@/template/Admin/currencyServices/CurrencyServicesTable";
import UpdateRequestStatusModal from "@/template/Admin/currencyServices/UpdateRequestStatusModal";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { currencyService } from "@/services/currency/currencyService";
import { unwrapApiData } from "@/services/api/client";

export default function CurrencyServicesPage() {
  const searchParams = useSearchParams();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const searchTerm = searchParams.get("search") || "";
  const statusParam = searchParams.get("status");
  const serviceTypeParam = searchParams.get("serviceType");
  const userIdParam = searchParams.get("userId");

  const fetchList = async () => {
    try {
      setLoading(true);
      const params = { pageNumber, pageSize, searchTerm: searchTerm || undefined };
      if (statusParam) params.status = parseInt(statusParam, 10);
      if (serviceTypeParam) params.serviceType = parseInt(serviceTypeParam, 10);
      if (userIdParam) params.userId = parseInt(userIdParam, 10);
      const res = await currencyService.getPaginated(params);
      const data = unwrapApiData(res);
      setRequests(Array.isArray(data?.requests) ? data.requests : []);
      setTotalPages(data?.totalPages ?? 1);
    } catch (e) {
      toast.error(e.message || "خطا در دریافت درخواست‌ها");
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [searchTerm, statusParam, serviceTypeParam, userIdParam]);

  useEffect(() => {
    fetchList();
  }, [pageNumber, pageSize, searchTerm, statusParam, serviceTypeParam, userIdParam]);

  const handleUpdateStatus = (request) => {
    setSelectedRequest(request);
    setStatusModalOpen(true);
  };

  const handleStatusSubmit = async (requestId, body) => {
    try {
      setActionLoading(true);
      await currencyService.updateRequestStatus(requestId, body);
      toast.success("وضعیت با موفقیت به‌روز شد");
      setStatusModalOpen(false);
      setSelectedRequest(null);
      fetchList();
    } catch (e) {
      toast.error(e.message || "خطا در به‌روزرسانی وضعیت");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-lg md:text-xl text-gray-100">درخواست‌های سرویس ارز</h1>
      <CurrencyServicesFilters />

      {loading ? (
        <div className="p-8 text-center text-gray-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <>
          <CurrencyServicesTable requests={requests} onUpdateStatus={handleUpdateStatus} />
          <div className="pt-4 border-t border-gray-700">
            <AdminPagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={setPageNumber}
            />
          </div>
        </>
      )}

      <UpdateRequestStatusModal
        open={statusModalOpen}
        onOpenChange={setStatusModalOpen}
        request={selectedRequest}
        onSubmit={handleStatusSubmit}
        loading={actionLoading}
      />
    </div>
  );
}
