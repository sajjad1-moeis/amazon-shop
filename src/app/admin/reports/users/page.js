"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { reportService } from "@/services/report/reportService";
import { unwrapApiData } from "@/services/api/client";

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
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش کاربران</h1>
        <p className="text-gray-400">گزارشات کاربران و فعالیت‌ها</p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-gray-400">
          <Spinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">کل کاربران</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.totalUsers.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">کاربران فعال</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.activeUsers.toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white text-lg">کاربران جدید (بازه انتخابی)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-white">{report.newUsersThisMonth.toLocaleString()}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

