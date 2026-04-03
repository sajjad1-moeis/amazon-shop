"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Chart, ShoppingCart } from "iconsax-reactjs";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import { AdminSectionCard } from "@/components/admin";
import { adminSearchManagementService } from "@/services/admin/adminSearchManagementService";
import { Spinner } from "@/components/ui/spinner";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

function InsightTable({ rows, emptyText }) {
  if (!rows?.length) {
    return <p className="py-6 text-center text-sm text-gray-500">{emptyText}</p>;
  }
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-600/60">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-600/60 hover:bg-transparent">
            <TableHead className="text-right text-gray-300">عبارت</TableHead>
            <TableHead className="text-right text-gray-300">تعداد جستجو</TableHead>
            <TableHead className="text-right text-gray-300">کلیک</TableHead>
            <TableHead className="text-right text-gray-300">خرید</TableHead>
            <TableHead className="text-right text-gray-300">نرخ کلیک %</TableHead>
            <TableHead className="text-right text-gray-300">تبدیل %</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={`${r.searchTerm}-${r.searchCount}`} className="border-gray-600/50">
              <TableCell className="max-w-[200px] truncate font-medium text-white" title={r.searchTerm}>
                {r.searchTerm}
              </TableCell>
              <TableCell className="text-gray-300">{r.searchCount}</TableCell>
              <TableCell className="text-gray-300">{r.clickCount}</TableCell>
              <TableCell className="text-gray-300">{r.purchaseCount}</TableCell>
              <TableCell className="text-gray-300">{r.clickRatePercent}</TableCell>
              <TableCell className="text-gray-300">{r.conversionRatePercent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default function SearchReportsPage() {
  const [lowClick, setLowClick] = useState([]);
  const [noPurchase, setNoPurchase] = useState([]);
  const [loadingA, setLoadingA] = useState(true);
  const [loadingB, setLoadingB] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminSearchManagementService.getLowClickSearches({
          limit: 80,
          minSearches: 5,
          maxClickRatePercent: 15,
        });
        if (!cancelled) setLowClick(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) toast.error(e.message || "خطا در گزارش کم‌کلیک");
      } finally {
        if (!cancelled) setLoadingA(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await adminSearchManagementService.getNoPurchaseSearches({ limit: 80, minClicks: 1 });
        if (!cancelled) setNoPurchase(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) toast.error(e.message || "خطا در گزارش بدون خرید");
      } finally {
        if (!cancelled) setLoadingB(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-8 pb-8">
      <AdminPageHeader
        title="گزارش‌های مدیریت جستجو"
        subtitle="بر پایهٔ تاریخچهٔ جستجو و رویدادهای کلیک/خرید ثبت‌شده"
        icon={Chart}
      />

      <AdminSectionCard title="جستجوهای پرتکرار با نرخ کلیک پایین" icon={Chart}>
        {loadingA ? (
          <div className="flex justify-center py-10">
            <Spinner className="h-8 w-8 text-amber-500" />
          </div>
        ) : (
          <InsightTable rows={lowClick} emptyText="رکوردی با این معیارها یافت نشد." />
        )}
      </AdminSectionCard>

      <AdminSectionCard title="جستجو با کلیک و بدون خرید ثبت‌شده" icon={ShoppingCart}>
        {loadingB ? (
          <div className="flex justify-center py-10">
            <Spinner className="h-8 w-8 text-amber-500" />
          </div>
        ) : (
          <InsightTable rows={noPurchase} emptyText="رکوردی با این معیارها یافت نشد." />
        )}
      </AdminSectionCard>
    </div>
  );
}
