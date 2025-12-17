"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateRight } from "iconsax-reactjs";

export default function RateLimitsTable({ rateLimits, onReset }) {
  const getStatusBadge = (isExceeded) => {
    if (isExceeded) {
      return (
        <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
          محدود شده
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
        فعال
      </Badge>
    );
  };

  if (rateLimits.length === 0) {
    return <div className="p-8 text-center text-gray-400">گزارش Rate Limit‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">کاربر</TableHead>
          <TableHead className="text-gray-300">Endpoint</TableHead>
          <TableHead className="text-gray-300">تعداد درخواست</TableHead>
          <TableHead className="text-gray-300">حد مجاز</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rateLimits.map((rateLimit) => (
          <TableRow key={rateLimit.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {rateLimit.userName || rateLimit.userFullName || rateLimit.userId || "-"}
            </TableCell>
            <TableCell className="text-gray-300">{rateLimit.endpoint || rateLimit.path || "-"}</TableCell>
            <TableCell className="text-gray-300">{rateLimit.requestCount || rateLimit.count || 0}</TableCell>
            <TableCell className="text-gray-300">{rateLimit.limit || rateLimit.maxRequests || "-"}</TableCell>
            <TableCell>{getStatusBadge(rateLimit.isExceeded || rateLimit.exceeded)}</TableCell>
            <TableCell className="text-gray-300">
              {rateLimit.createdAt ? new Date(rateLimit.createdAt).toLocaleDateString("fa-IR") : "-"}
            </TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-blue-400 hover:bg-blue-400/20"
                onClick={() => onReset(rateLimit.id)}
              >
                <RotateRight size={18} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}





