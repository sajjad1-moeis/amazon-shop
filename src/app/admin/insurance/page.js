"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ShieldTick } from "iconsax-reactjs";
import ShippingInsuranceFilters from "@/template/Admin/insurance/ShippingInsuranceFilters";
import ShippingInsuranceTable from "@/template/Admin/insurance/ShippingInsuranceTable";
import ProcessClaimModal from "@/template/Admin/insurance/ProcessClaimModal";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { adminShippingInsuranceService } from "@/services/admin/adminShippingInsuranceService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function AdminInsurancePage() {
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const adminUserId = user?.id ?? user?.userId;

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const [processLoading, setProcessLoading] = useState(false);

  const orderIdParam = searchParams.get("orderId");
  const phoneNumberParam = searchParams.get("phoneNumber");
  const statusParam = searchParams.get("status");

  const fetchList = async () => {
    try {
      setLoading(true);
      const params = {};
      if (orderIdParam) params.orderId = parseInt(orderIdParam, 10);
      if (phoneNumberParam) params.phoneNumber = phoneNumberParam.trim();
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
  }, [orderIdParam, phoneNumberParam, statusParam]);

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
      <AdminPageHeader
        title="بیمه ارسال"
        subtitle="مدیریت درخواست‌های جبران خسارت ارسال"
        icon={ShieldTick}
        actions={
          <Button
            onClick={() => setProcessModalOpen(true)}
            className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-medium shadow-md"
          >
            <span>پردازش درخواست جبران</span>
          </Button>
        }
      >
        <ShippingInsuranceFilters />
      </AdminPageHeader>

      <AdminSectionCard title="لیست بیمه‌ها">
        {loading ? (
          <div className="p-12 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : list.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-400 mb-1">بیمه‌ای یافت نشد</p>
            <p className="text-gray-500 text-sm">با فیلترهای بالا جستجو کنید یا پس از ثبت بیمه توسط کاربران، اینجا نمایش داده می‌شود.</p>
          </div>
        ) : (
          <ShippingInsuranceTable list={list} />
        )}
      </AdminSectionCard>

      <ProcessClaimModal
        open={processModalOpen}
        onOpenChange={setProcessModalOpen}
        onSubmit={handleProcessClaim}
        loading={processLoading}
      />
    </div>
  );
}
