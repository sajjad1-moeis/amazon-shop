"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const getInventoryStatusBadge = (currentStock, minStock) => {
  if (currentStock === 0) {
    return (
      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
        ناموجود
      </Badge>
    );
  }
  if (currentStock < minStock) {
    return (
      <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
        کم
      </Badge>
    );
  }
  return (
    <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
      کافی
    </Badge>
  );
};

export default function InventoryTable({ inventory }) {

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
        {inventory.map((item) => {
          const currentStock = item.currentStock || item.quantity || item.stock || 0;
          const minStock = item.minStock || item.minimumStock || item.minStockLevel || 0;
          return (
            <TableRow key={item.id || item.productId} className="border-gray-700 hover:bg-gray-700/50">
              <TableCell className="text-white font-medium">
                {item.productName || item.productTitle || item.name || "-"}
              </TableCell>
              <TableCell className="text-gray-300">{currentStock}</TableCell>
              <TableCell className="text-gray-300">{minStock}</TableCell>
              <TableCell>{getInventoryStatusBadge(currentStock, minStock)}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}


