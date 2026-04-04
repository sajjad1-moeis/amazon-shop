"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft2,
  Cpu,
  Flash,
  Link1,
  Refresh,
  Repeat,
  Timer1,
} from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminJobsService } from "@/services/admin/adminJobsService";
import { API_BASE_URL } from "@/services/api/client";

function fmtNum(n) {
  if (n == null || Number.isNaN(Number(n))) return "—";
  try {
    return Number(n).toLocaleString("fa-IR");
  } catch {
    return String(n);
  }
}

function fmtDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("fa-IR");
  } catch {
    return "—";
  }
}

function hangfireDashboardHref() {
  const base = (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_URL) || "";
  if (!base) return "";
  const origin = base.replace(/\/api\/?$/i, "");
  return `${origin}/hangfire`;
}

const RECURRING_LABELS = {
  "update-popular-prices": "قیمت — محبوب (Cron ~۴ ساعت)",
  "update-high-priority-prices": "قیمت — اولویت بالا (~۲ ساعت)",
  "update-full-stored-prices": "قیمت — Full stored (~۶ ساعت)",
};

const ALLOWED_RECURRING_TRIGGER = new Set(Object.keys(RECURRING_LABELS));

function normStats(s) {
  if (!s) return {};
  return {
    servers: s.servers ?? s.Servers,
    enqueued: s.enqueued ?? s.Enqueued,
    processing: s.processing ?? s.Processing,
    succeeded: s.succeeded ?? s.Succeeded,
    failed: s.failed ?? s.Failed,
    scheduled: s.scheduled ?? s.Scheduled,
    recurring: s.recurring ?? s.Recurring,
    utcGeneratedAt: s.utcGeneratedAt ?? s.UtcGeneratedAt,
  };
}

function normOverview(raw) {
  if (!raw) return { stats: {}, queues: [], recurring: [] };
  const stats = normStats(raw.stats ?? raw.Stats);
  const queues = raw.queues ?? raw.Queues ?? [];
  const recurring = raw.recurring ?? raw.Recurring ?? [];
  return {
    stats,
    queues: queues.map((q) => ({
      name: q.name ?? q.Name ?? "",
      length: q.length ?? q.Length ?? 0,
    })),
    recurring: recurring.map((r) => ({
      id: r.id ?? r.Id,
      cron: r.cron ?? r.Cron ?? "",
      timeZoneId: r.timeZoneId ?? r.TimeZoneId,
      nextExecution: r.nextExecution ?? r.NextExecution,
      lastExecution: r.lastExecution ?? r.LastExecution,
      lastJobId: r.lastJobId ?? r.LastJobId,
      error: r.error ?? r.Error,
      removed: r.removed ?? r.Removed ?? false,
    })),
  };
}

function normJobRow(r) {
  return {
    jobId: r.jobId ?? r.JobId ?? "",
    state: r.state ?? r.State ?? "",
    timestamp: r.timestamp ?? r.Timestamp,
    detail: r.detail ?? r.Detail ?? "",
  };
}

function normResyncRow(r) {
  return {
    productId: r.productId ?? r.ProductId,
    asin: r.asin ?? r.Asin ?? "",
    title: r.title ?? r.Title ?? "",
    lastPriceUpdateAt: r.lastPriceUpdateAt ?? r.LastPriceUpdateAt,
    priority: r.priority ?? r.Priority ?? 0,
    searchCount: r.searchCount ?? r.SearchCount ?? 0,
  };
}

