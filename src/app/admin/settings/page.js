"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">تنظیمات</h1>
        <p className="text-gray-400">تنظیمات سیستم</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/admin/settings/general">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">تنظیمات عمومی</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">تنظیمات کلی سیستم</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/settings/payment">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">تنظیمات پرداخت</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">تنظیمات درگاه‌های پرداخت</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/settings/shipping">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">تنظیمات ارسال</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">تنظیمات روش‌های ارسال</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/settings/email">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">تنظیمات ایمیل</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">تنظیمات ارسال ایمیل</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

