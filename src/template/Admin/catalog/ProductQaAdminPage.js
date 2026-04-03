"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { ClipboardTick, Refresh, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminProductCatalogService } from "@/services/admin/adminProductCatalogService";

const ISSUE_FA = {
  noImage: "بدون تصویر",
  noCategory: "بدون دسته",
  thinDescription: "توضیحات ناکافی",
  priceInvalid: "قیمت نامعتبر",
  priceBlocked: "قیمت مسدود",
  missingOurPrice: "بدون OurPrice",
  duplicateAsin: "ASIN تکراری",
};

function normIssues(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.map((x) => String(x));
}

function normRow(r) {
  return {
    id: r.id ?? r.Id,
    amazonASIN: r.amazonASIN ?? r.AmazonASIN ?? "",
    title: r.title ?? r.Title ?? "",
    titleFa: r.titleFa ?? r.TitleFa ?? "",
    price: r.price ?? r.Price ?? 0,
    ourPrice: r.ourPrice ?? r.OurPrice,
    isFullStored: r.isFullStored ?? r.IsFullStored ?? false,
    isPriceBlocked: r.isPriceBlocked ?? r.IsPriceBlocked ?? false,
    categoryId: r.categoryId ?? r.CategoryId,
    mainImageUrl: r.mainImageUrl ?? r.MainImageUrl ?? "",
    issues: normIssues(r.issues ?? r.Issues),
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

export default function ProductQaAdminPage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [search, setSearch] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");
  const [data, setData] = useState({ items: [], totalCount: 0, totalPages: 0 });

  const [noImage, setNoImage] = useState(true);
  const [noCategory, setNoCategory] = useState(true);
  const [thinDescription, setThinDescription] = useState(false);
  const [priceAnomaly, setPriceAnomaly] = useState(false);
  const [duplicateAsin, setDuplicateAsin] = useState(false);

  const bindFilter = (setter) => (v) => {
    setter(v);
    setPage(1);
  };

  const fetchData = useCallback(
    async (pageNum) => {
      if (!noImage && !noCategory && !thinDescription && !priceAnomaly && !duplicateAsin) {
        toast.error("حداقل یک فیلتر را فعال کنید");
        return;
      }
      const q = appliedSearch.trim();
      if (q.length === 1) {
        toast.error("برای جستجو حداقل ۲ کاراکتر وارد کنید.");
        return;
      }
      try {
        setLoading(true);
        const raw = await adminProductCatalogService.qaQueue({
          page: pageNum,
          pageSize,
          noImage,
          noCategory,
          thinDescription,
          priceAnomaly,
          duplicateAsin,
          search: q || undefined,
        });
        setData(normPage(raw));
      } catch (e) {
        toast.error(e.message || "خطا در بارگذاری");
      } finally {
        setLoading(false);
      }
    },
    [pageSize, noImage, noCategory, thinDescription, priceAnomaly, duplicateAsin, appliedSearch]
  );

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  const applyFilters = () => {
    setAppliedSearch(search.trim());
    setPage(1);
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1280px] mx-auto">
      <AdminPageHeader
        title="کنترل کیفیت محصول (QA)"
        subtitle="فاز ۹ — فیلتر ترکیبی روی مشکلات رایج؛ اقدام از طریق ویرایش محصول یا مرکز ترجمه."
        icon={ClipboardTick}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => fetchData(page)} disabled={loading}>
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/catalog/translation">
                <ArrowLeft2 className="size-4 ml-1 rotate-180" variant="Linear" />
                مرکز ترجمه
              </Link>
            </Button>
          </div>
        }
      />

      <div className="rounded-xl border p-4 space-y-4">
        <p className="text-sm font-medium">فیلتر نوع مشکل (حداقل یکی)</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            ["noImage", noImage, setNoImage, "بدون تصویر اصلی"],
            ["noCategory", noCategory, setNoCategory, "بدون دسته"],
            ["thinDescription", thinDescription, setThinDescription, "توضیح کوتاه/خالی"],
            ["priceAnomaly", priceAnomaly, setPriceAnomaly, "قیمت نامعتبر، مسدود، یا بدون OurPrice"],
            ["duplicateAsin", duplicateAsin, setDuplicateAsin, "ASIN تکراری (سنگین‌تر)"],
          ].map(([key, val, setVal, label]) => (
            <div key={key} className="flex items-center justify-between gap-2 rounded-lg border border-border/60 px-3 py-2">
              <Label className="text-sm cursor-pointer" htmlFor={`qa-${key}`}>
                {label}
              </Label>
              <Switch id={`qa-${key}`} checked={val} onCheckedChange={bindFilter(setVal)} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 items-end">
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label>جستجو</Label>
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && applyFilters()}
            />
          </div>
          <Button type="button" onClick={applyFilters}>
            اعمال فیلترها
          </Button>
        </div>
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
                  <TableHead className="w-[64px]">ID</TableHead>
                  <TableHead>ASIN</TableHead>
                  <TableHead>عنوان</TableHead>
                  <TableHead>قیمت / ما</TableHead>
                  <TableHead>مشکلات</TableHead>
                  <TableHead className="w-[120px]">اقدام</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                      ردیفی با این فیلترها یافت نشد.
                    </TableCell>
                  </TableRow>
                ) : (
                  data.items.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell>{r.id}</TableCell>
                      <TableCell className="font-mono text-xs">{r.amazonASIN}</TableCell>
                      <TableCell className="max-w-[220px] truncate text-sm" title={r.title}>
                        {r.title}
                      </TableCell>
                      <TableCell className="text-sm tabular-nums whitespace-nowrap">
                        {r.price} / {r.ourPrice ?? "—"}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1 max-w-[320px]">
                          {r.issues.map((code) => (
                            <Badge key={code} variant="secondary" className="text-xs font-normal">
                              {ISSUE_FA[code] || code}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="link" className="px-0 h-auto" asChild>
                          <Link href={`/admin/products/edit/${r.id}`}>ویرایش</Link>
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
                صفحه {data.page} از {data.totalPages} — {data.totalCount} مورد
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
    </div>
  );
}
