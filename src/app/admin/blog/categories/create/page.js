"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { blogCategoryService } from "@/services/blog/blogCategoryService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function CreateCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

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

      const response = await blogCategoryService.create(categoryData);

      if (response.success) {
        toast.success("دسته‌بندی با موفقیت ایجاد شد");
        router.push("/admin/blog/categories");
      } else {
        toast.error(response.message || "خطا در ایجاد دسته‌بندی");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ایجاد دسته‌بندی");
      console.error("Error creating category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="دسته‌بندی جدید"
        subtitle="ایجاد دسته‌بندی جدید برای بلاگ"
      />

      <AdminSectionCard title="اطلاعات دسته‌بندی">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام دسته‌بندی <span className="text-red-400/90">*</span>
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

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ثبت..." : "ثبت دسته‌بندی"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/blog/categories")}
              className="h-11 px-5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50"
            >
              انصراف
            </Button>
          </div>
        </form>
      </AdminSectionCard>
    </div>
  );
}





