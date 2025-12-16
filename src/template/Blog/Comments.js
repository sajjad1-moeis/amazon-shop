"use client";

import React, { useState } from "react";
import TitleCard from "@/components/TitleCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Like1 } from "iconsax-reactjs";
import { blogCommentService } from "@/services/blog/blogCommentService";
import { toast } from "sonner";

function Comments({ blog, comments = [], onCommentAdded }) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    authorName: "",
    authorEmail: "",
    content: "",
    parentCommentId: null,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!blog?.id) return;

    if (!formData.authorName || !formData.content) {
      toast.error("لطفاً نام و محتوای نظر را وارد کنید");
      return;
    }

    try {
      setSubmitting(true);
      const response = await blogCommentService.create({
        blogId: blog.id,
        authorName: formData.authorName,
        authorEmail: formData.authorEmail || undefined,
        content: formData.content,
        parentCommentId: formData.parentCommentId || undefined,
      });

      if (response.success) {
        toast.success("نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده می‌شود");
        setFormData({
          authorName: "",
          authorEmail: "",
          content: "",
          parentCommentId: null,
        });
        setShowForm(false);
        if (onCommentAdded) {
          onCommentAdded();
        }
      } else {
        toast.error(response.message || "خطا در ثبت نظر");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ثبت نظر");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = (commentId) => {
    setFormData((prev) => ({
      ...prev,
      parentCommentId: commentId,
    }));
    setShowForm(true);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("fa-IR");
  };

  const renderComment = (comment) => {
    return (
      <div
        key={comment.id}
        className="bg-gray-100 dark:bg-dark-box border border-gray-200 dark:border-dark-stroke p-3 rounded-2xl mb-4"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-dark-titre mb-1">
                {comment.authorName || comment.userFullName || "کاربر"}
              </h4>
            </div>
          </div>
          <div className="flex-between gap-2 text-gray-400 dark:text-dark-stroke">
            <Calendar size={16} variant="Bold" />
            <span className="text-xs rounded text-gray-600 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>
        </div>
        <p className="text-gray-700 dark:text-dark-text mb-3 text-right">{comment.content}</p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleReply(comment.id)}
            className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
          >
            پاسخ
          </button>
        </div>
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 pr-4 border-r-2 border-gray-300 dark:border-gray-600">
            {comment.replies.map((reply) => renderComment(reply))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="mt-32">
      <TitleCard title="دیدگاه کاربران" />

      <p className="text-gray-500 dark:text-gray-400 mt-8">
        نظر شما می‌تواند به بقیه کمک کند تا انتخاب بهتری داشته باشند. خوشحال می‌شویم اگر تجربه
        خود را با ما به اشتراک بگذارید.
      </p>

      <Button
        variant="outline"
        onClick={() => setShowForm(!showForm)}
        className="border-2 mt-4 border-primary-700 dark:border-dark-title text-primary-700 dark:text-dark-title px-10 rounded-lg mb-6 dark:bg-transparent"
      >
        {showForm ? "بستن فرم" : "ثبت دیدگاه"}
      </Button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4 bg-gray-100 dark:bg-dark-box p-4 rounded-lg">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="authorName" className="text-gray-700 dark:text-gray-300">
                نام *
              </Label>
              <Input
                id="authorName"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="authorEmail" className="text-gray-700 dark:text-gray-300">
                ایمیل
              </Label>
              <Input
                id="authorEmail"
                type="email"
                value={formData.authorEmail}
                onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                className="mt-1"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="content" className="text-gray-700 dark:text-gray-300">
              نظر شما *
            </Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="mt-1 min-h-[100px]"
              required
            />
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "در حال ارسال..." : "ارسال نظر"}
          </Button>
        </form>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center text-gray-400 py-8">هنوز نظری ثبت نشده است</div>
        ) : (
          comments.map((comment) => renderComment(comment))
        )}
      </div>
    </section>
  );
}

export default Comments;
