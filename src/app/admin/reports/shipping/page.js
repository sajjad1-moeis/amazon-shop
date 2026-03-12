"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";
import { ReportPageHeader, ReportStatCard } from "@/components/admin";
import { Truck, TruckTick, TruckFast } from "iconsax-reactjs";

export default function ShippingReportsPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    totalShipments: 0,
    successfulShipments: 0,
    inTransit: 0,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - 1);

    reportService
      .getShippingReport({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      })
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        if (data) {
          setReport({
            totalShipments: data.totalShipments ?? 0,
            successfulShipments: data.successfulShipments ?? 0,
            inTransit: data.inTransit ?? 0,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) toast.error(err?.message || "خطا در دریافت گزارش ارسال");
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
      <ReportPageHeader title="گزارش ارسال" subtitle="وضعیت ارسال و تحویل سفارش‌ها" icon={Truck} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Spinner size="lg" />
          <p className="mt-3 text-sm">در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ReportStatCard
            icon={Truck}
            label="کل ارسال‌ها"
            value={report.totalShipments}
            accent="text-blue-400"
            iconBg="bg-blue-500/15"
          />
          <ReportStatCard
            icon={TruckTick}
            label="تحویل‌شده"
            value={report.successfulShipments}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/15"
          />
          <ReportStatCard
            icon={TruckFast}
            label="در حال ارسال"
            value={report.inTransit}
            accent="text-amber-400"
            iconBg="bg-amber-500/15"
          />
        </div>
      )}
    </div>
  );
}
