"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { ShieldSearch } from "iconsax-reactjs";
import QualityShieldFilters from "@/template/Admin/qualityShield/QualityShieldFilters";
import QualityShieldTable from "@/template/Admin/qualityShield/QualityShieldTable";
import StartInspectionModal from "@/template/Admin/qualityShield/StartInspectionModal";
import CompleteInspectionModal from "@/template/Admin/qualityShield/CompleteInspectionModal";
import { Spinner } from "@/components/ui/spinner";
import { adminQualityShieldService } from "@/services/admin/adminQualityShieldService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

export default function AdminQualityShieldPage() {
  const searchParams = useSearchParams();
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startModalOpen, setStartModalOpen] = useState(false);
  const [completeModalOpen, setCompleteModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

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
      const res = await adminQualityShieldService.getList(params);
      const data = unwrapApiData(res);
      setList(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message || "خطا در دریافت لیست سپر کیفیت");
      setList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, [orderIdParam, phoneNumberParam, statusParam]);

  const handleStartInspection = (service) => {
    setSelectedService(service);
    setStartModalOpen(true);
  };

  const handleCompleteInspection = (service) => {
    setSelectedService(service);
    setCompleteModalOpen(true);
  };

  const handleStartSubmit = async (serviceId, body) => {
    try {
      setActionLoading(true);
      await adminQualityShieldService.startInspection(serviceId, body);
      toast.success("بررسی با موفقیت شروع شد");
      setStartModalOpen(false);
      setSelectedService(null);
      fetchList();
    } catch (e) {
      toast.error(e.message || "خطا در شروع بررسی");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCompleteSubmit = async (serviceId, body) => {
    try {
      setActionLoading(true);
      await adminQualityShieldService.completeInspection(serviceId, body);
      toast.success("بررسی با موفقیت تکمیل شد");
      setCompleteModalOpen(false);
      setSelectedService(null);
      fetchList();
    } catch (e) {
      toast.error(e.message || "خطا در تکمیل بررسی");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="سپر کیفیت" subtitle="شروع و تکمیل بررسی کیفیت" icon={ShieldSearch}>
        <QualityShieldFilters />
      </AdminPageHeader>
      <AdminSectionCard title="لیست سرویس‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <QualityShieldTable
            list={list}
            onStartInspection={handleStartInspection}
            onCompleteInspection={handleCompleteInspection}
          />
        )}
      </AdminSectionCard>

      <StartInspectionModal
        open={startModalOpen}
        onOpenChange={setStartModalOpen}
        service={selectedService}
        onSubmit={handleStartSubmit}
        loading={actionLoading}
      />
      <CompleteInspectionModal
        open={completeModalOpen}
        onOpenChange={setCompleteModalOpen}
        service={selectedService}
        onSubmit={handleCompleteSubmit}
        loading={actionLoading}
      />
    </div>
  );
}
