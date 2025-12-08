"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش ارسال‌ها</h1>
        <p className="text-gray-400">گزارشات و آمار ارسال</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">کل ارسال‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">ارسال‌های موفق</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">1,156</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">در حال ارسال</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">78</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

