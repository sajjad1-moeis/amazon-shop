"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { MessageText } from "iconsax-reactjs";
import BlogCommentsTable from "@/template/Admin/blog/comments/BlogCommentsTable";
import BlogCommentsFilters from "@/template/Admin/blog/comments/BlogCommentsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Spinner } from "@/components/ui/spinner";
import { blogCommentService } from "@/services/blog/blogCommentService";
import { unwrapApiData } from "@/services/api/client";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";

const PAGE_SIZE = 20;

export default function BlogCommentsPage() {
  const searchParams = useSearchParams();
  const searchTerm = (searchParams.get("search") || "").trim();
  const statusParam = searchParams.get("status") || "1";

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const statusFilter = statusParam === "all" ? undefined : parseInt(statusParam, 10);
  const validStatus = [1, 2, 3].includes(statusFilter) ? statusFilter : 1;

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await blogCommentService.getPaginated({
        pageNumber,
        pageSize: PAGE_SIZE,
        status: validStatus,
        searchTerm: searchTerm || undefined,
      });
      const data = unwrapApiData(response);
      setComments(Array.isArray(data?.comments) ? data.comments : []);
      setTotalPages(Math.max(1, data?.totalPages ?? 1));
    } catch (error) {
      toast.error(error?.message || "خطا در دریافت نظرات");
      setComments([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setPageNumber(1);
  }, [statusParam, searchTerm]);

  useEffect(() => {
    fetchComments();
  }, [pageNumber, statusParam, searchTerm]);

  const handleApprove = async (commentId) => {
    try {
      const res = await blogCommentService.approve(commentId);
      unwrapApiData(res);
      toast.success("نظر تأیید شد");
      fetchComments();
    } catch (error) {
      toast.error(error?.message || "خطا در تأیید نظر");
    }
  };

  const handleReject = async (commentId) => {
    try {
      const res = await blogCommentService.reject(commentId);
      unwrapApiData(res);
      toast.success("نظر رد شد");
      fetchComments();
    } catch (error) {
      toast.error(error?.message || "خطا در رد نظر");
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
      const res = await blogCommentService.softDelete(selectedCommentId);
      unwrapApiData(res);
      toast.success("نظر حذف شد");
      setDeleteDialogOpen(false);
      setSelectedCommentId(null);
      fetchComments();
    } catch (error) {
      toast.error(error?.message || "خطا در حذف نظر");
    } finally {
      setDeleteLoading(false);
    }
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
              comments={comments}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
            {!loading && (
              <div className="pt-4 mt-4 border-t border-gray-600">
                <AdminPagination
                  currentPage={pageNumber}
                  totalPages={totalPages}
                  onPageChange={setPageNumber}
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
