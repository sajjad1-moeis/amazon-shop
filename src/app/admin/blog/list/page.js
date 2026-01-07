"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import BlogTable from "@/template/Admin/blog/list/BlogTable";
import BlogFilters from "@/template/Admin/blog/list/BlogFilters";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { blogService } from "@/services/blog/blogService";

export default function BlogListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchParam = searchParams.get("search");
  const searchTerm = searchParam || "";
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getPaginated({
        pageNumber,
        pageSize,
        searchTerm: searchTerm || undefined,
      });

      if (response.success && response.data) {
        const formattedPosts = response.data.blogs.map((blog) => ({
          id: blog.id,
          title: blog.title,
          category: blog.categoryName || "-",
          author: blog.authorFullName || "-",
          views: blog.viewCount || 0,
          status: blog.status === 2 ? "published" : blog.status === 1 ? "draft" : "archived",
          slug: blog.slug,
          featuredImageUrl: blog.featuredImageUrl,
          date: blog.publishedAt
            ? new Date(blog.publishedAt).toLocaleDateString("fa-IR")
            : blog.createdAt
            ? new Date(blog.createdAt).toLocaleDateString("fa-IR")
            : "-",
        }));
        setPosts(formattedPosts);
        setTotalPages(response.data.totalPages || 1);
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت بلاگ‌ها");
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setPageNumber(1);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchBlogs();
  }, [pageNumber, searchParams]);

  const handleEdit = (postId) => {
    router.push(`/admin/blog/edit/${postId}`);
  };

  const handleDelete = (postId) => {
    setSelectedPostId(postId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPostId) return;

    setDeleteLoading(true);
    try {
      const response = await blogService.softDelete(selectedPostId);
      if (response.success) {
        toast.success("بلاگ با موفقیت حذف شد");
        setDeleteDialogOpen(false);
        setSelectedPostId(null);
        fetchBlogs();
      }
    } catch (error) {
      toast.error(error.message || "خطا در حذف بلاگ");
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <div className="">
        <div className="mb-5">
          <h1 className="text-lg md:text-xl text-gray-100 mb-4">وبلاگ ها</h1>
          <BlogFilters />
        </div>

        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="pt-4 border-t border-gray-700">
              <AdminPagination currentPage={pageNumber} totalPages={totalPages} onPageChange={setPageNumber} />
            </div>
          </>
        )}
      </div>

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف بلاگ"
        description="آیا از حذف این بلاگ اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        loading={deleteLoading}
      />
    </div>
  );
}
