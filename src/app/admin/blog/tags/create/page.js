"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { blogTagService } from "@/services/blog/blogTagService";

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
    setLoading(true);

    if (!formData.name) {
      toast.error("لطفاً نام تگ را وارد کنید");
      setLoading(false);
      return;
    }

    try {
      const tagData = {
        name: formData.name,
        slug: formData.slug || undefined,
      };

      const response = await blogTagService.create(tagData);

      if (response.success) {
        toast.success("تگ با موفقیت ایجاد شد");
        router.push("/admin/blog/tags");
      } else {
        toast.error(response.message || "خطا در ایجاد تگ");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ایجاد تگ");
      console.error("Error creating tag:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">تگ جدید</h1>
          <p className="text-gray-400">ایجاد تگ جدید برای بلاگ</p>
        </div>
      </div>

      <Card className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">اضافه کردن تگ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-gray-300">
                نام تگ *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="نام تگ را وارد کنید"
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

            <div className="flex justify-end pt-4 gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/blog/tags")}
                className="text-white border-gray-600"
              >
                انصراف
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg"
              >
                {loading ? "در حال ثبت..." : "ثبت تگ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

