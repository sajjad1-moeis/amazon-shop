"use client";

import React, { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
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
  Refresh2,
  Calendar,
  Clock,
} from "iconsax-reactjs";
import { adminAnalyticsService } from "@/services/admin/adminAnalyticsService";
import { fetchAdminDashboardKpi } from "@/services/admin/adminDashboardKpiService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDateTimeFa } from "@/utils/adminDateUtils";
import {
  DASHBOARD_RANGE_QUERY,
  normalizeRangeParam,
  getDateRangeForPreset,
  toIsoRange,
  rangePresetLabelFa,
} from "@/lib/adminDashboardDateRange";
import {
  fetchSalesTrendSeries,
  fetchOrderStatusDistribution,
  fetchDashboardAlertsFragment,
} from "@/services/admin/adminDashboardChartsService";
import { fetchAdminDashboardOperationsBundle } from "@/services/admin/adminDashboardPhase5Service";
import { toFiniteAmount, toOptionalFiniteNumber } from "@/utils/adminAmountUtils";

const AdminDashboardPhase4 = dynamic(() => import("./AdminDashboardPhase4"), {
  ssr: false,
  loading: () => (
    <div className="space-y-3" aria-busy="true">
      <h2 className="text-sm font-medium text-gray-400">تحلیل سریع، نمودارها و هشدارها</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="min-h-[280px] animate-pulse rounded-xl border border-gray-600 bg-gray-700/20" />
        <div className="min-h-[280px] animate-pulse rounded-xl border border-gray-600 bg-gray-700/20" />
      </div>
      <div className="min-h-[120px] animate-pulse rounded-xl border border-gray-600 bg-gray-700/20" />
    </div>
  ),
});

const AdminDashboardPhase5 = dynamic(() => import("./AdminDashboardPhase5"), {
  ssr: false,
  loading: () => (
    <div className="space-y-3 py-6" aria-busy="true">
      <p className="text-sm text-gray-400">عملیات و سلامت سیستم…</p>
      <div className="h-32 animate-pulse rounded-xl border border-gray-600 bg-gray-700/20" />
    </div>
  ),
});

function pick(obj, camelKey, pascalKey) {
  if (obj == null) return undefined;
  if (Object.prototype.hasOwnProperty.call(obj, camelKey)) return obj[camelKey];
  if (pascalKey && Object.prototype.hasOwnProperty.call(obj, pascalKey)) return obj[pascalKey];
  return obj[camelKey];
}

function normalizeTopSellingItem(item) {
  if (!item || typeof item !== "object") return item;
  return {
    ...item,
    asin: pick(item, "asin", "ASIN"),
    title: pick(item, "title", "Title"),
    purchaseCount: pick(item, "purchaseCount", "PurchaseCount"),
    viewCount: pick(item, "viewCount", "ViewCount"),
    searchCount: pick(item, "searchCount", "SearchCount"),
  };
}

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

function formatPercent(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `${Number(n).toFixed(2)}٪`;
}

function formatToman(n) {
  if (n == null) return "—";
  const x = toFiniteAmount(n, NaN);
  if (!Number.isFinite(x)) return "—";
  return `${x.toLocaleString("fa-IR")} تومان`;
}

function DeltaLine({ pct }) {
  if (pct == null || Number.isNaN(pct)) return null;
  const pos = pct >= 0;
  return (
    <p className={cn("mt-1 text-xs", pos ? "text-emerald-400/90" : "text-rose-400/90")}>
      {pos ? "↑" : "↓"} {Math.abs(Number(pct)).toFixed(1)}٪ نسبت به بازهٔ قبل
    </p>
  );
}

