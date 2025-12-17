"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { blogTagService } from "@/services/blog/blogTagService";

export default function EditTagPage() {
  const params = useParams();
  const router = useRouter();
  const tagId = params.id;
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
  });

  useEffect(() => {
    const fetchTag = async () => {
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
        console.error("Error fetching tag:", error);
      } finally {
        setFetching(false);
      }
    };

    if (tagId) {
      fetchTag();
    }
  }, [tagId]);

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

      const response = await blogTagService.update(tagId, tagData);

      if (response.success) {
        toast.success("تگ با موفقیت به‌روزرسانی شد");
        router.push("/admin/blog/tags");
      } else {
        toast.error(response.message || "خطا در به‌روزرسانی تگ");
      }
    } catch (error) {
      toast.error(error.message || "خطا در به‌روزرسانی تگ");
      console.error("Error updating tag:", error);
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
          <h1 className="text-3xl font-bold text-white mb-2">ویرایش تگ</h1>
          <p className="text-gray-400">ویرایش تگ بلاگ</p>
        </div>
      </div>

      <Card className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">ویرایش تگ</CardTitle>
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
                {loading ? "در حال به‌روزرسانی..." : "به‌روزرسانی تگ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}





