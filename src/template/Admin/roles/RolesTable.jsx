"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeSlash, Eye } from "iconsax-reactjs";
import TableActions from "../TableActions";
import { formatDate } from "@/utils/dateFormatter";

export default function RolesTable({ roles, onEdit, onDelete, onToggleActive, onView }) {
  if (roles.length === 0) {
    return <div className="p-8 text-center text-gray-400">نقشی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام نقش</TableHead>
          <TableHead className="text-gray-300">توضیحات</TableHead>
          <TableHead className="text-gray-300">تعداد کاربران</TableHead>
          <TableHead className="text-gray-300">تاریخ ایجاد</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {roles.map((role) => (
          <TableRow key={role.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{role.name}</TableCell>
            <TableCell className="text-gray-300 max-w-xs truncate">{role.description || "-"}</TableCell>
            <TableCell className="text-gray-300">{role.userCount || 0}</TableCell>
            <TableCell className="text-gray-300">{formatDate(role.createdAt)}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  role.isActive !== false
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }
              >
                {role.isActive !== false ? "فعال" : "غیرفعال"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <TableActions
                  onEdit={() => onEdit(role)}
                  onDelete={() => onDelete(role.id)}
                  onView={onView ? () => onView(role.id) : undefined}
                  showView={!!onView}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleActive(role)}
                  className={`h-8 w-8 ${
                    role.isActive !== false
                      ? "text-orange-400 hover:bg-orange-400/20"
                      : "text-blue-400 hover:bg-blue-400/20"
                  }`}
                  title={role.isActive !== false ? "غیرفعال کردن" : "فعال کردن"}
                >
                  {role.isActive !== false ? <EyeSlash size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

