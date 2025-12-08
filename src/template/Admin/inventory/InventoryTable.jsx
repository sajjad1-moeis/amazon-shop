"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export default function InventoryTable({ inventory }) {
  const getStatusBadge = (status) => {
    if (status === "ok") return <Badge variant="default">کافی</Badge>;
    if (status === "low") return <Badge variant="outline">کم</Badge>;
    return <Badge variant="destructive">ناموجود</Badge>;
  };

  if (inventory.length === 0) {
    return <div className="p-8 text-center text-gray-400">موجودی‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">محصول</TableHead>
          <TableHead className="text-gray-300">موجودی فعلی</TableHead>
          <TableHead className="text-gray-300">حداقل موجودی</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item) => (
          <TableRow key={item.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{item.productName}</TableCell>
            <TableCell className="text-gray-300">{item.currentStock}</TableCell>
            <TableCell className="text-gray-300">{item.minStock}</TableCell>
            <TableCell>{getStatusBadge(item.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

