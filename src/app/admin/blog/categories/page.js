"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import BlogCategoriesTable from "@/template/Admin/blog/categories/BlogCategoriesTable";

const mockCategories = [
  { id: 1, name: "راهنما", slug: "guide", postsCount: 12, isActive: true },
  { id: 2, name: "مقالات", slug: "articles", postsCount: 8, isActive: true },
  { id: 3, name: "اخبار", slug: "news", postsCount: 5, isActive: false },
];

export default function BlogCategoriesPage() {
  const [categories] = useState(mockCategories);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="دسته‌بندی‌های وبلاگ"
          buttonText="دسته‌بندی جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
        />

        <BlogCategoriesTable categories={categories} />
      </div>
    </div>
  );
}
