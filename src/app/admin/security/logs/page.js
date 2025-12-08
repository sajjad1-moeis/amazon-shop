"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Admin/PageHeader";
import LogsTable from "@/template/Admin/security/logs/LogsTable";

const mockLogs = [
  { id: 1, action: "ورود به سیستم", user: "مدیر", ip: "192.168.1.1", date: "1403/09/20 10:30", status: "success" },
  { id: 2, action: "ویرایش محصول", user: "مدیر", ip: "192.168.1.1", date: "1403/09/20 11:15", status: "success" },
  { id: 3, action: "تلاش ورود ناموفق", user: "نامشخص", ip: "192.168.1.100", date: "1403/09/20 12:00", status: "failed" },
];

export default function SecurityLogsPage() {
  const [logs] = useState(mockLogs);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader title="لاگ‌های سیستم" />

        <LogsTable logs={logs} />
      </div>
    </div>
  );
}

