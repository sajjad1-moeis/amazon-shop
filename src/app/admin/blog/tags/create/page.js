"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Document } from "iconsax-reactjs";
import { blogTagService } from "@/services/blog/blogTagService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function CreateTagPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      toast.error("لطفاً نام تگ را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const response = await blogTagService.create({
        name: formData.name.trim(),
        slug: formData.slug?.trim() || undefined,
      });
      if (response.success) {
        toast.success("تگ با موفقیت ایجاد شد");
        router.push("/admin/blog/tags");
      } else {
        toast.error(response.message || "خطا در ایجاد تگ");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ایجاد تگ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="تگ جدید"
        subtitle="ایجاد تگ جدید برای پست‌های وبلاگ"
        icon={Document}
      />

      <AdminSectionCard title="اطلاعات تگ">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام تگ <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="نام تگ را وارد کنید"
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
              placeholder="خالی = ساخته‌شده از نام"
              className={FORM_STYLES.input}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ثبت..." : "ثبت تگ"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/blog/tags")}
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
