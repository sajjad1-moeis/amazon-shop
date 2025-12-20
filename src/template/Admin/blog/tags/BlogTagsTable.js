"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TableActions from "../../TableActions";

export default function BlogTagsTable({ tags, onEdit, onDelete }) {
  if (tags.length === 0) {
    return <div className="p-8 text-center text-gray-400">تگی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">نام</TableHead>
          <TableHead className="text-gray-300">Slug</TableHead>
          <TableHead className="text-gray-300">تعداد بلاگ‌ها</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tags.map((tag) => (
          <TableRow key={tag.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{tag.name}</TableCell>
            <TableCell className="text-gray-300">{tag.slug}</TableCell>
            <TableCell className="text-gray-300">{tag.blogCount || 0}</TableCell>
            <TableCell>
              <TableActions
                onEdit={() => onEdit(tag.id)}
                onDelete={() => onDelete(tag.id)}
                showView={false}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}





