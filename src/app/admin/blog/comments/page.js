"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import BlogCommentsTable from "@/template/Admin/blog/comments/BlogCommentsTable";
import BlogCommentsFilters from "@/template/Admin/blog/comments/BlogCommentsFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { blogCommentService } from "@/services/blog/blogCommentService";

export default function BlogCommentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [comments, setComments] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";
  const [statusFilter, setStatusFilter] = useState("1");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await blogCommentService.getByStatus(parseInt(statusFilter));

      if (response.success && response.data) {
        const filtered = searchTerm
          ? response.data.filter(
              (comment) =>
                comment.authorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                comment.blogTitle?.toLowerCase().includes(searchTerm.toLowerCase())
            )
          : response.data;

        setAllComments(filtered);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت نظرات");
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
    setPageNumber(1);
  }, [statusFilter]);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search !== null) {
      const timeoutId = setTimeout(() => {
        fetchComments();
        setPageNumber(1);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      fetchComments();
      setPageNumber(1);
    }
  }, [searchParams]);

  useEffect(() => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    setComments(allComments.slice(startIndex, endIndex));
  }, [allComments, pageNumber, pageSize]);

  const handleApprove = async (commentId) => {
    try {
      const response = await blogCommentService.approve(commentId);
      if (response.success) {
        toast.success("نظر با موفقیت تایید شد");
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message || "خطا در تایید نظر");
    }
  };

  const handleReject = async (commentId) => {
    try {
      const response = await blogCommentService.reject(commentId);
      if (response.success) {
        toast.success("نظر با موفقیت رد شد");
        fetchComments();
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
        toast.success("نظر با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedCommentId(null);
        fetchComments();
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف نظر");
    } finally {
      setDeleteLoading(false);
    }
  };

  const statusOptions = [
    { value: "1", label: "در انتظار تایید" },
    { value: "2", label: "تایید شده" },
    { value: "3", label: "رد شده" },
    { value: "4", label: "اسپم" },
  ];

  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
          <h1 className="text-lg md:text-xl text-gray-100">مدیریت نظرات بلاگ</h1>
          <div className="flex items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg px-4 py-2"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="mb-5">
              <BlogCommentsFilters />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogCommentsTable
              comments={comments}
              onApprove={handleApprove}
              onReject={handleReject}
              onDelete={handleDelete}
            />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination
                currentPage={pageNumber}
                totalPages={Math.ceil(allComments.length / pageSize) || 1}
                onPageChange={setPageNumber}
              />
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف نظر"
        description="آیا از حذف این نظر اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
