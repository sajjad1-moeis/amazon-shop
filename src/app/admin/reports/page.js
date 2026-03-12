"use client";

import React from "react";
import Link from "next/link";
import { Chart, People, ShoppingBag, Wallet3, Truck, Box, ArrowLeft2 } from "iconsax-reactjs";

const REPORTS = [
  {
    href: "/admin/reports/sales",
    title: "گزارش فروش",
    description: "فروش روزانه، ماهانه و میانگین سفارش",
    icon: Chart,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    borderHover: "hover:border-emerald-500/50",
  },
  {
    href: "/admin/reports/users",
    title: "گزارش کاربران",
    description: "آمار کاربران و فعالیت‌های آن‌ها",
    icon: People,
    color: "violet",
    gradient: "from-violet-500/20 to-violet-600/5",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    borderHover: "hover:border-violet-500/50",
  },
  {
    href: "/admin/reports/products",
    title: "گزارش محصولات",
    description: "وضعیت محصولات و موجودی کاتالوگ",
    icon: ShoppingBag,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    borderHover: "hover:border-blue-500/50",
  },
  {
    href: "/admin/reports/financial",
    title: "گزارش مالی",
    description: "تراکنش‌ها، درآمد و جریان مالی",
    icon: Wallet3,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    borderHover: "hover:border-amber-500/50",
  },
  {
    href: "/admin/reports/shipping",
    title: "گزارش ارسال",
    description: "وضعیت ارسال و تحویل سفارش‌ها",
    icon: Truck,
    color: "cyan",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    iconBg: "bg-cyan-500/15",
    iconColor: "text-cyan-400",
    borderHover: "hover:border-cyan-500/50",
  },
  {
    href: "/admin/reports/inventory",
    title: "گزارش موجودی",
    description: "موجودی انبار و گردش کالا",
    icon: Box,
    color: "orange",
    gradient: "from-orange-500/20 to-orange-600/5",
    iconBg: "bg-orange-500/15",
    iconColor: "text-orange-400",
    borderHover: "hover:border-orange-500/50",
  },
];

export default function ReportsPage() {
  return (
    <div className="space-y-8 pb-8">
      {/* Hero */}
      <div className="relative rounded-2xl border border-gray-600/80 bg-gradient-to-br from-gray-700/60 via-gray-800/40 to-gray-900/30 p-6 md:p-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-violet-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative flex items-center gap-4">
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/20">
            <Chart size={32} className="text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">گزارشات و آمار</h1>
            <p className="text-gray-400 text-sm md:text-base">
              دسترسی به گزارش‌های فروش، کاربران، محصولات، مالی، ارسال و موجودی
            </p>
          </div>
        </div>
      </div>

      {/* Report Cards */}
      <div>
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">انتخاب گزارش</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REPORTS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative flex flex-col rounded-2xl border border-gray-600/80 bg-gradient-to-b from-gray-700/40 to-gray-800/20 p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 ${item.borderHover}`}
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none ${item.gradient}`} />
                <div className="relative flex items-start gap-4">
                  <div className={`p-3.5 rounded-xl ${item.iconBg} shrink-0`}>
                    <Icon size={28} className={item.iconColor} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                  </div>
                  <ArrowLeft2
                    size={20}
                    className="text-gray-500 group-hover:text-white group-hover:-translate-x-1 shrink-0 transition-all duration-300"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
