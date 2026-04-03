"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ShieldTick, Refresh } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { adminOperationsService } from "@/services/admin/adminOperationsService";

function normPage(raw) {
  const d = raw || {};
  const items = d.items ?? d.Items ?? [];
  return {
    items: Array.isArray(items) ? items : [],
    totalCount: d.totalCount ?? d.TotalCount ?? 0,
    page: d.page ?? d.Page ?? 1,
    pageSize: d.pageSize ?? d.PageSize ?? 25,
    totalPages: d.totalPages ?? d.TotalPages ?? 0,
  };
}

export default function AuditAdminPage() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(25);
  const [actionF, setActionF] = useState("");
  const [entityF, setEntityF] = useState("");
  const [appliedAction, setAppliedAction] = useState("");
  const [appliedEntity, setAppliedEntity] = useState("");
  const [data, setData] = useState({ items: [], totalPages: 0, totalCount: 0 });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const raw = await adminOperationsService.auditLogs({
        page,
        pageSize,
        action: appliedAction || undefined,
        entityType: appliedEntity || undefined,
      });
      setData(normPage(raw));
    } catch (e) {
      toast.error(e.message || "خطا");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, appliedAction, appliedEntity]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const applyFilters = () => {
    const a = actionF.trim();
    const e = entityF.trim();
    if ((a.length === 1) || (e.length === 1)) {
      toast.error("اگر فیلتری پر است، حداقل ۲ کاراکتر باشد.");
      return;
    }
    setAppliedAction(a);
    setAppliedEntity(e);
    setPage(1);
  };

  return (
    <div className="space-y-6 pb-8 p-4 md:p-6 max-w-[1280px] mx-auto">
      <AdminPageHeader
        title="تاریخچه تغییرات (Audit)"
        subtitle="فاز ۱۰ — نمونه: به‌روزرسانی TitleFa از مرکز ترجمه."
        icon={ShieldTick}
        actions={
          <Button variant="outline" size="sm" onClick={fetchData} disabled={loading}>
            <Refresh className="size-4 ml-1" variant="Linear" />
            تازه‌سازی
          </Button>
        }
      />
      <div className="flex flex-wrap gap-3 items-end">
        <div className="space-y-1">
          <Label className="text-xs">Action</Label>
          <Input value={actionF} onChange={(e) => setActionF(e.target.value)} className="w-[200px]" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">EntityType</Label>
          <Input value={entityF} onChange={(e) => setEntityF(e.target.value)} className="w-[160px]" />
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
                  <TableHead className="w-[70px]">Id</TableHead>
                  <TableHead>زمان</TableHead>
                  <TableHead>کاربر</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>قبل / بعد</TableHead>
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
                      <TableCell className="tabular-nums">{r.id ?? r.Id}</TableCell>
                      <TableCell className="text-xs whitespace-nowrap">
                        {r.createdAt || r.CreatedAt
                          ? new Date(r.createdAt ?? r.CreatedAt).toLocaleString("fa-IR")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {(r.actorEmail ?? r.ActorEmail) || (r.actorUserId ?? r.ActorUserId)}
                      </TableCell>
                      <TableCell className="text-xs font-mono">{r.action ?? r.Action}</TableCell>
                      <TableCell className="text-xs">
                        {(r.entityType ?? r.EntityType) + " #" + (r.entityId ?? r.EntityId ?? "—")}
                      </TableCell>
                      <TableCell className="text-xs max-w-[360px]">
                        <div className="line-clamp-2 text-muted-foreground" title={r.oldValue ?? r.OldValue}>
                          {r.oldValue ?? r.OldValue ?? "—"}
                        </div>
                        <div className="line-clamp-2" title={r.newValue ?? r.NewValue}>
                          {r.newValue ?? r.NewValue ?? "—"}
                        </div>
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
