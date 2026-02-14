"use client";

import React, { useState, useEffect } from "react";
import BlogList from "@/template/Blogs/BlogList";
import PaginationBlogs from "@/template/Blogs/PaginationBlogs";
import Image from "next/image";
import { blogService } from "@/services/blog/blogService";
import { blogCategoryService } from "@/services/blog/blogCategoryService";
import BlogCard from "@/components/BlogCard";

export default function BlogsClient({ searchParams }) {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [blogsRes, featuredRes, categoriesRes] = await Promise.all([
          blogService.getPaginated({
            pageNumber,
            pageSize,
            status: 2,
            categoryId: selectedCategory,
            isFeatured: sortBy === "featured" ? true : undefined,
          }),
          blogService.getFeatured(),
          blogCategoryService.getActive(),
        ]);

        if (blogsRes.success && blogsRes.data) {
          setBlogs(blogsRes.data.blogs || []);
          setTotalPages(blogsRes.data.totalPages || 1);
        }

        if (featuredRes.success && featuredRes.data) {
          setFeaturedBlogs(featuredRes.data || []);
        }

        if (categoriesRes.success && categoriesRes.data) {
          setCategories(categoriesRes.data || []);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pageNumber, selectedCategory, sortBy]);

  return (
    <div className="bg-gray-50 pb-20 dark:bg-dark-bg">
      <div className="relative aspect-square max-h-40 lg:max-h-[376px] w-full mb-10 md:mb-20">
        <Image src="/image/Blogs/blogBg.png" alt="بلاگ" fill className="object-cover" />
      </div>

      <BlogList
        blogs={blogs}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        loading={loading}
      />

      <div className="grid lg:grid-cols-2 gap-5 container my-4 md:my-8">
        <div className="relative aspect-square max-h-40 md:max-h-[250px] w-full">
          <Image
            src="/image/Blogs/banner1.png"
            alt="بنر بلاگ"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
        <div className="relative aspect-square max-h-40 md:max-h-[250px] w-full">
          <Image
            src="/image/Blogs/banner2.png"
            alt="بنر بلاگ"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>

      {featuredBlogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-6 container">
          {featuredBlogs.slice(0, 6).map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      <PaginationBlogs
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={setPageNumber}
      />
    </div>
  );
}

