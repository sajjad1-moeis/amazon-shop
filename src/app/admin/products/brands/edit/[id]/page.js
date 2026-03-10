"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shop } from "iconsax-reactjs";
import { productBrandService } from "@/services/product/productBrandService";
import { AdminPageHeader, AdminSectionCard } from "@/components/admin";
import { Spinner } from "@/components/ui/spinner";
import { FORM_STYLES } from "@/template/Admin/formStyles";

export default function EditBrandPage() {
  const params = useParams();
  const router = useRouter();
  const brandId = params?.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    isActive: true,
  });

  useEffect(() => {
    const fetchBrand = async () => {
      if (!brandId) return;
      try {
        setFetching(true);
        const response = await productBrandService.getById(brandId);
        const brand = response?.data ?? response;
        if (brand) {
          setFormData({
            name: brand.name || "",
            slug: brand.slug || "",
            isActive: brand.isActive ?? true,
          });
        } else {
          toast.error("برند یافت نشد");
        }
      } catch (error) {
        toast.error(error.message || "خطا در دریافت اطلاعات برند");
      } finally {
        setFetching(false);
      }
    };
    fetchBrand();
  }, [brandId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name?.trim()) {
      toast.error("لطفاً نام برند را وارد کنید");
      return;
    }
    setLoading(true);
    try {
      const response = await productBrandService.update(brandId, {
        name: formData.name.trim(),
        slug: formData.slug?.trim() || undefined,
        isActive: formData.isActive,
      });
      if (response?.success !== false) {
        toast.success("برند با موفقیت به‌روزرسانی شد");
        router.push("/admin/products/brands");
      } else {
        toast.error(response?.message || "خطا در به‌روزرسانی برند");
      }
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی برند");
      console.error("Error updating brand:", error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="ویرایش برند" subtitle="در حال بارگذاری..." icon={Shop} />
        <div className="p-12 flex flex-col items-center justify-center text-gray-400 gap-3 rounded-xl border border-gray-600 bg-gray-700/30">
          <Spinner size="lg" />
          <span>در حال بارگذاری اطلاعات برند...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="ویرایش برند"
        subtitle="تغییر اطلاعات برند محصولات"
        icon={Shop}
      />

      <AdminSectionCard title="اطلاعات برند">
        <form onSubmit={handleSubmit} className="space-y-5 max-w-xl">
          <div className="space-y-2">
            <Label htmlFor="name" className={FORM_STYLES.label}>
              نام برند <span className="text-red-400">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="مثال: سامسونگ، اپل"
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
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/products/brands")}
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
