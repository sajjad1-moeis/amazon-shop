"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Book1, Refresh, Trash, Edit2, Add, ArrowLeft2 } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { adminBrandGlossaryService } from "@/services/admin/adminBrandGlossaryService";

function norm(r) {
  return {
    id: r.id ?? r.Id,
    englishTerm: r.englishTerm ?? r.EnglishTerm ?? "",
    persianReplacement: r.persianReplacement ?? r.PersianReplacement ?? "",
    priority: r.priority ?? r.Priority ?? 0,
    matchWholeWordOnly: r.matchWholeWordOnly ?? r.MatchWholeWordOnly ?? false,
  };
}

export default function BrandGlossaryAdminPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [en, setEn] = useState("");
  const [fa, setFa] = useState("");
  const [priority, setPriority] = useState(0);
  const [whole, setWhole] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await adminBrandGlossaryService.list();
      const list = Array.isArray(raw) ? raw : [];
      setRows(list.map(norm));
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openNew = () => {
    setEditId(null);
    setEn("");
    setFa("");
    setPriority(0);
    setWhole(false);
    setOpen(true);
  };

  const openEdit = (r) => {
    setEditId(r.id);
    setEn(r.englishTerm);
    setFa(r.persianReplacement);
    setPriority(r.priority);
    setWhole(r.matchWholeWordOnly);
    setOpen(true);
  };

  const save = async () => {
    if (!en.trim() || !fa.trim()) {
      toast.error("هر دو فیلد انگلیسی و فارسی الزامی است");
      return;
    }
    try {
      setSaving(true);
      if (editId == null) {
        await adminBrandGlossaryService.create({
          englishTerm: en.trim(),
          persianReplacement: fa.trim(),
          priority: Number(priority) || 0,
          matchWholeWordOnly: whole,
        });
        toast.success("ثبت شد");
      } else {
        await adminBrandGlossaryService.update(editId, {
          englishTerm: en.trim(),
          persianReplacement: fa.trim(),
          priority: Number(priority) || 0,
          matchWholeWordOnly: whole,
        });
        toast.success("به‌روز شد");
      }
      setOpen(false);
      await load();
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setSaving(false);
    }
  };

  const del = async (id) => {
    if (!confirm("حذف این قانون؟")) return;
    try {
      await adminBrandGlossaryService.remove(id);
      toast.success("حذف شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا");
    }
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1000px] mx-auto">
      <AdminPageHeader
        title="واژه‌نامه اصطلاحات برند"
        subtitle="جایگزینی زیررشته در عنوان انگلیسی برای پیشنهاد TitleFa در مرکز ترجمه (اولویت بالاتر زودتر اعمال می‌شود)."
        icon={Book1}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <Refresh className="size-4 ml-1" variant="Linear" />
              تازه‌سازی
            </Button>
            <Button size="sm" onClick={openNew}>
              <Add className="size-4 ml-1" variant="Linear" />
              قانون جدید
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

      {loading ? (
        <div className="flex justify-center py-16">
          <Spinner className="size-10" />
        </div>
      ) : (
        <div className="rounded-xl border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[64px]">اولویت</TableHead>
                <TableHead>انگلیسی</TableHead>
                <TableHead>فارسی</TableHead>
                <TableHead>کلمه کامل</TableHead>
                <TableHead className="w-[120px]">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                    قانونی ثبت نشده.
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.priority}</TableCell>
                    <TableCell className="font-mono text-sm">{r.englishTerm}</TableCell>
                    <TableCell className="text-sm">{r.persianReplacement}</TableCell>
                    <TableCell>{r.matchWholeWordOnly ? "بله" : "خیر"}</TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(r)}>
                        <Edit2 className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => del(r.id)}>
                        <Trash className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editId == null ? "قانون جدید" : "ویرایش قانون"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label>زیررشته انگلیسی</Label>
              <Input value={en} onChange={(e) => setEn(e.target.value)} maxLength={500} />
            </div>
            <div className="space-y-1">
              <Label>جایگزین فارسی</Label>
              <Input value={fa} onChange={(e) => setFa(e.target.value)} maxLength={500} />
            </div>
            <div className="space-y-1">
              <Label>اولویت (بالاتر = زودتر)</Label>
              <Input
                type="number"
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
              />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="whole" checked={whole} onCheckedChange={(v) => setWhole(v === true)} />
              <Label htmlFor="whole" className="font-normal cursor-pointer">
                فقط کلمه کامل (جدا شده با فاصله)
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>
            <Button onClick={save} disabled={saving}>
              {saving ? <Spinner className="size-4" /> : "ذخیره"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
