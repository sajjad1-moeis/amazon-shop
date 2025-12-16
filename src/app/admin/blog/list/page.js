"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PageHeaderWithSearch from "@/template/Admin/PageHeaderWithSearch";
import BlogTable from "@/template/Admin/blog/list/BlogTable";
import AdminPagination from "@/components/ui/AdminPagination";
import ConfirmDialog from "@/components/ConfirmDialog";
import { blogService } from "@/services/blog/blogService";

export default function BlogListPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
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
    if (searchTerm) {
      setPageNumber(1);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBlogs();
  }, [pageNumber, searchTerm]);

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
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeaderWithSearch title="وبلاگ ها" searchPlaceholder="جستجو نام" onSearchChange={setSearchTerm} />

        {loading ? (
          <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
        ) : (
          <>
            <BlogTable posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
            <div className="mt-6 pt-6 border-t border-gray-700">
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
