"use client";

import React from "react";
import { Truck, Map, Chart } from "iconsax-reactjs";
import { AdminPageHeader, AdminCardLink } from "@/components/admin";

export default function ShippingPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="ارسال و حمل و نقل" subtitle="مدیریت روش‌های ارسال و مناطق" icon={Truck} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AdminCardLink href="/admin/shipping/methods" title="روش‌های ارسال" description="مدیریت روش‌های ارسال" icon={Truck} />
        <AdminCardLink href="/admin/shipping/zones" title="مناطق ارسال" description="مدیریت مناطق ارسال" icon={Map} />
        <AdminCardLink href="/admin/shipping/reports" title="گزارش ارسال‌ها" description="گزارشات و آمار ارسال" icon={Chart} />
      </div>
    </div>
  );
}

