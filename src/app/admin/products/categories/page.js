"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import CategoriesTable from "@/template/Admin/products/categories/CategoriesTable";
import AdminPagination from "@/components/ui/AdminPagination";
import { Spinner } from "@/components/ui/spinner";
import ConfirmDialog from "@/components/ConfirmDialog";
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
    if (searchTerm) {
      filtered = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="دسته‌بندی‌ها"
          buttonText="دسته‌بندی جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          buttonHref="/admin/products/categories/create"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">
            <Spinner size="lg" />
          </div>
        ) : (
          <>
            <CategoriesTable categories={displayedCategories} onEdit={handleEdit} onDelete={handleDelete} />
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
