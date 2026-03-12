"use client";

import React, { useState, useEffect } from "react";
import { Add, Category2, SearchNormal1 } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CategoriesTable from "@/template/Admin/products/categories/CategoriesTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { productCategoryService } from "@/services/product/productCategoryService";

export default function CategoriesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await productCategoryService.getAll();

      if (response.success && response.data) {
        setCategories(response.data || []);
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
    let filtered = categories;
    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      filtered = categories.filter(
        (cat) =>
          (cat.name && cat.name.toLowerCase().includes(term)) ||
          (cat.key && cat.key.toLowerCase().includes(term)) ||
          (cat.keyName && cat.keyName.toLowerCase().includes(term)) ||
          (cat.slug && cat.slug.toLowerCase().includes(term))
      );
    }
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCategories(filtered.slice(startIndex, endIndex));
  }, [categories, searchTerm, pageNumber, pageSize]);

  const handleEdit = (categoryId) => {
    router.push(`/admin/products/categories/edit/${categoryId}`);
  };

  const handleDelete = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategoryId) return;

    setDeleteLoading(true);
    try {
      const response = await productCategoryService.softDelete(selectedCategoryId);
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
      <AdminPageHeader title="دسته‌بندی‌ها" subtitle="مدیریت دسته‌بندی‌های محصولات" icon={Category2}>
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/products/categories/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Add size={20} className="ml-2" />
              <span className="max-md:hidden">دسته‌بندی جدید</span>
            </Button>
          </Link>
          <div className="relative flex-1 min-w-[180px] max-w-[260px]">
            <SearchNormal1 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            <Input
              type="text"
              placeholder="جستجو نام، Key یا Slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-gray-700 border-gray-600 text-white h-10 pl-3 pr-10"
            />
          </div>
        </div>
      </AdminPageHeader>

      <AdminSectionCard title="لیست دسته‌بندی‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-400">دسته‌بندی‌ای یافت نشد</div>
        ) : (
          <>
            <CategoriesTable categories={displayedCategories} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-700/60 mt-4">
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
