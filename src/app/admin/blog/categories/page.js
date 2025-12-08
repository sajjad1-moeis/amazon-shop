"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, Add } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockCategories = [
  { id: 1, name: "راهنما", slug: "guide", postsCount: 12, isActive: true },
  { id: 2, name: "مقالات", slug: "articles", postsCount: 8, isActive: true },
  { id: 3, name: "اخبار", slug: "news", postsCount: 5, isActive: false },
];

export default function BlogCategoriesPage() {
  const [categories] = useState(mockCategories);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">دسته‌بندی‌های وبلاگ</h1>
          <p className="text-gray-400">مدیریت دسته‌بندی‌های وبلاگ</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Add size={20} className="ml-2" />
          دسته‌بندی جدید
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700 hover:bg-gray-700/50">
                <TableHead className="text-gray-300">نام</TableHead>
                <TableHead className="text-gray-300">Slug</TableHead>
                <TableHead className="text-gray-300">تعداد پست‌ها</TableHead>
                <TableHead className="text-gray-300">وضعیت</TableHead>
                <TableHead className="text-gray-300">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id} className="border-gray-700 hover:bg-gray-700/50">
                  <TableCell className="text-white font-medium">{category.name}</TableCell>
                  <TableCell className="text-gray-300">{category.slug}</TableCell>
                  <TableCell className="text-gray-300">{category.postsCount}</TableCell>
                  <TableCell>
                    <Badge variant={category.isActive ? "default" : "secondary"}>
                      {category.isActive ? "فعال" : "غیرفعال"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-green-400 hover:bg-green-400/20">
                        <Edit size={18} />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-400 hover:bg-red-400/20">
                        <Trash size={18} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
