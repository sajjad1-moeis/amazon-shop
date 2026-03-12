"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";
import { ReportPageHeader, ReportStatCard } from "@/components/admin";
import { People, UserTick, UserAdd } from "iconsax-reactjs";

export default function UsersReportsPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    totalUsers: 0,
    activeUsers: 0,
    newUsersThisMonth: 0,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    reportService
      .getUsersReport({
        startDate: startOfMonth.toISOString(),
        endDate: new Date().toISOString(),
      })
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        if (data) {
          setReport({
            totalUsers: data.totalUsers ?? 0,
            activeUsers: data.activeUsers ?? 0,
            newUsersThisMonth: data.newUsersThisMonth ?? 0,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) toast.error(err?.message || "خطا در دریافت گزارش کاربران");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <ReportPageHeader title="گزارش کاربران" subtitle="آمار کاربران و فعالیت‌ها" icon={People} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Spinner size="lg" />
          <p className="mt-3 text-sm">در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ReportStatCard
            icon={People}
            label="کل کاربران"
            value={report.totalUsers}
            accent="text-blue-400"
            iconBg="bg-blue-500/15"
          />
          <ReportStatCard
            icon={UserTick}
            label="کاربران فعال"
            value={report.activeUsers}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/15"
          />
          <ReportStatCard
            icon={UserAdd}
            label="کاربران جدید (این ماه)"
            value={report.newUsersThisMonth}
            accent="text-violet-400"
            iconBg="bg-violet-500/15"
          />
        </div>
      )}
    </div>
  );
}
