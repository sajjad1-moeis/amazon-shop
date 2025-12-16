"use client";

import React from "react";
import BlogFilter from "./BlogFilter";
import BlogCard from "@/components/BlogCard";

export default function BlogList({
  blogs,
  categories,
  selectedCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  loading,
}) {
  if (loading) {
    return (
      <div className="container">
        <BlogFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
        <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="container">
        <BlogFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
          sortBy={sortBy}
          onSortChange={onSortChange}
        />
        <div className="p-8 text-center text-gray-400">بلاگی یافت نشد</div>
      </div>
    );
  }

  return (
    <div className="container">
      <BlogFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
