"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const getLogStatusBadge = (status) => {
  const statusMap = {
    1: { label: "موفق", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "ناموفق", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[2];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function LogsTable({ logs }) {
  if (logs.length === 0) {
    return <div className="p-8 text-center text-gray-400">لاگی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">عملیات</TableHead>
          <TableHead className="text-gray-300">کاربر</TableHead>
          <TableHead className="text-gray-300">IP</TableHead>
          <TableHead className="text-gray-300">تاریخ و زمان</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {logs.map((log) => (
          <TableRow key={log.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {log.action || log.message || log.description || "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {log.userName || log.user || log.userFullName || "-"}
            </TableCell>
            <TableCell className="text-gray-300">{log.ipAddress || log.ip || "-"}</TableCell>
            <TableCell className="text-gray-300">
              {log.createdAt
                ? new Date(log.createdAt).toLocaleDateString("fa-IR") +
                  " " +
                  new Date(log.createdAt).toLocaleTimeString("fa-IR")
                : log.date || "-"}
            </TableCell>
            <TableCell>{getLogStatusBadge(log.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


