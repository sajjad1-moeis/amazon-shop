"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { blogCategoryService } from "@/services/blog/blogCategoryService";

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">دسته‌بندی جدید</h1>
          <p className="text-gray-400">ایجاد دسته‌بندی جدید برای بلاگ</p>
        </div>
      </div>

      <Card className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">اضافه کردن دسته‌بندی</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                نام دسته‌بندی *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام دسته‌بندی را وارد کنید"
                className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-gray-300">
                Slug (اختیاری)
              </Label>
              <Input
                id="slug"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="اگر خالی باشد، از نام ساخته می‌شود"
                className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <Label htmlFor="isActive" className="text-gray-300 cursor-pointer">
                فعال
              </Label>
            </div>

            <div className="flex justify-end pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/blog/categories")}
                className="text-white border-gray-600"
              >
                انصراف
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                {loading ? "در حال ثبت..." : "ثبت دسته‌بندی"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

