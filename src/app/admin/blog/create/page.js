"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useBlogForm } from "@/hooks/useBlogForm";
import BlogForm from "@/template/Admin/blog/form/BlogForm";
import PageHeader from "@/template/Admin/blog/form/PageHeader";
import { handleBlogSubmit } from "@/utils/blogSubmitHandler";

export default function CreateBlogPage() {
  const router = useRouter();
  const {
    formData,
    setFormData,
    categories,
    tags,
    loading,
    setLoading,
    handleChange,
    handleFileChange,
    handleSelectChange,
    handleTagToggle,
  } = useBlogForm();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await handleBlogSubmit({
      formData,
      featuredImage: formData.featuredImage,
      isEdit: false,
      onSuccess: () => router.push("/admin/blog/list"),
    });

    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <PageHeader title="پست جدید" description="ایجاد پست جدید برای وبلاگ" />

      <BlogForm
        formData={formData}
        categories={categories}
        tags={tags}
        loading={loading}
        onSubmit={handleSubmit}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onContentChange={(name, content) => setFormData((prev) => ({ ...prev, [name]: content }))}
        onTagToggle={handleTagToggle}
        onFileChange={handleFileChange}
        isEdit={false}
        backHref="/admin/blog/list"
        backLabel="بازگشت به لیست"
      />
    </div>
  );
}
