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
    isActive: true,
  });
  const [imageFile, setImageFile] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const imageInputRef = React.useRef(null);
  const iconInputRef = React.useRef(null);

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
      const parentId =
        formData.parentId && formData.parentId !== "none"
          ? parseInt(formData.parentId, 10)
          : null;
      const hasFiles = imageFile instanceof File || iconFile instanceof File;
      let response;
      if (hasFiles) {
        response = await productCategoryService.createWithFormData({
          name: formData.name.trim(),
          slug: formData.slug?.trim() || undefined,
          key: formData.key?.trim() || undefined,
          parentCategoryId: !Number.isNaN(parentId) ? parentId : undefined,
          isActive: formData.isActive,
          imageFile: imageFile instanceof File ? imageFile : undefined,
          iconFile: iconFile instanceof File ? iconFile : undefined,
        });
      } else {
        const payload = {
          name: formData.name.trim(),
          slug: formData.slug?.trim() || undefined,
          isActive: formData.isActive,
        };
        if (formData.key?.trim()) payload.key = formData.key.trim();
        if (!Number.isNaN(parentId) && parentId != null) payload.parentCategoryId = parentId;
        response = await productCategoryService.create(payload);
      }
      const success = response?.success !== false && (response?.data != null || response?.id != null);
      if (success) {
        toast.success("دسته‌بندی با موفقیت ایجاد شد");
        router.push("/admin/products/categories");
      } else {
        toast.error(response?.message || "خطا در ایجاد دسته‌بندی");
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
            <Label htmlFor="category-image" className={FORM_STYLES.label}>
              تصویر دسته‌بندی (اختیاری)
            </Label>
            <input
              ref={imageInputRef}
              type="file"
              accept="image/*"
              id="category-image"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="category-image"
              className={`block w-full ${FORM_STYLES.input} cursor-pointer flex items-center justify-between px-4`}
            >
              <span className="text-gray-400">
                {imageFile ? imageFile.name : "انتخاب فایل تصویر"}
              </span>
            </label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category-icon" className={FORM_STYLES.label}>
              آیکون دسته‌بندی (اختیاری)
            </Label>
            <input
              ref={iconInputRef}
              type="file"
              accept="image/*"
              id="category-icon"
              onChange={(e) => setIconFile(e.target.files?.[0] || null)}
              className="hidden"
            />
            <label
              htmlFor="category-icon"
              className={`block w-full ${FORM_STYLES.input} cursor-pointer flex items-center justify-between px-4`}
            >
              <span className="text-gray-400">
                {iconFile ? iconFile.name : "انتخاب فایل آیکون"}
              </span>
            </label>
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

          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ثبت..." : "ثبت دسته‌بندی"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/products/categories")}
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
