"use client";

import React from "react";
import Link from "next/link";
import {
  Box1,
  Cpu,
  DiscountShape,
  Flash,
  MoneyRecive,
  Setting3,
  Shop,
  DocumentText,
  Danger,
  ArrowLeft2,
  Wallet3,
  ShoppingCart,
} from "iconsax-reactjs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { formatDateFa } from "@/utils/adminDateUtils";

const ORDER_STATUS_BADGE = {
  1: { label: "در انتظار", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  2: { label: "پرداخت شده", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  3: { label: "در حال پردازش", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  4: { label: "ارسال شده", className: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  5: { label: "تحویل شده", className: "bg-green-500/20 text-green-400 border-green-500/30" },
  6: { label: "لغو شده", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  7: { label: "بازگشت", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  8: { label: "ناموفق", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

function orderStatusBadge(status) {
  const s = ORDER_STATUS_BADGE[Number(status)] || {
    label: "نامشخص",
    className: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };
  return (
    <Badge variant="outline" className={s.className}>
      {s.label}
    </Badge>
  );
}

const TICKET_STATUS_BADGE = {
  1: { label: "باز", className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30" },
  2: { label: "در حال بررسی", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  3: { label: "منتظر کاربر", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  4: { label: "حل شده", className: "bg-teal-500/20 text-teal-300 border-teal-500/30" },
  5: { label: "بسته", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
};

function ticketStatusBadge(status) {
  const s = TICKET_STATUS_BADGE[Number(status)] || TICKET_STATUS_BADGE[1];
  return (
    <Badge variant="outline" className={s.className}>
      {s.label}
    </Badge>
  );
}

function formatNum(n) {
  if (n == null || Number.isNaN(n)) return "—";
  return Number(n).toLocaleString("fa-IR");
}

function healthPill(status) {
  const map = {
    ok: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-200 border-amber-500/35",
    error: "bg-rose-500/15 text-rose-200 border-rose-500/35",
    unknown: "bg-slate-500/15 text-slate-300 border-slate-500/35",
  };
  const label = { ok: "سالم", warning: "هشدار", error: "خطا", unknown: "نامشخص" };
  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-md border px-2 py-0.5 text-[11px] font-medium",
        map[status] || map.unknown
      )}
    >
      {label[status] || label.unknown}
    </span>
  );
}

const QUICK_ACTIONS = [
  { label: "محصول جدید", href: "/admin/products/create", icon: Box1, color: "text-emerald-400" },
  {
    label: "سفارش دستی (راهنما)",
    href: "/admin/orders?manualOrder=1",
    icon: ShoppingCart,
    color: "text-orange-300",
  },
  { label: "ایمپورت از لینک", href: "/admin/products/list", icon: Shop, color: "text-teal-400" },
  { label: "اجرای Sync/Job", href: "/admin/jobs", icon: Cpu, color: "text-indigo-300" },
  { label: "نرخ ارز", href: "/admin/currency-rates", icon: MoneyRecive, color: "text-cyan-400" },
  { label: "سرویس ارز", href: "/admin/currency-services", icon: Wallet3, color: "text-sky-400" },
  { label: "تخفیف‌ها", href: "/admin/discounts/list", icon: DiscountShape, color: "text-rose-400" },
  { label: "سرچ بدون نتیجه", href: "/admin/search/reports", icon: Danger, color: "text-amber-300" },
  { label: "پروکسی اسکرپر", href: "/admin/scraper-proxy", icon: Flash, color: "text-amber-400" },
  { label: "لاگ‌های عملیاتی", href: "/admin/security/operational-logs", icon: DocumentText, color: "text-violet-300" },
  { label: "قیمت‌گذاری", href: "/admin/pricing", icon: Setting3, color: "text-gray-300" },
];

function SectionHead({ title, subtitle }) {
  return (
    <div className="mb-3">
      <h2 className="text-sm font-medium text-gray-400">{title}</h2>
      {subtitle ? <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p> : null}
    </div>
  );
}

function EmptyMini({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-gray-500">
      <DocumentText size={32} className="mb-2 opacity-50" />
      <p className="text-center text-sm">{message}</p>
    </div>
  );
}

export default function AdminDashboardPhase5({ operationsBundle }) {
  const loading = operationsBundle?.loading;
  const err = operationsBundle?.error;
  const data = operationsBundle?.data;

  if (loading) {
    return (
      <div className="space-y-6 py-6">
        <SectionHead title="عملیات و سلامت سیستم" subtitle="در حال بارگذاری…" />
        <div className="flex justify-center py-16">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="space-y-3 rounded-xl border border-rose-500/30 bg-rose-950/20 p-6">
        <SectionHead title="عملیات و سلامت سیستم" />
        <div className="flex items-center gap-2 text-rose-300">
          <Danger size={22} />
          <p className="text-sm">{err}</p>
        </div>
      </div>
    );
  }

  const healthRows = data?.health?.rows ?? [];
  const proxy = data?.proxy ?? {
    ready: false,
    issues: [],
    reachable: true,
    banCount: null,
    avgLatencyMs: null,
    proxies: null,
  };
  const orders = data?.recentOrders?.orders ?? [];
  const ordersErr = data?.recentOrders?.error;
  const tickets = data?.recentTickets?.tickets ?? [];
  const ticketsErr = data?.recentTickets?.error;

  return (
    <div className="space-y-8 pb-2">
      <div>
        <SectionHead
          title="سلامت سرویس‌ها"
          subtitle={
            data?.health?.source === "fallback"
              ? "ترکیب وضعیت پروکسی، API و نرخ ارز؛ با اندپوینت admin/analytics/system-health کامل‌تر می‌شود."
              : `منبع: ${data?.health?.source ?? "—"}`
          }
        />
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {healthRows.map((row, hi) => (
            <Link
              key={`health-${hi}-${row.id}`}
              href={row.href || "/admin"}
              className="group flex min-h-[4.5rem] flex-col gap-1 rounded-xl border border-gray-600 bg-gray-700/25 p-3 transition-colors hover:border-amber-500/35 hover:bg-gray-700/40 sm:flex-row sm:items-start sm:justify-between"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-white">{row.label}</p>
                {row.detail ? (
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{row.detail}</p>
                ) : null}
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                {healthPill(row.status)}
                <ArrowLeft2
                  size={14}
                  className="text-gray-600 opacity-0 transition-opacity group-hover:opacity-100 sm:mt-1"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <SectionHead
          title="خلاصه پروکسی اسکرپر"
          subtitle="جزئیات per-proxy و Ban وقتی سرویس پروکسی فیلد برگرداند پر می‌شود؛ در غیر این صورت «—»."
        />
        <Link
          href="/admin/scraper-proxy"
          className="block rounded-xl border border-gray-600 bg-gray-700/25 p-4 transition-colors hover:border-teal-500/40 hover:bg-gray-700/38"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-teal-500/15 p-2">
                <Flash size={22} className="text-teal-400" />
              </div>
              <div>
                <p className="font-medium text-white">تنظیمات پروکسی</p>
                <p className="text-xs text-gray-500">
                  {proxy.reachable
                    ? proxy.ready
                      ? "پیکربندی بدون هشدار شناسایی‌شده"
                      : `${proxy.issues.length} مورد نیاز به بررسی`
                    : "وضعیت از Next قابل خواندن نبود"}
                </p>
              </div>
            </div>
            {healthPill(proxy.ready ? "ok" : proxy.reachable ? "warning" : "error")}
          </div>
          {proxy.issues.length > 0 ? (
            <ul className="mt-3 space-y-1 border-t border-gray-600/60 pt-3 text-xs text-amber-200/90">
              {proxy.issues.slice(0, 4).map((issue, i) => (
                <li key={`issue-${i}-${issue.slice(0, 24)}`}>• {issue}</li>
              ))}
            </ul>
          ) : null}
        </Link>
        <div className="mt-3 overflow-x-auto rounded-xl border border-gray-600/80 bg-gray-800/30">
          <table className="w-full min-w-[420px] text-xs">
            <thead>
              <tr className="border-b border-gray-600 text-right text-gray-500">
                <th className="p-2.5 font-medium">شاخص</th>
                <th className="p-2.5 font-medium">مقدار</th>
              </tr>
            </thead>
            <tbody className="text-gray-200">
              <tr className="border-b border-gray-700/80">
                <td className="p-2.5 text-gray-400">Ban / مسدود شده</td>
                <td className="p-2.5 font-medium">{proxy.banCount != null ? formatNum(proxy.banCount) : "—"}</td>
              </tr>
              <tr className="border-b border-gray-700/80">
                <td className="p-2.5 text-gray-400">میانگین تأخیر پاسخ (ms)</td>
                <td className="p-2.5 font-medium">{proxy.avgLatencyMs != null ? formatNum(proxy.avgLatencyMs) : "—"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        {Array.isArray(proxy.proxies) && proxy.proxies.length > 0 ? (
          <div className="mt-2 overflow-x-auto rounded-xl border border-gray-600/80 bg-gray-800/30">
            <table className="w-full min-w-[520px] text-xs">
              <thead>
                <tr className="border-b border-gray-600 text-right text-gray-500">
                  <th className="p-2.5 font-medium">پروکسی</th>
                  <th className="p-2.5 font-medium">وضعیت</th>
                  <th className="p-2.5 font-medium">Ban</th>
                  <th className="p-2.5 font-medium">تأخیر ms</th>
                </tr>
              </thead>
              <tbody className="text-gray-200">
                {proxy.proxies.map((p, pi) => {
                  const label =
                    p?.name ?? p?.Name ?? p?.host ?? p?.Host ?? p?.url ?? p?.Url ?? `پروکسی ${pi + 1}`;
                  const st = p?.status ?? p?.Status ?? p?.state ?? p?.State ?? "—";
                  const b = p?.banCount ?? p?.BanCount ?? p?.banned ?? p?.Banned;
                  const lat = p?.avgLatencyMs ?? p?.AvgLatencyMs ?? p?.latencyMs ?? p?.LatencyMs;
                  return (
                    <tr key={`px-${pi}`} className="border-b border-gray-700/80 last:border-0">
                      <td className="max-w-[200px] truncate p-2.5">{String(label)}</td>
                      <td className="p-2.5">{String(st)}</td>
                      <td className="p-2.5">{b != null && b !== "" && Number.isFinite(Number(b)) ? formatNum(b) : "—"}</td>
                      <td className="p-2.5">
                        {lat != null && lat !== "" && Number.isFinite(Number(lat)) ? formatNum(lat) : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : null}
      </div>

      <div>
        <SectionHead title="عملیات سریع" subtitle="میانبر به بخش‌های پرکاربرد ادمین" />
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {QUICK_ACTIONS.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex min-h-[3rem] items-center gap-2 rounded-xl border border-gray-600 bg-gray-700/25 px-3 py-2.5 transition-colors hover:border-gray-500 hover:bg-gray-700/40"
              >
                <Icon size={18} className={cn("shrink-0", item.color)} />
                <span className="min-w-0 flex-1 truncate text-xs font-medium text-white">{item.label}</span>
                <ArrowLeft2 size={14} className="shrink-0 text-gray-600 opacity-0 group-hover:opacity-100" />
              </Link>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-gray-600 bg-gray-700/25">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-600 px-4 py-3">
            <div>
              <h3 className="text-sm font-medium text-white">آخرین سفارشات ثبت‌شده</h3>
              <p className="mt-0.5 text-[11px] text-gray-500">بر اساس API اخیر؛ برای سفارش‌های در جریان از فیلتر وضعیت استفاده کنید.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/orders?status=3" className="text-xs text-gray-400 hover:text-amber-300 hover:underline">
                در حال پردازش
              </Link>
              <Link href="/admin/orders" className="text-xs text-amber-400/90 hover:underline">
                همه سفارشات
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto p-1">
            {ordersErr ? (
              <p className="p-4 text-sm text-rose-400/90">{ordersErr}</p>
            ) : orders.length === 0 ? (
              <EmptyMini message="سفارش اخیری برای نمایش نیست." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="whitespace-nowrap text-gray-400">شماره</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">مشتری</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">مبلغ</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">وضعیت</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">تاریخ</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">اقدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.map((o, oi) => {
                    const id = o.id ?? o.orderId ?? o.orderNumber;
                    const href = id != null ? `/admin/orders/${id}` : "/admin/orders";
                    return (
                      <TableRow key={String(id ?? o.orderNumber ?? `o-${oi}`)} className="border-gray-700">
                        <TableCell className="whitespace-nowrap">
                          <Link href={href} className="font-medium text-amber-200/95 hover:underline">
                            {o.orderNumber ?? o.id ?? "—"}
                          </Link>
                        </TableCell>
                        <TableCell className="max-w-[140px] truncate text-gray-300">
                          {o.customerName ?? o.userFullName ?? o.userName ?? "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-gray-300">
                          {o.totalAmount != null ? `${formatNum(o.totalAmount)} تومان` : "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{orderStatusBadge(o.status)}</TableCell>
                        <TableCell className="whitespace-nowrap text-gray-400 text-xs">
                          {o.createdAt ? formatDateFa(o.createdAt) : o.date ?? "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Link href={href} className="text-xs text-amber-300 hover:underline">
                            مشاهده
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-600 bg-gray-700/25">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-600 px-4 py-3">
            <div>
              <h3 className="text-sm font-medium text-white">تیکت‌های باز</h3>
              <p className="mt-0.5 text-[11px] text-gray-500">فقط وضعیت «باز»؛ اولویت‌بندی در لیست کامل تیکت.</p>
            </div>
            <Link href="/admin/tickets" className="text-xs text-amber-400/90 hover:underline">
              همه تیکت‌ها
            </Link>
          </div>
          <div className="overflow-x-auto p-1">
            {ticketsErr ? (
              <p className="p-4 text-sm text-rose-400/90">{ticketsErr}</p>
            ) : tickets.length === 0 ? (
              <EmptyMini message="تیکت اخیری برای نمایش نیست." />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-700 hover:bg-transparent">
                    <TableHead className="whitespace-nowrap text-gray-400">شماره</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">موضوع</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">وضعیت</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">بروزرسانی</TableHead>
                    <TableHead className="whitespace-nowrap text-gray-400">اقدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tickets.map((t, ti) => {
                    const id = t.id;
                    const href = id != null ? `/admin/tickets/${id}` : "/admin/tickets";
                    return (
                      <TableRow
                        key={String(id ?? t.ticketNumber ?? t.number ?? `t-${ti}`)}
                        className="border-gray-700"
                      >
                        <TableCell className="whitespace-nowrap">
                          <Link href={href} className="font-medium text-amber-200/95 hover:underline">
                            {t.ticketNumber ?? t.number ?? id ?? "—"}
                          </Link>
                        </TableCell>
                        <TableCell className="max-w-[180px] truncate text-gray-300">
                          {t.subject ?? t.title ?? "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{ticketStatusBadge(t.status)}</TableCell>
                        <TableCell className="whitespace-nowrap text-gray-400 text-xs">
                          {t.updatedAt ? formatDateFa(t.updatedAt) : t.lastUpdate ?? "—"}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Link href={href} className="text-xs text-amber-300 hover:underline">
                            مشاهده
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
