"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import IndexLayout from "@/layout/IndexLayout";
import GuideArticle from "@/template/Blog/GuideArticle";
import ReviewsAndShare from "@/template/Blog/ReviewsAndShare";
import { blogService } from "@/services/blog/blogService";
import { blogCommentService } from "@/services/blog/blogCommentService";

export default function BlogDetailPage() {
  const params = useParams();
  const blogId = params.blogId;
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await blogService.getBySlug(blogId);

        if (response.success && response.data) {
          setBlog(response.data);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    if (blogId) {
      fetchBlog();
    }
  }, [blogId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!blog?.id) return;

      try {
        const response = await blogCommentService.getApprovedByBlogId(blog.id);
        if (response.success && response.data) {
          setComments(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [blog?.id]);

  const handleLike = async () => {
    if (!blog?.id) return;

    try {
      await blogService.incrementLikeCount(blog.id);
      setBlog((prev) => ({
        ...prev,
        likeCount: (prev.likeCount || 0) + 1,
      }));
    } catch (error) {
      console.error("Error incrementing like:", error);
    }
  };

  if (loading) {
    return (
      <IndexLayout>
        <div className="container p-8 text-center text-gray-400">در حال بارگذاری...</div>
      </IndexLayout>
    );
  }

  if (!blog) {
    return (
      <IndexLayout>
        <div className="container p-8 text-center text-gray-400">بلاگ یافت نشد</div>
      </IndexLayout>
    );
  }

  return (
    <IndexLayout>
      <GuideArticle blog={blog} onLike={handleLike} />
      <ReviewsAndShare blog={blog} comments={comments} />
    </IndexLayout>
  );
}
