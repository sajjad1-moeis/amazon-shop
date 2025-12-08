"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

export default function AdminsTable({ admins }) {
  if (admins.length === 0) {
    return <div className="p-8 text-center text-gray-400">ادمینی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام</TableHead>
          <TableHead className="text-gray-300">ایمیل</TableHead>
          <TableHead className="text-gray-300">نقش</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={admin.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{admin.name}</TableCell>
            <TableCell className="text-gray-300">{admin.email}</TableCell>
            <TableCell className="text-gray-300">{admin.role}</TableCell>
            <TableCell>
              <Badge variant={admin.isActive ? "default" : "secondary"}>
                {admin.isActive ? "فعال" : "غیرفعال"}
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

