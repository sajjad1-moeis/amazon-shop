"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CreateBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    categoryName: "",
    timeToRead: "",
    isPublished: "false",
    featuredImage: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, featuredImage: file }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // اعتبارسنجی
    if (!formData.title || !formData.description || !formData.content || !formData.categoryName || !formData.timeToRead) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      setLoading(false);
      return;
    }

    // شبیه‌سازی API call
    setTimeout(() => {
      toast.success("پست با موفقیت ایجاد شد");
      router.push("/admin/blog/list");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">پست جدید</h1>
          <p className="text-gray-400">ایجاد پست جدید برای وبلاگ</p>
        </div>
      </div>

      <Card className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-white text-xl">اضافه کردن وبلاگ</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {/* عنوان وبلاگ */}
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">
                  عنوان وبلاگ
                </Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="عنوان وبلاگ را وارد کنید"
                  className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg"
                  required
                />
              </div>

              {/* زمان مطالعه */}
              <div className="space-y-2">
                <Label htmlFor="timeToRead" className="text-gray-300">
                  زمان مطالعه
                </Label>
                <Input
                  id="timeToRead"
                  name="timeToRead"
                  value={formData.timeToRead}
                  onChange={handleChange}
                  placeholder="مثلاً: 5min یا 1h"
                  className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg"
                  required
                />
              </div>

              {/* دسته‌بندی */}
              <div className="space-y-2">
                <Label htmlFor="categoryName" className="text-gray-300">
                  دسته‌بندی
                </Label>
                <Select value={formData.categoryName} onValueChange={(value) => handleSelectChange("categoryName", value)}>
                  <SelectTrigger className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg">
                    <SelectValue placeholder="دسته‌بندی را وارد کنید" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="اخبار">اخبار</SelectItem>
                    <SelectItem value="آموزش ها">آموزش ها</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* وضعیت انتشار */}
              <div className="space-y-2">
                <Label htmlFor="isPublished" className="text-gray-300">
                  وضعیت انتشار
                </Label>
                <Select value={formData.isPublished} onValueChange={(value) => handleSelectChange("isPublished", value)}>
                  <SelectTrigger className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg">
                    <SelectValue placeholder="وضعیت انتشار را انتخاب کنید" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="true">منتشر شود</SelectItem>
                    <SelectItem value="false">پیش‌نویس</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* توضیحات کوتاه */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  توضیحات وبلاگ
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="توضیحات کوتاه وبلاگ را وارد کنید"
                  className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg min-h-[120px]"
                  rows={5}
                  required
                />
              </div>

              {/* تصویر شاخص */}
              <div className="space-y-2">
                <Label htmlFor="featuredImage" className="text-gray-300">
                  تصویر شاخص
                </Label>
                <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg h-36 flex items-center justify-center">
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="featuredImage"
                    className="cursor-pointer text-gray-400 hover:text-white text-sm px-4 py-2 border border-gray-600 rounded-lg"
                  >
                    {formData.featuredImage ? formData.featuredImage.name : "انتخاب تصویر"}
                  </label>
                </div>
              </div>
            </div>

            {/* محتوای وبلاگ */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-300">
                محتوای وبلاگ
              </Label>
              <Textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="محتوای کامل وبلاگ را وارد کنید"
                className="bg-gray-800 bg-opacity-50 border border-gray-700 text-white rounded-lg min-h-[400px]"
                rows={20}
                required
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button type="submit" disabled={loading} className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg">
                {loading ? "در حال ثبت..." : "ثبت وبلاگ"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

