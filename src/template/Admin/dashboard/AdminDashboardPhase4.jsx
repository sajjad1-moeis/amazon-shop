"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Chart2, Danger, DocumentText, NotificationStatus } from "iconsax-reactjs";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

const PIE_COLORS = ["#34d399", "#60a5fa", "#c084fc", "#fbbf24", "#f87171", "#94a3b8", "#fb923c", "#2dd4bf"];

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

function formatToman(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return `${Number(n).toLocaleString("fa-IR")} تومان`;
}

const tooltipStyle = {
  backgroundColor: "rgba(17, 24, 39, 0.95)",
  border: "1px solid rgba(75, 85, 99, 0.8)",
  borderRadius: "8px",
  fontSize: "12px",
  color: "#e5e7eb",
};

function WidgetShell({ title, icon: Icon, subtitle, children, className }) {
  return (
    <div
      className={cn(
        "flex min-h-[320px] flex-col overflow-hidden rounded-xl border border-gray-600 bg-gray-700/30",
        className
      )}
    >
      <div className="flex shrink-0 items-center gap-2 border-b border-gray-600 px-4 py-3 sm:px-5 sm:py-4">
        <div className="rounded-lg bg-gray-600/50 p-2">
          <Icon size={20} className="text-amber-400" />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base text-white sm:text-lg">{title}</h2>
          {subtitle ? <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p> : null}
        </div>
      </div>
      <div className="min-h-[240px] flex-1 p-3 sm:p-4">{children}</div>
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="flex h-[260px] items-end gap-1.5 px-2 pb-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="flex-1 animate-pulse rounded-t bg-gray-600/35"
          style={{ height: `${28 + ((i * 7) % 55)}%` }}
        />
      ))}
    </div>
  );
}

function PieSkeleton() {
  return (
    <div className="flex h-[260px] items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gray-600/30" />
    </div>
  );
}

function EmptyBlock({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-gray-500">
      <DocumentText size={36} className="mb-2 opacity-50" />
      <p className="max-w-sm text-center text-sm">{message}</p>
    </div>
  );
}

function ErrorBlock({ message }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-rose-400/90">
      <Danger size={32} />
      <p className="text-center text-sm">{message || "خطا در بارگذاری"}</p>
    </div>
  );
}

function severityStyles(sev) {
  if (sev === "critical") return "border-rose-500/40 bg-rose-950/20 text-rose-200";
  if (sev === "warning") return "border-amber-500/35 bg-amber-950/15 text-amber-100";
  return "border-cyan-500/30 bg-cyan-950/15 text-cyan-100";
}

