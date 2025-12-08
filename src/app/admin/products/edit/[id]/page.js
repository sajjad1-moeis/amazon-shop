"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";

// داده‌های تستی - در آینده از API می‌آید
const mockProduct = {
  id: 1,
  name: "لپ تاپ Dell XPS 15",
  category: "لپ تاپ",
  brand: "Dell",
  price: 45000000,
  stock: 15,
  description: "لپ تاپ قدرتمند با پردازنده Intel Core i7",
  status: "active",
};

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    stock: "",
    description: "",
    status: "active",
  });

  useEffect(() => {
    // شبیه‌سازی دریافت داده از API
    setFormData({
      name: mockProduct.name,
      category: mockProduct.category,
      brand: mockProduct.brand,
      price: mockProduct.price.toString(),
      stock: mockProduct.stock.toString(),
      description: mockProduct.description,
      status: mockProduct.status,
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // اعتبارسنجی
    if (!formData.name || !formData.category || !formData.brand || !formData.price || !formData.stock) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      setLoading(false);
      return;
    }

    // شبیه‌سازی API call
    setTimeout(() => {
      toast.success("محصول با موفقیت ویرایش شد");
      router.push("/admin/products/list");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">ویرایش محصول</h1>
          <p className="text-gray-400">ویرایش اطلاعات محصول</p>
        </div>
        <Link href="/admin/products/list">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <ArrowRight size={20} className="ml-2" />
            بازگشت به لیست
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">اطلاعات محصول</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  نام محصول <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="مثال: لپ تاپ Dell XPS 15"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">
                  دسته‌بندی <span className="text-red-500">*</span>
                </Label>
                <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="لپ تاپ">لپ تاپ</SelectItem>
                    <SelectItem value="موبایل">موبایل</SelectItem>
                    <SelectItem value="هدفون">هدفون</SelectItem>
                    <SelectItem value="ساعت">ساعت</SelectItem>
                    <SelectItem value="تبلت">تبلت</SelectItem>
                    <SelectItem value="سایر">سایر</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand" className="text-gray-300">
                  برند <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="brand"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  placeholder="مثال: Dell"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="text-gray-300">
                  قیمت (تومان) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="45000000"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock" className="text-gray-300">
                  موجودی <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="15"
                  className="bg-gray-700 border-gray-600 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="status" className="text-gray-300">
                  وضعیت
                </Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="active">فعال</SelectItem>
                    <SelectItem value="out_of_stock">ناموجود</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                توضیحات
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="توضیحات کامل محصول..."
                className="bg-gray-700 border-gray-600 text-white min-h-[120px]"
                rows={5}
              />
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700">
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
              <Link href="/admin/products/list">
                <Button type="button" variant="ghost" className="text-gray-400 hover:text-white">
                  انصراف
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

