"use client";

import React, { useState, useEffect } from "react";
import ReviewsAndShare from "@/template/Blog/ReviewsAndShare";
import { blogService } from "@/services/blog/blogService";
import { blogCommentService } from "@/services/blog/blogCommentService";
import { Calendar2, Edit2, Heart, Share, Timer1 } from "iconsax-reactjs";
import { toast } from "sonner";

/**
 * Client Component برای بخش‌های تعاملی بلاگ
 * فقط نظرات و دکمه‌های تعاملی - محتوای اصلی در Server Component رندر می‌شود
 */
export default function BlogDetailClient({ blog }) {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [likeCount, setLikeCount] = useState(blog?.likeCount || 0);

  useEffect(() => {
    const fetchComments = async () => {
      if (!blog?.id) return;

      try {
        setCommentsLoading(true);
        const response = await blogCommentService.getApprovedByBlogId(blog.id);
        if (response.success && response.data) {
          setComments(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setCommentsLoading(false);
      }
    };

    fetchComments();
  }, [blog?.id]);

  const handleLike = async () => {
    if (!blog?.id) return;

    try {
      await blogService.incrementLikeCount(blog.id);
      setLikeCount((prev) => prev + 1);
      toast.success("لایک شد");
    } catch (error) {
      console.error("Error incrementing like:", error);
      toast.error("خطا در لایک کردن");
    }
  };

  const publishedDate = blog?.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("fa-IR")
    : blog?.createdAt
    ? new Date(blog.createdAt).toLocaleDateString("fa-IR")
    : "";

  return (
    <div className="container bg-white dark:bg-dark-bg p-4 py-8 lg:p-8" dir="rtl">
      {/* دکمه‌های تعاملی */}
      <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
        <div className="flex items-center gap-2">
          <Timer1 size={22} />
          <span>{blog?.viewCount || 0} بازدید</span>
        </div>
        <div className="flex items-center gap-2">
          <Edit2 size={22} />
          <span>{blog?.authorFullName || "نویسنده"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar2 size={22} />
          <span>{publishedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleLike}
            className="text-gray-500 hover:text-red-500 transition-colors"
          >
            <Heart size={28} />
          </button>
          <span className="text-xs">{likeCount}</span>
          <button className="text-primary-500 dark:text-dark-primary">
            <Share size={28} />
          </button>
        </div>
      </div>

      {/* نظرات - می‌تونه loading داشته باشه */}
      <ReviewsAndShare blog={blog} comments={comments} loading={commentsLoading} />
    </div>
  );
}

