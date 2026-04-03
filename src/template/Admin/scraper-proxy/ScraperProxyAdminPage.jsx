"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  Flash,
  Refresh,
  Trash,
  Heart,
  DocumentText,
  Setting2,
  Chart2,
  DocumentCode2,
  RowVertical,
} from "iconsax-reactjs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { cn } from "@/lib/utils";
import {
  scraperAdminFetch,
  scraperAdminDownloadUrl,
  fetchScraperProxyConfigStatus,
} from "@/services/admin/scraperProxyAdminClient";
import { FORM_STYLES } from "@/template/Admin/formStyles";

function StatusBadge({ st }) {
  const c = {
    active: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
    cooldown: "bg-amber-500/15 text-amber-300 border-amber-500/25",
    disabled: "bg-slate-500/20 text-slate-300 border-slate-500/30",
    banned: "bg-red-500/15 text-red-300 border-red-500/25",
    unhealthy: "bg-orange-500/15 text-orange-300 border-orange-500/25",
  };
  return (
    <span
      className={cn(
        "inline-flex px-2 py-0.5 rounded-md text-xs font-medium border",
        c[st] || "bg-gray-600/20 text-gray-300 border-gray-600/40"
      )}
    >
      {st}
    </span>
  );
}

function MiniStat({ label, value, accent = "text-white" }) {
  return (
    <div className="rounded-xl border border-gray-600/50 bg-gray-800/35 p-4 ring-1 ring-inset ring-white/[0.04] shadow-sm shadow-black/20 backdrop-blur-sm">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className={cn("text-xl font-bold tabular-nums tracking-tight", accent)}>{value ?? "—"}</p>
    </div>
  );
}

const JSON_TEXTAREA =
  "w-full resize-y rounded-lg border border-gray-700/90 bg-[#12171d] font-mono text-[13px] leading-relaxed text-gray-100 placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 focus:border-emerald-500/45 p-3.5 transition-[border-color,box-shadow]";

