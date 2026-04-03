"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { Add, CloseCircle, TickCircle, Trash, Edit2 } from "iconsax-reactjs";
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

/**
 * @param {{ whitelistMode: boolean }} props
 */
export default function SearchGatesPage({ whitelistMode }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState(null);
  const [term, setTerm] = useState("");
  const [notes, setNotes] = useState("");
  const [isActive, setIsActive] = useState(true);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await adminSearchManagementService.listGates(whitelistMode);
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      toast.error(e.message || "خطا در بارگذاری");
    } finally {
      setLoading(false);
    }
  }, [whitelistMode]);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditId(null);
    setTerm("");
    setNotes("");
    setIsActive(true);
    setOpen(true);
  };

  const openEdit = (r) => {
    setEditId(r.id);
    setTerm(r.term ?? "");
    setNotes(r.notes ?? "");
    setIsActive(Boolean(r.isActive));
    setOpen(true);
  };

  const save = async () => {
    try {
      setSaving(true);
      if (editId == null) {
        await adminSearchManagementService.createGate({
          term: term.trim(),
          isWhitelist: whitelistMode,
          notes: notes.trim() || null,
          isActive,
        });
        toast.success("ثبت شد");
      } else {
        await adminSearchManagementService.updateGate(editId, {
          term: term.trim(),
          notes: notes.trim() || null,
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
    if (!window.confirm("حذف این مورد؟")) return;
    try {
      await adminSearchManagementService.deleteGate(id);
      toast.success("حذف شد");
      await load();
    } catch (e) {
      toast.error(e.message || "خطا در حذف");
    }
  };

  const title = whitelistMode ? "لیست سفید جستجو" : "لیست سیاه جستجو";
  const subtitle = whitelistMode
    ? "اگر عبارت در هر دو لیست باشد، لیست سفید بر مسدودیت غلبه می‌کند"
    : "عبارات مسدود؛ استثنا با همان عبارت در لیست سفید";
  const Icon = whitelistMode ? TickCircle : CloseCircle;

  return (
    <div className="space-y-6 pb-8">
      <AdminPageHeader
        title={title}
        subtitle={subtitle}
        icon={Icon}
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
                <TableHead className="text-right text-gray-300">عبارت</TableHead>
                <TableHead className="text-right text-gray-300">یادداشت</TableHead>
                <TableHead className="text-right text-gray-300">فعال</TableHead>
                <TableHead className="w-[100px] text-left text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} className="border-gray-600/50">
                  <TableCell className="font-medium text-white">{r.term}</TableCell>
                  <TableCell className="max-w-[240px] truncate text-gray-400 text-sm" title={r.notes || ""}>
                    {r.notes || "—"}
                  </TableCell>
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
            <DialogTitle>{editId == null ? "مورد جدید" : "ویرایش"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-gray-300">عبارت</Label>
              <Input
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">یادداشت (اختیاری)</Label>
              <Input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-gray-600 bg-gray-800/80"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={isActive} onCheckedChange={setIsActive} id="gate-active" />
              <Label htmlFor="gate-active" className="text-gray-300">
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
