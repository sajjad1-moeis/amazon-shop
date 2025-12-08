"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SalesReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش فروش</h1>
        <p className="text-gray-400">گزارشات فروش و درآمد</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">فروش امروز</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">12.5M تومان</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">فروش این ماه</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">245M تومان</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">تعداد سفارشات</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">میانگین سفارش</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-white">198K تومان</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