const QUICK_LINKS = [
  { label: "سفارشات", href: "/admin/orders", icon: ShoppingCart, color: "text-emerald-400" },
  { label: "کاربران", href: "/admin/users", icon: People, color: "text-violet-400" },
  { label: "محصولات", href: "/admin/products/list", icon: Box1, color: "text-blue-400" },
  { label: "پرداخت‌ها", href: "/admin/payments", icon: Wallet3, color: "text-amber-400" },
  { label: "نظرات", href: "/admin/reviews", icon: Star, color: "text-yellow-400" },
  { label: "تیکت‌ها", href: "/admin/tickets", icon: MessageQuestion, color: "text-cyan-400" },
];

const RANGE_PRESETS = [
  { key: DASHBOARD_RANGE_QUERY.TODAY, label: "امروز" },
  { key: DASHBOARD_RANGE_QUERY.LAST_7_DAYS, label: "۷ روز" },
  { key: DASHBOARD_RANGE_QUERY.LAST_30_DAYS, label: "۳۰ روز" },
  { key: DASHBOARD_RANGE_QUERY.THIS_MONTH, label: "این ماه" },
  { key: DASHBOARD_RANGE_QUERY.CUSTOM, label: "دلخواه" },
];

function searchReportHref(term) {
  const q = new URLSearchParams();
  if (term) q.set("q", String(term));
  return `/admin/search/reports${q.toString() ? `?${q.toString()}` : ""}`;
}

function productListHrefByAsin(asin) {
  const q = new URLSearchParams();
  if (asin) q.set("search", String(asin));
  return `/admin/products/list${q.toString() ? `?${q.toString()}` : ""}`;
}

function KpiLinkCard({
  href,
  icon: Icon,
  label,
  value,
  deltaPct,
  accent = "text-white",
  iconBg = "bg-gray-600/50",
  title: tip,
  subtitle,
}) {
  const inner = (
    <div className="rounded-xl border border-gray-600 bg-gray-700/30 p-3 transition-colors hover:border-amber-500/40 hover:bg-gray-700/45 sm:p-4">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-xs text-gray-400 sm:mb-1 sm:text-sm">{label}</p>
          <p className={`truncate text-lg font-bold sm:text-xl md:text-2xl ${accent}`}>{value}</p>
          <DeltaLine pct={deltaPct} />
          {subtitle ? (
            <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500">{subtitle}</p>
          ) : null}
        </div>
        <div className={`${iconBg} shrink-0 rounded-lg p-2 sm:rounded-xl sm:p-2.5`}>
          <Icon size={20} className={accent} />
        </div>
      </div>
    </div>
  );
  if (!href) return inner;
  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 rounded-xl" title={tip}>
      {inner}
    </Link>
  );
}

function StatCard({ icon: Icon, label, value, accent = "text-white", iconBg = "bg-gray-600/50", href }) {
  const body = (
    <div className="rounded-xl border border-gray-600 bg-gray-700/30 p-3 transition-colors hover:border-gray-500/50 sm:p-4">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="mb-0.5 text-xs text-gray-400 sm:mb-1 sm:text-sm">{label}</p>
          <p className={`truncate text-lg font-bold sm:text-xl md:text-2xl ${accent}`}>{value}</p>
        </div>
        <div className={`${iconBg} shrink-0 rounded-lg p-2 sm:rounded-xl sm:p-2.5`}>
          <Icon size={20} className={accent} />
        </div>
      </div>
    </div>
  );
  if (!href) return body;
  return (
    <Link href={href} className="block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60">
      {body}
    </Link>
  );
}

