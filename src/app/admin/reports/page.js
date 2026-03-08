"use client";

import React from "react";
import { Chart, People, ShoppingBag, Wallet3, Truck, Box, Timer } from "iconsax-reactjs";
import { AdminPageHeader, AdminCardLink } from "@/components/admin";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="گزارشات و آمار" subtitle="گزارشات و آمار سیستم" icon={Chart} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminCardLink href="/admin/reports/sales" title="گزارش فروش" description="گزارشات فروش و درآمد" icon={Chart} />
        <AdminCardLink href="/admin/reports/users" title="گزارش کاربران" description="گزارشات کاربران و فعالیت‌ها" icon={People} />
        <AdminCardLink href="/admin/reports/products" title="گزارش محصولات" description="گزارشات محصولات و موجودی" icon={ShoppingBag} />
        <AdminCardLink href="/admin/reports/financial" title="گزارش مالی" description="گزارشات مالی و تراکنش‌ها" icon={Wallet3} />
        <AdminCardLink href="/admin/reports/shipping" title="گزارش ارسال" description="گزارشات ارسال و تحویل" icon={Truck} />
        <AdminCardLink href="/admin/reports/inventory" title="گزارش موجودی" description="وضعیت موجودی انبار" icon={Box} />
        <AdminCardLink href="/admin/reports/rate-limits" title="گزارشات Rate Limit" description="گزارشات محدودیت درخواست‌ها" icon={Timer} />
      </div>
    </div>
  );
}

