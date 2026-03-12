"use client";

import React, { useState, useEffect } from "react";
import { Add, Document } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import BlogTagsTable from "@/template/Admin/blog/tags/BlogTagsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { blogTagService } from "@/services/blog/blogTagService";

export default function BlogTagsPage() {
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [displayedTags, setDisplayedTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchTags = async () => {
    try {
      setLoading(true);
      const response = await blogTagService.getAll();

      if (response.success && response.data) {
        setTags(response.data || []);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت تگ‌ها");
      console.error("Error fetching tags:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setDisplayedTags(tags.slice(startIndex, endIndex));
  }, [tags, pageNumber, pageSize]);

  const handleEdit = (tagId) => {
    router.push(`/admin/blog/tags/edit/${tagId}`);
  };

  const handleDelete = (tagId) => {
    setSelectedTagId(tagId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTagId) return;

    setDeleteLoading(true);
    try {
      const response = await blogTagService.delete(selectedTagId);
      if (response.success) {
        toast.success("تگ با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedTagId(null);
        fetchTags();
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف تگ");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader title="تگ‌های وبلاگ" subtitle="مدیریت تگ‌های پست‌های وبلاگ" icon={Document}>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => router.push("/admin/blog/tags/create")}>
          <Add size={20} className="ml-2" />
          تگ جدید
        </Button>
      </AdminPageHeader>

      <AdminSectionCard title="لیست تگ‌ها">
        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogTagsTable tags={displayedTags} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-600 mt-4">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(tags.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </AdminSectionCard>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف تگ"
        description="آیا از حذف این تگ اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
