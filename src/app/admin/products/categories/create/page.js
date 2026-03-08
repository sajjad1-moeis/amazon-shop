"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Category2 } from "iconsax-reactjs";
import { productCategoryService } from "@/services/product/productCategoryService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function CreateProductCategoryPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    key: "",
    slug: "",
    parentId: "",
    imageUrl: "",
    iconUrl: "",
    isActive: true,
  });

  useEffect(() => {
    productCategoryService.getAll().then((res) => {
      if (res?.success && Array.isArray(res.data)) {
        setParentCategories(res.data);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      toast.error("لطفاً نام دسته‌بندی را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug?.trim() || undefined,
        isActive: formData.isActive,
      };
      if (formData.key?.trim()) payload.key = formData.key.trim();
      if (formData.parentId && formData.parentId !== "none") {
        const id = parseInt(formData.parentId, 10);
        if (!Number.isNaN(id)) payload.parentCategoryId = id;
      }
      if (formData.imageUrl?.trim()) payload.imageUrl = formData.imageUrl.trim();
      if (formData.iconUrl?.trim()) payload.iconUrl = formData.iconUrl.trim();
      const response = await productCategoryService.create(payload);
      if (response.success) {
        toast.success("دسته‌بندی با موفقیت ایجاد شد");
        router.push("/admin/products/categories");
      } else {
        toast.error(response.message || "خطا در ایجاد دسته‌بندی");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ایجاد دسته‌بندی");
      console.error("Error creating product category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="دسته‌بندی جدید"
        subtitle="ایجاد دسته‌بندی جدید برای محصولات"
        icon={Category2}
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
            <Label htmlFor="key" className={FORM_STYLES.label}>
              Key (برای جستجوی راحت)
            </Label>
            <Input
              id="key"
              name="key"
              value={formData.key}
              onChange={handleChange}
              placeholder="مثال: electronics-mobile"
              className={FORM_STYLES.input}
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

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className={FORM_STYLES.label}>
              آدرس تصویر (عکس دسته‌بندی)
            </Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={FORM_STYLES.input}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="iconUrl" className={FORM_STYLES.label}>
              آدرس آیکون
            </Label>
            <Input
              id="iconUrl"
              name="iconUrl"
              type="url"
              value={formData.iconUrl}
              onChange={handleChange}
              placeholder="https://..."
              className={FORM_STYLES.input}
            />
          </div>

          <div className="space-y-2">
            <Label className={FORM_STYLES.label}>دسته والد</Label>
            <Select
              value={formData.parentId || "none"}
              onValueChange={(v) => handleSelectChange("parentId", v)}
            >
              <SelectTrigger className={FORM_STYLES.selectTrigger}>
                <SelectValue placeholder="بدون والد (سطح اول)" />
              </SelectTrigger>
              <SelectContent className={FORM_STYLES.selectContent}>
                <SelectItem value="none" className={FORM_STYLES.selectItem}>
                  بدون والد (سطح اول)
                </SelectItem>
                {parentCategories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)} className={FORM_STYLES.selectItem}>
                    {cat.name || `دسته ${cat.id}`}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-amber-500 focus:ring-amber-500/50"
            />
            <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
              فعال
            </Label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white min-w-[160px]"
            >
              {loading ? "در حال ثبت..." : "ثبت دسته‌بندی"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products/categories")}
              className={FORM_STYLES.button}
            >
              انصراف
            </Button>
          </div>
        </form>
      </AdminSectionCard>
    </div>
  );
}
