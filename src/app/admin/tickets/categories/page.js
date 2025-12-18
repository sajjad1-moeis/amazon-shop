"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Add } from "iconsax-reactjs";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import TicketCategoriesTable from "@/template/Admin/tickets/categories/TicketCategoriesTable";
import CreateTicketCategoryModal from "@/template/Admin/tickets/categories/CreateTicketCategoryModal";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
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

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ticketCategoryService.getAll();
      if (response && response.success && response.data) {
        setCategories(Array.isArray(response.data) ? response.data : []);
      } else {
        toast.error(response?.message || "خطا در دریافت دسته‌بندی‌ها");
        setCategories([]);
      }
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
      const response = await ticketCategoryService.softDelete(selectedCategoryId);
      if (response && response.success) {
        toast.success("دسته‌بندی با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedCategoryId(null);
        fetchCategories();
      } else {
        toast.error(response?.message || "خطا در حذف دسته‌بندی");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error(error?.message || "خطا در حذف دسته‌بندی");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleToggleActive = async (category) => {
    try {
      const currentActive = category.isActive !== false;
      const response = await ticketCategoryService.update(category.id, {
        name: category.name,
        description: category.description || "",
        isActive: !currentActive,
      });
      if (response && response.success) {
        toast.success(`دسته‌بندی ${!currentActive ? "فعال" : "غیرفعال"} شد`);
        fetchCategories();
      } else {
        toast.error(response?.message || "خطا در به‌روزرسانی دسته‌بندی");
      }
    } catch (error) {
      console.error("Error toggling category:", error);
      toast.error(error?.message || "خطا در به‌روزرسانی دسته‌بندی");
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
      <div className="">
        <PageHeader
          title="دسته‌بندی‌های تیکت"
          buttonText="دسته‌بندی جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          onButtonClick={() => {
            setEditingCategory(null);
            setIsModalOpen(true);
          }}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <TicketCategoriesTable
              categories={displayedCategories}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleActive={handleToggleActive}
            />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(categories.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>

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
