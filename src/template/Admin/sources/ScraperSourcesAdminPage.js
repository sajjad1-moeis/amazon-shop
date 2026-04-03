"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Add, Flash, Trash, Edit2, Refresh, Link1, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  adminScraperSourcesService,
  SCRAPER_SOURCE_TYPES,
} from "@/services/admin/adminScraperSourcesService";

function fmtDate(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return Number.isNaN(d.getTime()) ? "—" : d.toLocaleString("fa-IR");
  } catch {
    return "—";
  }
}

export default function ScraperSourcesAdminPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [testingId, setTestingId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [sourceType, setSourceType] = useState("scraper_api");
  const [baseUrl, setBaseUrl] = useState("");
  const [isEnabled, setIsEnabled] = useState(true);
  const [quotaPerHour, setQuotaPerHour] = useState("");
  const [displayOrder, setDisplayOrder] = useState("0");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminScraperSourcesService.list(1000);
      const list = Array.isArray(data) ? data : [];
      setRows(
        list.map((r) => ({
          ...r,
          id: r.id ?? r.Id,
          name: r.name ?? r.Name,
          slug: r.slug ?? r.Slug,
          description: r.description ?? r.Description ?? "",
          sourceType: r.sourceType ?? r.SourceType,
          baseUrl: r.baseUrl ?? r.BaseUrl ?? "",
          isEnabled: r.isEnabled ?? r.IsEnabled,
          quotaPerHour: r.quotaPerHour ?? r.QuotaPerHour,
          displayOrder: r.displayOrder ?? r.DisplayOrder ?? 0,
          lastSyncAt: r.lastSyncAt ?? r.LastSyncAt,
          lastHealthCheckAt: r.lastHealthCheckAt ?? r.LastHealthCheckAt,
          lastError: r.lastError ?? r.LastError,
          healthSuccessRatePercent: r.healthSuccessRatePercent ?? r.HealthSuccessRatePercent,
        }))
      );
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditId(null);
    setName("");
    setSlug("");
    setDescription("");
    setSourceType("scraper_api");
    setBaseUrl("");
    setIsEnabled(true);
    setQuotaPerHour("");
    setDisplayOrder("0");
    setOpen(true);
  };

  const openEdit = (r) => {
    setEditId(r.id);
    setName(r.name ?? "");
    setSlug(r.slug ?? "");
    setDescription(r.description ?? "");
    setSourceType(r.sourceType ?? "scraper_api");
    setBaseUrl(r.baseUrl ?? "");
    setIsEnabled(Boolean(r.isEnabled));
    setQuotaPerHour(r.quotaPerHour != null ? String(r.quotaPerHour) : "");
    setDisplayOrder(String(r.displayOrder ?? 0));
    setOpen(true);
  };

  const save = async () => {
    if (editId == null && !slug.trim()) {
      toast.error("اسلاگ الزامی است");
      return;
    }
    if (!name.trim()) {
      toast.error("نام الزامی است");
      return;
    }
    const q = quotaPerHour.trim() === "" ? null : Number(quotaPerHour);
    if (q != null && (!Number.isFinite(q) || !Number.isInteger(q) || q < 0 || q > 1_000_000)) {
      toast.error("سهمیه ساعت باید عدد صحیح ۰ تا ۱٬۰۰۰٬۰۰۰ باشد");
      return;
    }
    const ord = displayOrder.trim() === "" ? 0 : Number(displayOrder);
    if (!Number.isFinite(ord) || !Number.isInteger(ord) || ord < 0 || ord > 1_000_000) {
      toast.error("ترتیب نمایش باید عدد صحیح ۰ تا ۱٬۰۰۰٬۰۰۰ باشد");
      return;
    }
    try {
      setSaving(true);
      if (editId == null) {
        await adminScraperSourcesService.create({
          name: name.trim(),
          slug: slug.trim().toLowerCase(),
          description: description.trim() || null,
          sourceType,
          baseUrl: baseUrl.trim() || null,
          isEnabled,
          quotaPerHour: q,
          displayOrder: ord,
        });
        toast.success("سورس ثبت شد");
      } else {
        const updateBody = {
          name: name.trim(),
          description: description.trim() || null,
          sourceType,
          baseUrl: baseUrl.trim() || null,
          isEnabled,
          displayOrder: ord,
        };
        if (quotaPerHour.trim() === "") updateBody.clearQuotaPerHour = true;
        else if (q != null) updateBody.quotaPerHour = q;
        await adminScraperSourcesService.update(editId, updateBody);
        toast.success("ذخیره شد");
      }
      setOpen(false);
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در ذخیره");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("حذف این سورس؟")) return;
    try {
      await adminScraperSourcesService.delete(id);
      toast.success("حذف شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در حذف");
    }
  };

  const testOne = async (id) => {
    try {
      setTestingId(id);
      const res = await adminScraperSourcesService.testConnection(id);
      const ok = Boolean(res?.ok ?? res?.Ok);
      const msg = res?.message ?? res?.Message ?? "";
      const code = res?.httpStatusCode ?? res?.HttpStatusCode;
      if (ok) toast.success(code != null ? `${msg || "اتصال برقرار شد"} (${code})` : msg || "اتصال برقرار شد");
      else toast.error(code != null ? `${msg || "اتصال ناموفق"} (${code})` : msg || "اتصال ناموفق");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در تست");
    } finally {
      setTestingId(null);
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        title="سورس‌های داده و اسکرپ"
        subtitle="رجیستری سرویس‌ها برای شفافیت، سهمیه و تست اتصال — پروکسی و پول در صفحهٔ جدا"
        icon={Flash}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link href="/admin/scraper-proxy">
              <Button variant="outline" className="border-gray-600 text-gray-200">
                <ArrowLeft2 size={18} className="ml-1 rotate-180" />
                پروکسی اسکرپر
              </Button>
            </Link>
            <Button onClick={openCreate} className="bg-teal-600 hover:bg-teal-700 text-white">
              <Add size={18} className="ml-1.5" />
              سورس جدید
            </Button>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-9 w-9 text-teal-500" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-600/60">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600/60 hover:bg-transparent">
                <TableHead className="text-right text-gray-300">نام</TableHead>
                <TableHead className="text-right text-gray-300">اسلاگ</TableHead>
                <TableHead className="text-right text-gray-300">نوع</TableHead>
                <TableHead className="text-right text-gray-300">فعال</TableHead>
                <TableHead className="text-right text-gray-300">سهمیه/h</TableHead>
                <TableHead className="text-right text-gray-300">آخرین sync</TableHead>
                <TableHead className="text-right text-gray-300">آخرین تست</TableHead>
                <TableHead className="text-right text-gray-300">نرخ تست %</TableHead>
                <TableHead className="text-left text-gray-300 w-[200px]">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow className="border-gray-600/50">
                  <TableCell colSpan={9} className="py-10 text-center text-gray-500 text-sm">
                    هنوز سورسی ثبت نشده. «سورس جدید» را بزنید یا از پروکسی اسکرپر برای مانیتورینگ پول استفاده کنید.
                  </TableCell>
                </TableRow>
              ) : null}
              {rows.map((r) => (
                <TableRow key={r.id} className="border-gray-600/50">
                  <TableCell className="font-medium text-white">{r.name}</TableCell>
                  <TableCell className="font-mono text-xs text-gray-400">{r.slug}</TableCell>
                  <TableCell className="text-gray-300 text-sm">{r.sourceType}</TableCell>
                  <TableCell className="text-gray-300">{r.isEnabled ? "بله" : "خیر"}</TableCell>
                  <TableCell className="text-gray-300">{r.quotaPerHour ?? "—"}</TableCell>
                  <TableCell className="text-gray-400 text-xs whitespace-nowrap">{fmtDate(r.lastSyncAt)}</TableCell>
                  <TableCell className="text-gray-400 text-xs whitespace-nowrap max-w-[140px]">
                    <span className="block truncate" title={r.lastError || ""}>
                      {fmtDate(r.lastHealthCheckAt)}
                    </span>
                  </TableCell>
                  <TableCell className="text-gray-300 tabular-nums">
                    {r.healthSuccessRatePercent != null ? `${r.healthSuccessRatePercent}%` : "—"}
                  </TableCell>
                  <TableCell className="text-left whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-cyan-400"
                      disabled={testingId === r.id}
                      onClick={() => testOne(r.id)}
                      title="تست اتصال"
                    >
                      {testingId === r.id ? <Spinner className="h-4 w-4" /> : <Refresh size={18} />}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-amber-400" onClick={() => openEdit(r)}>
                      <Edit2 size={18} />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-rose-400" onClick={() => remove(r.id)}>
                      <Trash size={18} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="border-gray-600 bg-gray-900 text-white sm:max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editId == null ? "سورس جدید" : "ویرایش سورس"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-gray-300">نام</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            {editId == null && (
              <div className="space-y-2">
                <Label className="text-gray-300">اسلاگ (انگلیسی، خط تیره)</Label>
                <Input
                  value={slug}
                  onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                  className="border-gray-600 bg-gray-800/80 font-mono text-sm"
                  placeholder="python-scraper"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label className="text-gray-300">توضیح</Label>
              <Input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">نوع</Label>
              <Select value={sourceType} onValueChange={setSourceType}>
                <SelectTrigger className="border-gray-600 bg-gray-800/80 text-right">
                  <SelectValue placeholder="نوع سورس" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-600">
                  {SCRAPER_SOURCE_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300 flex items-center gap-1">
                <Link1 size={14} />
                آدرس پایه (برای تست GET)
              </Label>
              <Input
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="border-gray-600 bg-gray-800/80 font-mono text-xs"
                placeholder="https://host:5000/api/health"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">سهمیه در ساعت (خالی = ثبت نشده)</Label>
              <Input
                value={quotaPerHour}
                onChange={(e) => setQuotaPerHour(e.target.value.replace(/\D/g, ""))}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">ترتیب نمایش</Label>
              <Input
                value={displayOrder}
                onChange={(e) => setDisplayOrder(e.target.value.replace(/\D/g, ""))}
                className="border-gray-600 bg-gray-800/80 w-24"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isEnabled} onCheckedChange={setIsEnabled} id="src-enabled" />
              <Label htmlFor="src-enabled" className="text-gray-300">
                فعال
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-600" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button disabled={saving} className="bg-teal-600 hover:bg-teal-700" onClick={save}>
              {saving ? "…" : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
