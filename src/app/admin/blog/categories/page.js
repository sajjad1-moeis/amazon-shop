"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import BlogCategoriesTable from "@/template/Admin/blog/categories/BlogCategoriesTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { blogCategoryService } from "@/services/blog/blogCategoryService";

export default function BlogCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await blogCategoryService.getAll();

      if (response.success && response.data) {
        const formattedCategories = response.data.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          postsCount: cat.blogCount || 0,
          isActive: cat.isActive !== false,
        }));
        setCategories(formattedCategories);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت دسته‌بندی‌ها");
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCategories(categories.slice(startIndex, endIndex));
  }, [categories, pageNumber, pageSize]);

  const handleEdit = (categoryId) => {
    router.push(`/admin/blog/categories/edit/${categoryId}`);
  };

  const handleDelete = async (categoryId) => {
    if (!confirm("آیا از حذف این دسته‌بندی اطمینان دارید؟")) return;

    try {
      const response = await blogCategoryService.delete(categoryId);
      if (response.success) {
        toast.success("دسته‌بندی با موفقیت حذف شد");
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف دسته‌بندی");
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="دسته‌بندی‌های وبلاگ"
          buttonText="دسته‌بندی جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          onButtonClick={() => router.push("/admin/blog/categories/create")}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogCategoriesTable
              categories={displayedCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(categories.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
