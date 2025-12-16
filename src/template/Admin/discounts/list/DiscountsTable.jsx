"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

const getStatusBadge = (status) => {
  const statusMap = {
    1: { label: "فعال", className: "bg-green-500/20 text-green-400 border-green-500/30" },
    2: { label: "غیرفعال", className: "bg-gray-500/20 text-gray-400 border-gray-500/30" },
    3: { label: "منقضی شده", className: "bg-red-500/20 text-red-400 border-red-500/30" },
  };
  const statusInfo = statusMap[status] || statusMap[2];
  return (
    <Badge variant="outline" className={statusInfo.className}>
      {statusInfo.label}
    </Badge>
  );
};

export default function DiscountsTable({ discounts }) {
  if (discounts.length === 0) {
    return <div className="p-8 text-center text-gray-400">کوپنی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">کد کوپن</TableHead>
          <TableHead className="text-gray-300">نوع</TableHead>
          <TableHead className="text-gray-300">مقدار</TableHead>
          <TableHead className="text-gray-300">حداقل خرید</TableHead>
          <TableHead className="text-gray-300">استفاده شده</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {discounts.map((discount) => (
          <TableRow key={discount.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{discount.code}</TableCell>
            <TableCell className="text-gray-300">
              {discount.type === 1 ? "درصدی" : discount.type === 2 ? "مقدار ثابت" : "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {discount.type === 1
                ? `${discount.value}%`
                : discount.type === 2
                  ? `${discount.value?.toLocaleString() || 0} تومان`
                  : "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {discount.minPurchase ? `${discount.minPurchase.toLocaleString()} تومان` : "-"}
            </TableCell>
            <TableCell className="text-gray-300">
              {discount.usedCount || 0} / {discount.usageLimit || 0}
            </TableCell>
            <TableCell>{getStatusBadge(discount.status)}</TableCell>
            <TableCell>
              <TableActions showView={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


