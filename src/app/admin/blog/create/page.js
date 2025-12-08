"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">پست جدید</h1>
        <p className="text-gray-400">ایجاد پست جدید برای وبلاگ</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">فرم ایجاد پست</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">این بخش در حال توسعه است</p>
        </CardContent>
      </Card>
    </div>
  );
}

