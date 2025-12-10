"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

export default function CategoriesTable({ categories }) {
  if (categories.length === 0) {
    return <div className="p-8 text-center text-gray-400">دسته‌بندی‌ای یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام</TableHead>
          <TableHead className="text-gray-300">Slug</TableHead>
          <TableHead className="text-gray-300">تعداد محصولات</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{category.name}</TableCell>
            <TableCell className="text-gray-300">{category.slug}</TableCell>
            <TableCell className="text-gray-300">{category.productsCount}</TableCell>
            <TableCell>
              <Badge variant={category.isActive ? "default" : "secondary"}>
                {category.isActive ? "فعال" : "غیرفعال"}
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


