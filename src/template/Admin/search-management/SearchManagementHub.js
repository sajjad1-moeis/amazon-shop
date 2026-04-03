"use client";

import React from "react";
import Link from "next/link";
import {
  Chart,
  ArrowSwapHorizontal,
  Routing,
  Category2,
  CloseCircle,
  TickCircle,
  DocumentText,
} from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

const CARDS = [
  {
    href: "/admin/search/reports",
    title: "گزارش‌های جستجو",
    description: "کم‌کلیک و بدون خرید؛ پرجستجو و بدون نتیجه در آنالیتیکس داشبورد",
    icon: Chart,
    gradient: "from-violet-500/20 to-violet-600/5",
    borderHover: "hover:border-violet-500/45",
  },
  {
    href: "/admin/search/synonyms",
    title: "مترادف‌ها",
    description: "نگاشت عبارت کاربر به عبارت کانونیکال قبل از جستجو",
    icon: ArrowSwapHorizontal,
    gradient: "from-sky-500/20 to-sky-600/5",
    borderHover: "hover:border-sky-500/45",
  },
  {
    href: "/admin/search/redirects",
    title: "ریدایرکت جستجو",
    description: "هدایت دقیق یک عبارت به مسیر SPA",
    icon: Routing,
    gradient: "from-amber-500/20 to-amber-600/5",
    borderHover: "hover:border-amber-500/45",
  },
  {
    href: "/admin/search/category-landings",
    title: "دسته و لندینگ",
    description: "اتصال عبارت به دسته یا اسلاگ لندینگ",
    icon: Category2,
    gradient: "from-emerald-500/20 to-emerald-600/5",
    borderHover: "hover:border-emerald-500/45",
  },
  {
    href: "/admin/search/blacklist",
    title: "لیست سیاه",
    description: "مسدود کردن عبارات (مگر در لیست سفید)",
    icon: CloseCircle,
    gradient: "from-rose-500/20 to-rose-600/5",
    borderHover: "hover:border-rose-500/45",
  },
  {
    href: "/admin/search/whitelist",
    title: "لیست سفید",
    description: "استثنا از مسدودیت لیست سیاه",
    icon: TickCircle,
    gradient: "from-teal-500/20 to-teal-600/5",
    borderHover: "hover:border-teal-500/45",
  },
];

export default function SearchManagementHub() {
  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        title="مدیریت جستجو"
        subtitle="قوانین مترادف، ریدایرکت، دسته، لیست سیاه/سفید و گزارش‌های رفتار جستجو"
        icon={DocumentText}
      />
      <p className="text-sm text-gray-400 -mt-4">
        گزارش‌های «پرجستجو» و «بدون نتیجه» از مسیر{" "}
        <Link href="/admin" className="text-amber-400 hover:underline">
          داشبورد ادمین
        </Link>{" "}
        (آنالیتیکس) قابل مشاهده‌اند.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className={`group relative overflow-hidden rounded-2xl border border-gray-600/80 bg-gradient-to-br ${c.gradient} to-gray-900/40 p-5 transition-colors ${c.borderHover}`}
            >
              <div className="flex items-start gap-3">
                <div className="rounded-xl bg-gray-800/60 p-2.5 ring-1 ring-gray-600/50">
                  <Icon size={22} className="text-amber-400" variant="Bold" />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-base font-semibold text-white group-hover:text-amber-100">{c.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{c.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
