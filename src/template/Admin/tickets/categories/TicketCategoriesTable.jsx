"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EyeSlash, Eye } from "iconsax-reactjs";
import TableActions from "../../TableActions";

export default function TicketCategoriesTable({ categories, onEdit, onDelete, onToggleActive }) {
  if (categories.length === 0) {
    return <div className="p-8 text-center text-gray-400">دسته‌بندی‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام دسته‌بندی</TableHead>
          <TableHead className="text-gray-300">توضیحات</TableHead>
          <TableHead className="text-gray-300">تعداد تیکت‌ها</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{category.name}</TableCell>
            <TableCell className="text-gray-300 max-w-xs truncate">{category.description || "-"}</TableCell>
            <TableCell className="text-gray-300">{category.ticketCount || category.ticketCount || 0}</TableCell>
            <TableCell>
              <Badge
                variant="outline"
                className={
                  category.isActive !== false
                    ? "bg-green-500/20 text-green-400 border-green-500/30"
                    : "bg-gray-500/20 text-gray-400 border-gray-500/30"
                }
              >
                {category.isActive !== false ? "فعال" : "غیرفعال"}
              </Badge>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <TableActions
                  onEdit={() => onEdit(category)}
                  onDelete={() => onDelete(category.id)}
                  showView={false}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onToggleActive(category)}
                  className={`h-8 w-8 ${
                    category.isActive !== false
                      ? "text-orange-400 hover:bg-orange-400/20"
                      : "text-blue-400 hover:bg-blue-400/20"
                  }`}
                  title={category.isActive !== false ? "غیرفعال کردن" : "فعال کردن"}
                >
                  {category.isActive !== false ? <EyeSlash size={18} /> : <Eye size={18} />}
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

