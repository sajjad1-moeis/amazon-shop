"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { blogCategoryService } from "@/services/blog/blogCategoryService";

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
        <div className="p-8 text-center text-gray-400">در حال بارگذاری...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ویرایش دسته‌بندی</h1>
          <p className="text-gray-400">ویرایش دسته‌بندی بلاگ</p>
        </div>
      </div>

      <Card className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">ویرایش دسته‌بندی</CardTitle>
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
                {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی دسته‌بندی"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

