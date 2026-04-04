"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { LanguageSquare, Refresh, Edit2, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { adminProductCatalogService } from "@/services/admin/adminProductCatalogService";

function normRow(r) {
  return {
    id: r.id ?? r.Id,
    amazonASIN: r.amazonASIN ?? r.AmazonASIN ?? "",
    title: r.title ?? r.Title ?? "",
    titleFa: r.titleFa ?? r.TitleFa ?? "",
    suggestedTitleFa: r.suggestedTitleFa ?? r.SuggestedTitleFa ?? "",
    isFullStored: r.isFullStored ?? r.IsFullStored ?? false,
    status: r.status ?? r.Status ?? 0,
  };
}

function normPage(raw) {
  const d = raw || {};
  const items = d.items ?? d.Items ?? [];
  return {
    items: Array.isArray(items) ? items.map(normRow) : [],
    totalCount: d.totalCount ?? d.TotalCount ?? 0,
    page: d.page ?? d.Page ?? 1,
    pageSize: d.pageSize ?? d.PageSize ?? 25,
    totalPages: d.totalPages ?? d.TotalPages ?? 0,
  };
}

export default function ProductTranslationAdminPage() {
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState("missing");
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [data, setData] = useState({ items: [], totalCount: 0, totalPages: 0 });

  const [open, setOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [titleFaDraft, setTitleFaDraft] = useState("");
  const [saving, setSaving] = useState(false);
  const [suggestBusyId, setSuggestBusyId] = useState(null);

  const fetchData = useCallback(
    async (pageNum) => {
      const q = appliedSearch.trim();
      if (mode === "all" && q.length < 2) {
        toast.error("در حالت «همه» حداقل ۲ کاراکتر جستجو وارد کنید (جلوگیری از اسکن کل کاتالوگ).");
        return;
      }
      if (q.length === 1) {
        toast.error("برای جستجو حداقل ۲ کاراکتر وارد کنید.");
        return;
      }
      try {
        setLoading(true);
        const raw = await adminProductCatalogService.translationQueue({
          page: pageNum,
          pageSize,
          mode,
          search: q || undefined,
        });
        setData(normPage(raw));
      } catch (e) {
        toast.error(e.message || "خطا در بارگذاری");
      } finally {
        setLoading(false);
      }
    },
    [pageSize, mode, appliedSearch]
  );

  useEffect(() => {
    fetchData(page);
  }, [page, mode, fetchData]);

  const applyFilters = () => {
    setAppliedSearch(search.trim());
    setPage(1);
  };

  const openEdit = (r) => {
    setEditRow(r);
    setTitleFaDraft(r.titleFa || "");
    setOpen(true);
  };

  const saveFa = async () => {
    if (!editRow) return;
    try {
      setSaving(true);
      const v = titleFaDraft.trim();
      await adminProductCatalogService.patchTitleFa(editRow.id, v === "" ? null : v);
      toast.success("عنوان فارسی ذخیره شد");
      setOpen(false);
      await fetchData(page);
    } catch (e) {
      toast.error(e.message || "خطا در ذخیره");
    } finally {
      setSaving(false);
    }
  };

  /** ذخیرهٔ یک‌کلیکی پیشنهاد واژه‌نامه (fallback ترجمه بدون سرویس خارجی) */
  const applyGlossarySuggestion = async (r) => {
    const s = (r.suggestedTitleFa || "").trim();
    if (!s) return;
    try {
      setSuggestBusyId(r.id);
      await adminProductCatalogService.patchTitleFa(r.id, s);
      toast.success("پیشنهاد واژه‌نامه ذخیره شد");
      await fetchData(page);
    } catch (e) {
      toast.error(e.message || "خطا در ذخیره پیشنهاد");
    } finally {
      setSuggestBusyId(null);
    }
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1200px] mx-auto">
      <AdminPageHeader
        title="مرکز ترجمه عنوان محصول"
        subtitle="فاز ۹ — صف بدون/ناقص TitleFa؛ پیشنهاد از واژه‌نامه برند (جایگزینی اصطلاح)؛ ذخیره دستی یا یک‌کلیک «اعمال پیشنهاد»؛ bulk از API."
        icon={LanguageSquare}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchData(page)} disabled={loading}>
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/catalog/brand-glossary">
                واژه‌نامه برند
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/catalog/qa">
                <ArrowLeft2 className="size-4 ml-1 rotate-180" variant="Linear" />
                کیفیت QA
              </Link>
            </Button>
          </div>
        }
      />

      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-2 min-w-[200px]">
          <Label>حالت فهرست</Label>
          <Select
            value={mode}
            onValueChange={(m) => {
              setMode(m);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="missing">بدون ترجمه</SelectItem>
              <SelectItem value="incomplete">ترجمه ناقص</SelectItem>
              <SelectItem value="all">همه — فقط با جستجو (حداقل ۲ حرف)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2 flex-1 min-w-[200px]">
          <Label>جستجو (عنوان یا ASIN)</Label>
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="…"
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
                  <TableHead className="w-[70px]">شناسه</TableHead>
                  <TableHead>ASIN</TableHead>
                  <TableHead>عنوان (EN)</TableHead>
                  <TableHead>پیشنهاد (واژه‌نامه)</TableHead>
                  <TableHead>عنوان فارسی</TableHead>
                  <TableHead className="w-[100px]">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                      ردیفی یافت نشد.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.items.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="tabular-nums">{r.id}</TableCell>
                      <TableCell className="font-mono text-xs">{r.amazonASIN}</TableCell>
                      <TableCell className="max-w-[240px] truncate text-sm" title={r.title}>
                        {r.title}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm text-muted-foreground" title={r.suggestedTitleFa || ""}>
                        {r.suggestedTitleFa || "—"}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate text-sm" title={r.titleFa || ""}>
                        {r.titleFa || "—"}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
                          <Edit2 className="size-4" />
                        </Button>
                        {r.suggestedTitleFa?.trim() ? (
                          <Button
                            variant="outline"
                            size="sm"
                            className="mr-1 h-8 text-xs"
                            disabled={suggestBusyId === r.id}
                            onClick={() => applyGlossarySuggestion(r)}
                          >
                            {suggestBusyId === r.id ? <Spinner className="size-3" /> : "اعمال پیشنهاد"}
                          </Button>
                        ) : null}
                        <Button variant="link" className="px-1 h-auto text-xs" asChild>
                          <Link href={`/admin/products/edit/${r.id}`}>ویرایش محصول</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {data.totalPages > 1 ? (
            <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
              <span className="text-muted-foreground">
                صفحه {data.page} از {data.totalPages} — مجموع {data.totalCount}
              </span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  قبلی
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= data.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  بعدی
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">تعداد: {data.totalCount}</p>
          )}
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>عنوان فارسی (TitleFa)</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <p className="text-xs text-muted-foreground font-mono">{editRow?.amazonASIN}</p>
            <p className="text-sm line-clamp-3">{editRow?.title}</p>
            {editRow?.suggestedTitleFa ? (
              <p className="text-xs text-muted-foreground">
                پیشنهاد واژه‌نامه:{" "}
                <button
                  type="button"
                  className="text-primary underline"
                  onClick={() => setTitleFaDraft(editRow.suggestedTitleFa)}
                >
                  {editRow.suggestedTitleFa}
                </button>
              </p>
            ) : null}
            <Label>ترجمه فارسی</Label>
            <Textarea
              value={titleFaDraft}
              onChange={(e) => setTitleFaDraft(e.target.value)}
              rows={4}
              className="font-sans text-sm"
              maxLength={2000}
            />
            <p className="text-xs text-muted-foreground">خالی بگذارید تا ترجمه در دیتابیس پاک شود.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button onClick={saveFa} disabled={saving}>
              {saving ? <Spinner className="size-4" /> : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
