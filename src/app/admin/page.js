"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Chart2,
  People,
  ShoppingCart,
  Box1,
  Wallet3,
  Star,
  MessageQuestion,
  SearchNormal1,
  MouseCircle,
  Bag2,
  TrendUp,
  Danger,
  ArrowLeft2,
  DocumentText,
} from "iconsax-reactjs";
import { adminAnalyticsService } from "@/services/admin/adminAnalyticsService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

function formatPercent(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `${Number(n).toFixed(2)}٪`;
}

const QUICK_LINKS = [
  { label: "سفارشات", href: "/admin/orders", icon: ShoppingCart, color: "text-emerald-400" },
  { label: "کاربران", href: "/admin/users", icon: People, color: "text-violet-400" },
  { label: "محصولات", href: "/admin/products/list", icon: Box1, color: "text-blue-400" },
  { label: "پرداخت‌ها", href: "/admin/payments", icon: Wallet3, color: "text-amber-400" },
  { label: "نظرات", href: "/admin/reviews", icon: Star, color: "text-yellow-400" },
  { label: "تیکت‌ها", href: "/admin/tickets", icon: MessageQuestion, color: "text-cyan-400" },
];

function StatCard({ icon: Icon, label, value, accent = "text-white", iconBg = "bg-gray-600/50" }) {
  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 p-4 hover:border-gray-500/50 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className={`text-xl md:text-2xl font-bold truncate ${accent}`}>{value}</p>
        </div>
        <div className={`${iconBg} p-2.5 rounded-xl shrink-0`}>
          <Icon size={22} className={accent} />
        </div>
      </div>
    </div>
  );
}

