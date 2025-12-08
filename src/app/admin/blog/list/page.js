"use client";

import React, { useState } from "react";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import BlogTable from "@/template/Admin/blog/list/BlogTable";

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
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch
          title="وبلاگ ها"
          searchPlaceholder="جستجو نام"
          onSearchChange={setSearchTerm}
        />

        <BlogTable posts={filteredPosts} />
      </div>
    </div>
  );
}
