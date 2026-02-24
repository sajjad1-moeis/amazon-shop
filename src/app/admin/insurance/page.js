"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import ShippingInsuranceFilters from "@/template/Admin/insurance/ShippingInsuranceFilters";
import ShippingInsuranceTable from "@/template/Admin/insurance/ShippingInsuranceTable";
import ProcessClaimModal from "@/template/Admin/insurance/ProcessClaimModal";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { adminShippingInsuranceService } from "@/services/admin/adminShippingInsuranceService";
import { unwrapApiData } from "@/services/api/client";

export default function AdminInsurancePage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const adminUserId = user?.id ?? user?.userId;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);

  const orderIdParam = searchParams.get("orderId");
  const userIdParam = searchParams.get("userId");
  const statusParam = searchParams.get("status");

  const fetchList = async () => {
    try {
      setLoading(true);
      const params = {};
      if (orderIdParam) params.orderId = parseInt(orderIdParam, 10);
      if (userIdParam) params.userId = parseInt(userIdParam, 10);
      if (statusParam) params.status = parseInt(statusParam, 10);
      const res = await adminShippingInsuranceService.getList(params);
      const data = unwrapApiData(res);
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message || "خطا در دریافت لیست بیمه‌ها");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [orderIdParam, userIdParam, statusParam]);

  const handleProcessClaim = async (claimId, body) => {
    if (adminUserId == null) {
      toast.error("شناسه ادمین یافت نشد");
      return;
    }
    try {
      setProcessLoading(true);
      await adminShippingInsuranceService.processClaim(claimId, adminUserId, body);
      toast.success("درخواست جبران با موفقیت پردازش شد");
      setProcessModalOpen(false);
      fetchList();
    } catch (e) {
      toast.error(e.message || "خطا در پردازش درخواست جبران");
    } finally {
      setProcessLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-lg md:text-xl text-gray-100">بیمه ارسال</h1>
        <Button
          variant="outline"
          className="border-gray-600 text-gray-200"
          onClick={() => setProcessModalOpen(true)}
        >
          پردازش درخواست جبران
        </Button>
      </div>

      <ShippingInsuranceFilters />

      {loading ? (
        <div className="p-8 text-center text-gray-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <ShippingInsuranceTable list={list} />
      )}

      <ProcessClaimModal
        open={processModalOpen}
        onOpenChange={setProcessModalOpen}
        onSubmit={handleProcessClaim}
        loading={processLoading}
      />
    </div>
  );
}
