"use client";

import React, { useState, useEffect } from "react";
import { Add, Category2 } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BlogCategoriesTable from "@/template/Admin/blog/categories/BlogCategoriesTable";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { blogCategoryService } from "@/services/blog/blogCategoryService";

export default function BlogCategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const handleDelete = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategoryId) return;

    setDeleteLoading(true);
    try {
      const response = await blogCategoryService.delete(selectedCategoryId);
      if (response.success) {
        toast.success("دسته‌بندی با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedCategoryId(null);
        fetchCategories();
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف دسته‌بندی");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="دسته‌بندی‌های وبلاگ" subtitle="مدیریت دسته‌بندی‌های پست‌های وبلاگ" icon={Category2}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/admin/blog/categories/create")}>
          <Add size={20} className="ml-2" />
          دسته‌بندی جدید
        </Button>
      </AdminPageHeader>

      <AdminSectionCard title="لیست دسته‌بندی‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogCategoriesTable categories={displayedCategories} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-600 mt-4">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(categories.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </AdminSectionCard>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف دسته‌بندی"
        description="آیا از حذف این دسته‌بندی اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
