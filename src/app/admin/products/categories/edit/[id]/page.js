"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Category2, ArrowRight } from "iconsax-reactjs";
import { productCategoryService } from "@/services/product/productCategoryService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function EditProductCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params?.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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
  const imageInputRef = useRef(null);
  const iconInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!categoryId) return;
      try {
        setFetching(true);
        const [categoryRes, allRes] = await Promise.all([
          productCategoryService.getById(categoryId),
          productCategoryService.getAll(),
        ]);
        const category = categoryRes?.data ?? categoryRes;
        if (category) {
          setFormData({
            name: category.name || "",
            key: category.key ?? category.keyName ?? "",
            slug: category.slug || "",
            parentId:
              category.parentCategoryId != null || category.parentId != null
                ? String(category.parentCategoryId ?? category.parentId)
                : "none",
            isActive: category.isActive !== false,
          });
        } else {
          toast.error("دسته‌بندی یافت نشد");
        }
        if (allRes?.success && Array.isArray(allRes.data)) {
          setParentCategories(allRes.data);
        }
      } catch (error) {
        toast.error(error?.message || "خطا در دریافت اطلاعات دسته‌بندی");
        console.error("Error fetching category:", error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [categoryId]);

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
      const payload = {
        name: formData.name.trim(),
        slug: formData.slug?.trim() || undefined,
        key: formData.key?.trim() || undefined,
        parentCategoryId: !Number.isNaN(parentId) && parentId != null ? parentId : undefined,
        isActive: formData.isActive,
      };
      const hasFiles = imageFile instanceof File || iconFile instanceof File;
      if (hasFiles) {
        await productCategoryService.updateWithFormData(categoryId, {
          name: payload.name,
          slug: payload.slug,
          key: payload.key,
          parentCategoryId: payload.parentCategoryId,
          isActive: payload.isActive,
          imageFile: imageFile instanceof File ? imageFile : undefined,
          iconFile: iconFile instanceof File ? iconFile : undefined,
        });
      } else {
        const response = await productCategoryService.update(categoryId, payload);
        if (response?.success === false) {
          toast.error(response?.message || "خطا در به‌روزرسانی دسته‌بندی");
          setLoading(false);
          return;
        }
      }
      toast.success("دسته‌بندی با موفقیت به‌روزرسانی شد");
      router.push("/admin/products/categories");
    } catch (error) {
      toast.error(error?.message || "خطا در به‌روزرسانی دسته‌بندی");
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const parentOptions = parentCategories.filter((cat) => String(cat.id) !== String(categoryId));

  if (fetching) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <AdminPageHeader title="ویرایش دسته‌بندی" subtitle="در حال بارگذاری..." icon={Category2} />
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3 rounded-2xl border border-gray-700/60 bg-gray-800/40">
          <Spinner size="lg" />
          <span>در حال بارگذاری اطلاعات دسته‌بندی...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AdminPageHeader
        title="ویرایش دسته‌بندی"
        subtitle="تغییر اطلاعات دسته‌بندی محصولات"
        icon={Category2}
        actions={
          <Link
            href="/admin/products/categories"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowRight size={16} />
            <span className="max-md:hidden">بازگشت به لیست</span>
          </Link>
        }
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
              تصویر دسته‌بندی (اختیاری — انتخاب فایل جدید برای جایگزینی)
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
              آیکون دسته‌بندی (اختیاری — انتخاب فایل جدید برای جایگزینی)
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
                {parentOptions.map((cat) => (
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
              className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-emerald-500 focus:ring-emerald-500/30"
            />
            <Label htmlFor="isActive" className={`${FORM_STYLES.label} cursor-pointer`}>
              فعال
            </Label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-700/60">
            <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.push("/admin/products/categories")}
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
