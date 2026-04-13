"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";
import { toFiniteAmount } from "@/utils/adminAmountUtils";
import { ReportPageHeader, ReportStatCard } from "@/components/admin";
import { Chart, Wallet3, ShoppingCart, Receipt2 } from "iconsax-reactjs";

export default function SalesReportsPage() {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState({
    todaySales: 0,
    monthSales: 0,
    totalOrders: 0,
    averageOrder: 0,
  });

  const fetchReport = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      const [todayRes, monthRes] = await Promise.all([
        reportService.getSalesReport({
          startDate: startOfDay.toISOString(),
          endDate: today.toISOString(),
        }),
        reportService.getSalesReport({
          startDate: startOfMonth.toISOString(),
          endDate: today.toISOString(),
        }),
      ]);

      const todayData = unwrapApiData(todayRes);
      const monthData = unwrapApiData(monthRes);

      if (todayData) {
        setReport((prev) => ({
          ...prev,
          todaySales: toFiniteAmount(todayData.totalSales ?? todayData.TotalSales, 0),
        }));
      }
      if (monthData) {
        const totalSales = toFiniteAmount(monthData.totalSales ?? monthData.TotalSales, 0);
        const totalOrders = toFiniteAmount(monthData.totalOrders ?? monthData.TotalOrders, 0);
        setReport((prev) => ({
          ...prev,
          monthSales: totalSales,
          totalOrders,
          averageOrder: totalOrders > 0 ? totalSales / totalOrders : 0,
        }));
      }
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت گزارش");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <ReportPageHeader title="گزارش فروش" subtitle="فروش روزانه، ماهانه و میانگین سفارش" icon={Chart} />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Spinner size="lg" />
          <p className="mt-3 text-sm">در حال بارگذاری...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ReportStatCard
            icon={Wallet3}
            label="فروش امروز"
            value={report.todaySales}
            suffix="تومان"
            accent="text-emerald-400"
            iconBg="bg-emerald-500/15"
          />
          <ReportStatCard
            icon={Chart}
            label="فروش این ماه"
            value={report.monthSales}
            suffix="تومان"
            accent="text-blue-400"
            iconBg="bg-blue-500/15"
          />
          <ReportStatCard
            icon={ShoppingCart}
            label="تعداد سفارشات"
            value={report.totalOrders}
            accent="text-violet-400"
            iconBg="bg-violet-500/15"
          />
          <ReportStatCard
            icon={Receipt2}
            label="میانگین سفارش"
            value={Math.round(report.averageOrder)}
            suffix="تومان"
            accent="text-amber-400"
            iconBg="bg-amber-500/15"
          />
        </div>
      )}
    </div>
  );
}
