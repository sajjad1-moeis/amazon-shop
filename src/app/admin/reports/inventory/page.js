"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";
import { ReportPageHeader, ReportStatCard } from "@/components/admin";
import { Box, Box1, Danger } from "iconsax-reactjs";

export default function InventoryReportsPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    totalStock: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    reportService
      .getInventoryReport()
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        if (data) {
          setReport({
            totalStock: data.totalStock ?? 0,
            lowStockCount: data.lowStockCount ?? 0,
            outOfStockCount: data.outOfStockCount ?? 0,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) toast.error(err?.message || "خطا در دریافت گزارش موجودی");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <ReportPageHeader title="گزارش موجودی" subtitle="وضعیت موجودی انبار و محصولات" icon={Box} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Spinner size="lg" />
          <p className="mt-3 text-sm">در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ReportStatCard
            icon={Box1}
            label="مجموع موجودی"
            value={report.totalStock}
            accent="text-blue-400"
            iconBg="bg-blue-500/15"
          />
          <ReportStatCard
            icon={Danger}
            label="موجودی کم"
            value={report.lowStockCount}
            accent="text-amber-400"
            iconBg="bg-amber-500/15"
          />
          <ReportStatCard
            icon={Danger}
            label="ناموجود"
            value={report.outOfStockCount}
            accent="text-red-400"
            iconBg="bg-red-500/15"
          />
        </div>
      )}
    </div>
  );
}
