"use client";

import React, { useState, useEffect } from "react";
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

  const inputClass =
    "h-11 rounded-xl bg-gray-800/80 border border-gray-600/80 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 transition-colors";
  const labelClass = "text-sm font-medium text-gray-400";

  return (
    <div className="max-w-4xl mx-auto" dir="rtl">
      <header className="flex items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/admin/products/list"
            className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5 mb-3"
          >
            <ArrowRight size={16} />
            بازگشت به لیست
          </Link>
          <h1 className="text-2xl font-semibold text-white tracking-tight">محصول جدید</h1>
          <p className="text-sm text-gray-500 mt-1">افزودن محصول جدید به فروشگاه</p>
        </div>
      </header>

      {loadingFilters ? (
        <div className="flex items-center justify-center py-20">
          <Spinner size="lg" />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="rounded-2xl border border-gray-700/60 bg-gray-800/40 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-700/60">
              <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">اطلاعات محصول</h2>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className={labelClass}>
                    نام محصول <span className="text-red-400/90">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="مثال: لپ تاپ Dell XPS 15"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="englishName" className={labelClass}>
                    نام انگلیسی
                  </Label>
                  <Input
                    id="englishName"
                    name="englishName"
                    value={formData.englishName}
                    onChange={handleChange}
                    placeholder="Example: Dell XPS 15 Laptop"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoryId" className={labelClass}>
                    دسته‌بندی <span className="text-red-400/90">*</span>
                  </Label>
                  <Select
                    value={formData.categoryId}
                    onValueChange={(value) => handleSelectChange("categoryId", value)}
                  >
                    <SelectTrigger className={inputClass + " border"}>
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
                  <Label htmlFor="brandId" className={labelClass}>
                    برند <span className="text-red-400/90">*</span>
                  </Label>
                  <Select value={formData.brandId} onValueChange={(value) => handleSelectChange("brandId", value)}>
                    <SelectTrigger className={inputClass + " border"}>
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
                  <Label htmlFor="price" className={labelClass}>
                    قیمت (تومان) <span className="text-red-400/90">*</span>
                  </Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="45000000"
                    className={inputClass}
                    required
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discountPrice" className={labelClass}>
                    قیمت تخفیف (تومان)
                  </Label>
                  <Input
                    id="discountPrice"
                    name="discountPrice"
                    type="number"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    placeholder="40000000"
                    className={inputClass}
                    min="0"
                    step="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock" className={labelClass}>
                    موجودی <span className="text-red-400/90">*</span>
                  </Label>
                  <Input
                    id="stock"
                    name="stock"
                    type="number"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="15"
                    className={inputClass}
                    required
                    min="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status" className={labelClass}>
                    وضعیت
                  </Label>
                  <Select
                    value={formData.status.toString()}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger className={inputClass + " border"}>
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
                <Label htmlFor="shortDescription" className={labelClass}>
                  معرفی کوتاه
                </Label>
                <Textarea
                  id="shortDescription"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="معرفی کوتاه محصول..."
                  className={inputClass + " min-h-[88px] resize-none py-3"}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className={labelClass}>
                  توضیحات کامل
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="توضیحات کامل محصول..."
                  className={inputClass + " min-h-[140px] resize-none py-3"}
                  rows={5}
                />
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-gray-700/60">
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-11 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-medium transition-colors"
                >
                  {loading ? "در حال ذخیره..." : "ذخیره محصول"}
                </Button>
                <Link href="/admin/products/list">
                  <Button
                    type="button"
                    variant="ghost"
                    className="h-11 px-5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50"
                  >
                    انصراف
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
