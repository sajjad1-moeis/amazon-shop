"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">ارسال و حمل و نقل</h1>
        <p className="text-gray-400">مدیریت روش‌های ارسال و مناطق</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/shipping/methods">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">روش‌های ارسال</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">مدیریت روش‌های ارسال</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/shipping/zones">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">مناطق ارسال</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">مدیریت مناطق ارسال</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/shipping/reports">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">گزارش ارسال‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">گزارشات و آمار ارسال</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

