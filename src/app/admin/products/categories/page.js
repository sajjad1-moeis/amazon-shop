"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash, CloudPlus, Add } from "iconsax-reactjs";
import { Badge } from "@/components/ui/badge";

const mockCategories = [
  { id: 1, name: "لپ تاپ", slug: "laptop", productsCount: 45, isActive: true },
  { id: 2, name: "موبایل", slug: "mobile", productsCount: 120, isActive: true },
  { id: 3, name: "هدفون", slug: "headphone", productsCount: 67, isActive: true },
  { id: 4, name: "ساعت هوشمند", slug: "smartwatch", productsCount: 34, isActive: false },
  { id: 5, name: "تبلت", slug: "tablet", productsCount: 28, isActive: true },
];

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">دسته‌بندی‌ها</h1>
          <p className="text-gray-400">مدیریت دسته‌بندی‌های محصولات</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Add size={20} className="ml-2" />
          دسته‌بندی جدید
        </Button>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">جستجو</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="جستجو در دسته‌بندی‌ها..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardContent className="p-0">
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
              {filteredCategories.map((category) => (
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
