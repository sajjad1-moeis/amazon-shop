"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Global, Refresh, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { adminSeoService } from "@/services/admin/adminSeoService";

function normPage(raw) {
  const d = raw || {};
  const items = d.items ?? d.Items ?? [];
  return {
    items: Array.isArray(items) ? items : [],
    totalPages: d.totalPages ?? d.TotalPages ?? 0,
    totalCount: d.totalCount ?? d.TotalCount ?? 0,
  };
}

export default function SeoHubAdminPage() {
  const [tab, setTab] = useState("categories");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftDesc, setDraftDesc] = useState("");
  const [draftCanon, setDraftCanon] = useState("");
  const [draftIndex, setDraftIndex] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const raw =
        tab === "categories"
          ? await adminSeoService.categories({ page, pageSize, search: appliedSearch || undefined })
          : await adminSeoService.brands({ page, pageSize, search: appliedSearch || undefined });
      const n = normPage(raw);
      setRows(n.items);
      setTotalPages(n.totalPages);
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setLoading(false);
    }
  }, [tab, page, pageSize, appliedSearch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applySearch = () => {
    const q = search.trim();
    if (q.length === 1) {
      toast.error("برای جستجو حداقل ۲ کاراکتر وارد کنید.");
      return;
    }
    setAppliedSearch(q);
    setPage(1);
  };

  const openRow = (r) => {
    setEdit(r);
    setDraftTitle(r.seoMetaTitle ?? r.SeoMetaTitle ?? "");
    setDraftDesc(r.seoMetaDescription ?? r.SeoMetaDescription ?? "");
    setDraftCanon(r.seoCanonicalPath ?? r.SeoCanonicalPath ?? "");
    const ix = r.seoIndexable ?? r.SeoIndexable;
    setDraftIndex(ix !== false);
    setOpen(true);
  };

  const saveRow = async () => {
    if (!edit) return;
    const id = edit.id ?? edit.Id;
    try {
      setSaving(true);
      const body = {
        seoMetaTitle: draftTitle.trim() || null,
        seoMetaDescription: draftDesc.trim() || null,
        seoCanonicalPath: draftCanon.trim() || null,
        seoIndexable: draftIndex,
      };
      if (tab === "categories") await adminSeoService.patchCategory(id, body);
      else await adminSeoService.patchBrand(id, body);
      toast.success("ذخیره شد");
      setOpen(false);
      await fetchData();
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1200px] mx-auto">
      <AdminPageHeader
        title="سئو دسته و برند"
        subtitle="فاز ۱۰ — Meta عنوان/توضیح، canonical، indexable. لندینگ جستجو در «مدیریت جستجو» است."
        icon={Global}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/search/category-landings">
                <ArrowLeft2 className="size-4 ml-1 rotate-180" variant="Linear" />
                لندینگ جستجو
              </Link>
            </Button>
          </div>
        }
      />

      <Tabs
        value={tab}
        onValueChange={(v) => {
          setTab(v);
          setPage(1);
          setSearch("");
          setAppliedSearch("");
        }}
      >
        <TabsList>
          <TabsTrigger value="categories">دسته‌های محصول</TabsTrigger>
          <TabsTrigger value="brands">برندها</TabsTrigger>
        </TabsList>
        <TabsContent value="categories" className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-2 items-end">
            <div className="space-y-1 flex-1 min-w-[200px]">
              <Label className="text-xs">جستجو (حداقل ۲ حرف پس از اعمال)</Label>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && applySearch()} />
            </div>
            <Button type="button" onClick={applySearch}>
              اعمال
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="brands" className="space-y-4 mt-4">
          <div className="flex flex-wrap gap-2 items-end">
            <div className="space-y-1 flex-1 min-w-[200px]">
              <Label className="text-xs">جستجو</Label>
              <Input value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === "Enter" && applySearch()} />
            </div>
            <Button type="button" onClick={applySearch}>
              اعمال
            </Button>
          </div>
        </TabsContent>
      </Tabs>

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
                  <TableHead>نام</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead>Meta عنوان</TableHead>
                  <TableHead>Index</TableHead>
                  <TableHead className="w-[100px]">عملیات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-10">
                      ردیفی نیست.
                    </TableCell>
                  </TableRow>
                ) : (
                  rows.map((r) => (
                    <TableRow key={r.id ?? r.Id}>
                      <TableCell className="font-medium">{r.name ?? r.Name}</TableCell>
                      <TableCell className="font-mono text-xs">{r.slug ?? r.Slug ?? "—"}</TableCell>
                      <TableCell className="text-sm max-w-[200px] truncate">
                        {r.seoMetaTitle ?? r.SeoMetaTitle ?? "—"}
                      </TableCell>
                      <TableCell>{String(r.seoIndexable ?? r.SeoIndexable ?? "—")}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" onClick={() => openRow(r)}>
                          ویرایش SEO
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>صفحه {page}</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
                قبلی
              </Button>
              <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
                بعدی
              </Button>
            </div>
          </div>
        </>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>ویرایش SEO</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <p className="text-sm text-muted-foreground">{edit?.name ?? edit?.Name}</p>
            <div className="space-y-1">
              <Label>Meta عنوان</Label>
              <Input value={draftTitle} onChange={(e) => setDraftTitle(e.target.value)} maxLength={200} />
            </div>
            <div className="space-y-1">
              <Label>Meta توضیح</Label>
              <Textarea value={draftDesc} onChange={(e) => setDraftDesc(e.target.value)} rows={3} maxLength={500} />
            </div>
            <div className="space-y-1">
              <Label>مسیر canonical (نسبی یا مطلق)</Label>
              <Input value={draftCanon} onChange={(e) => setDraftCanon(e.target.value)} maxLength={500} />
            </div>
            <div className="flex items-center justify-between gap-2">
              <Label>قابل ایندکس</Label>
              <Switch checked={draftIndex} onCheckedChange={setDraftIndex} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button onClick={saveRow} disabled={saving}>
              {saving ? <Spinner className="size-4" /> : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
