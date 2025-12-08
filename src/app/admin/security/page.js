"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">امنیت</h1>
        <p className="text-gray-400">مدیریت امنیت سیستم</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/security/logs">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">لاگ‌های سیستم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">مشاهده لاگ‌های سیستم</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/security/permissions">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">دسترسی‌ها</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">مدیریت دسترسی‌ها</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/admin/security/admins">
          <Card className="bg-gray-800 border-gray-700 hover:bg-gray-700/50 cursor-pointer transition-colors">
            <CardHeader>
              <CardTitle className="text-white">کاربران ادمین</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">مدیریت کاربران ادمین</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}

