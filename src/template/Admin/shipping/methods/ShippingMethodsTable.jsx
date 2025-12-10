"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

export default function ShippingMethodsTable({ methods }) {
  if (methods.length === 0) {
    return <div className="p-8 text-center text-gray-400">روشی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام</TableHead>
          <TableHead className="text-gray-300">هزینه (تومان)</TableHead>
          <TableHead className="text-gray-300">زمان تقریبی (روز)</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {methods.map((method) => (
          <TableRow key={method.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{method.name}</TableCell>
            <TableCell className="text-gray-300">{method.price.toLocaleString()}</TableCell>
            <TableCell className="text-gray-300">{method.estimatedDays}</TableCell>
            <TableCell>
              <Badge variant={method.isActive ? "default" : "secondary"}>
                {method.isActive ? "فعال" : "غیرفعال"}
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


