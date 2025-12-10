"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

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
            <TableCell className="text-white font-medium">{log.action}</TableCell>
            <TableCell className="text-gray-300">{log.user}</TableCell>
            <TableCell className="text-gray-300">{log.ip}</TableCell>
            <TableCell className="text-gray-300">{log.date}</TableCell>
            <TableCell>
              <Badge variant={log.status === "success" ? "default" : "destructive"}>
                {log.status === "success" ? "موفق" : "ناموفق"}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