function SettingsEditorPanel({ icon: Icon = DocumentCode2, title, hint, badge, children, footer }) {
  return (
    <div className="rounded-2xl border border-gray-600/45 bg-gradient-to-b from-gray-900/95 to-[#0b0e13] overflow-hidden shadow-xl shadow-black/35 ring-1 ring-white/[0.04]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-gray-700/70 bg-gray-800/35">
        <div className="flex items-start gap-3 min-w-0">
          <div className="rounded-lg bg-emerald-500/[0.12] border border-emerald-500/25 p-2 shrink-0">
            <Icon size={20} variant="Outline" className="text-emerald-400/95" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-100 tracking-tight">{title}</p>
            {hint ? <p className="text-[12px] text-gray-500 mt-1 leading-relaxed">{hint}</p> : null}
          </div>
        </div>
        {badge ? (
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.12em] text-emerald-300/90 bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-1 rounded-md shrink-0">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="p-3 sm:p-4 bg-[#080b0f]">{children}{footer}</div>
    </div>
  );
}

function JsonConfigBlock({ title, hint, value, onChange, rows = 10 }) {
  const { status, lineCount } = useMemo(() => {
    const t = (value ?? "").trim();
    const lines = value ? value.split("\n").length : 1;
    if (!t) return { status: "empty", lineCount: lines };
    try {
      JSON.parse(t);
      return { status: "ok", lineCount: lines };
    } catch {
      return { status: "bad", lineCount: lines };
    }
  }, [value]);

  const statusLine =
    status === "ok" ? (
      <span className="text-emerald-400/85">JSON معتبر</span>
    ) : status === "bad" ? (
      <span className="text-red-400/95">سینتکس JSON نامعتبر — قبل از ذخیره اصلاح کنید</span>
    ) : (
      <span className="text-gray-500">خالی؛ آرایه یا آبجکت معتبر وارد کنید</span>
    );

  return (
    <SettingsEditorPanel
      title={title}
      hint={hint}
      badge="JSON"
      footer={
        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-3 border-t border-gray-800/90">
          <p className={cn("text-[11px] font-medium", status === "bad" && "font-semibold")}>{statusLine}</p>
          <span className="text-[11px] text-gray-600 font-mono tabular-nums">{lineCount} خط</span>
        </div>
      }
    >
      <textarea
        value={value}
        onChange={onChange}
        spellCheck={false}
        autoComplete="off"
        rows={rows}
        className={cn(JSON_TEXTAREA, "min-h-[140px]")}
        style={{ tabSize: 2 }}
      />
    </SettingsEditorPanel>
  );
}

const EMPTY_PROXY_FORM = {
  host: "",
  port: "8080",
  username: "",
  password: "",
  protocol: "http",
  kind: "datacenter",
  scope: "all",
  location: "",
  weight: "100",
  max_rpm: "60",
  notes: "",
};

const EMPTY_BULK_FORM = {
  text: "",
  kind: "datacenter",
  scope: "all",
  location: "",
  protocol: "http",
};

export default function ScraperProxyAdminPage() {
  const [tab, setTab] = useState("dashboard");
  const [dashLoading, setDashLoading] = useState(false);
  const [proxiesLoading, setProxiesLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);
  const [healthLoading, setHealthLoading] = useState(false);
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [actionBusy, setActionBusy] = useState(false);
  const [configStatus, setConfigStatus] = useState(null);
  const healthPollRef = useRef(null);
  const detailSeqRef = useRef(0);

  const clearHealthPoll = useCallback(() => {
    if (healthPollRef.current) {
      clearInterval(healthPollRef.current);
      healthPollRef.current = null;
    }
  }, []);

  /* dashboard */
  const [dash, setDash] = useState(null);
  const loadDash = useCallback(async (refresh) => {
    try {
      setDashLoading(true);
      const j = await scraperAdminFetch("proxies/dashboard/full", {
        searchParams: refresh ? { refresh: "1" } : {},
      });
      if (j?.success) setDash(j.data);
      else toast.error("پاسخ نامعتبر داشبورد");
    } catch (e) {
      toast.error(e.message || "خطا در داشبورد");
    } finally {
      setDashLoading(false);
    }
  }, []);

  /* proxies */
  const [rows, setRows] = useState([]);
  const [pg, setPg] = useState({ page: 1, total_pages: 1, total: 0 });
  const [fIp, setFIp] = useState("");
  const [fStatus, setFStatus] = useState("");
  const [fKind, setFKind] = useState("");
  const [fScope, setFScope] = useState("");
  const [fLocation, setFLocation] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [batchResult, setBatchResult] = useState([]);
  const [batchLoading, setBatchLoading] = useState(false);
  const [proxyModalOpen, setProxyModalOpen] = useState(false);
  const [proxyModalMode, setProxyModalMode] = useState("create");
  const [editingProxyId, setEditingProxyId] = useState(null);
  const [proxyForm, setProxyForm] = useState(EMPTY_PROXY_FORM);
  const [proxySubmitLoading, setProxySubmitLoading] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [bulkForm, setBulkForm] = useState(EMPTY_BULK_FORM);
  const [bulkSubmitLoading, setBulkSubmitLoading] = useState(false);
  const selectedIdSet = useMemo(() => new Set(selectedIds), [selectedIds]);
  const loadProxies = useCallback(
    async (page = 1) => {
      try {
        setProxiesLoading(true);
        const j = await scraperAdminFetch("proxies", {
          searchParams: {
            page: String(page),
            page_size: "50",
            ...(fIp && { ip: fIp }),
            ...(fStatus && { status: fStatus }),
            ...(fKind && { kind: fKind }),
            ...(fScope && { scope: fScope }),
            ...(fLocation && { location: fLocation }),
          },
        });
        if (j?.success) {
          setRows(j.data || []);
          setPg(j.pagination || { page: 1, total_pages: 1, total: 0 });
        }
      } catch (e) {
        toast.error(e.message || "خطا در لیست پروکسی");
      } finally {
        setProxiesLoading(false);
      }
    },
    [fIp, fStatus, fKind, fScope, fLocation]
  );

  /* logs */
  const [logRows, setLogRows] = useState([]);
  const [logPg, setLogPg] = useState({ page: 1, total_pages: 1, total: 0 });
  const [logFrom, setLogFrom] = useState("");
  const [logTo, setLogTo] = useState("");
  const [logPid, setLogPid] = useState("");
  const [logOutcome, setLogOutcome] = useState("all");
  const [logJobType, setLogJobType] = useState("");
  const [logErrorType, setLogErrorType] = useState("");
  const loadLogs = useCallback(
    async (page = 1) => {
      try {
        setLogsLoading(true);
        const j = await scraperAdminFetch("scrape-logs", {
          searchParams: {
            page: String(page),
            page_size: "50",
            ...(logFrom && { from: logFrom }),
            ...(logTo && { to: logTo }),
            ...(logPid && { proxy_id: logPid }),
            ...(logJobType && { job_type: logJobType }),
            ...(logErrorType && { error_type: logErrorType }),
            ...(logOutcome !== "all" && { outcome: logOutcome }),
          },
        });
        if (j?.success) {
          setLogRows(j.data || []);
          setLogPg(j.pagination || { page: 1, total_pages: 1, total: 0 });
        }
      } catch (e) {
        toast.error(e.message || "خطا در لاگ");
      } finally {
        setLogsLoading(false);
      }
    },
    [logFrom, logTo, logPid, logJobType, logErrorType, logOutcome]
  );

  /* health */
  const [healthRows, setHealthRows] = useState([]);
  const [jobJson, setJobJson] = useState(null);
  const loadHealthLatest = useCallback(async () => {
    try {
      setHealthLoading(true);
      const j = await scraperAdminFetch("proxies/health/latest", {
        searchParams: { page: "1", page_size: "100" },
      });
      if (j?.success) setHealthRows(j.data || []);
    } catch (e) {
      toast.error(e.message || "خطا در Health");
    } finally {
      setHealthLoading(false);
    }
  }, []);

  const runHealth = async (scope) => {
    try {
      setActionBusy(true);
      clearHealthPoll();
      const j = await scraperAdminFetch("proxies/health/run", {
        method: "POST",
        body: { scope },
      });
      if (!j?.success || !j.job_id) {
        toast.error(j?.message || "شروع health ناموفق");
        return;
      }
      const id = j.job_id;
      setJobJson({ status: "running", job_id: id });
      healthPollRef.current = setInterval(async () => {
        try {
          const st = await scraperAdminFetch(`proxies/health/jobs/${id}`);
          if (st?.success && st.data) {
            setJobJson(st.data);
            if (st.data.status === "completed") {
              clearHealthPoll();
              loadHealthLatest();
            }
          }
        } catch {
          clearHealthPoll();
        }
      }, 2000);
      toast.success("اجرای Health شروع شد");
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setActionBusy(false);
    }
  };

  /* settings */
  const [setRot, setSetRot] = useState("weighted");
  const [setDmin, setSetDmin] = useState("0");
  const [setDmax, setSetDmax] = useState("0");
  const [setCd, setSetCd] = useState("[]");
  const [setRetry, setSetRetry] = useState("{}");
  const [setScope, setSetScope] = useState("{}");
  const loadSettings = useCallback(async () => {
    try {
      setSettingsLoading(true);
      const j = await scraperAdminFetch("proxy-manager/settings");
      if (!j?.success || !j.data) return;
      const d = j.data;
      setSetRot(d.rotation_strategy || "weighted");
      setSetDmin(String(d.default_delay_min_ms ?? 0));
      setSetDmax(String(d.default_delay_max_ms ?? 0));
      setSetCd(JSON.stringify(d.cooldown_rules || [], null, 2));
      setSetRetry(JSON.stringify(d.retry_settings || {}, null, 2));
      setSetScope(JSON.stringify(d.scope_location_rules || {}, null, 2));
    } catch (e) {
      toast.error(e.message || "خطا در تنظیمات");
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  const saveSettings = async () => {
    try {
      setActionBusy(true);
      const body = {
        rotation_strategy: setRot,
        default_delay_min_ms: parseInt(setDmin, 10) || 0,
        default_delay_max_ms: parseInt(setDmax, 10) || 0,
        cooldown_rules: JSON.parse(setCd || "[]"),
        retry_settings: JSON.parse(setRetry || "{}"),
        scope_location_rules: JSON.parse(setScope || "{}"),
      };
      const j = await scraperAdminFetch("proxy-manager/settings", { method: "PATCH", body });
      if (j?.success) {
        toast.success("تنظیمات ذخیره شد");
        loadSettings();
      }
    } catch (e) {
      toast.error(e.message || "JSON یا سرور نامعتبر");
    } finally {
      setActionBusy(false);
    }
  };

  /* detail dialog */
  const [detailOpen, setDetailOpen] = useState(false);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [tsBars, setTsBars] = useState([]);

  const openDetail = async (id) => {
    const seq = ++detailSeqRef.current;
    setDetailOpen(true);
    setDetail(null);
    setTsBars([]);
    setDetailLoading(true);
    try {
      const [j, tj] = await Promise.all([
        scraperAdminFetch(`proxies/${id}`),
        scraperAdminFetch(`proxies/${id}/stats/timeseries`, {
          searchParams: { granularity: "day" },
        }),
      ]);
      if (seq !== detailSeqRef.current) return;
      if (j?.success) setDetail(j.data);
      if (tj?.success && tj.data?.series) setTsBars(tj.data.series);
    } catch (e) {
      if (seq === detailSeqRef.current) toast.error(e.message || "خطا در جزئیات");
    } finally {
      if (seq === detailSeqRef.current) setDetailLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await fetchScraperProxyConfigStatus();
        if (!cancelled) setConfigStatus(s);
      } catch (e) {
        if (!cancelled) {
          setConfigStatus({
            ready: false,
            issues: [e.message || "بررسی پیکربندی ناموفق"],
            hasAdminApiKey: false,
            hasDotnetApiUrl: false,
            scraperHost: null,
          });
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => () => clearHealthPoll(), [clearHealthPoll]);

  useEffect(() => {
    if (tab !== "health") clearHealthPoll();
  }, [tab, clearHealthPoll]);

  useEffect(() => {
    if (tab === "dashboard") loadDash(false);
    if (tab === "proxies") loadProxies(1);
    if (tab === "logs") loadLogs(1);
    if (tab === "health") loadHealthLatest();
    if (tab === "settings") loadSettings();
  }, [tab, loadDash, loadProxies, loadLogs, loadHealthLatest, loadSettings]);

  useEffect(() => {
    setSelectedIds((prev) => prev.filter((id) => rows.some((r) => r.id === id)));
  }, [rows]);

  const proxyAction = async (path, method = "POST", body = {}) => {
    try {
      setActionBusy(true);
      await scraperAdminFetch(path, { method, body });
      toast.success("انجام شد");
      await Promise.all([loadProxies(pg.page), loadDash(false)]);
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setActionBusy(false);
    }
  };

  const openCreateProxyModal = () => {
    setProxyModalMode("create");
    setEditingProxyId(null);
    setProxyForm(EMPTY_PROXY_FORM);
    setProxyModalOpen(true);
  };

  const openEditProxyModal = (row) => {
    setProxyModalMode("edit");
    setEditingProxyId(row.id);
    setProxyForm({
      host: row.host || "",
      port: String(row.port ?? 8080),
      username: row.username || "",
      password: "",
      protocol: row.protocol || "http",
      kind: row.kind || "datacenter",
      scope: row.scope || "all",
      location: row.location || "",
      weight: String(row.weight ?? 100),
      max_rpm: String(row.max_rpm ?? 60),
      notes: row.notes || "",
    });
    setProxyModalOpen(true);
  };

  const saveProxyForm = async ({ testAfterSave = false } = {}) => {
    const host = proxyForm.host.trim();
    const port = parseInt(proxyForm.port, 10);
    if (!host) {
      toast.error("Host / IP الزامی است");
      return;
    }
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      toast.error("Port باید بین 1 تا 65535 باشد");
      return;
    }
    const payload = {
      host,
      port,
      username: proxyForm.username.trim() || null,
      protocol: proxyForm.protocol.trim() || "http",
      kind: proxyForm.kind.trim() || "datacenter",
      scope: proxyForm.scope.trim() || "all",
      location: proxyForm.location.trim() || null,
      weight: parseInt(proxyForm.weight, 10) || 100,
      max_rpm: parseInt(proxyForm.max_rpm, 10) || 60,
      notes: proxyForm.notes.trim() || null,
    };
    if (proxyForm.password.trim()) payload.password = proxyForm.password;

    try {
      setProxySubmitLoading(true);
      const isEdit = proxyModalMode === "edit" && editingProxyId;
      const path = isEdit ? `proxies/${editingProxyId}` : "proxies";
      const method = isEdit ? "PATCH" : "POST";
      const j = await scraperAdminFetch(path, { method, body: payload });
      if (j?.success) {
        const savedId = j?.data?.id || editingProxyId;
        if (testAfterSave && savedId) {
          try {
            await scraperAdminFetch(`proxies/${savedId}/test`, { method: "POST", body: {} });
            toast.success("ذخیره و تست با موفقیت انجام شد");
          } catch (e) {
            toast.error(`ذخیره انجام شد، اما تست ناموفق بود: ${e.message || "خطای تست"}`);
          }
        }
        if (!testAfterSave) {
          toast.success(isEdit ? "پروکسی ویرایش شد" : "پروکسی افزوده شد");
        }
        setProxyModalOpen(false);
        await Promise.all([loadProxies(pg.page), loadDash(false)]);
      }
    } catch (e) {
      toast.error(e.message || "خطا در ذخیره پروکسی");
    } finally {
      setProxySubmitLoading(false);
    }
  };

  const runBatchTest = async () => {
    if (!selectedIds.length) {
      toast.error("حداقل یک پروکسی انتخاب کنید");
      return;
    }
    try {
      setBatchLoading(true);
      const j = await scraperAdminFetch("proxies/test-batch", {
        method: "POST",
        body: { ids: selectedIds },
      });
      if (j?.success) {
        setBatchResult(j.data || []);
        toast.success(`تست دسته‌ای انجام شد (${j.count || 0})`);
      }
    } catch (e) {
      toast.error(e.message || "خطا در تست دسته‌ای");
    } finally {
      setBatchLoading(false);
    }
  };

  const submitBulkImport = async () => {
    if (!bulkForm.text.trim()) {
      toast.error("لیست پروکسی خالی است");
      return;
    }
    try {
      setBulkSubmitLoading(true);
      const j = await scraperAdminFetch("proxies/bulk-import", {
        method: "POST",
        body: {
          text: bulkForm.text,
          kind: bulkForm.kind,
          scope: bulkForm.scope,
          location: bulkForm.location,
          protocol: bulkForm.protocol,
        },
      });
      if (j?.success) {
        const errCount = Array.isArray(j.errors) ? j.errors.length : 0;
        toast.success(`ورود گروهی تمام شد: ${j.imported || 0} موفق / ${errCount} خطا`);
        setBulkOpen(false);
        setBulkForm(EMPTY_BULK_FORM);
        await Promise.all([loadProxies(1), loadDash(false)]);
      }
    } catch (e) {
      toast.error(e.message || "خطا در Bulk Import");
    } finally {
      setBulkSubmitLoading(false);
    }
  };

  const r1 = dash?.row1 || {};
  const r2 = dash?.row2 || {};

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="تنظیمات پروکسی اسکرپر"
        subtitle="مدیریت پول پروکسی، لاگ، Health و سیاست‌ها — اتصال امن از طریق سرور Next. نرخ موفقیت امروز در تب داشبورد."
        icon={Flash}
        actions={
          <Link href="/admin/sources">
            <Button type="button" variant="outline" className="border-gray-600 text-gray-200 hover:bg-gray-800">
              سورس‌های داده
            </Button>
          </Link>
        }
      />

      {configStatus && !configStatus.ready && (
        <div
          className="rounded-xl border border-amber-500/40 bg-amber-950/40 px-4 py-3 text-sm text-amber-100"
          role="alert"
        >
          <p className="font-medium text-amber-200 mb-2">پیکربندی سرور Next ناقص است</p>
          <ul className="list-disc list-inside space-y-1 text-amber-100/90">
            {(configStatus.issues || []).map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-amber-200/80">
            روی سرور در env فرانت (مثلاً .env.local یا docker-compose):{" "}
            <code className="rounded bg-black/30 px-1">SCRAPER_ADMIN_API_KEY</code> همان{" "}
            <code className="rounded bg-black/30 px-1">ADMIN_API_KEY</code> اسکرپر؛ اختیاری{" "}
            <code className="rounded bg-black/30 px-1">SCRAPER_SERVICE_URL</code> برای آدرس داخلی اسکرپر.
            بعد از تغییر، کانتینر/سرویس Next را restart کنید.
          </p>
        </div>
      )}

      {configStatus?.ready && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-950/25 px-4 py-2.5 text-xs text-emerald-100/90 shadow-sm shadow-black/20">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)] shrink-0" aria-hidden />
          <span className="text-gray-400">اسکرپر هدف:</span>
          <span className="font-mono text-emerald-200/95">{configStatus.scraperHost || "—"}</span>
          <span className="text-gray-500">
            {configStatus.usesDedicatedScraperUrl ? "(SCRAPER_SERVICE_URL)" : "(NEXT_PUBLIC_SCRAPER_URL)"}
          </span>
        </div>
      )}

      <Tabs value={tab} onValueChange={setTab} dir="rtl" className="w-full">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1.5 bg-gray-900/80 border border-gray-600/60 rounded-2xl w-full justify-start shadow-inner shadow-black/30 ring-1 ring-white/[0.03]">
          <TabsTrigger
            value="dashboard"
            className="gap-1.5 px-3 py-2 rounded-xl text-gray-400 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-900/40 data-[state=inactive]:hover:bg-gray-800/80 data-[state=inactive]:hover:text-gray-200 transition-colors"
          >
            <Chart2 size={18} className="shrink-0" />
            داشبورد
          </TabsTrigger>
          <TabsTrigger
            value="proxies"
            className="gap-1.5 px-3 py-2 rounded-xl text-gray-400 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-900/40 data-[state=inactive]:hover:bg-gray-800/80 data-[state=inactive]:hover:text-gray-200 transition-colors"
          >
            پروکسی‌ها
          </TabsTrigger>
          <TabsTrigger
            value="logs"
            className="gap-1.5 px-3 py-2 rounded-xl text-gray-400 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-900/40 data-[state=inactive]:hover:bg-gray-800/80 data-[state=inactive]:hover:text-gray-200 transition-colors"
          >
            <DocumentText size={18} className="shrink-0" />
            لاگ اسکرپ
          </TabsTrigger>
          <TabsTrigger
            value="health"
            className="gap-1.5 px-3 py-2 rounded-xl text-gray-400 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-900/40 data-[state=inactive]:hover:bg-gray-800/80 data-[state=inactive]:hover:text-gray-200 transition-colors"
          >
            <Heart size={18} className="shrink-0" />
            Health
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="gap-1.5 px-3 py-2 rounded-xl text-gray-400 data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-emerald-900/40 data-[state=inactive]:hover:bg-gray-800/80 data-[state=inactive]:hover:text-gray-200 transition-colors"
          >
            <Setting2 size={18} className="shrink-0" />
            تنظیمات موتور
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-4 space-y-4">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="secondary"
              className="bg-gray-700 hover:bg-gray-600"
              disabled={dashLoading}
              onClick={() => loadDash(true)}
            >
              <Refresh size={18} className="ml-1" />
              نوسازی کش
            </Button>
          </div>
          {dashLoading && !dash ? (
            <div className="flex justify-center py-16">
              <Spinner className="size-10" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                <MiniStat label="کل پروکسی" value={r1.total_proxies} />
                <MiniStat label="فعال" value={r1.active} accent="text-emerald-400" />
                <MiniStat label="Cooldown" value={r1.cooldown} accent="text-amber-400" />
                <MiniStat label="غیرفعال+بن" value={r1.disabled_banned} />
                <MiniStat label="درخواست امروز" value={r1.requests_today} />
                <MiniStat label="میانگین ms" value={r1.avg_response_ms_today ?? "—"} />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <h3 className="text-sm font-semibold text-gray-300">سلامت ترافیک امروز (UTC)</h3>
                <span className="h-px flex-1 bg-gradient-to-l from-transparent via-gray-600/70 to-transparent" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <MiniStat label="نرخ موفقیت %" value={r2.success_rate_percent_today ?? "—"} accent="text-cyan-400" />
                <MiniStat label="۴۲۹" value={r2.count_429_today} accent="text-red-400" />
                <MiniStat label="سیگنال Captcha" value={r2.count_captcha_signals_today} />
                <MiniStat
                  label="پرمصرف‌ترین"
                  value={
                    r2.top_proxy
                      ? `#${r2.top_proxy.proxy_id} ${r2.top_proxy.host || ""}`
                      : "—"
                  }
                />
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="proxies" className="mt-4 space-y-4">
          <AdminSectionCard title="فیلتر و عملیات">
            <div className="flex flex-wrap gap-2 items-end mb-4">
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>IP / یادداشت</Label>
                <Input value={fIp} onChange={(e) => setFIp(e.target.value)} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>وضعیت</Label>
                <Input
                  placeholder="active, cooldown..."
                  value={fStatus}
                  onChange={(e) => setFStatus(e.target.value)}
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>نوع</Label>
                <Input
                  placeholder="datacenter..."
                  value={fKind}
                  onChange={(e) => setFKind(e.target.value)}
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>Scope</Label>
                <Input
                  placeholder="all, search..."
                  value={fScope}
                  onChange={(e) => setFScope(e.target.value)}
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>Location</Label>
                <Input
                  placeholder="uae, dubai..."
                  value={fLocation}
                  onChange={(e) => setFLocation(e.target.value)}
                  className={FORM_STYLES.input}
                />
              </div>
              <Button
                type="button"
                onClick={() => loadProxies(1)}
                disabled={proxiesLoading}
                className="bg-emerald-600 hover:bg-emerald-500"
              >
                بارگذاری
              </Button>
              <a
                href={scraperAdminDownloadUrl("proxies/export.csv", {
                  ...(fIp && { ip: fIp }),
                  ...(fStatus && { status: fStatus }),
                  ...(fKind && { kind: fKind }),
                  ...(fScope && { scope: fScope }),
                  ...(fLocation && { location: fLocation }),
                })}
                className="inline-flex h-11 items-center px-4 rounded-xl bg-gray-700 hover:bg-gray-600 text-sm"
              >
                Export CSV
              </a>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600"
                onClick={openCreateProxyModal}
                disabled={actionBusy}
              >
                افزودن پروکسی
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600"
                onClick={() => setBulkOpen(true)}
                disabled={actionBusy}
              >
                Bulk Import
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="bg-gray-700 hover:bg-gray-600"
                onClick={runBatchTest}
                disabled={batchLoading || !selectedIds.length}
              >
                تست دسته‌ای ({selectedIds.length})
              </Button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-600/60">
              <table className="w-full text-sm text-right">
                <thead className="bg-gray-800/80 text-gray-400">
                  <tr>
                    <th className="p-3 w-10">
                      <input
                        type="checkbox"
                        checked={rows.length > 0 && selectedIds.length === rows.length}
                        onChange={(e) =>
                          setSelectedIds(e.target.checked ? rows.map((r) => r.id) : [])
                        }
                        className="accent-emerald-500"
                      />
                    </th>
                    <th className="p-3">#</th>
                    <th className="p-3">Host</th>
                    <th className="p-3">نوع</th>
                    <th className="p-3">Scope</th>
                    <th className="p-3">Location</th>
                    <th className="p-3">وضعیت</th>
                    <th className="p-3">عملیات</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-t border-gray-700/80 hover:bg-gray-800/30">
                      <td className="p-3">
                        <input
                          type="checkbox"
                          checked={selectedIdSet.has(row.id)}
                          onChange={(e) =>
                            setSelectedIds((prev) =>
                              e.target.checked ? Array.from(new Set([...prev, row.id])) : prev.filter((id) => id !== row.id)
                            )
                          }
                          className="accent-emerald-500"
                        />
                      </td>
                      <td className="p-3">{row.id}</td>
                      <td className="p-3 font-mono text-xs">
                        {row.host}:{row.port}
                      </td>
                      <td className="p-3">{row.kind}</td>
                      <td className="p-3">{row.scope}</td>
                      <td className="p-3">{row.location || "—"}</td>
                      <td className="p-3">
                        <StatusBadge st={row.status} />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-1">
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-600"
                            disabled={actionBusy}
                            onClick={() => openDetail(row.id)}
                          >
                            جزئیات
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-600"
                            disabled={actionBusy}
                            onClick={() => openEditProxyModal(row)}
                          >
                            ویرایش
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-600"
                            disabled={actionBusy}
                            onClick={() => proxyAction(`proxies/${row.id}/test`, "POST", {})}
                          >
                            تست
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-600"
                            disabled={actionBusy}
                            onClick={() => proxyAction(`proxies/${row.id}/disable`, "POST", {})}
                          >
                            غیرفعال
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-gray-600"
                            disabled={actionBusy}
                            onClick={() => proxyAction(`proxies/${row.id}/enable`, "POST", {})}
                          >
                            فعال
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-amber-700/50 text-amber-400"
                            disabled={actionBusy}
                            onClick={() => proxyAction(`proxies/${row.id}/force-cooldown`, "POST", { minutes: 15 })}
                          >
                            Cooldown
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="h-8 border-red-800/50 text-red-400"
                            disabled={actionBusy}
                            onClick={() => {
                              if (confirm("حذف این پروکسی؟")) proxyAction(`proxies/${row.id}`, "DELETE");
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {batchResult.length > 0 && (
              <div className="rounded-xl border border-gray-700 bg-gray-900/50 p-3">
                <p className="text-xs text-gray-400 mb-2">نتیجه تست دسته‌ای</p>
                <div className="max-h-48 overflow-auto space-y-1 text-xs">
                  {batchResult.map((r, idx) => (
                    <div key={`${r.proxy_id || "x"}-${idx}`} className="flex items-center justify-between border-b border-gray-800 py-1">
                      <span className="font-mono text-gray-300">#{r.proxy_id ?? "?"}</span>
                      <span className={r.ok ? "text-emerald-400" : "text-red-400"}>
                        {r.ok ? "OK" : r.error || "FAILED"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-between items-center mt-3 text-sm text-gray-400">
              <span>
                صفحه {pg.page} از {pg.total_pages} — کل {pg.total}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={proxiesLoading || pg.page <= 1}
                  onClick={() => loadProxies(pg.page - 1)}
                >
                  قبلی
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={proxiesLoading || pg.page >= pg.total_pages}
                  onClick={() => loadProxies(pg.page + 1)}
                >
                  بعدی
                </Button>
              </div>
            </div>
          </AdminSectionCard>
        </TabsContent>

        <TabsContent value="logs" className="mt-4 space-y-4">
          <AdminSectionCard title="فیلتر لاگ">
            <div className="flex flex-wrap gap-2 items-end mb-4">
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>از (ISO)</Label>
                <Input value={logFrom} onChange={(e) => setLogFrom(e.target.value)} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>تا</Label>
                <Input value={logTo} onChange={(e) => setLogTo(e.target.value)} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>proxy_id</Label>
                <Input value={logPid} onChange={(e) => setLogPid(e.target.value)} className={FORM_STYLES.input} />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>نتیجه</Label>
                <Input
                  value={logOutcome}
                  onChange={(e) => setLogOutcome(e.target.value)}
                  placeholder="all | ok | error"
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>job_type</Label>
                <Input
                  value={logJobType}
                  onChange={(e) => setLogJobType(e.target.value)}
                  placeholder="search | product..."
                  className={FORM_STYLES.input}
                />
              </div>
              <div className="space-y-1">
                <Label className={FORM_STYLES.label}>error_type</Label>
                <Input
                  value={logErrorType}
                  onChange={(e) => setLogErrorType(e.target.value)}
                  placeholder="timeout | captcha..."
                  className={FORM_STYLES.input}
                />
              </div>
              <Button onClick={() => loadLogs(1)} disabled={logsLoading} className="bg-emerald-600">
                بارگذاری
              </Button>
              <a
                href={scraperAdminDownloadUrl("scrape-logs/export.csv", {
                  ...(logFrom && { from: logFrom }),
                  ...(logTo && { to: logTo }),
                  ...(logPid && { proxy_id: logPid }),
                  ...(logJobType && { job_type: logJobType }),
                  ...(logErrorType && { error_type: logErrorType }),
                  ...(logOutcome !== "all" && { outcome: logOutcome }),
                })}
                className="inline-flex h-11 items-center px-4 rounded-xl bg-gray-700"
              >
                Export CSV
              </a>
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-600/60 text-xs font-mono">
              <table className="w-full text-right">
                <thead className="bg-gray-800/80 text-gray-400">
                  <tr>
                    <th className="p-2">زمان</th>
                    <th className="p-2">proxy</th>
                    <th className="p-2">job</th>
                    <th className="p-2">code</th>
                    <th className="p-2">status</th>
                    <th className="p-2">error</th>
                  </tr>
                </thead>
                <tbody>
                  {logRows.map((x) => (
                    <tr key={x.request_id} className="border-t border-gray-700/80">
                      <td className="p-2 whitespace-nowrap">{x.requested_at}</td>
                      <td className="p-2">{x.proxy || x.proxy_id}</td>
                      <td className="p-2">{x.job_type}</td>
                      <td className="p-2">{x.response_code ?? "—"}</td>
                      <td className="p-2">{x.status}</td>
                      <td className="p-2 truncate max-w-[200px]">{x.error_type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-400">
              <span>
                صفحه {logPg.page} / {logPg.total_pages}
              </span>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={logsLoading || logPg.page <= 1}
                  onClick={() => loadLogs(logPg.page - 1)}
                >
                  قبلی
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={logsLoading || logPg.page >= logPg.total_pages}
                  onClick={() => loadLogs(logPg.page + 1)}
                >
                  بعدی
                </Button>
              </div>
            </div>
          </AdminSectionCard>
        </TabsContent>

        <TabsContent value="health" className="mt-4 space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button
              className="bg-emerald-600"
              onClick={() => runHealth("all")}
              disabled={actionBusy || healthLoading}
            >
              تست همه
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-700"
              onClick={() => runHealth("active_only")}
              disabled={actionBusy || healthLoading}
            >
              فقط Active
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-700"
              onClick={() => runHealth("cooldown_only")}
              disabled={actionBusy || healthLoading}
            >
              فقط Cooldown
            </Button>
            <Button
              variant="secondary"
              className="bg-gray-700"
              onClick={loadHealthLatest}
              disabled={healthLoading || actionBusy}
            >
              بارگذاری آخرین
            </Button>
          </div>
          {jobJson && (
            <pre className="text-xs bg-gray-950 border border-gray-700 rounded-xl p-3 overflow-auto max-h-40 text-amber-200">
              {JSON.stringify(jobJson, null, 2)}
            </pre>
          )}
          <div className="overflow-x-auto rounded-xl border border-gray-600/60">
            <table className="w-full text-sm">
              <thead className="bg-gray-800/80 text-gray-400">
                <tr>
                  <th className="p-2">پروکسی</th>
                  <th className="p-2">زمان</th>
                  <th className="p-2">OK</th>
                  <th className="p-2">Captcha</th>
                  <th className="p-2">ms</th>
                  <th className="p-2">وضعیت</th>
                </tr>
              </thead>
              <tbody>
                {healthRows.map((x) => (
                  <tr
                    key={`${x.proxy_id ?? x.proxy ?? "?"}-${x.checked_at ?? ""}`}
                    className="border-t border-gray-700/80"
                  >
                    <td className="p-2 font-mono text-xs">{x.proxy || x.proxy_id}</td>
                    <td className="p-2 text-xs">{x.checked_at}</td>
                    <td className="p-2">{x.amazon_response_ok ? "✓" : "—"}</td>
                    <td className="p-2">{x.captcha_detected ? "!" : ""}</td>
                    <td className="p-2">{x.response_time_ms}</td>
                    <td className="p-2">{x.status_decision}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="mt-5 space-y-6">
          <AdminSectionCard title="موتور پروکسی">
            {settingsLoading && (
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Spinner className="size-4" />
                در حال بارگذاری تنظیمات…
              </div>
            )}
            <div className="space-y-6 max-w-4xl">
              <SettingsEditorPanel
                icon={Setting2}
                title="استراتژی چرخش و تأخیر تصادفی"
                hint="نام فیلدها همان قرارداد API است؛ مقادیر را مطابق موتور اسکرپر تنظیم کنید."
              >
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-medium text-gray-500">rotation_strategy</Label>
                    <Input
                      value={setRot}
                      onChange={(e) => setSetRot(e.target.value)}
                      className={cn(FORM_STYLES.input, "bg-[#12171d] border-gray-700/90")}
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-gray-500">default_delay_min_ms</Label>
                      <Input
                        value={setDmin}
                        onChange={(e) => setSetDmin(e.target.value)}
                        className={cn(FORM_STYLES.input, "bg-[#12171d] border-gray-700/90 font-mono text-sm")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs font-medium text-gray-500">default_delay_max_ms</Label>
                      <Input
                        value={setDmax}
                        onChange={(e) => setSetDmax(e.target.value)}
                        className={cn(FORM_STYLES.input, "bg-[#12171d] border-gray-700/90 font-mono text-sm")}
                      />
                    </div>
                  </div>
                </div>
              </SettingsEditorPanel>

              <JsonConfigBlock
                title="قوانین Cooldown"
                hint="بر اساس کد پاسخ HTTP یا نوع خطا، مدت cooldown و وضعیت هدف را مشخص می‌کند."
                value={setCd}
                onChange={(e) => setSetCd(e.target.value)}
                rows={12}
              />
              <JsonConfigBlock
                title="تنظیمات Retry"
                hint="سیاست تلاش مجدد برای درخواست‌های ناموفق."
                value={setRetry}
                onChange={(e) => setSetRetry(e.target.value)}
                rows={6}
              />
              <JsonConfigBlock
                title="قوانین Scope و Location"
                hint="نگاشت job/scope به منطقه یا نوع پروکسی."
                value={setScope}
                onChange={(e) => setSetScope(e.target.value)}
                rows={6}
              />

              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Button
                  type="button"
                  onClick={saveSettings}
                  disabled={actionBusy || settingsLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-900/30 h-11 px-6 rounded-xl"
                >
                  ذخیره تنظیمات
                </Button>
                <p className="text-[11px] text-gray-500 max-w-md leading-relaxed">
                  قبل از ذخیره، نوار وضعیت زیر هر بلوک JSON باید «معتبر» باشد؛ در غیر این صورت API اسکرپر ممکن است خطا برگرداند.
                </p>
              </div>
            </div>
          </AdminSectionCard>
        </TabsContent>
      </Tabs>

      <Dialog open={proxyModalOpen} onOpenChange={setProxyModalOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-600 text-white">
          <DialogHeader>
            <DialogTitle>{proxyModalMode === "edit" ? "ویرایش پروکسی" : "افزودن پروکسی"}</DialogTitle>
            <DialogDescription className="text-gray-400">
              تنظیمات اتصال و سیاست مصرف پروکسی را ثبت کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Host / IP</Label>
              <Input
                value={proxyForm.host}
                onChange={(e) => setProxyForm((p) => ({ ...p, host: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Port</Label>
              <Input
                value={proxyForm.port}
                onChange={(e) => setProxyForm((p) => ({ ...p, port: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Username</Label>
              <Input
                value={proxyForm.username}
                onChange={(e) => setProxyForm((p) => ({ ...p, username: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>
                Password {proxyModalMode === "edit" ? "(اختیاری برای تغییر)" : ""}
              </Label>
              <Input
                value={proxyForm.password}
                type="password"
                onChange={(e) => setProxyForm((p) => ({ ...p, password: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Type</Label>
              <Input
                value={proxyForm.kind}
                onChange={(e) => setProxyForm((p) => ({ ...p, kind: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Scope</Label>
              <Input
                value={proxyForm.scope}
                onChange={(e) => setProxyForm((p) => ({ ...p, scope: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Location</Label>
              <Input
                value={proxyForm.location}
                onChange={(e) => setProxyForm((p) => ({ ...p, location: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Protocol</Label>
              <Input
                value={proxyForm.protocol}
                onChange={(e) => setProxyForm((p) => ({ ...p, protocol: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Weight / Priority</Label>
              <Input
                value={proxyForm.weight}
                onChange={(e) => setProxyForm((p) => ({ ...p, weight: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Max Requests Per Minute</Label>
              <Input
                value={proxyForm.max_rpm}
                onChange={(e) => setProxyForm((p) => ({ ...p, max_rpm: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1 md:col-span-2">
              <Label className={FORM_STYLES.label}>Notes</Label>
              <textarea
                value={proxyForm.notes}
                onChange={(e) => setProxyForm((p) => ({ ...p, notes: e.target.value }))}
                className={FORM_STYLES.textarea}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setProxyModalOpen(false)}
              disabled={proxySubmitLoading}
            >
              انصراف
            </Button>
            <Button type="button" className="bg-gray-700 hover:bg-gray-600" onClick={() => saveProxyForm()} disabled={proxySubmitLoading}>
              ذخیره
            </Button>
            <Button type="button" onClick={() => saveProxyForm({ testAfterSave: true })} disabled={proxySubmitLoading} className="bg-emerald-600 hover:bg-emerald-500">
              ذخیره و تست
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={bulkOpen} onOpenChange={setBulkOpen}>
        <DialogContent className="max-w-3xl bg-gray-900 border-gray-600 text-white">
          <DialogHeader>
            <DialogTitle>Bulk Import پروکسی</DialogTitle>
            <DialogDescription className="text-gray-400">
              هر خط با فرمت `ip:port` یا `ip:port:username:password`
            </DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <SettingsEditorPanel
                icon={RowVertical}
                title="لیست پروکسی‌ها"
                hint="هر خط یک پروکسی؛ فرمت ip:port یا ip:port:user:pass"
                badge="خطوط"
                footer={
                  <p className="text-[11px] text-gray-600 mt-3 pt-3 border-t border-gray-800/90 font-mono tabular-nums">
                    {(bulkForm.text ? bulkForm.text.split("\n").filter((l) => l.trim()).length : 0)} خط غیرخالی
                  </p>
                }
              >
                <textarea
                  value={bulkForm.text}
                  onChange={(e) => setBulkForm((p) => ({ ...p, text: e.target.value }))}
                  className={cn(JSON_TEXTAREA, "min-h-[200px] resize-y")}
                  rows={10}
                  spellCheck={false}
                  placeholder={"1.2.3.4:8080:user:pass\n5.6.7.8:3128"}
                />
              </SettingsEditorPanel>
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Type پیش‌فرض</Label>
              <Input
                value={bulkForm.kind}
                onChange={(e) => setBulkForm((p) => ({ ...p, kind: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Scope پیش‌فرض</Label>
              <Input
                value={bulkForm.scope}
                onChange={(e) => setBulkForm((p) => ({ ...p, scope: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Location پیش‌فرض</Label>
              <Input
                value={bulkForm.location}
                onChange={(e) => setBulkForm((p) => ({ ...p, location: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
            <div className="space-y-1">
              <Label className={FORM_STYLES.label}>Protocol پیش‌فرض</Label>
              <Input
                value={bulkForm.protocol}
                onChange={(e) => setBulkForm((p) => ({ ...p, protocol: e.target.value }))}
                className={FORM_STYLES.input}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={() => setBulkOpen(false)} disabled={bulkSubmitLoading}>
              انصراف
            </Button>
            <Button type="button" onClick={submitBulkImport} disabled={bulkSubmitLoading} className="bg-emerald-600 hover:bg-emerald-500">
              ثبت نهایی
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900 border-gray-600 text-white">
          <DialogHeader>
            <DialogTitle>جزئیات پروکسی</DialogTitle>
            <DialogDescription className="text-gray-400">
              آمار، نمودار و تاریخچهٔ وضعیت همین پروکسی
            </DialogDescription>
          </DialogHeader>
          {detailLoading ? (
            <Spinner className="mx-auto" />
          ) : detail ? (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Host</span>{" "}
                  <span className="font-mono">
                    {detail.host}:{detail.port}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">وضعیت</span> <StatusBadge st={detail.status} />
                </div>
              </div>
              {detail.stats_today && (
                <p className="text-gray-400">
                  امروز: درخواست {detail.stats_today.requests_today} — موفق {detail.stats_today.success_today} — نرخ{" "}
                  {detail.stats_today.success_rate_today ?? "—"}٪
                </p>
              )}
              {tsBars.length > 0 && (
                <div>
                  <p className="text-gray-500 text-xs mb-2">۱۴ روز اخیر (تقریبی)</p>
                  <div className="flex items-end gap-1 h-24">
                    {tsBars.map((x) => {
                      const mx = Math.max(...tsBars.map((t) => t.total), 1);
                      const h = Math.round((56 * x.total) / mx);
                      const okh = Math.round((56 * x.ok) / mx);
                      return (
                        <div key={x.period} className="flex flex-col items-center flex-1 min-w-0" title={`${x.period}: ok ${x.ok}`}>
                          <div className="w-full max-w-[20px] h-14 flex flex-col justify-end bg-gray-800 rounded overflow-hidden mx-auto">
                            <div className="bg-emerald-500 w-full" style={{ height: okh }} />
                            <div className="bg-red-600/70 w-full" style={{ height: Math.max(0, h - okh) }} />
                          </div>
                          <span className="text-[9px] text-gray-500 truncate w-full text-center">{String(x.period).slice(5)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {(detail.status_history || []).length > 0 && (
                <div>
                  <p className="font-medium text-gray-300 mb-1">تایم‌لاین وضعیت</p>
                  <div className="max-h-32 overflow-y-auto text-xs border border-gray-700 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        {(detail.status_history || []).map((h) => (
                          <tr key={h.id} className="border-b border-gray-800">
                            <td className="p-1 text-gray-500">{h.created_at}</td>
                            <td className="p-1">
                              {h.old_status ?? "—"} → {h.new_status}
                            </td>
                            <td className="p-1 text-gray-500">{h.actor}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              {(detail.recent_errors || []).length > 0 && (
                <div>
                  <p className="font-medium text-gray-300 mb-1">آخرین خطاها</p>
                  <div className="max-h-40 overflow-y-auto text-xs border border-gray-700 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        {(detail.recent_errors || []).map((e) => (
                          <tr key={e.request_id} className="border-b border-gray-800">
                            <td className="p-1">{e.requested_at}</td>
                            <td className="p-1">{e.error_type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDetailOpen(false)}>
              بستن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
