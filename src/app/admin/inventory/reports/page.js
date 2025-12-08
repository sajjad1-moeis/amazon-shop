"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InventoryReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش موجودی</h1>
        <p className="text-gray-400">گزارشات و آمار موجودی</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">کل موجودی</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">1,234</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">موجودی کم</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">45</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">ناموجود</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">12</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

