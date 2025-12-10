"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

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
              {discount.type === "percentage" ? "درصدی" : "مقدار ثابت"}
            </TableCell>
            <TableCell className="text-gray-300">
              {discount.type === "percentage" ? `${discount.value}%` : `${discount.value.toLocaleString()} تومان`}
            </TableCell>
            <TableCell className="text-gray-300">{discount.minPurchase.toLocaleString()} تومان</TableCell>
            <TableCell className="text-gray-300">
              {discount.used} / {discount.usageLimit}
            </TableCell>
            <TableCell>
              <Badge variant={discount.status === "active" ? "default" : "secondary"}>
                {discount.status === "active" ? "فعال" : "منقضی شده"}
              </Badge>
            </TableCell>
            <TableCell>
              <TableActions showView={false} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