function SectionCard({ title, icon: Icon, children, emptyMessage = "داده‌ای موجود نیست" }) {
  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-600">
        <div className="p-2 rounded-lg bg-gray-600/50">
          <Icon size={20} className="text-amber-400" />
        </div>
        <h2 className="text-lg  text-white">{title}</h2>
      </div>
      <div className="p-4">
        {children ?? (
          <div className="flex flex-col items-center justify-center py-10 text-gray-500">
            <DocumentText size={40} className="mb-2 opacity-50" />
            <p className="text-sm">{emptyMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <DocumentText size={40} className="mb-2 opacity-50" />
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [summary, setSummary] = useState(null);
  const [userStats, setUserStats] = useState(null);
  const [popularTerms, setPopularTerms] = useState([]);
  const [noResultSearches, setNoResultSearches] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        const [summaryRes, userStatsRes, popularRes, noResultRes, topSellingRes] = await Promise.all([
          adminAnalyticsService.getSummary(),
          adminAnalyticsService.getUserStats(),
          adminAnalyticsService.getPopularSearchTerms(10),
          adminAnalyticsService.getNoResultSearches(10),
          adminAnalyticsService.getTopSellingProducts(10),
        ]);

        if (cancelled) return;
        const summaryData = unwrapApiData(summaryRes);
        const userStatsData = unwrapApiData(userStatsRes);
        const popularData = unwrapApiData(popularRes);
        const noResultData = unwrapApiData(noResultRes);
        const topSellingData = unwrapApiData(topSellingRes);
        setSummary(summaryData || null);
        setUserStats(userStatsData || null);
        setPopularTerms(Array.isArray(popularData) ? popularData : []);
        setNoResultSearches(Array.isArray(noResultData) ? noResultData : []);
        setTopSelling(Array.isArray(topSellingData) ? topSellingData : []);
      } catch (e) {
        if (!cancelled) {
          setSummary(null);
          setUserStats(null);
          setPopularTerms([]);
          setNoResultSearches([]);
          setTopSelling([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-4">
        <Spinner size="lg" />
        <p className="text-gray-400 text-sm">در حال بارگذاری داشبورد...</p>
      </div>
    );
  }

  const s = summary || {};
  const u = userStats || {};

  return (
    <div className="space-y-8 pb-8">
      {/* Hero */}
      <div className="relative rounded-2xl border border-gray-600 bg-gradient-to-b from-gray-700/50 to-gray-800/30 p-6 md:p-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500/80 to-transparent rounded-l-full" />
        <div className="relative">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">داشبورد</h1>
          <p className="text-gray-400 text-sm md:text-base">خلاصهٔ عملکرد و دسترسی سریع به بخش‌های پنل</p>
        </div>
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-3">دسترسی سریع</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 p-4 rounded-xl border border-gray-600 bg-gray-700/30 hover:bg-gray-700/50 hover:border-gray-500 transition-colors group"
              >
                <div className="p-2 rounded-lg bg-gray-600/50 group-hover:bg-gray-600">
                  <Icon size={20} className={item.color} />
                </div>
                <span className="text-sm font-medium text-white truncate">{item.label}</span>
                <ArrowLeft2
                  size={16}
                  className="text-gray-500 mr-auto shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* KPIs */}
      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-3">خلاصه آمار</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            icon={SearchNormal1}
            label="کل جستجوها"
            value={formatNum(s.totalSearches)}
            accent="text-blue-400"
            iconBg="bg-blue-500/10"
          />
          <StatCard
            icon={MouseCircle}
            label="کل کلیک‌ها"
            value={formatNum(s.totalClicks)}
            accent="text-cyan-400"
            iconBg="bg-cyan-500/10"
          />
          <StatCard
            icon={Bag2}
            label="کل خریدها"
            value={formatNum(s.totalPurchases)}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/10"
          />
          <StatCard
            icon={TrendUp}
            label="نرخ تبدیل"
            value={formatPercent(s.overallConversionRate)}
            accent="text-violet-400"
            iconBg="bg-violet-500/10"
          />
          <StatCard
            icon={MouseCircle}
            label="نرخ کلیک"
            value={formatPercent(s.overallClickRate)}
            accent="text-amber-400"
            iconBg="bg-amber-500/10"
          />
          <StatCard
            icon={SearchNormal1}
            label="عبارت‌های یکتا"
            value={formatNum(s.uniqueSearchTerms)}
            accent="text-pink-400"
            iconBg="bg-pink-500/10"
          />
          <StatCard
            icon={People}
            label="کل کاربران"
            value={formatNum(u.totalUsers)}
            accent="text-blue-400"
            iconBg="bg-blue-500/10"
          />
          <StatCard
            icon={People}
            label="کاربران فعال"
            value={formatNum(u.activeUsers)}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/10"
          />
          <StatCard
            icon={Danger}
            label="جستجو بدون نتیجه"
            value={formatNum(s.noResultSearches)}
            accent="text-amber-400"
            iconBg="bg-amber-500/10"
          />
        </div>
      </div>

      {/* Content sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="محصولات پرفروش" icon={Chart2}>
          {topSelling.length > 0 ? (
            <ul className="space-y-2">
              {topSelling.map((item, i) => (
                <li
                  key={item.asin || i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-600/50 hover:border-gray-600 transition-colors"
                >
                  <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-300">
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate">{item.title || item.asin || "—"}</p>
                    <p className="text-gray-500 text-xs mt-0.5">
                      ASIN: {item.asin || "—"} · بازدید {formatNum(item.viewCount)} · جستجو{" "}
                      {formatNum(item.searchCount)}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-emerald-400 text-sm font-medium">
                    {formatNum(item.purchaseCount)} خرید
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="داده‌ای برای محصولات پرفروش موجود نیست" />
          )}
        </SectionCard>

        <SectionCard title="محبوب‌ترین جستجوها" icon={SearchNormal1}>
          {popularTerms.length > 0 ? (
            <ul className="space-y-2">
              {popularTerms.map((term, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg bg-gray-800/40 border border-gray-600/50 hover:border-gray-600 transition-colors"
                >
                  <p className="text-white text-sm font-medium truncate flex-1">{term.searchTerm || "—"}</p>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-gray-400 text-xs">{formatNum(term.count)} بار</span>
                    <span className="text-cyan-400 text-xs">کلیک {formatPercent(term.clickRate)}</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="داده‌ای برای جستجوهای محبوب موجود نیست" />
          )}
        </SectionCard>
      </div>

      <SectionCard title="جستجوهای بدون نتیجه" icon={Danger}>
        {noResultSearches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {noResultSearches.map((item, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-2 p-3 rounded-lg bg-gray-800/40 border border-amber-500/20"
              >
                <p className="text-white text-sm truncate flex-1">{item.searchTerm || "—"}</p>
                <span className="text-amber-400/90 text-xs shrink-0">{formatNum(item.count)} بار</span>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState message="جستجوی بدون نتیجه‌ای ثبت نشده؛ کاتالوگ در وضعیت خوبی است." />
        )}
      </SectionCard>
    </div>
  );
}
