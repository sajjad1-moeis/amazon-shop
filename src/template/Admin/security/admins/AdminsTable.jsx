"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit2, Trash } from "iconsax-reactjs";
import { formatDateFa } from "@/utils/adminDateUtils";

export default function AdminsTable({ admins, onEdit, onDelete }) {
  if (admins.length === 0) {
    return <div className="p-8 text-center text-gray-400">ادمینی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام</TableHead>
          <TableHead className="text-gray-300">ایمیل</TableHead>
          <TableHead className="text-gray-300">تلفن</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ ایجاد</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={admin.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">
              {[admin.firstName, admin.lastName].filter(Boolean).join(" ") || admin.name || "—"}
            </TableCell>
            <TableCell className="text-gray-300">{admin.email || "—"}</TableCell>
            <TableCell className="text-gray-300">{admin.phoneNumber || "—"}</TableCell>
            <TableCell>
              <Badge variant={admin.isActive !== false ? "default" : "secondary"} className={admin.isActive !== false ? "bg-green-500/20 text-green-400 border-green-500/30" : ""}>
                {admin.isActive !== false ? "فعال" : "غیرفعال"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-300">{formatDateFa(admin.createdAt)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                {onEdit && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-400 hover:bg-amber-400/20" onClick={() => onEdit(admin)}>
                    <Edit2 size={18} />
                  </Button>
                )}
                {onDelete && (
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-400/20" onClick={() => onDelete(admin)}>
                    <Trash size={18} />
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


