"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش ارسال</h1>
        <p className="text-gray-400">گزارشات ارسال و تحویل</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">کل ارسال‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.totalShipments.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">تحویل‌شده</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.successfulShipments.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">در حال ارسال</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.inTransit.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
