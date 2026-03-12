"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Document } from "iconsax-reactjs";
import { blogTagService } from "@/services/blog/blogTagService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function EditTagPage() {
  const params = useParams();
  const router = useRouter();
  const tagId = params?.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  useEffect(() => {
    const fetchTag = async () => {
      if (!tagId) return;
      try {
        setFetching(true);
        const response = await blogTagService.getById(tagId);
        if (response.success && response.data) {
          const tag = response.data;
          setFormData({
            name: tag.name || "",
            slug: tag.slug || "",
          });
        }
      } catch (error) {
        toast.error(error.message || "خطا در دریافت اطلاعات تگ");
      } finally {
        setFetching(false);
      }
    };
    fetchTag();
  }, [tagId]);

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
      const response = await blogTagService.update(tagId, {
        name: formData.name.trim(),
        slug: formData.slug?.trim() || undefined,
      });
      if (response.success) {
        toast.success("تگ با موفقیت به‌روزرسانی شد");
        router.push("/admin/blog/tags");
      } else {
        toast.error(response.message || "خطا در به‌روزرسانی تگ");
      }
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی تگ");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="ویرایش تگ" subtitle="در حال بارگذاری..." icon={Document} />
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3 rounded-xl border border-gray-600 bg-gray-700/30">
          <Spinner size="lg" />
          <span>در حال بارگذاری اطلاعات تگ...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="ویرایش تگ"
        subtitle="تغییر نام و slug تگ وبلاگ"
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

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/blog/tags")}
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