export default function JobsSyncAdminPage() {
  const [overviewLoading, setOverviewLoading] = useState(true);
  const [overview, setOverview] = useState({ stats: {}, queues: [], recurring: [] });
  const [recentState, setRecentState] = useState("failed");
  const [recentRows, setRecentRows] = useState([]);
  const [recentLoading, setRecentLoading] = useState(false);
  const [resyncRows, setResyncRows] = useState([]);
  const [resyncLoading, setResyncLoading] = useState(false);
  const [actionKey, setActionKey] = useState(null);

  const hfHref = useMemo(() => hangfireDashboardHref(), []);

  const loadOverview = useCallback(async () => {
    try {
      setOverviewLoading(true);
      const data = await adminJobsService.overview();
      setOverview(normOverview(data));
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری وضعیت صف");
    } finally {
      setOverviewLoading(false);
    }
  }, []);

  const loadRecent = useCallback(async (state) => {
    try {
      setRecentLoading(true);
      setRecentRows([]);
      const data = await adminJobsService.recent(state, 35);
      const list = Array.isArray(data) ? data : [];
      setRecentRows(list.map(normJobRow));
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری لیست job");
      setRecentRows([]);
    } finally {
      setRecentLoading(false);
    }
  }, []);

  const loadResync = useCallback(async () => {
    try {
      setResyncLoading(true);
      const data = await adminJobsService.resyncQueue(100, 24);
      const list = Array.isArray(data) ? data : [];
      setResyncRows(list.map(normResyncRow));
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری صف re-sync");
      setResyncRows([]);
    } finally {
      setResyncLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOverview();
    loadResync();
  }, [loadOverview, loadResync]);

  useEffect(() => {
    loadRecent(recentState);
  }, [recentState, loadRecent]);

  const onEnqueue = async (jobType, label) => {
    const k = `enq-${jobType}`;
    try {
      setActionKey(k);
      const res = await adminJobsService.enqueuePriceUpdate(jobType);
      const dedup = res?.deduplicated ?? res?.Deduplicated;
      const jid = res?.jobId ?? res?.JobId ?? "";
      toast.success(dedup ? "درخواست تکراری نادیده گرفته شد" : `${label}: job ${jid || "ثبت شد"}`);
      await loadOverview();
    } catch (e) {
      toast.error(e.message || "خطا در صف‌بندی");
    } finally {
      setActionKey(null);
    }
  };

  const onTrigger = async (id) => {
    try {
      setActionKey(`tr-${id}`);
      await adminJobsService.triggerRecurring(id);
      toast.success("اجرای فوری زمان‌بندی درخواست شد");
      await loadOverview();
    } catch (e) {
      toast.error(e.message || "خطا در trigger");
    } finally {
      setActionKey(null);
    }
  };

  const onRetry = async (jobId) => {
    try {
      setActionKey(`re-${jobId}`);
      await adminJobsService.retryFailedJob(jobId);
      toast.success("job دوباره در صف قرار گرفت");
      await loadRecent("failed");
      await loadOverview();
    } catch (e) {
      toast.error(e.message || "retry ناموفق");
    } finally {
      setActionKey(null);
    }
  };

  const onCancel = async (jobId) => {
    try {
      setActionKey(`ca-${jobId}`);
      await adminJobsService.cancelJob(jobId);
      toast.success("درخواست لغو job ارسال شد");
      await loadRecent(recentState);
      await loadOverview();
    } catch (e) {
      toast.error(e.message || "لغو ناموفق");
    } finally {
      setActionKey(null);
    }
  };

  const { stats, queues, recurring } = overview;

  return (
    <div className="space-y-8 p-4 md:p-6 max-w-[1400px] mx-auto">
      <AdminPageHeader
        title="مرکز Job و همگام‌سازی"
        subtitle="وضعیت Hangfire، صف‌ها، زمان‌بندی‌ها، retry و پیش‌نمایش محصولات نیازمند به‌روزرسانی قیمت (re-sync)."
        icon={Cpu}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                loadOverview();
                loadResync();
                loadRecent(recentState);
              }}
              disabled={overviewLoading}
            >
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            {hfHref ? (
              <Button variant="outline" size="sm" asChild>
                <a href={hfHref} target="_blank" rel="noopener noreferrer">
                  <Link1 className="size-4 ml-1" variant="Linear" />
                  داشبورد Hangfire
                </a>
              </Button>
            ) : null}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/sources">
                <ArrowLeft2 className="size-4 ml-1" variant="Linear" />
                سورس‌های داده
              </Link>
            </Button>
          </div>
        }
      />

      <p className="text-sm text-muted-foreground -mt-4">
        به‌روزرسانی واقعی قیمت در معماری فعلی از مسیر پایتون و{" "}
        <code className="text-xs bg-muted px-1 rounded">POST /api/Product/update-prices</code>
        انجام می‌شود؛ jobهای قیمت دات‌نت در صف Hangfire ممکن است فقط ثبت لاگ کنند. API این صفحه برای نظارت و کنترل امن ادمین است.
      </p>

      {overviewLoading ? (
        <div className="flex justify-center py-12 rounded-xl border border-dashed border-border">
          <Spinner className="size-10 text-muted-foreground" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
            {[
              ["سرورها", stats.servers],
              ["در صف", stats.enqueued],
              ["در حال اجرا", stats.processing],
              ["موفق (تجمعی)", stats.succeeded],
              ["ناموفق (تجمعی)", stats.failed],
              ["زمان‌بندی‌شده", stats.scheduled],
              ["Recurring", stats.recurring],
            ].map(([label, val]) => (
              <div
                key={label}
                className="rounded-xl border border-border bg-card/80 px-3 py-3 text-center shadow-sm"
              >
                <div className="text-xs text-muted-foreground mb-1">{label}</div>
                <div className="text-lg font-semibold tabular-nums">{fmtNum(val)}</div>
              </div>
            ))}
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Timer1 size={20} variant="Linear" className="text-violet-500" />
              عمق صف‌ها
            </h2>
            {queues.length === 0 ? (
              <p className="text-sm text-muted-foreground">صفی گزارش نشد.</p>
            ) : (
              <div className="rounded-xl border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>نام صف</TableHead>
                      <TableHead className="text-left">تعداد</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {queues.map((q) => (
                      <TableRow key={q.name}>
                        <TableCell className="font-mono text-sm">{q.name || "—"}</TableCell>
                        <TableCell>{fmtNum(q.length)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Repeat size={20} variant="Linear" className="text-violet-500" />
              زمان‌بندی‌های recurring
            </h2>
            <div className="rounded-xl border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>شناسه</TableHead>
                    <TableHead>توضیح</TableHead>
                    <TableHead>Cron</TableHead>
                    <TableHead>اجرای بعدی</TableHead>
                    <TableHead>آخرین اجرا</TableHead>
                    <TableHead className="w-[120px]">اقدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recurring.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        موردی ثبت نشده.
                      </TableCell>
                    </TableRow>
                  ) : (
                    recurring.map((r) => (
                      <TableRow key={r.id} className={r.removed ? "opacity-50" : ""}>
                        <TableCell className="font-mono text-xs">{r.id}</TableCell>
                        <TableCell className="text-sm">{RECURRING_LABELS[r.id] || "—"}</TableCell>
                        <TableCell className="font-mono text-xs">{r.cron}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{fmtDate(r.nextExecution)}</TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{fmtDate(r.lastExecution)}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="secondary"
                            disabled={r.removed || !ALLOWED_RECURRING_TRIGGER.has(r.id) || actionKey === `tr-${r.id}`}
                            onClick={() => onTrigger(r.id)}
                          >
                            {actionKey === `tr-${r.id}` ? <Spinner className="size-4" /> : "اجرای فوری"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Flash size={20} variant="Linear" className="text-amber-500" />
              صف دستی به‌روزرسانی قیمت (Hangfire)
            </h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                disabled={actionKey != null && String(actionKey).startsWith("enq-")}
                onClick={() => onEnqueue("popular", "محبوب")}
              >
                {actionKey === "enq-popular" ? <Spinner className="size-4" /> : null}
                صف — محبوب
              </Button>
              <Button
                variant="outline"
                disabled={actionKey != null && String(actionKey).startsWith("enq-")}
                onClick={() => onEnqueue("highPriority", "اولویت بالا")}
              >
                {actionKey === "enq-highPriority" ? <Spinner className="size-4" /> : null}
                صف — اولویت بالا
              </Button>
              <Button
                variant="outline"
                disabled={actionKey != null && String(actionKey).startsWith("enq-")}
                onClick={() => onEnqueue("fullStored", "Full stored")}
              >
                {actionKey === "enq-fullStored" ? <Spinner className="size-4" /> : null}
                صف — Full stored
              </Button>
            </div>
          </section>
        </>
      )}

      <section className="space-y-3">
            <h2 className="text-lg font-semibold">آخرین jobها</h2>
            <Tabs value={recentState} onValueChange={setRecentState}>
              <TabsList className="flex-wrap h-auto gap-1">
                <TabsTrigger value="failed">ناموفق</TabsTrigger>
                <TabsTrigger value="processing">در حال اجرا</TabsTrigger>
                <TabsTrigger value="enqueued">در صف</TabsTrigger>
                <TabsTrigger value="succeeded">موفق</TabsTrigger>
              </TabsList>
              {["failed", "processing", "enqueued", "succeeded"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-4">
                  {recentState !== tab ? null : recentLoading ? (
                    <div className="flex justify-center py-12">
                      <Spinner className="size-8" />
                    </div>
                  ) : (
                    <div className="rounded-xl border overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>JobId</TableHead>
                            <TableHead>زمان</TableHead>
                            <TableHead>جزئیات</TableHead>
                            {tab === "failed" ? <TableHead className="w-[100px]">Retry</TableHead> : null}
                            {tab === "enqueued" || tab === "processing" ? (
                              <TableHead className="w-[100px]">لغو</TableHead>
                            ) : null}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentRows.length === 0 ? (
                            <TableRow>
                              <TableCell
                                colSpan={
                                  tab === "failed" || tab === "enqueued" || tab === "processing" ? 4 : 3
                                }
                                className="text-center text-muted-foreground py-10"
                              >
                                ردیفی نیست.
                              </TableCell>
                            </TableRow>
                          ) : (
                            recentRows.map((row) => (
                              <TableRow key={row.jobId}>
                                <TableCell className="font-mono text-xs whitespace-nowrap">{row.jobId}</TableCell>
                                <TableCell className="text-sm whitespace-nowrap">{fmtDate(row.timestamp)}</TableCell>
                                <TableCell className="text-sm max-w-md truncate" title={row.detail}>
                                  {row.detail || "—"}
                                </TableCell>
                                {tab === "failed" ? (
                                  <TableCell>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      disabled={actionKey === `re-${row.jobId}`}
                                      onClick={() => onRetry(row.jobId)}
                                    >
                                      {actionKey === `re-${row.jobId}` ? <Spinner className="size-4" /> : "Retry"}
                                    </Button>
                                  </TableCell>
                                ) : null}
                                {tab === "enqueued" || tab === "processing" ? (
                                  <TableCell>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      disabled={actionKey === `ca-${row.jobId}`}
                                      onClick={() => onCancel(row.jobId)}
                                    >
                                      {actionKey === `ca-${row.jobId}` ? <Spinner className="size-4" /> : "لغو"}
                                    </Button>
                                  </TableCell>
                                ) : null}
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </section>

          <section className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-lg font-semibold">محصولات نیازمند re-sync قیمت</h2>
              <Button variant="outline" size="sm" onClick={loadResync} disabled={resyncLoading}>
                {resyncLoading ? <Spinner className="size-4" /> : <Refresh className="size-4" variant="Linear" />}
                <span className="mr-1">به‌روزرسانی لیست</span>
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              محصولات full-stored که از آخرین به‌روزرسانی قیمت آن‌ها بیش از ۲۴ ساعت گذشته (قابل تنظیم در API). مرتب‌شده بر اساس اولویت جستجو.
            </p>
            <div className="rounded-xl border overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[80px]">شناسه</TableHead>
                    <TableHead>ASIN</TableHead>
                    <TableHead>عنوان</TableHead>
                    <TableHead>آخرین قیمت</TableHead>
                    <TableHead>اولویت</TableHead>
                    <TableHead>جستجو</TableHead>
                    <TableHead className="w-[100px]">ویرایش</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {resyncRows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-10">
                        {resyncLoading ? "در حال بارگذاری…" : "محصولی در این شرایط یافت نشد."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    resyncRows.map((row) => (
                      <TableRow key={row.productId}>
                        <TableCell>{fmtNum(row.productId)}</TableCell>
                        <TableCell className="font-mono text-xs">{row.asin}</TableCell>
                        <TableCell className="text-sm max-w-[280px] truncate" title={row.title}>
                          {row.title || "—"}
                        </TableCell>
                        <TableCell className="text-sm whitespace-nowrap">{fmtDate(row.lastPriceUpdateAt)}</TableCell>
                        <TableCell>{fmtNum(row.priority)}</TableCell>
                        <TableCell>{fmtNum(row.searchCount)}</TableCell>
                        <TableCell>
                          <Button variant="link" className="px-0 h-auto" asChild>
                            <Link href={`/admin/products/edit/${row.productId}`}>ویرایش</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </section>

      <p className="text-xs text-muted-foreground border-t pt-4">
        آدرس API فعلی فرانت: <code className="bg-muted px-1 rounded">{API_BASE_URL || "—"}</code>
        — داشبورد Hangfire معمولاً فقط در Development روی هاست API فعال است.
      </p>
    </div>
  );
}
