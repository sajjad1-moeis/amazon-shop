"use client";

import React from "react";
import { Setting2, Wallet3, Truck, Sms, MoneyRecive } from "iconsax-reactjs";
import { AdminPageHeader, AdminCardLink } from "@/components/admin";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="تنظیمات" subtitle="تنظیمات سیستم و ماژول‌ها" icon={Setting2} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AdminCardLink href="/admin/settings/general" title="تنظیمات عمومی" description="تنظیمات کلی سیستم" icon={Setting2} />
        <AdminCardLink href="/admin/settings/payment" title="تنظیمات پرداخت" description="تنظیمات درگاه‌های پرداخت" icon={Wallet3} />
        <AdminCardLink href="/admin/settings/shipping" title="تنظیمات ارسال" description="تنظیمات روش‌های ارسال" icon={Truck} />
        <AdminCardLink href="/admin/settings/email" title="تنظیمات ایمیل" description="تنظیمات ارسال ایمیل" icon={Sms} />
        <AdminCardLink href="/admin/settings/pricing" title="تنظیمات قیمت‌گذاری" description="درصد سود، هزینه حمل، طرح اقساط، قوانین قیمت و وزن" icon={MoneyRecive} />
      </div>
    </div>
  );
}

