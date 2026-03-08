"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { MessageText } from "iconsax-reactjs";
import BlogCommentsTable from "@/template/Admin/blog/comments/BlogCommentsTable";
import BlogCommentsFilters from "@/template/Admin/blog/comments/BlogCommentsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { blogCommentService } from "@/services/blog/blogCommentService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

const PAGE_SIZE = 20;

export default function BlogCommentsPage() {
  const searchParams = useSearchParams();
  const searchParam = (searchParams.get("search") || "").trim().toLowerCase();
  const statusParam = searchParams.get("status") || "1";

  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const statusFilter = statusParam === "all" ? null : parseInt(statusParam, 10);
  const validStatus = [1, 2, 3, 4].includes(statusFilter) ? statusFilter : 1;

  const fetchComments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await blogCommentService.getByStatus(validStatus);
      if (response.success && response.data) {
        const list = Array.isArray(response.data) ? response.data : [];
        setAllComments(list);
      } else {
        setAllComments([]);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت نظرات");
      setAllComments([]);
    } finally {
      setLoading(false);
    }
  }, [validStatus]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  useEffect(() => {
    setPageNumber(1);
  }, [statusParam, searchParam]);

  const filteredComments = useMemo(() => {
    if (!searchParam) return allComments;
    return allComments.filter(
      (c) =>
        (c.authorName || "").toLowerCase().includes(searchParam) ||
        (c.content || "").toLowerCase().includes(searchParam) ||
        (c.blogTitle || "").toLowerCase().includes(searchParam)
    );
  }, [allComments, searchParam]);

  const totalPages = Math.max(1, Math.ceil(filteredComments.length / PAGE_SIZE));
  const startIndex = (pageNumber - 1) * PAGE_SIZE;
  const paginatedComments = filteredComments.slice(startIndex, startIndex + PAGE_SIZE);

  const handleApprove = async (commentId) => {
    try {
      const response = await blogCommentService.approve(commentId);
      if (response.success) {
        toast.success("نظر تأیید شد");
        fetchComments();
      } else {
        toast.error(response.message || "خطا در تأیید");
      }
    } catch (error) {
      toast.error(error.message || "خطا در تأیید نظر");
    }
  };

  const handleReject = async (commentId) => {
    try {
      const response = await blogCommentService.reject(commentId);
      if (response.success) {
        toast.success("نظر رد شد");
        fetchComments();
      } else {
        toast.error(response.message || "خطا در رد");
      }
    } catch (error) {
      toast.error(error.message || "خطا در رد نظر");
    }
  };

  const handleDelete = (commentId) => {
    setSelectedCommentId(commentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCommentId) return;
    setDeleteLoading(true);
    try {
      const response = await blogCommentService.softDelete(selectedCommentId);
      if (response.success) {
        toast.success("نظر حذف شد");
        setDeleteDialogOpen(false);
        setSelectedCommentId(null);
        fetchComments();
      } else {
        toast.error(response.message || "خطا در حذف");
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف نظر");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="مدیریت نظرات وبلاگ"
        subtitle="تأیید، رد و مدیریت نظرات پست‌های وبلاگ"
        icon={MessageText}
      >
        <BlogCommentsFilters />
      </AdminPageHeader>

      <AdminSectionCard title="لیست نظرات">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3">
            <Spinner size="lg" />
            <span>در حال بارگذاری نظرات...</span>
          </div>
        ) : (
          <>
            <BlogCommentsTable
              comments={paginatedComments}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
            {totalPages > 1 && (
              <div className="pt-4 mt-4 border-t border-gray-600">
                <AdminPagination
                  currentPage={pageNumber}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </AdminSectionCard>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف نظر"
        description="آیا از حذف این نظر اطمینان دارید؟"
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
