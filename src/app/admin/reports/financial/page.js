"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";
import { ReportPageHeader, ReportStatCard } from "@/components/admin";
import { Wallet3, MoneySend, TrendUp } from "iconsax-reactjs";

export default function FinancialReportsPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    totalRevenue: 0,
    totalCosts: 0,
    netProfit: 0,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - 1);

    reportService
      .getFinancialReport({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      })
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        if (data) {
          setReport({
            totalRevenue: data.totalRevenue ?? 0,
            totalCosts: data.totalCosts ?? 0,
            netProfit: data.netProfit ?? 0,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) toast.error(err?.message || "خطا در دریافت گزارش مالی");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <ReportPageHeader title="گزارش مالی" subtitle="تراکنش‌ها، درآمد و جریان مالی" icon={Wallet3} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Spinner size="lg" />
          <p className="mt-3 text-sm">در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ReportStatCard
            icon={TrendUp}
            label="درآمد کل"
            value={report.totalRevenue}
            suffix="تومان"
            accent="text-emerald-400"
            iconBg="bg-emerald-500/15"
          />
          <ReportStatCard
            icon={MoneySend}
            label="هزینه‌ها"
            value={report.totalCosts}
            suffix="تومان"
            accent="text-amber-400"
            iconBg="bg-amber-500/15"
          />
          <ReportStatCard
            icon={Wallet3}
            label="سود خالص"
            value={report.netProfit}
            suffix="تومان"
            accent="text-blue-400"
            iconBg="bg-blue-500/15"
          />
        </div>
      )}
    </div>
  );
}
