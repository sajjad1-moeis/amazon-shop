"use client";

import React, { useState, useEffect } from "react";
import { Add } from "iconsax-reactjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PageHeader from "@/template/Admin/PageHeader";
import BlogTagsTable from "@/template/Admin/blog/tags/BlogTagsTable";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
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
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="مدیریت تگ‌های بلاگ"
          buttonText="تگ جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          onButtonClick={() => router.push("/admin/blog/tags/create")}
        />

        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogTagsTable tags={displayedTags} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="mt-6 pt-6 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(tags.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>

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
