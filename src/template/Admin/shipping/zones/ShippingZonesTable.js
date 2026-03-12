"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";
import { formatDateFa } from "@/utils/adminDateUtils";

export default function ShippingZonesTable({ zones, onRefresh, onEdit }) {
  if (!zones || zones.length === 0) {
    return <div className="p-8 text-center text-gray-400">هیچ منطقه ارسالی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام منطقه</TableHead>
          <TableHead className="text-gray-300">کشورها</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ ایجاد</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {zones.map((zone) => (
          <TableRow key={zone.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{zone.name || "-"}</TableCell>
            <TableCell className="text-gray-300">
              {Array.isArray(zone.countries) ? zone.countries.join(", ") : zone.countries || "-"}
            </TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  zone.isActive
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }
              >
                {zone.isActive ? "فعال" : "غیرفعال"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-400 text-sm">
              {zone.createdAt ? formatDateFa(zone.createdAt) : "-"}
            </TableCell>
            <TableCell>
              <TableActions
                showView={false}
                onEdit={onEdit ? () => onEdit(zone.id) : undefined}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
