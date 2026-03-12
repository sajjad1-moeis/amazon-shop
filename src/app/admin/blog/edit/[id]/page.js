"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { blogService } from "@/services/blog/blogService";
import { unwrapApiData } from "@/services/api/client";
import { useBlogForm } from "@/hooks/useBlogForm";
import BlogForm from "@/template/Admin/blog/form/BlogForm";
import PageHeader from "@/template/Admin/blog/form/PageHeader";
import { Spinner } from "@/components/ui/spinner";
import { handleBlogSubmit } from "@/utils/blogSubmitHandler";

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();
  const blogId = params.id;
  const {
    formData,
    setFormData,
    categories,
    tags,
    loading,
    setLoading,
    fetching,
    setFetching,
    handleChange,
    handleFileChange,
    handleSelectChange,
    handleTagToggle,
    setFormDataFromBlog,
  } = useBlogForm();

  useEffect(() => {
    if (!blogId) return;

    const fetchData = async () => {
      try {
        setFetching(true);
        const blogRes = await blogService.getById(blogId);
        const blog = unwrapApiData(blogRes);

        if (blog) {
          setFormDataFromBlog(blog);
        }
      } catch (error) {
        toast.error(error.message || "خطا در دریافت اطلاعات بلاگ");
        console.error("Error fetching data:", error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, [blogId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await handleBlogSubmit({
      formData,
      blogId,
      featuredImage: formData.featuredImage,
      isEdit: true,
      onSuccess: () => router.push("/admin/blog/list"),
    });

    setLoading(false);
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center p-8">
          <Spinner size="lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      <PageHeader title="ویرایش پست" description="ویرایش پست بلاگ" />

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
        isEdit={true}
        backHref="/admin/blog/list"
        backLabel="بازگشت به لیست"
      />
    </div>
  );
}
