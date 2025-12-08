"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FinancialReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش مالی</h1>
        <p className="text-gray-400">گزارشات مالی و تراکنش‌ها</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">درآمد کل</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">2.5B تومان</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">هزینه‌ها</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">1.2B تومان</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">سود خالص</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">1.3B تومان</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

