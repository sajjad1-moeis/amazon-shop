"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ShippingZonesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">مناطق ارسال</h1>
        <p className="text-gray-400">مدیریت مناطق ارسال</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">مناطق فعال</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400">این بخش در حال توسعه است</p>
        </CardContent>
      </Card>
    </div>
  );
}

