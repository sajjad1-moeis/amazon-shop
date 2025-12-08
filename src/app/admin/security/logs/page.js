"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockLogs = [
  { id: 1, action: "ورود به سیستم", user: "مدیر", ip: "192.168.1.1", date: "1403/09/20 10:30", status: "success" },
  { id: 2, action: "ویرایش محصول", user: "مدیر", ip: "192.168.1.1", date: "1403/09/20 11:15", status: "success" },
  { id: 3, action: "تلاش ورود ناموفق", user: "نامشخص", ip: "192.168.1.100", date: "1403/09/20 12:00", status: "failed" },
];

export default function SecurityLogsPage() {
  const [logs] = useState(mockLogs);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">لاگ‌های سیستم</h1>
        <p className="text-gray-400">مشاهده لاگ‌های سیستم و فعالیت‌ها</p>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
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
        </CardContent>
      </Card>
    </div>
  );
}

