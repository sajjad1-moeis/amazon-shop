"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Add, MessageQuestion } from "iconsax-reactjs";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import TicketCategoriesTable from "@/template/Admin/tickets/categories/TicketCategoriesTable";
import CreateTicketCategoryModal from "@/template/Admin/tickets/categories/CreateTicketCategoryModal";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { ticketCategoryService } from "@/services/ticket/ticketCategoryService";

export default function TicketCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [displayedCategories, setDisplayedCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoadingId, setToggleLoadingId] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ticketCategoryService.getAll();
      const list = Array.isArray(data) ? data : Array.isArray(data?.categories) ? data.categories : [];
      setCategories(list);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error(error?.message || "خطا در دریافت دسته‌بندی‌ها");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedCategories(categories.slice(startIndex, endIndex));
  }, [categories, pageNumber, pageSize]);

  useEffect(() => {
    const maxPage = Math.max(1, Math.ceil(categories.length / pageSize));
    if (pageNumber > maxPage) {
      setPageNumber(maxPage);
    }
  }, [categories.length, pageNumber, pageSize]);

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategoryId) return;

    setDeleteLoading(true);
    try {
      await ticketCategoryService.softDelete(selectedCategoryId);
      toast.success("دسته‌بندی با موفقیت حذف شد");
      setDeleteDialogOpen(false);
      setSelectedCategoryId(null);
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error?.message || "خطا در حذف دسته‌بندی");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleActive = async (category) => {
    try {
      setToggleLoadingId(category.id);
      const currentActive = category.isActive !== false;
      await ticketCategoryService.update(category.id, {
        name: category.name,
        description: category.description || "",
        isActive: !currentActive,
      });
      toast.success(`دسته‌بندی ${!currentActive ? "فعال" : "غیرفعال"} شد`);
      await fetchCategories();
    } catch (error) {
      console.error("Error toggling category:", error);
      toast.error(error?.message || "خطا در به‌روزرسانی دسته‌بندی");
    } finally {
      setToggleLoadingId(null);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleModalSuccess = () => {
    fetchCategories();
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="دسته‌بندی‌های تیکت"
        subtitle="مدیریت دسته‌بندی‌های تیکت پشتیبانی"
        icon={MessageQuestion}
        actions={
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
          >
            <Add size={20} className="ml-2" />
            <span className="max-md:hidden">دسته‌بندی جدید</span>
          </Button>
        }
      />

      <AdminSectionCard title="لیست دسته‌بندی‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <TicketCategoriesTable
              categories={displayedCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
              toggleLoadingId={toggleLoadingId}
            />
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

      <CreateTicketCategoryModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleModalSuccess}
        editingCategory={editingCategory}
      />

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