export default function AdminDashboardPhase4({ salesTrendWidget, orderStatusWidget, alertsWidget, kpi }) {
  const mergedAlerts = useMemo(() => {
    const base = Array.isArray(alertsWidget?.data?.items) ? [...alertsWidget.data.items] : [];
    if (kpi && Number(kpi.pendingOrdersCount) > 0) {
      const n = Number(kpi.pendingOrdersCount);
      base.unshift({
        id: "pending-orders-kpi",
        title: "سفارش در انتظار / معطل",
        description: `${formatNum(n)} سفارش در وضعیت‌های در انتظار یا پردازش؛ از لیست سفارشات پیگیری کنید.`,
        severity: n > 50 ? "critical" : "warning",
        href: "/admin/orders?status=1",
        count: n,
      });
    }
    return base;
  }, [alertsWidget?.data, kpi?.pendingOrdersCount]);

  const salesPoints = salesTrendWidget?.data?.points ?? [];
  const hasSalesNumbers = salesPoints.some((p) => (p.sales ?? 0) > 0 || (p.orders ?? 0) > 0);
  const orderSegments = orderStatusWidget?.data?.segments ?? [];
  const orderNote = orderStatusWidget?.data?.snapshotNote;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-medium text-gray-400">تحلیل سریع و هشدارها (فاز ۴)</h2>
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <WidgetShell
          title="روند فروش (بازه)"
          icon={Chart2}
          subtitle={
            salesTrendWidget?.loading
              ? null
              : salesTrendWidget?.data?.source
                ? `منبع: ${salesTrendWidget.data.source}`
                : null
          }
        >
          {salesTrendWidget?.loading ? (
            <ChartSkeleton />
          ) : salesTrendWidget?.error ? (
            <ErrorBlock message={salesTrendWidget.error} />
          ) : salesPoints.length === 0 || !hasSalesNumbers ? (
            <EmptyBlock message="در این بازه دادهٔ فروش برای نمودار موجود نیست." />
          ) : (
            <div className="h-[min(320px,55vw)] w-full min-h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesPoints} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                  <XAxis
                    dataKey="label"
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    axisLine={{ stroke: "#4b5563" }}
                    tickLine={false}
                    interval="preserveStartEnd"
                  />
                  <YAxis
                    tick={{ fill: "#9ca3af", fontSize: 11 }}
                    axisLine={{ stroke: "#4b5563" }}
                    tickLine={false}
                    tickFormatter={(v) => formatNum(v)}
                  />
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value, name) =>
                      name === "sales" ? [formatToman(value), "فروش"] : [formatNum(value), "سفارش"]
                    }
                  />
                  <Bar dataKey="sales" name="sales" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={48} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </WidgetShell>

        <WidgetShell
          title="توزیع وضعیت سفارش"
          icon={Chart2}
          subtitle={orderStatusWidget?.loading ? null : orderNote || (orderStatusWidget?.data?.source ? `منبع: ${orderStatusWidget.data.source}` : null)}
        >
          {orderStatusWidget?.loading ? (
            <PieSkeleton />
          ) : orderStatusWidget?.error ? (
            <ErrorBlock message={orderStatusWidget.error} />
          ) : orderSegments.length === 0 ? (
            <EmptyBlock message="داده‌ای برای توزیع وضعیت سفارش نیست." />
          ) : (
            <div className="h-[min(320px,55vw)] w-full min-h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderSegments}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={52}
                    outerRadius={88}
                    paddingAngle={2}
                  >
                    {orderSegments.map((seg, i) => (
                      <Cell
                        key={seg.status}
                        fill={PIE_COLORS[i % PIE_COLORS.length]}
                        stroke="rgba(31,41,55,0.9)"
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={tooltipStyle}
                    formatter={(value) => [formatNum(value), "تعداد"]}
                  />
                  <Legend wrapperStyle={{ fontSize: "11px", color: "#9ca3af" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </WidgetShell>
      </div>

      <WidgetShell title="هشدارهای فوری" icon={NotificationStatus} subtitle="لینک به همان بخش در پنل ادمین">
        {alertsWidget?.loading ? (
          <div className="flex justify-center py-14">
            <Spinner size="lg" />
          </div>
        ) : alertsWidget?.error ? (
          <ErrorBlock message={alertsWidget.error} />
        ) : mergedAlerts.length === 0 ? (
          <EmptyBlock message="هشدار فعالی ثبت نشده؛ وضعیت عملیاتی پایدار به نظر می‌رسد." />
        ) : (
          <ul className="space-y-2">
            {mergedAlerts.map((a) => (
              <li key={a.id}>
                <Link
                  href={a.href}
                  className={cn(
                    "flex flex-col gap-1 rounded-lg border p-3 transition-colors hover:opacity-95 sm:flex-row sm:items-center sm:justify-between",
                    severityStyles(a.severity)
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{a.title}</p>
                    {a.description ? <p className="mt-1 text-xs opacity-90">{a.description}</p> : null}
                  </div>
                  {a.count != null ? (
                    <span className="shrink-0 text-sm font-semibold">{formatNum(a.count)}</span>
                  ) : (
                    <span className="shrink-0 text-xs opacity-80">مشاهده ←</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </WidgetShell>
    </div>
  );
}
