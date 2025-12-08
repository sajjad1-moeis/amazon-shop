"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockOutPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">خروج کالا</h1>
        <p className="text-gray-400">ثبت خروج کالا از انبار</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">فرم خروج کالا</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">این بخش در حال توسعه است</p>
        </CardContent>
      </Card>
    </div>
  );
}

