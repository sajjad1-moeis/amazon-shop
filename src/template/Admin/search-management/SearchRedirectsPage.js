"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Add, Routing, Trash, Edit2 } from "iconsax-reactjs";
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

export default function SearchRedirectsPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [sourceQuery, setSourceQuery] = useState("");
  const [targetPath, setTargetPath] = useState("");
  const [isActive, setIsActive] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminSearchManagementService.listRedirects();
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
    setSourceQuery("");
    setTargetPath("");
    setIsActive(true);
    setOpen(true);
  };

  const openEdit = (r) => {
    setEditId(r.id);
    setSourceQuery(r.sourceQuery ?? "");
    setTargetPath(r.targetPath ?? "");
    setIsActive(Boolean(r.isActive));
    setOpen(true);
  };

  const save = async () => {
    try {
      setSaving(true);
      if (editId == null) {
        await adminSearchManagementService.createRedirect({
          sourceQuery: sourceQuery.trim(),
          targetPath: targetPath.trim(),
          isActive,
        });
        toast.success("ریدایرکت ثبت شد");
      } else {
        await adminSearchManagementService.updateRedirect(editId, {
          sourceQuery: sourceQuery.trim(),
          targetPath: targetPath.trim(),
          isActive,
        });
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
      await adminSearchManagementService.deleteRedirect(id);
      toast.success("حذف شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در حذف");
    }
  };

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        title="ریدایرکت جستجو"
        subtitle="اگر کاربر دقیقاً این عبارت را جستجو کند، به مسیر SPA هدایت می‌شود"
        icon={Routing}
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
                <TableHead className="text-right text-gray-300">عبارت مبدأ</TableHead>
                <TableHead className="text-right text-gray-300">مسیر مقصد</TableHead>
                <TableHead className="text-right text-gray-300">فعال</TableHead>
                <TableHead className="w-[100px] text-left text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className="border-gray-600/50">
                  <TableCell className="font-medium text-white">{r.sourceQuery}</TableCell>
                  <TableCell className="text-gray-300 font-mono text-sm">{r.targetPath}</TableCell>
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
            <DialogTitle>{editId == null ? "ریدایرکت جدید" : "ویرایش ریدایرکت"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-gray-300">عبارت جستجو (مبدأ)</Label>
              <Input
                value={sourceQuery}
                onChange={(e) => setSourceQuery(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">مسیر مقصد (مثلاً /categories/laptop)</Label>
              <Input
                value={targetPath}
                onChange={(e) => setTargetPath(e.target.value)}
                className="border-gray-600 bg-gray-800/80 font-mono text-sm"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="redir-active" />
              <Label htmlFor="redir-active" className="text-gray-300">
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
