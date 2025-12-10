"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import TableActions from "../../TableActions";

export default function BlogTable({ posts }) {
  if (posts.length === 0) {
    return <div className="p-8 text-center text-gray-400">پستی یافت نشد</div>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-gray-700 hover:bg-gray-700/50">
          <TableHead className="text-gray-300">عنوان</TableHead>
          <TableHead className="text-gray-300">دسته‌بندی</TableHead>
          <TableHead className="text-gray-300">نویسنده</TableHead>
          <TableHead className="text-gray-300">بازدید</TableHead>
          <TableHead className="text-gray-300">وضعیت</TableHead>
          <TableHead className="text-gray-300">تاریخ</TableHead>
          <TableHead className="text-gray-300">عملیات</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id} className="border-gray-700 hover:bg-gray-700/50">
            <TableCell className="text-white font-medium">{post.title}</TableCell>
            <TableCell className="text-gray-300">{post.category}</TableCell>
            <TableCell className="text-gray-300">{post.author}</TableCell>
            <TableCell className="text-gray-300">{post.views}</TableCell>
            <TableCell>
              <Badge variant={post.status === "published" ? "default" : "secondary"}>
                {post.status === "published" ? "منتشر شده" : "پیش‌نویس"}
              </Badge>
            </TableCell>
            <TableCell className="text-gray-300">{post.date}</TableCell>
            <TableCell>
              <TableActions />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}


