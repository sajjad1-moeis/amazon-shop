"use client";

import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import LogsTable from "@/template/Admin/security/logs/LogsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import { securityService } from "@/services/security/securityService";

export default function SecurityLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await securityService.getLogs({
        pageNumber,
        pageSize,
      });

      if (response.success && response.data) {
        setLogs(response.data.logs || response.data || []);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت لاگ‌ها");
      console.error("Error fetching logs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [pageNumber]);

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeader title="لاگ‌های سیستم" />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <LogsTable logs={logs} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
