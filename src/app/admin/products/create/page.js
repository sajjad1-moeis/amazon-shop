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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { productService } from "@/services/product/productService";
import { productCategoryService } from "@/services/product/productCategoryService";
import { productBrandService } from "@/services/product/productBrandService";
import { Spinner } from "@/components/ui/spinner";

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingFilters, setLoadingFilters] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    englishName: "",
    categoryId: "",
    brandId: "",
    price: "",
    discountPrice: "",
    stock: "",
    shortDescription: "",
    description: "",
    status: 1,
    isActive: true,
    inStock: true,
  });

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true);
      const [categoriesRes, brandsRes] = await Promise.all([
        productCategoryService.getAll(),
        productBrandService.getAll(),
      ]);

      if (categoriesRes.success && categoriesRes.data) {
        setCategories(categoriesRes.data || []);
      }
      if (brandsRes.success && brandsRes.data) {
        setBrands(brandsRes.data || []);
      }
    } catch (error) {
      toast.error("خطا در دریافت فیلترها");
      console.error("Error fetching filters:", error);
    } finally {
      setLoadingFilters(false);
    }
  };

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
    setLoading(true);

    if (!formData.name || !formData.categoryId || !formData.brandId || !formData.price || !formData.stock) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        name: formData.name,
        englishName: formData.englishName || undefined,
        categoryId: parseInt(formData.categoryId),
        brandId: parseInt(formData.brandId),
        price: parseFloat(formData.price),
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        stock: parseInt(formData.stock),
        shortDescription: formData.shortDescription || undefined,
        description: formData.description || undefined,
        status: parseInt(formData.status),
        isActive: formData.isActive,
        inStock: formData.inStock,
      };

      const response = await productService.create(payload);

      if (response.success) {
        toast.success("محصول با موفقیت ایجاد شد");
        router.push("/admin/products/list");
      } else {
        toast.error(response.message || "خطا در ایجاد محصول");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ایجاد محصول");
      console.error("Error creating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">محصول جدید</h1>
          <p className="text-gray-400">افزودن محصول جدید به فروشگاه</p>
        </div>
        <Link href="/admin/products/list">
          <Button variant="ghost" className="text-gray-400 hover:text-white">
            <ArrowRight size={20} className="ml-2" />
            بازگشت به لیست
          </Button>
        </Link>
      </div>

      {loadingFilters ? (
        <div className="flex items-center justify-center p-8">
          <Spinner size="lg" />
        </div>
      ) : (
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
                  <Label htmlFor="englishName" className="text-gray-300">
                    نام انگلیسی
                  </Label>
                  <Input
                    id="englishName"
                    name="englishName"
                    value={formData.englishName}
                    onChange={handleChange}
                    placeholder="Example: Dell XPS 15 Laptop"
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId" className="text-gray-300">
                    دسته‌بندی <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleSelectChange("categoryId", value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="انتخاب دسته‌بندی" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brandId" className="text-gray-300">
                    برند <span className="text-red-500">*</span>
                  </Label>
                  <Select value={formData.brandId} onValueChange={(value) => handleSelectChange("brandId", value)}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue placeholder="انتخاب برند" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {brands.map((brand) => (
                        <SelectItem key={brand.id} value={brand.id.toString()}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPrice" className="text-gray-300">
                    قیمت تخفیف (تومان)
                  </Label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="40000000"
                    className="bg-gray-700 border-gray-600 text-white"
                    min="0"
                    step="1000"
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
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className="text-gray-300">
                    وضعیت
                  </Label>
                  <Select
                    value={formData.status.toString()}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      <SelectItem value="1">فعال</SelectItem>
                      <SelectItem value="2">غیرفعال</SelectItem>
                      <SelectItem value="3">ناموجود</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="shortDescription" className="text-gray-300">
                  معرفی کوتاه
                </Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="معرفی کوتاه محصول..."
                  className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">
                  توضیحات کامل
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
                  {loading ? "در حال ذخیره..." : "ذخیره محصول"}
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
      )}
    </div>
  );
}
