"use client";

import React, { useState, useEffect, useMemo } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ReturnRequestsFilter from "@/template/Dashboard/ReturnRequests/ReturnRequestsFilter";
import ActiveReturnCard from "@/template/Dashboard/ReturnRequests/ActiveReturnCard";
import ReturnsTable from "@/template/Dashboard/ReturnRequests/ReturnsTable";
import { returnRequestService } from "@/services/returnRequest/returnRequestService";
import DashboardLayout from "@/layout/DashboardLayout";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import ViewAllTable from "@/components/ViewAllTable";
import { useAuth } from "@/contexts/AuthContext";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

const STATUS_MAP = {
  1: "pending",
  2: "approved",
  3: "rejected",
  4: "completed",
  5: "cancelled",
};

function mapApiReturn(r) {
  if (!r) return null;
  const rawStatus = r.status;
  const status =
    STATUS_MAP[Number(rawStatus)] ??
    STATUS_MAP[rawStatus] ??
    (typeof rawStatus === "string" ? rawStatus.toLowerCase() : rawStatus);
  const createdAt = r.createdAt ?? r.date;
  const dateStr = createdAt ? new Date(createdAt).toLocaleDateString("fa-IR") : "-";
  const category = (r.category ?? r.categoryName ?? r.product?.category ?? "").toString().toLowerCase().trim();
  return {
    ...r,
    id: r.id,
    status: status ?? "pending",
    date: dateStr,
    category: category || undefined,
  };
}

export default function ReturnRequestsList() {
  const { user } = useAuth();
  const userId = user?.id ?? user?.userId;

  const [returns, setReturns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    category: "",
    searchQuery: "",
  });

  const fetchReturns = () => {
    if (userId == null) return;
    setLoading(true);
    returnRequestService
      .getMyReturnRequests(userId)
      .then((res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data) ? data : data?.items ?? data?.returns ?? [];
        setReturns(list.map(mapApiReturn).filter(Boolean));
      })
      .catch((err) => {
        toast.error(err?.message ?? "خطا در دریافت درخواست‌های مرجوعی");
        setReturns([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchReturns();
  }, [userId]);

  const handleCancelReturn = async (returnId) => {
    if (!confirm("آیا از لغو این درخواست اطمینان دارید؟")) return;
    try {
      await returnRequestService.cancel(returnId);
      setReturns((prev) => prev.filter((r) => r.id !== returnId));
      toast.success("درخواست مرجوعی لغو شد");
    } catch (err) {
      toast.error(err?.message ?? "خطا در لغو درخواست");
    }
  };

  const filteredReturns = useMemo(() => {
    let list = [...returns];
    if (filters.status && filters.status !== "all") {
      const statusLower = String(filters.status).toLowerCase();
      list = list.filter((r) => String(r.status ?? "").toLowerCase() === statusLower);
    }
    if (filters.category && filters.category !== "all") {
      const catLower = String(filters.category).toLowerCase();
      list = list.filter((r) => String(r.category ?? "").toLowerCase() === catLower);
    }
    if (filters.searchQuery?.trim()) {
      const q = filters.searchQuery.trim().toLowerCase();
      list = list.filter(
        (r) =>
          String(r.id ?? "").toLowerCase().includes(q) ||
          String(r.returnNumber ?? "").toLowerCase().includes(q) ||
          String(r.orderNumber ?? "").toLowerCase().includes(q) ||
          String(r.productName ?? r.product?.name ?? "").toLowerCase().includes(q)
      );
    }
    if (filters.sortBy === "newest") {
      list.sort((a, b) => new Date(b.createdAt ?? 0) - new Date(a.createdAt ?? 0));
    } else if (filters.sortBy === "oldest") {
      list.sort((a, b) => new Date(a.createdAt ?? 0) - new Date(b.createdAt ?? 0));
    }
    return list;
  }, [returns, filters]);

  const activeReturn = useMemo(() => {
    return filteredReturns.find((r) => r.status === "pending" || r.status === "approved");
  }, [filteredReturns]);

  const ReturnBtn = () => (
    <Link href="/dashboard/return-requests/new">
      <Button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 gap-2 max-md:w-full">
        ثبت درخواست جدید
        <Add size={20} />
      </Button>
    </Link>
  );

  if (userId == null) {
    return (
      <DashboardLayout>
        <div className="p-6 text-center text-gray-500 dark:text-dark-text">برای مشاهده درخواست‌های مرجوعی وارد شوید.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <PageHeader
        title="درخواستهای مرجوعی"
        description="تمام درخواستهایی که برای مرجوعی کالا ثبت کرده اید در این بخش قابل مشاهده و پیگیری هستند"
        actionButton={
          <div className="md:hidden">
            <ReturnBtn />
          </div>
        }
      >
        <div className="max-md:hidden">
          <ReturnBtn />
        </div>
      </PageHeader>

      <ReturnRequestsFilter
        filters={filters}
        onFiltersChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
      />

      {activeReturn && (
        <div className="my-8">
          <ActiveReturnCard returnData={activeReturn} onCancel={handleCancelReturn} />
        </div>
      )}

      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-4">
        <h2 className="text-lg text-gray-900 dark:text-white mb-6">لیست درخواستهای مرجوعی</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <ReturnsTable returns={filteredReturns} onCancel={handleCancelReturn} />
            <ViewAllTable className="xl:hidden mt-8" />
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
