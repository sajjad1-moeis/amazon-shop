"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Chart, ShoppingCart, Danger } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminSectionCard } from "@/components/admin";
import { adminSearchManagementService } from "@/services/admin/adminSearchManagementService";
import { adminAnalyticsService } from "@/services/admin/adminAnalyticsService";
import { unwrapApiData } from "@/services/api/client";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

function pick(obj, camelKey, pascalKey) {
  if (obj == null) return undefined;
  if (Object.prototype.hasOwnProperty.call(obj, camelKey)) return obj[camelKey];
  if (pascalKey && Object.prototype.hasOwnProperty.call(obj, pascalKey)) return obj[pascalKey];
  return undefined;
}

function InsightTable({ rows, emptyText, query }) {
  const q = (query || "").trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!rows?.length) return [];
    if (!q) return rows;
    return rows.filter((r) => String(r.searchTerm || "").toLowerCase().includes(q));
  }, [rows, q]);

  if (!rows?.length) {
    return <p className="py-6 text-center text-sm text-gray-500">{emptyText}</p>;
  }
  if (!filtered.length) {
    return <p className="py-6 text-center text-sm text-gray-500">نتیجه‌ای مطابق فیلتر «{query}» نیست.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600/60">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-600/60 hover:bg-transparent">
            <TableHead className="text-right text-gray-300">عبارت</TableHead>
            <TableHead className="text-right text-gray-300">تعداد جستجو</TableHead>
            <TableHead className="text-right text-gray-300">کلیک</TableHead>
            <TableHead className="text-right text-gray-300">خرید</TableHead>
            <TableHead className="text-right text-gray-300">نرخ کلیک %</TableHead>
            <TableHead className="text-right text-gray-300">تبدیل %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((r) => {
            const term = r.searchTerm || "";
            const hl = q && term.toLowerCase().includes(q);
            return (
              <TableRow
                key={`${r.searchTerm}-${r.searchCount}`}
                className={cn("border-gray-600/50", hl && "bg-amber-500/10")}
              >
                <TableCell className="max-w-[200px] truncate font-medium text-white" title={term}>
                  {term}
                </TableCell>
                <TableCell className="text-gray-300">{r.searchCount}</TableCell>
                <TableCell className="text-gray-300">{r.clickCount}</TableCell>
                <TableCell className="text-gray-300">{r.purchaseCount}</TableCell>
                <TableCell className="text-gray-300">{r.clickRatePercent}</TableCell>
                <TableCell className="text-gray-300">{r.conversionRatePercent}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

function ZeroResultTable({ rows, emptyText, query }) {
  const q = (query || "").trim().toLowerCase();
  const filtered = useMemo(() => {
    if (!rows?.length) return [];
    if (!q) return rows;
    return rows.filter((r) => String(pick(r, "searchTerm", "SearchTerm") || "").toLowerCase().includes(q));
  }, [rows, q]);

  if (!rows?.length) {
    return <p className="py-6 text-center text-sm text-gray-500">{emptyText}</p>;
  }
  if (!filtered.length) {
    return <p className="py-6 text-center text-sm text-gray-500">نتیجه‌ای مطابق فیلتر «{query}» نیست.</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600/60">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-600/60 hover:bg-transparent">
            <TableHead className="text-right text-gray-300">عبارت</TableHead>
            <TableHead className="text-right text-gray-300">تکرار</TableHead>
            <TableHead className="text-right text-gray-300">آخرین جستجو</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered.map((r, i) => {
            const term = pick(r, "searchTerm", "SearchTerm") || "—";
            const count = pick(r, "count", "Count");
            const lastAt =
              pick(r, "lastSearchedAt", "LastSearchedAt") ??
              pick(r, "lastSearchAt", "LastSearchAt") ??
              pick(r, "updatedAt", "UpdatedAt");
            const hl = q && String(term).toLowerCase().includes(q);
            return (
              <TableRow key={`${term}-${i}`} className={cn("border-gray-600/50", hl && "bg-amber-500/10")}>
                <TableCell className="max-w-[240px] truncate font-medium text-white" title={term}>
                  {term}
                </TableCell>
                <TableCell className="text-gray-300">{count != null ? count : "—"}</TableCell>
                <TableCell className="text-gray-300">
                  {lastAt ? new Date(lastAt).toLocaleString("fa-IR") : "—"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

const TAB_IDS = {
  "zero-result": "search-reports-zero-result",
  "low-click": "search-reports-low-click",
  "no-purchase": "search-reports-no-purchase",
};

export default function SearchReportsPage() {
  const searchParams = useSearchParams();
  const tabParam = (searchParams.get("tab") || "").toLowerCase();
  const qParam = searchParams.get("q") || "";

  const [zeroResult, setZeroResult] = useState([]);
  const [loadingZero, setLoadingZero] = useState(true);
  const [lowClick, setLowClick] = useState([]);
  const [loadingA, setLoadingA] = useState(true);
  const [noPurchase, setNoPurchase] = useState([]);
  const [loadingB, setLoadingB] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const raw = await adminAnalyticsService.getNoResultSearches(80);
        const data = unwrapApiData(raw);
        if (!cancelled) setZeroResult(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) toast.error(e.message || "خطا در گزارش بدون نتیجه");
      } finally {
        if (!cancelled) setLoadingZero(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminSearchManagementService.getLowClickSearches({
          limit: 80,
          minSearches: 5,
          maxClickRatePercent: 15,
        });
        if (!cancelled) setLowClick(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) toast.error(e.message || "خطا در گزارش کم‌کلیک");
      } finally {
        if (!cancelled) setLoadingA(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminSearchManagementService.getNoPurchaseSearches({ limit: 80, minClicks: 1 });
        if (!cancelled) setNoPurchase(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) toast.error(e.message || "خطا در گزارش بدون خرید");
      } finally {
        if (!cancelled) setLoadingB(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!tabParam || !TAB_IDS[tabParam]) return;
    if (tabParam === "zero-result" && loadingZero) return;
    if (tabParam === "low-click" && loadingA) return;
    if (tabParam === "no-purchase" && loadingB) return;

    const id = TAB_IDS[tabParam];
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => window.clearTimeout(t);
  }, [tabParam, loadingZero, loadingA, loadingB]);

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        title="گزارش‌های مدیریت جستجو"
        subtitle="بر پایهٔ تاریخچهٔ جستجو و رویدادهای کلیک/خرید ثبت‌شده"
        icon={Chart}
      />

      {qParam ? (
        <p className="rounded-lg border border-amber-500/30 bg-amber-950/20 px-4 py-2 text-sm text-amber-100/90">
          فیلتر عبارت از آدرس: <span className="font-medium">{qParam}</span>
        </p>
      ) : null}

      <div id={TAB_IDS["zero-result"]} className="scroll-mt-24">
        <AdminSectionCard title="جستجوهای بدون نتیجه (پرتکرار)" icon={Danger}>
          {loadingZero ? (
            <div className="flex justify-center py-10">
              <Spinner className="h-8 w-8 text-amber-500" />
            </div>
          ) : (
            <ZeroResultTable
              rows={zeroResult}
              emptyText="رکوردی برای جستجوی بدون نتیجه ثبت نشده است."
              query={qParam}
            />
          )}
        </AdminSectionCard>
      </div>

      <div id={TAB_IDS["low-click"]} className="scroll-mt-24">
        <AdminSectionCard title="جستجوهای پرتکرار با نرخ کلیک پایین" icon={Chart}>
          {loadingA ? (
            <div className="flex justify-center py-10">
              <Spinner className="h-8 w-8 text-amber-500" />
            </div>
          ) : (
            <InsightTable rows={lowClick} emptyText="رکوردی با این معیارها یافت نشد." query={qParam} />
          )}
        </AdminSectionCard>
      </div>

      <div id={TAB_IDS["no-purchase"]} className="scroll-mt-24">
        <AdminSectionCard title="جستجو با کلیک و بدون خرید ثبت‌شده" icon={ShoppingCart}>
          {loadingB ? (
            <div className="flex justify-center py-10">
              <Spinner className="h-8 w-8 text-amber-500" />
            </div>
          ) : (
            <InsightTable rows={noPurchase} emptyText="رکوردی با این معیارها یافت نشد." query={qParam} />
          )}
        </AdminSectionCard>
      </div>
    </div>
  );
}
