"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { DocumentText, Refresh } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminOperationsService } from "@/services/admin/adminOperationsService";
import { cn } from "@/lib/utils";

const PRESET_CATEGORIES = [
  { key: "", label: "همه" },
  { key: "catalog", label: "کاتالوگ" },
  { key: "integration", label: "یکپارچه‌سازی" },
  { key: "search", label: "جستجو" },
  { key: "scraper", label: "اسکرپر" },
  { key: "payment", label: "پرداخت" },
  { key: "api", label: "API" },
  { key: "general", label: "عمومی" },
];

function normPage(raw) {
  const d = raw || {};
  const items = d.items ?? d.Items ?? [];
  return {
    items: Array.isArray(items) ? items : [],
    totalCount: d.totalCount ?? d.TotalCount ?? 0,
    page: d.page ?? d.Page ?? 1,
    totalPages: d.totalPages ?? d.TotalPages ?? 0,
  };
}

export default function OperationalLogsAdminPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [catDraft, setCatDraft] = useState("");
  const [appliedCat, setAppliedCat] = useState("");
  const [data, setData] = useState({ items: [], totalPages: 0, totalCount: 0 });

  useEffect(() => {
    const q = searchParams.get("category")?.trim() ?? "";
    setCatDraft(q);
    setAppliedCat(q);
    setPage(1);
  }, [searchParams]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await adminOperationsService.operationalLogs({
        page,
        pageSize,
        category: appliedCat || undefined,
      });
      setData(normPage(raw));
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, appliedCat]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applyFilters = () => {
    const v = catDraft.trim();
    setAppliedCat(v);
    setPage(1);
    const p = new URLSearchParams(searchParams.toString());
    if (v) p.set("category", v);
    else p.delete("category");
    const qs = p.toString();
    router.replace(qs ? `/admin/security/operational-logs?${qs}` : "/admin/security/operational-logs");
  };

  const selectPresetCategory = (key) => {
    const v = (key || "").trim();
    setCatDraft(v);
    setAppliedCat(v);
    setPage(1);
    const p = new URLSearchParams(searchParams.toString());
    if (v) p.set("category", v);
    else p.delete("category");
    const qs = p.toString();
    router.replace(qs ? `/admin/security/operational-logs?${qs}` : "/admin/security/operational-logs");
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1200px] mx-auto">
      <AdminPageHeader
        title="لاگ عملیاتی"
        subtitle="تجمیع رویدادهای عملیاتی با فیلتر دسته؛ برای تفکیک بیشتر بعداً می‌توان منبع جدا اضافه کرد."
        icon={DocumentText}
        actions={
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <Refresh className="size-4 ml-1" variant="Linear" />
            تازه‌سازی
          </Button>
        }
      />
      <div className="flex flex-wrap gap-2">
        {PRESET_CATEGORIES.map(({ key, label }) => (
          <Button
            key={key || "all"}
            type="button"
            size="sm"
            variant={appliedCat === key ? "default" : "outline"}
            className={cn(
              "h-8 text-xs",
              appliedCat === key ? "bg-amber-600/85 text-white hover:bg-amber-600" : "border-gray-600 bg-gray-800/60"
            )}
            onClick={() => selectPresetCategory(key)}
          >
            {label}
          </Button>
        ))}
      </div>
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label className="text-xs">دسته (category)</Label>
          <Input
            value={catDraft}
            onChange={(e) => setCatDraft(e.target.value)}
            placeholder="مثلاً catalog"
            className="w-[200px]"
            onKeyDown={(e) => e.key === "Enter" && applyFilters()}
          />
        </div>
        <Button type="button" onClick={applyFilters}>
          اعمال
        </Button>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="size-10" />
        </div>
      ) : (
        <>
          <div className="rounded-xl border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[64px]">Id</TableHead>
                  <TableHead>زمان</TableHead>
                  <TableHead>دسته</TableHead>
                  <TableHead>سطح</TableHead>
                  <TableHead>پیام</TableHead>
                  <TableHead>جزئیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-10">
                      ردیفی نیست.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.items.map((r) => (
                    <TableRow key={r.id ?? r.Id}>
                      <TableCell>{r.id ?? r.Id}</TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {r.createdAt || r.CreatedAt
                          ? new Date(r.createdAt ?? r.CreatedAt).toLocaleString("fa-IR")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-xs font-mono">{r.category ?? r.Category}</TableCell>
                      <TableCell className="text-xs">{r.level ?? r.Level}</TableCell>
                      <TableCell className="text-sm">{r.message ?? r.Message}</TableCell>
                      <TableCell className="text-xs text-muted-foreground max-w-[280px] truncate">
                        {r.details ?? r.Details ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>مجموع {data.totalCount}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                قبلی
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= (data.totalPages || 1)}
                onClick={() => setPage((p) => p + 1)}
              >
                بعدی
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
