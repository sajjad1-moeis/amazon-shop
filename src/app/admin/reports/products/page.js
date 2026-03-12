"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";
import { ReportPageHeader, ReportStatCard } from "@/components/admin";
import { ShoppingBag, Box1, Chart2 } from "iconsax-reactjs";

export default function ProductsReportsPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    totalProducts: 0,
    soldCount: 0,
    topSellingCount: 0,
  });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    const end = new Date();
    const start = new Date(end);
    start.setMonth(start.getMonth() - 1);

    reportService
      .getProductsReport({
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      })
      .then((res) => {
        if (cancelled) return;
        const data = unwrapApiData(res);
        if (data) {
          setReport({
            totalProducts: data.totalProducts ?? 0,
            soldCount: data.soldCount ?? 0,
            topSellingCount: data.topSellingCount ?? 0,
          });
        }
      })
      .catch((err) => {
        if (!cancelled) toast.error(err?.message || "خطا در دریافت گزارش محصولات");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <ReportPageHeader title="گزارش محصولات" subtitle="وضعیت محصولات و موجودی کاتالوگ" icon={ShoppingBag} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Spinner size="lg" />
          <p className="mt-3 text-sm">در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <ReportStatCard
            icon={Box1}
            label="کل محصولات"
            value={report.totalProducts}
            accent="text-blue-400"
            iconBg="bg-blue-500/15"
          />
          <ReportStatCard
            icon={ShoppingBag}
            label="محصولات فروخته شده (بازه)"
            value={report.soldCount}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/15"
          />
          <ReportStatCard
            icon={Chart2}
            label="محصولات پرفروش"
            value={report.topSellingCount}
            accent="text-amber-400"
            iconBg="bg-amber-500/15"
          />
        </div>
      )}
    </div>
  );
}
