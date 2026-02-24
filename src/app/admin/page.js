"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, MousePointer, ShoppingCart, TrendingUp, AlertCircle } from "lucide-react";
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
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[320px]">
        <Spinner size="lg" />
      </div>
    );
  }

  const s = summary || {};
  const u = userStats || {};

  const statCards = [
    { title: "کل جستجوها", value: formatNum(s.totalSearches), icon: Search, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { title: "کل کلیک‌ها", value: formatNum(s.totalClicks), icon: MousePointer, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    { title: "کل خریدها", value: formatNum(s.totalPurchases), icon: ShoppingCart, color: "text-green-500", bgColor: "bg-green-500/10" },
    { title: "نرخ تبدیل", value: formatPercent(s.overallConversionRate), icon: TrendingUp, color: "text-purple-500", bgColor: "bg-purple-500/10" },
    { title: "نرخ کلیک", value: formatPercent(s.overallClickRate), icon: MousePointer, color: "text-orange-500", bgColor: "bg-orange-500/10" },
    { title: "عبارت‌های یکتا", value: formatNum(s.uniqueSearchTerms), icon: Search, color: "text-pink-500", bgColor: "bg-pink-500/10" },
    { title: "کل کاربران", value: formatNum(u.totalUsers), icon: Users, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { title: "کاربران فعال", value: formatNum(u.activeUsers), icon: Users, color: "text-green-500", bgColor: "bg-green-500/10" },
    { title: "جستجو بدون نتیجه", value: formatNum(s.noResultSearches), icon: AlertCircle, color: "text-amber-500", bgColor: "bg-amber-500/10" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl lg:text-3xl text-white mb-2">داشبورد ادمین</h1>
        <p className="max-md:text-sm text-gray-400">خوش آمدید به پنل مدیریت فروشگاه</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-gray-800 border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 p-2">
                <CardTitle className="text-sm font-medium text-gray-300">{stat.title}</CardTitle>
                <div className={`${stat.bgColor} p-2 rounded-lg`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent className="p-2">
                <div className="text-xl md:text-2xl text-white mb-1">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="p-3">
            <CardTitle className="text-xl md:text-2xl text-white mb-2 font-medium">محصولات پرفروش</CardTitle>
            <CardDescription className="text-gray-400">بر اساس آمار جستجو و خرید</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            {topSelling.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">داده‌ای موجود نیست</p>
            ) : (
              <div className="space-y-3 mt-3">
                {topSelling.map((item, i) => (
                  <div key={item.asin || i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{item.title || item.asin || "—"}</p>
                      <p className="text-gray-400 text-xs mt-1">ASIN: {item.asin || "—"} · بازدید: {formatNum(item.viewCount)} · جستجو: {formatNum(item.searchCount)}</p>
                    </div>
                    <div className="text-left mr-3 flex-shrink-0">
                      <p className="text-white text-sm font-medium">{formatNum(item.purchaseCount)} خرید</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="p-3">
            <CardTitle className="text-xl md:text-2xl text-white mb-2 font-medium">محبوب‌ترین جستجوها</CardTitle>
            <CardDescription className="text-gray-400">عبارت‌های جستجوی پرتکرار</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            {popularTerms.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">داده‌ای موجود نیست</p>
            ) : (
              <div className="space-y-3 mt-3">
                {popularTerms.map((term, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <p className="text-white text-sm font-medium truncate flex-1">{term.searchTerm || "—"}</p>
                    <span className="text-gray-400 text-xs mr-2">{formatNum(term.count)} بار</span>
                    <span className="text-cyan-400 text-xs">کلیک {formatPercent(term.clickRate)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
          <CardHeader className="p-3">
            <CardTitle className="text-xl md:text-2xl text-white mb-2 font-medium">جستجوهای بدون نتیجه</CardTitle>
            <CardDescription className="text-gray-400">عبارت‌هایی که نتیجه‌ای نداشتند (برای بهبود کاتالوگ)</CardDescription>
          </CardHeader>
          <CardContent className="p-2">
            {noResultSearches.length === 0 ? (
              <p className="text-gray-400 text-sm py-4 text-center">داده‌ای موجود نیست</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {noResultSearches.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <p className="text-white text-sm truncate flex-1">{item.searchTerm || "—"}</p>
                    <span className="text-gray-400 text-xs mr-2">{formatNum(item.count)} بار</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
