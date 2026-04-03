"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Image, Refresh, Trash, ArrowLeft2, Add, Edit2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { bannerService, BannerPosition } from "@/services/banner/bannerService";

function normList(raw) {
  if (Array.isArray(raw)) return raw;
  return [];
}

function resolveImageUrl(path) {
  if (!path) return "";
  const p = String(path);
  if (p.startsWith("http://") || p.startsWith("https://")) return p;
  const api = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_API_URL || "" : "";
  const origin = api.replace(/\/api\/?$/, "");
  if (!origin) return p;
  return `${origin.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;
}

const POS_OPTIONS = [
  { v: String(BannerPosition.Top), label: "بالا" },
  { v: String(BannerPosition.MiddleLeft), label: "میانه چپ" },
  { v: String(BannerPosition.MiddleRight), label: "میانه راست" },
  { v: String(BannerPosition.CategoryPage), label: "صفحه دسته" },
];

export default function BannersAdminPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const [createOpen, setCreateOpen] = useState(false);
  const [cTitle, setCTitle] = useState("");
  const [cFile, setCFile] = useState(null);
  const [cPos, setCPos] = useState(String(BannerPosition.Top));
  const [cLink, setCLink] = useState("");
  const [cAlt, setCAlt] = useState("");
  const [cOrder, setCOrder] = useState(0);
  const [cBusy, setCBusy] = useState(false);

  const [editOpen, setEditOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [eTitle, setETitle] = useState("");
  const [eLink, setELink] = useState("");
  const [eAlt, setEAlt] = useState("");
  const [ePos, setEPos] = useState(String(BannerPosition.Top));
  const [eOrder, setEOrder] = useState(0);
  const [eActive, setEActive] = useState(true);
  const [eFile, setEFile] = useState(null);
  const [eSourceImageRel, setESourceImageRel] = useState("");
  const [eEditPreviewUrl, setEEditPreviewUrl] = useState("");
  const [eBusy, setEBusy] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await bannerService.getAll();
      setRows(normList(raw));
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری بنرها");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!eFile) {
      setEEditPreviewUrl(eSourceImageRel ? resolveImageUrl(eSourceImageRel) : "");
      return;
    }
    const u = URL.createObjectURL(eFile);
    setEEditPreviewUrl(u);
    return () => URL.revokeObjectURL(u);
  }, [eFile, eSourceImageRel]);

  const softDelete = async (id) => {
    if (!confirm("بنر غیرفعال (حذف نرم) شود؟")) return;
    try {
      setBusyId(id);
      await bannerService.softDelete(id, "admin-panel");
      toast.success("انجام شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setBusyId(null);
    }
  };

  const submitCreate = async () => {
    if (!cTitle.trim()) {
      toast.error("عنوان الزامی است");
      return;
    }
    if (!cFile) {
      toast.error("تصویر الزامی است");
      return;
    }
    try {
      setCBusy(true);
      const fd = new FormData();
      fd.append("Title", cTitle.trim());
      fd.append("Position", cPos);
      fd.append("DisplayOrder", String(Number(cOrder) || 0));
      fd.append("IsActive", "true");
      fd.append("ImageFile", cFile);
      if (cLink.trim()) fd.append("LinkUrl", cLink.trim());
      if (cAlt.trim()) fd.append("AltText", cAlt.trim());
      await bannerService.create(fd);
      toast.success("بنر ایجاد شد");
      setCreateOpen(false);
      setCTitle("");
      setCFile(null);
      setCLink("");
      setCAlt("");
      setCOrder(0);
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در ایجاد");
    } finally {
      setCBusy(false);
    }
  };

  const openEdit = async (id) => {
    try {
      const raw = await bannerService.getById(id);
      const r = raw || {};
      setEditId(id);
      setETitle(r.title ?? r.Title ?? "");
      setELink(r.linkUrl ?? r.LinkUrl ?? "");
      setEAlt(r.altText ?? r.AltText ?? "");
      setEPos(String(r.position ?? r.Position ?? BannerPosition.Top));
      setEOrder(r.displayOrder ?? r.DisplayOrder ?? 0);
      setEActive(r.isActive ?? r.IsActive ?? true);
      setEFile(null);
      setESourceImageRel(r.imageUrl ?? r.ImageUrl ?? "");
      setEditOpen(true);
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری بنر");
    }
  };

  const submitEdit = async () => {
    if (!editId) return;
    try {
      setEBusy(true);
      if (eFile) {
        await bannerService.uploadImage(editId, eFile);
      }
      await bannerService.update(editId, {
        title: eTitle.trim() || null,
        linkUrl: eLink.trim() || null,
        altText: eAlt.trim() || null,
        position: Number(ePos),
        displayOrder: Number(eOrder) || 0,
        isActive: eActive,
      });
      toast.success("ذخیره شد");
      setEditOpen(false);
      setEFile(null);
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در ذخیره");
    } finally {
      setEBusy(false);
    }
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1280px] mx-auto">
      <AdminPageHeader
        title="بنرها و بلاک‌های صفحه"
        subtitle="ایجاد با آپلود تصویر، ویرایش متادیتا و موقعیت؛ حذف نرم از لیست."
        icon={Image}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button size="sm" onClick={() => setCreateOpen(true)}>
              <Add className="size-4 ml-1" variant="Linear" />
              بنر جدید
            </Button>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/admin/integration">
                <ArrowLeft2 className="size-4 ml-1 rotate-180" variant="Linear" />
                یکپارچه‌سازی
              </Link>
            </Button>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="size-10" />
        </div>
      ) : (
        <div className="rounded-xl border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]">Id</TableHead>
                <TableHead className="w-[100px]">تصویر</TableHead>
                <TableHead>عنوان</TableHead>
                <TableHead>موقعیت</TableHead>
                <TableHead>وضعیت</TableHead>
                <TableHead className="w-[160px]">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                    بنری ثبت نشده است.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => {
                  const id = r.id ?? r.Id;
                  const img = r.imageUrl ?? r.ImageUrl ?? "";
                  return (
                    <TableRow key={id}>
                      <TableCell className="tabular-nums">{id}</TableCell>
                      <TableCell>
                        {img ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={resolveImageUrl(img)}
                            alt=""
                            className="h-12 w-20 object-cover rounded border"
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{r.title ?? r.Title}</TableCell>
                      <TableCell className="text-xs">{r.positionName ?? r.PositionName ?? r.position ?? r.Position}</TableCell>
                      <TableCell className="text-xs">{r.statusName ?? r.StatusName ?? r.isActive ?? r.IsActive}</TableCell>
                      <TableCell className="whitespace-nowrap">
                        <Button variant="ghost" size="sm" onClick={() => openEdit(id)}>
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          disabled={busyId === id}
                          onClick={() => softDelete(id)}
                        >
                          <Trash className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={createOpen} onOpenChange={setCreateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>بنر جدید</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>عنوان</Label>
              <Input value={cTitle} onChange={(e) => setCTitle(e.target.value)} maxLength={200} />
            </div>
            <div className="space-y-1">
              <Label>تصویر</Label>
              <Input type="file" accept="image/*" onChange={(e) => setCFile(e.target.files?.[0] ?? null)} />
            </div>
            <div className="space-y-1">
              <Label>موقعیت</Label>
              <Select value={cPos} onValueChange={setCPos}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POS_OPTIONS.map((o) => (
                    <SelectItem key={o.v} value={o.v}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>ترتیب نمایش</Label>
              <Input type="number" value={cOrder} onChange={(e) => setCOrder(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>لینک (اختیاری)</Label>
              <Input value={cLink} onChange={(e) => setCLink(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Alt (اختیاری)</Label>
              <Input value={cAlt} onChange={(e) => setCAlt(e.target.value)} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateOpen(false)}>
              انصراف
            </Button>
            <Button onClick={submitCreate} disabled={cBusy}>
              {cBusy ? <Spinner className="size-4" /> : "ایجاد"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={editOpen}
        onOpenChange={(open) => {
          if (!open) setEFile(null);
          setEditOpen(open);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>ویرایش بنر #{editId}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>عنوان</Label>
              <Input value={eTitle} onChange={(e) => setETitle(e.target.value)} maxLength={200} />
            </div>
            <div className="space-y-1">
              <Label>موقعیت</Label>
              <Select value={ePos} onValueChange={setEPos}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POS_OPTIONS.map((o) => (
                    <SelectItem key={o.v} value={o.v}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>ترتیب</Label>
              <Input type="number" value={eOrder} onChange={(e) => setEOrder(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>لینک</Label>
              <Input value={eLink} onChange={(e) => setELink(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>Alt</Label>
              <Input value={eAlt} onChange={(e) => setEAlt(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>تصویر (اختیاری — تعویض)</Label>
              {eEditPreviewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={eEditPreviewUrl} alt="" className="h-20 w-36 object-cover rounded border mb-2" />
              ) : null}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setEFile(e.target.files?.[0] ?? null)}
              />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={eActive} onChange={(e) => setEActive(e.target.checked)} />
              فعال
            </label>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditOpen(false)}>
              انصراف
            </Button>
            <Button onClick={submitEdit} disabled={eBusy}>
              {eBusy ? <Spinner className="size-4" /> : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
