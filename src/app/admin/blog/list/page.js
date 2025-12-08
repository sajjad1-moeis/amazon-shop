"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash, Add } from "iconsax-reactjs";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const mockPosts = [
  {
    id: 1,
    title: "راهنمای خرید لپ تاپ",
    category: "راهنما",
    author: "مدیر",
    views: 1234,
    status: "published",
    date: "1403/09/20",
  },
  {
    id: 2,
    title: "بهترین گوشی‌های 2024",
    category: "مقالات",
    author: "مدیر",
    views: 856,
    status: "draft",
    date: "1403/09/19",
  },
];

export default function BlogListPage() {
  const [posts] = useState(mockPosts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">لیست پست‌ها</h1>
          <p className="text-gray-400">مدیریت پست‌های وبلاگ</p>
        </div>
        <Link href="/admin/blog/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Add size={20} className="ml-2" />
            پست جدید
          </Button>
        </Link>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">جستجو</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            placeholder="جستجو در پست‌ها..."
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
              {filteredPosts.map((post) => (
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
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-400 hover:bg-blue-400/20">
                        <Eye size={18} />
                      </Button>
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
