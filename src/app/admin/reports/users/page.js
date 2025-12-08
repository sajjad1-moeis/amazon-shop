"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UsersReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">گزارش کاربران</h1>
        <p className="text-gray-400">گزارشات کاربران و فعالیت‌ها</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">کل کاربران</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">2,456</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">کاربران فعال</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">1,890</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white text-lg">کاربران جدید (ماه)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-white">234</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

