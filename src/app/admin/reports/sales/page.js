"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";

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

      if (todayRes.success && todayRes.data) {
        setReport((prev) => ({
          ...prev,
          todaySales: todayRes.data.totalSales || 0,
        }));
      }

      if (monthRes.success && monthRes.data) {
        const totalSales = monthRes.data.totalSales || 0;
        const totalOrders = monthRes.data.totalOrders || 0;
        setReport((prev) => ({
          ...prev,
          monthSales: totalSales,
          totalOrders,
          averageOrder: totalOrders > 0 ? totalSales / totalOrders : 0,
        }));
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت گزارش");
      console.error("Error fetching sales report:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش فروش</h1>
        <p className="text-gray-400">گزارشات فروش و درآمد</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">فروش امروز</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">
                {report.todaySales.toLocaleString()} تومان
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">فروش این ماه</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">
                {report.monthSales.toLocaleString()} تومان
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">تعداد سفارشات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">{report.totalOrders.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-sm">میانگین سفارش</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">
                {Math.round(report.averageOrder).toLocaleString()} تومان
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

