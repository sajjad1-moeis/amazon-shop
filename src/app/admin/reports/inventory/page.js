"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش موجودی</h1>
        <p className="text-gray-400">وضعیت موجودی انبار و محصولات</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">مجموع موجودی</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.totalStock.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">موجودی کم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-amber-400">{report.lowStockCount.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">ناموجود</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-red-400">{report.outOfStockCount.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
