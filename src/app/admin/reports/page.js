"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارشات و آمار</h1>
        <p className="text-gray-400">گزارشات و آمار سیستم</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/reports/sales">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">گزارش فروش</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">گزارشات فروش و درآمد</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/reports/users">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">گزارش کاربران</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">گزارشات کاربران و فعالیت‌ها</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/reports/products">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">گزارش محصولات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">گزارشات محصولات و موجودی</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/reports/financial">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">گزارش مالی</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">گزارشات مالی و تراکنش‌ها</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/reports/rate-limits">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">گزارشات Rate Limit</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">گزارشات محدودیت درخواست‌ها</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

