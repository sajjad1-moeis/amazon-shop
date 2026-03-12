"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { FolderOpen } from "iconsax-reactjs";
import { blogCategoryService } from "@/services/blog/blogCategoryService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function EditCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setFetching(true);
        const response = await blogCategoryService.getById(categoryId);

        if (response.success && response.data) {
          const category = response.data;
          setFormData({
            name: category.name || "",
            slug: category.slug || "",
            isActive: category.isActive !== false,
          });
        }
      } catch (error) {
        toast.error(error.message || "خطا در دریافت اطلاعات دسته‌بندی");
        console.error("Error fetching category:", error);
      } finally {
        setFetching(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.name) {
      toast.error("لطفاً نام دسته‌بندی را وارد کنید");
      setLoading(false);
      return;
    }

    try {
      const categoryData = {
        name: formData.name,
        slug: formData.slug || undefined,
        isActive: formData.isActive,
      };

      const response = await blogCategoryService.update(categoryId, categoryData);

      if (response.success) {
        toast.success("دسته‌بندی با موفقیت به‌روزرسانی شد");
        router.push("/admin/blog/categories");
      } else {
        toast.error(response.message || "خطا در به‌روزرسانی دسته‌بندی");
      }
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی دسته‌بندی");
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="ویرایش دسته‌بندی" subtitle="در حال بارگذاری..." icon={FolderOpen} />
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3 rounded-xl border border-gray-600 bg-gray-700/30">
          <Spinner size="lg" />
          <span>در حال بارگذاری...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="ویرایش دسته‌بندی"
        subtitle="ویرایش دسته‌بندی بلاگ"
        icon={FolderOpen}
      />

      <AdminSectionCard title="اطلاعات دسته‌بندی">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام دسته‌بندی <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="نام دسته‌بندی را وارد کنید"
              className={FORM_STYLES.input}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug" className={FORM_STYLES.label}>
              Slug (اختیاری)
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="اگر خالی باشد، از نام ساخته می‌شود"
              className={FORM_STYLES.input}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500/30"
            />
            <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
              فعال
            </Label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی دسته‌بندی"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/blog/categories")}
              className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              انصراف
            </Button>
          </div>
        </form>
      </AdminSectionCard>
    </div>
  );
}
