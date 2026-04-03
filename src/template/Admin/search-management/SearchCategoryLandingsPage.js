"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Add, Category2, Trash, Edit2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminSearchManagementService } from "@/services/admin/adminSearchManagementService";

export default function SearchCategoryLandingsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [queryPattern, setQueryPattern] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [landingSlug, setLandingSlug] = useState("");
  const [isActive, setIsActive] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminSearchManagementService.listCategoryLandings();
      setRows(Array.isArray(data) ? data : []);
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
    setQueryPattern("");
    setCategoryId("");
    setLandingSlug("");
    setIsActive(true);
    setOpen(true);
  };

  const openEdit = (r) => {
    setEditId(r.id);
    setQueryPattern(r.queryPattern ?? "");
    setCategoryId(r.categoryId != null ? String(r.categoryId) : "");
    setLandingSlug(r.landingSlug ?? "");
    setIsActive(Boolean(r.isActive));
    setOpen(true);
  };

  const save = async () => {
    const cid = categoryId.trim() === "" ? null : Number(categoryId);
    if (cid != null && !Number.isFinite(cid)) {
      toast.error("شناسهٔ دسته نامعتبر است");
      return;
    }
    try {
      setSaving(true);
      const body = {
        queryPattern: queryPattern.trim(),
        categoryId: cid,
        landingSlug: landingSlug.trim() || null,
        isActive,
      };
      if (editId == null) {
        await adminSearchManagementService.createCategoryLanding(body);
        toast.success("قانون ثبت شد");
      } else {
        await adminSearchManagementService.updateCategoryLanding(editId, body);
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
    if (!window.confirm("حذف این قانون؟")) return;
    try {
      await adminSearchManagementService.deleteCategoryLanding(id);
      toast.success("حذف شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در حذف");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        title="اتصال جستجو به دسته یا لندینگ"
        subtitle="پس از مترادف، اگر دسته از URL نیامده باشد این قانون اعمال می‌شود"
        icon={Category2}
        actions={
          <Button onClick={openCreate} className="bg-amber-600 hover:bg-amber-700 text-white">
            <Add size={18} className="ml-1.5" />
            جدید
          </Button>
        }
      />

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="h-9 w-9 text-amber-500" />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-600/60">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-600/60 hover:bg-transparent">
                <TableHead className="text-right text-gray-300">الگوی جستجو</TableHead>
                <TableHead className="text-right text-gray-300">دسته</TableHead>
                <TableHead className="text-right text-gray-300">لندینگ</TableHead>
                <TableHead className="text-right text-gray-300">فعال</TableHead>
                <TableHead className="w-[100px] text-left text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className="border-gray-600/50">
                  <TableCell className="font-medium text-white">{r.queryPattern}</TableCell>
                  <TableCell className="text-gray-300">{r.categoryId ?? "—"}</TableCell>
                  <TableCell className="text-gray-300 font-mono text-sm">{r.landingSlug ?? "—"}</TableCell>
                  <TableCell className="text-gray-300">{r.isActive ? "بله" : "خیر"}</TableCell>
                  <TableCell className="text-left">
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
        <DialogContent className="border-gray-600 bg-gray-900 text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId == null ? "قانون جدید" : "ویرایش قانون"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-gray-300">الگوی جستجو (پس از مترادف)</Label>
              <Input
                value={queryPattern}
                onChange={(e) => setQueryPattern(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">شناسهٔ دسته (اختیاری)</Label>
              <Input
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
                placeholder="عدد"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">اسلاگ لندینگ (اگر دسته خالی است)</Label>
              <Input
                value={landingSlug}
                onChange={(e) => setLandingSlug(e.target.value)}
                className="border-gray-600 bg-gray-800/80 font-mono text-sm"
                placeholder="مثلاً sale"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="cl-active" />
              <Label htmlFor="cl-active" className="text-gray-300">
                فعال
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" className="border-gray-600" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button disabled={saving} className="bg-amber-600 hover:bg-amber-700" onClick={save}>
              {saving ? "…" : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
