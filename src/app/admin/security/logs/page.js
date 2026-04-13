"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { DocumentText } from "iconsax-reactjs";
import LogsTable from "@/template/Admin/security/logs/LogsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { securityService } from "@/services/security/securityService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard, AdminPersianDatePicker } from "@/components/admin";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SecurityLogsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const level = searchParams.get("level") || "";
  const startDate = searchParams.get("startDate") || "";
  const endDate = searchParams.get("endDate") || "";
  const pageParam = searchParams.get("page");

  useEffect(() => {
    if (pageParam) setPageNumber(parseInt(pageParam, 10) || 1);
  }, [pageParam]);

  const fetchLogs = useCallback(async () => {
    try {
      setLoading(true);
      const response = await securityService.getLogs({
        pageNumber,
        pageSize,
        level: level || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
      });
      const data = unwrapApiData(response);
      const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
      setLogs(items);
      setTotalPages(data?.totalPages ?? 1);
    } catch (error) {
      toast.error(error.message || "خطا در دریافت لاگ‌ها");
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, level, startDate, endDate]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const setFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/admin/security/logs?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/admin/security/logs?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        className="overflow-visible"
        accentLine={false}
        title="لاگ‌های سیستم"
        subtitle="تجمیع رویدادهای سرور (سطح، بازه). برای لاگ‌های دسته‌ای payment / scraper / API از «لاگ عملیاتی» با فیلتر category استفاده کنید."
        icon={DocumentText}
      >
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-[120px]">
            <Label className="text-gray-400 text-xs">سطح</Label>
            <Input
              placeholder="level"
              value={level}
              onChange={(e) => setFilter("level", e.target.value)}
              className="bg-gray-700 border-gray-600 text-white h-9 mt-1"
            />
          </div>
          <div className="min-w-[160px]">
            <Label className="text-gray-400 text-xs">از تاریخ</Label>
            <AdminPersianDatePicker
              value={startDate}
              onChange={(v) => setFilter("startDate", v)}
              placeholder="از تاریخ"
              className="mt-1"
            />
          </div>
          <div className="min-w-[160px]">
            <Label className="text-gray-400 text-xs">تا تاریخ</Label>
            <AdminPersianDatePicker
              value={endDate}
              onChange={(v) => setFilter("endDate", v)}
              placeholder="تا تاریخ"
              className="mt-1"
            />
          </div>
        </div>
      </AdminPageHeader>
      <AdminSectionCard title="لیست لاگ‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <LogsTable logs={logs} />
            <div className="pt-4 mt-4 border-t border-gray-600">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </AdminSectionCard>
    </div>
  );
}