function SectionCard({ title, icon: Icon, children, emptyMessage = "داده‌ای موجود نیست" }) {
  return (
    <div className="bg-gray-700/30 rounded-xl border border-gray-600 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-gray-600">
        <div className="p-2 rounded-lg bg-gray-600/50">
          <Icon size={20} className="text-amber-400" />
        </div>
        <h2 className="text-lg text-white">{title}</h2>
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

function toYmd(d) {
  const x = new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** unwrapApiData در خطا throw می‌کند — برای اینکه یک API کل داشبورد را نخواباند */
async function safeUnwrapResponse(responsePromise) {
  try {
    const res = await responsePromise;
    return unwrapApiData(res);
  } catch {
    return null;
  }
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rangeParam = normalizeRangeParam(searchParams.get("range"));
  const fromParam = searchParams.get("from") || "";
  const toParam = searchParams.get("to") || "";

  const { start, end, effectiveRange } = useMemo(() => {
    const r = rangeParam;
    if (r === DASHBOARD_RANGE_QUERY.CUSTOM && (!fromParam || !toParam)) {
      const { start: s, end: e } = getDateRangeForPreset(DASHBOARD_RANGE_QUERY.LAST_7_DAYS);
      return { start: s, end: e, effectiveRange: DASHBOARD_RANGE_QUERY.LAST_7_DAYS };
    }
    const { start: s, end: e } = getDateRangeForPreset(r, fromParam, toParam);
    return { start: s, end: e, effectiveRange: r };
  }, [rangeParam, fromParam, toParam]);

  const iso = useMemo(() => toIsoRange(start, end), [start, end]);

  const [kpi, setKpi] = useState(null);
  const [summary, setSummary] = useState(null);
  const [summaryFromRange, setSummaryFromRange] = useState(false);
  const [userStats, setUserStats] = useState(null);
  const [popularTerms, setPopularTerms] = useState([]);
  const [noResultSearches, setNoResultSearches] = useState([]);
  const [topSelling, setTopSelling] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastRefreshAt, setLastRefreshAt] = useState(null);
  const [reloadNonce, setReloadNonce] = useState(0);
  const [customFrom, setCustomFrom] = useState(fromParam || toYmd(start));
  const [customTo, setCustomTo] = useState(toParam || toYmd(end));
  const [salesTrendWidget, setSalesTrendWidget] = useState({ loading: true, error: null, data: null });
  const [orderStatusWidget, setOrderStatusWidget] = useState({ loading: true, error: null, data: null });
  const [alertsWidget, setAlertsWidget] = useState({ loading: true, error: null, data: null });
  const [operationsBundle, setOperationsBundle] = useState({ loading: true, error: null, data: null });

  useEffect(() => {
    if (rangeParam === DASHBOARD_RANGE_QUERY.CUSTOM && fromParam && toParam) {
      setCustomFrom(fromParam);
      setCustomTo(toParam);
    }
  }, [rangeParam, fromParam, toParam]);

  const triggerReload = () => setReloadNonce((n) => n + 1);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const [
          kpiData,
          summaryRangeRes,
          summaryGlobalRaw,
          userStatsRaw,
          popularRes,
          noResultRaw,
          topSellingRaw,
        ] = await Promise.all([
          (async () => {
            try {
              return await fetchAdminDashboardKpi(start, end);
            } catch {
              return null;
            }
          })(),
          (async () => {
            try {
              const r = await adminAnalyticsService.getSummaryByDateRange(iso);
              return { ok: true, data: unwrapApiData(r) };
            } catch {
              return { ok: false, data: null };
            }
          })(),
          safeUnwrapResponse(adminAnalyticsService.getSummary()),
          safeUnwrapResponse(adminAnalyticsService.getUserStats()),
          (async () => {
            try {
              const r = await adminAnalyticsService.getPopularSearchTermsByDateRange({
                ...iso,
                limit: 10,
              });
              return unwrapApiData(r);
            } catch {
              try {
                const r = await adminAnalyticsService.getPopularSearchTerms(10);
                return unwrapApiData(r);
              } catch {
                return [];
              }
            }
          })(),
          (async () => {
            try {
              const r = await adminAnalyticsService.getNoResultSearchesByDateRange({
                ...iso,
                limit: 10,
              });
              return unwrapApiData(r);
            } catch {
              try {
                const r = await adminAnalyticsService.getNoResultSearches(10);
                return unwrapApiData(r);
              } catch {
                return [];
              }
            }
          })(),
          safeUnwrapResponse(adminAnalyticsService.getTopSellingProducts(10)),
        ]);

        if (cancelled) return;

        setKpi(kpiData);
        if (summaryRangeRes.ok && summaryRangeRes.data) {
          setSummary(summaryRangeRes.data);
          setSummaryFromRange(true);
        } else {
          setSummary(summaryGlobalRaw || null);
          setSummaryFromRange(false);
        }
        setUserStats(userStatsRaw || null);

        const popularData = Array.isArray(popularRes) ? popularRes : [];
        setPopularTerms(popularData);

        setNoResultSearches(Array.isArray(noResultRaw) ? noResultRaw : []);

        setTopSelling(
          Array.isArray(topSellingRaw) ? topSellingRaw.map(normalizeTopSellingItem) : []
        );

        setLastRefreshAt(new Date());
      } catch (e) {
        if (!cancelled) {
          setKpi(null);
          setSummary(null);
          setUserStats(null);
          setPopularTerms([]);
          setNoResultSearches([]);
          setTopSelling([]);
          toast.error(e?.message || "بارگذاری داشبورد ناموفق بود");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [start.getTime(), end.getTime(), reloadNonce]);

  /* نمودارها وابسته به بازه؛ هشدارها فقط با بروزرسانی صفحه دوباره واکشی می‌شوند تا با هر تعویض بازه درخواست اضافه به پروکسی/تیکت نرود. */
  useEffect(() => {
    let cancelled = false;
    setSalesTrendWidget({ loading: true, error: null, data: null });
    setOrderStatusWidget({ loading: true, error: null, data: null });

    fetchSalesTrendSeries(start, end).then((r) => {
      if (cancelled) return;
      setSalesTrendWidget({
        loading: false,
        error: r.ok ? null : r.error || "خطا در روند فروش",
        data: r,
      });
    }).catch((e) => {
      if (!cancelled) {
        setSalesTrendWidget({ loading: false, error: e?.message || "خطا در روند فروش", data: null });
      }
    });

    fetchOrderStatusDistribution(start, end).then((r) => {
      if (cancelled) return;
      setOrderStatusWidget({
        loading: false,
        error: r.ok ? null : r.error || "خطا در توزیع وضعیت",
        data: r,
      });
    }).catch((e) => {
      if (!cancelled) {
        setOrderStatusWidget({ loading: false, error: e?.message || "خطا در توزیع وضعیت", data: null });
      }
    });

    return () => {
      cancelled = true;
    };
  }, [start.getTime(), end.getTime(), reloadNonce]);

  useEffect(() => {
    let cancelled = false;
    setAlertsWidget({ loading: true, error: null, data: null });

    fetchDashboardAlertsFragment().then((r) => {
      if (cancelled) return;
      setAlertsWidget({
        loading: false,
        error: r.ok ? null : r.error,
        data: r,
      });
    }).catch((e) => {
      if (!cancelled) setAlertsWidget({ loading: false, error: e?.message || "خطا در هشدارها", data: null });
    });

    return () => {
      cancelled = true;
    };
  }, [reloadNonce]);

  useEffect(() => {
    let cancelled = false;
    setOperationsBundle({ loading: true, error: null, data: null });
    fetchAdminDashboardOperationsBundle()
      .then((r) => {
        if (cancelled) return;
        if (!r?.ok) {
          setOperationsBundle({ loading: false, error: "بارگذاری بخش عملیات و سلامت ناموفق بود", data: null });
          return;
        }
        setOperationsBundle({ loading: false, error: null, data: r });
      })
      .catch((e) => {
        if (!cancelled) {
          setOperationsBundle({
            loading: false,
            error: e?.message || "خطا در بارگذاری بخش عملیات و سلامت",
            data: null,
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [reloadNonce]);

  const setRangeQuery = (key, from, to) => {
    const p = new URLSearchParams();
    p.set("range", key);
    if (key === DASHBOARD_RANGE_QUERY.CUSTOM && from && to) {
      p.set("from", from);
      p.set("to", to);
    }
    router.replace(`/admin?${p.toString()}`);
  };

  const handleApplyCustom = () => {
    if (!customFrom || !customTo) {
      toast.error("تاریخ شروع و پایان را انتخاب کنید");
      return;
    }
    setRangeQuery(DASHBOARD_RANGE_QUERY.CUSTOM, customFrom, customTo);
  };

  const s = summary || {};
  const u = userStats || {};
  const totalSearches = toOptionalFiniteNumber(pick(s, "totalSearches", "TotalSearches"));
  const totalClicks = toOptionalFiniteNumber(pick(s, "totalClicks", "TotalClicks"));
  const totalPurchases = toOptionalFiniteNumber(pick(s, "totalPurchases", "TotalPurchases"));
  const overallConversionRate = toOptionalFiniteNumber(
    pick(s, "overallConversionRate", "OverallConversionRate")
  );
  const overallClickRate = toOptionalFiniteNumber(pick(s, "overallClickRate", "OverallClickRate"));
  const uniqueSearchTerms = toOptionalFiniteNumber(pick(s, "uniqueSearchTerms", "UniqueSearchTerms"));
  const noResultSearchesCount = toOptionalFiniteNumber(pick(s, "noResultSearches", "NoResultSearches"));
  const totalUsers = toOptionalFiniteNumber(pick(u, "totalUsers", "TotalUsers"));
  const activeUsers = toOptionalFiniteNumber(pick(u, "activeUsers", "ActiveUsers"));

  if (loading && !lastRefreshAt) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[420px] gap-4">
        <Spinner size="lg" />
        <p className="text-gray-400 text-sm">در حال بارگذاری داشبورد...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-8">
      <div className="relative overflow-hidden rounded-xl border border-gray-600 bg-gradient-to-b from-gray-700/50 to-gray-800/30 p-4 sm:rounded-2xl sm:p-6 md:p-8">
        <div className="absolute left-0 top-0 h-full w-1 rounded-l-full bg-gradient-to-b from-amber-500/80 to-transparent" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="mb-1 text-xl font-bold text-white sm:text-2xl md:text-3xl">داشبورد</h1>
            <p className="text-xs leading-relaxed text-gray-400 sm:text-sm md:text-base">
              خلاصهٔ عملکرد و دسترسی سریع به بخش‌های پنل
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <div className="flex flex-wrap items-center gap-2">
              {RANGE_PRESETS.map(({ key, label }) => (
                <Button
                  key={key}
                  type="button"
                  size="sm"
                  variant={effectiveRange === key ? "default" : "outline"}
                  className={cn(
                    "h-9 border-gray-600 bg-gray-800/80 text-white hover:bg-gray-700",
                    effectiveRange === key && "border-amber-500/60 bg-amber-600/25 text-amber-100"
                  )}
                  onClick={() => {
                    if (key === DASHBOARD_RANGE_QUERY.CUSTOM) {
                      const f = customFrom || toYmd(start);
                      const t = customTo || toYmd(end);
                      setCustomFrom(f);
                      setCustomTo(t);
                      setRangeQuery(DASHBOARD_RANGE_QUERY.CUSTOM, f, t);
                    } else {
                      setRangeQuery(key);
                    }
                  }}
                >
                  {label}
                </Button>
              ))}
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="h-9 border-gray-600 bg-gray-800/80 text-white hover:bg-gray-700"
                onClick={() => triggerReload()}
                disabled={loading}
              >
                <Refresh2 size={18} className={cn(loading && "animate-spin")} />
                <span className="mr-1">بروزرسانی</span>
              </Button>
            </div>
            {effectiveRange === DASHBOARD_RANGE_QUERY.CUSTOM && (
              <div className="flex flex-wrap items-end gap-2 rounded-lg border border-gray-600/80 bg-gray-800/40 p-3">
                <Calendar size={18} className="text-amber-400/80 shrink-0" />
                <label className="flex flex-col gap-1 text-xs text-gray-400">
                  از
                  <input
                    type="date"
                    value={customFrom}
                    onChange={(e) => setCustomFrom(e.target.value)}
                    className="rounded-lg border border-gray-600 bg-gray-900 px-2 py-1.5 text-sm text-white"
                  />
                </label>
                <label className="flex flex-col gap-1 text-xs text-gray-400">
                  تا
                  <input
                    type="date"
                    value={customTo}
                    onChange={(e) => setCustomTo(e.target.value)}
                    className="rounded-lg border border-gray-600 bg-gray-900 px-2 py-1.5 text-sm text-white"
                  />
                </label>
                <Button
                  type="button"
                  size="sm"
                  className="h-9 bg-amber-600/80 text-white hover:bg-amber-600"
                  onClick={handleApplyCustom}
                >
                  اعمال بازه
                </Button>
              </div>
            )}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <Clock size={14} />
              <span>
                بازه: <span className="text-gray-300">{rangePresetLabelFa(effectiveRange)}</span>
                {" · "}
                {formatDateTimeFa(start)} — {formatDateTimeFa(end)}
              </span>
              {lastRefreshAt && (
                <>
                  <span className="hidden sm:inline">|</span>
                  <span>آخرین بارگذاری: {formatDateTimeFa(lastRefreshAt)}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {loading && lastRefreshAt && (
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Spinner size="sm" />
          در حال بروزرسانی داده‌ها...
        </div>
      )}

      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-2">شاخص‌های عملیاتی (بازه انتخابی)</h2>
        {kpi && (
          <p className="mb-3 text-xs text-gray-500">
            منبع داده: {kpi.source === "dashboard-kpi" ? "سرور (dashboard-kpi)" : "گزارش فروش/کاربر + شمارش وضعیت سفارش"}
            {kpi.pendingIsSnapshot ? (
              <span className="mr-2">
                — «سفارشات در انتظار» در این حالت جمع وضعیت‌های ۱ تا ۳ در لحظه است.
              </span>
            ) : null}
          </p>
        )}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-5">
          <KpiLinkCard
            href="/admin/reports/sales"
            icon={Wallet3}
            label="فروش کل (بازه)"
            value={kpi ? formatToman(kpi.totalSales) : "—"}
            deltaPct={kpi?.salesDeltaPct}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/10"
          />
          <KpiLinkCard
            href="/admin/orders"
            icon={ShoppingCart}
            label="سفارش پرداخت‌شده در بازه"
            value={kpi ? formatNum(kpi.newOrdersCount) : "—"}
            deltaPct={kpi?.ordersDeltaPct}
            accent="text-violet-400"
            iconBg="bg-violet-500/10"
            title="بر اساس PaidAt در بازهٔ انتخابی"
            subtitle={
              kpi?.registeredOrdersCount != null
                ? `ثبت در بازه (CreatedAt): ${formatNum(kpi.registeredOrdersCount)}${
                    kpi.registeredOrdersDeltaPct != null && !Number.isNaN(kpi.registeredOrdersDeltaPct)
                      ? ` — ${kpi.registeredOrdersDeltaPct >= 0 ? "↑" : "↓"} ${Math.abs(Number(kpi.registeredOrdersDeltaPct)).toFixed(1)}٪ نسبت به بازهٔ قبل`
                      : ""
                  }`
                : kpi?.source === "fallback"
                  ? "تعداد ثبت‌شده در بازه در حالت fallback در دسترس نیست."
                  : undefined
            }
          />
          <KpiLinkCard
            href="/admin/orders?status=1"
            icon={Clock}
            label="سفارشات در انتظار"
            value={kpi ? formatNum(kpi.pendingOrdersCount) : "—"}
            accent="text-amber-400"
            iconBg="bg-amber-500/10"
            title={kpi?.pendingIsSnapshot ? "جمع سفارش‌های وضعیت ۱، ۲، ۳ در لحظه (fallback)" : undefined}
          />
          <KpiLinkCard
            href="/admin/users"
            icon={People}
            label="کاربران جدید (بازه)"
            value={kpi ? formatNum(kpi.newUsersCount) : "—"}
            deltaPct={kpi?.usersDeltaPct}
            accent="text-cyan-400"
            iconBg="bg-cyan-500/10"
          />
          <KpiLinkCard
            href="/admin/reports/sales"
            icon={TrendUp}
            label="نرخ تبدیل (بازه)"
            value={kpi?.conversionRate != null ? formatPercent(kpi.conversionRate) : "—"}
            deltaPct={kpi?.conversionDeltaPct}
            accent="text-pink-400"
            iconBg="bg-pink-500/10"
            title={kpi?.conversionNote}
            subtitle="بر پایهٔ جستجو در همان بازه است؛ Session مرورگر در این شاخص لحاظ نمی‌شود."
          />
        </div>
      </div>

      <AdminDashboardPhase4
        salesTrendWidget={salesTrendWidget}
        orderStatusWidget={orderStatusWidget}
        alertsWidget={alertsWidget}
      />

      <AdminDashboardPhase5 operationsBundle={operationsBundle} />

      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-3">دسترسی سریع</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
          {QUICK_LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[3.25rem] items-center gap-2 rounded-xl border border-gray-600 bg-gray-700/30 p-3 transition-colors hover:border-gray-500 hover:bg-gray-700/50 active:scale-[0.99] sm:min-h-0 sm:gap-3 sm:p-4"
              >
                <div className="rounded-lg bg-gray-600/50 p-1.5 group-hover:bg-gray-600 sm:p-2">
                  <Icon size={18} className={item.color} />
                </div>
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-white sm:text-sm">{item.label}</span>
                <ArrowLeft2
                  size={16}
                  className="mr-auto h-4 w-4 shrink-0 text-gray-500 opacity-0 transition-opacity group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>

      <div>
        <h2 className="text-sm font-medium text-gray-400 mb-1">خلاصه آمار جستجو و رفتار</h2>
        {summaryFromRange ? (
          <p className="mb-3 text-xs text-emerald-400/80">بر اساس بازهٔ انتخابی (summary/by-date-range)</p>
        ) : (
          <p className="mb-3 text-xs text-gray-500">آمار کلی سیستم (بدون فیلتر بازه — تا اتصال کامل summary بازه‌دار)</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <StatCard
            icon={SearchNormal1}
            label="کل جستجوها"
            value={formatNum(totalSearches)}
            accent="text-blue-400"
            iconBg="bg-blue-500/10"
            href="/admin/search/reports"
          />
          <StatCard
            icon={MouseCircle}
            label="کل کلیک‌ها"
            value={formatNum(totalClicks)}
            accent="text-cyan-400"
            iconBg="bg-cyan-500/10"
            href="/admin/search/reports"
          />
          <StatCard
            icon={Bag2}
            label="کل خریدها"
            value={formatNum(totalPurchases)}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/10"
            href="/admin/reports/sales"
          />
          <StatCard
            icon={TrendUp}
            label="نرخ تبدیل (خلاصه)"
            value={formatPercent(overallConversionRate)}
            accent="text-violet-400"
            iconBg="bg-violet-500/10"
            href="/admin/reports/sales"
          />
          <StatCard
            icon={MouseCircle}
            label="نرخ کلیک"
            value={formatPercent(overallClickRate)}
            accent="text-amber-400"
            iconBg="bg-amber-500/10"
            href="/admin/search/reports"
          />
          <StatCard
            icon={SearchNormal1}
            label="عبارت‌های یکتا"
            value={formatNum(uniqueSearchTerms)}
            accent="text-pink-400"
            iconBg="bg-pink-500/10"
            href="/admin/search/reports"
          />
          <StatCard
            icon={People}
            label="کل کاربران"
            value={formatNum(totalUsers)}
            accent="text-blue-400"
            iconBg="bg-blue-500/10"
            href="/admin/users"
          />
          <StatCard
            icon={People}
            label="کاربران فعال"
            value={formatNum(activeUsers)}
            accent="text-emerald-400"
            iconBg="bg-emerald-500/10"
            href="/admin/users"
          />
          <StatCard
            icon={Danger}
            label="جستجو بدون نتیجه"
            value={formatNum(noResultSearchesCount)}
            accent="text-amber-400"
            iconBg="bg-amber-500/10"
            href="/admin/search/reports?tab=zero-result"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SectionCard title="محصولات پرفروش" icon={Chart2}>
          {topSelling.length > 0 ? (
            <ul className="space-y-2">
              {topSelling.map((item, i) => (
                <li key={item.asin || i}>
                  <Link
                    href={productListHrefByAsin(item.asin)}
                    className="flex items-center gap-3 rounded-lg border border-gray-600/50 bg-gray-800/40 p-3 transition-colors hover:border-amber-500/45 hover:bg-gray-800/60"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-gray-600 flex items-center justify-center text-xs font-bold text-gray-300">
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-white text-sm font-medium truncate">{item.title || item.asin || "—"}</p>
                      <p className="text-gray-500 text-xs mt-0.5">
                        ASIN: {item.asin || "—"} · بازدید {formatNum(item.viewCount)} · جستجو {formatNum(item.searchCount)}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-emerald-400 text-sm font-medium">
                      {formatNum(item.purchaseCount)} خرید
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="داده‌ای برای محصولات پرفروش موجود نیست" />
          )}
        </SectionCard>

        <SectionCard title="محبوب‌ترین جستجوها (بازه)" icon={SearchNormal1}>
          {popularTerms.length > 0 ? (
            <ul className="space-y-2">
              {popularTerms.map((term, i) => (
                <li key={`${pick(term, "searchTerm", "SearchTerm") || "t"}-${i}`}>
                  <Link
                    href={searchReportHref(pick(term, "searchTerm", "SearchTerm"))}
                    className="flex items-center justify-between gap-3 rounded-lg border border-gray-600/50 bg-gray-800/40 p-3 transition-colors hover:border-amber-500/45 hover:bg-gray-800/60"
                  >
                    <p className="text-white text-sm font-medium truncate flex-1">
                      {pick(term, "searchTerm", "SearchTerm") || "—"}
                    </p>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-gray-400 text-xs">{formatNum(pick(term, "count", "Count"))} بار</span>
                      <span className="text-cyan-400 text-xs">کلیک {formatPercent(pick(term, "clickRate", "ClickRate"))}</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState message="داده‌ای برای جستجوهای محبوب در این بازه موجود نیست" />
          )}
        </SectionCard>
      </div>

      <SectionCard title="جستجوهای بدون نتیجه" icon={Danger}>
        {noResultSearches.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {noResultSearches.map((item, i) => (
              <Link
                key={i}
                href={searchReportHref(pick(item, "searchTerm", "SearchTerm"))}
                className="flex items-center justify-between gap-2 rounded-lg border border-amber-500/20 bg-gray-800/40 p-3 transition-colors hover:border-amber-500/50 hover:bg-gray-800/60"
              >
                <p className="text-white text-sm truncate flex-1">{pick(item, "searchTerm", "SearchTerm") || "—"}</p>
                <span className="text-amber-400/90 text-xs shrink-0">{formatNum(pick(item, "count", "Count"))} بار</span>
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState message="جستجوی بدون نتیجه‌ای ثبت نشده؛ کاتالوگ در وضعیت خوبی است." />
        )}
      </SectionCard>
    </div>
  );
}
