"use client";

import React from "react";
import Link from "next/link";
import { DollarSquare, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/admin/settings/pricing", label: "تنظیمات قیمت‌گذاری" },
  { href: "/admin/reports/products", label: "گزارش محصولات" },
  { href: "/admin/discounts/list", label: "لیست تخفیف‌ها" },
  { href: "/admin/inventory", label: "انبار و موجودی" },
  { href: "/admin/currency-rates", label: "نرخ ارز" },
];

export default function PricingHubAdminPage() {
  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[720px] mx-auto">
      <AdminPageHeader
        title="هاب قیمت‌گذاری"
        subtitle="فاز ۱۰ — میانبر به تنظیمات و گزارش‌های مرتبط (بدون تکرار منطق قیمت در فرانت)."
        icon={DollarSquare}
        actions={
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/integration">
              <ArrowLeft2 className="size-4 ml-1 rotate-180" variant="Linear" />
              یکپارچه‌سازی
            </Link>
          </Button>
        }
      />
      <div className="grid gap-3">
        {links.map((x) => (
          <Link
            key={x.href}
            href={x.href}
            className="flex items-center justify-between rounded-xl border border-border px-4 py-3 hover:bg-muted/40 transition-colors"
          >
            <span className="font-medium">{x.label}</span>
            <ArrowLeft2 className="size-4 rotate-180 opacity-60" variant="Linear" />
          </Link>
        ))}
      </div>
    </div>
  );
}
