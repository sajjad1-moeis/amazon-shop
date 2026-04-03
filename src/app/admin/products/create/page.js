"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowDown2, ArrowUp2, Trash, GalleryAdd } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { productService } from "@/services/product/productService";
import { productCategoryService } from "@/services/product/productCategoryService";
import { productBrandService } from "@/services/product/productBrandService";
import { Spinner } from "@/components/ui/spinner";
import { unwrapApiData } from "@/services/api/client";

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
    amazonUrl: "",
    amazonASIN: "",
    price: "",
    discountPrice: "",
    stock: "",
    shortDescription: "",
    description: "",
    status: 1,
    isActive: true,
    inStock: true,
  });

  const imageInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  /** ترتیب = ترتیب آپلود گالری؛ هر آیتم id پایدار برای کلید React */
  const galleryIdRef = useRef(0);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      setLoadingFilters(true);
      // برای برندها از همون متد صفحه لیست برندها استفاده می‌کنیم چون GetAll endpoint شما NotFound می‌دهد.
      const [categoriesRes, brandsRes] = await Promise.all([
        productCategoryService.getAll(),
        productBrandService.getPaginated({
          pageNumber: 1,
          pageSize: 9999,
          searchTerm: undefined,
          isActive: undefined,
        }),
      ]);

      const normalizeList = (res, keys = []) => {
        if (Array.isArray(res)) return res;
        if (Array.isArray(res?.data)) return res.data;
        for (const k of keys) {
          const v = res?.data?.[k] ?? res?.[k];
          if (Array.isArray(v)) return v;
        }
        return [];
      };

      setCategories(normalizeList(categoriesRes, ["categories", "items", "list"]));
      const brandsPayload = unwrapApiData(brandsRes);
      setBrands(Array.isArray(brandsPayload?.brands) ? brandsPayload.brands : []);
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

  const handleGalleryFilesAdded = (e) => {
    const picked = Array.from(e.target.files || []).filter((f) => f instanceof File);
    e.target.value = "";
    if (!picked.length) return;
    setGalleryItems((prev) => [
      ...prev,
      ...picked.map((file) => {
        galleryIdRef.current += 1;
        return {
          id: `g-${galleryIdRef.current}-${file.lastModified}`,
          file,
          previewUrl: URL.createObjectURL(file),
        };
      }),
    ]);
  };

  const removeGalleryAt = (index) => {
    setGalleryItems((prev) => {
      const row = prev[index];
      if (row?.previewUrl?.startsWith("blob:")) URL.revokeObjectURL(row.previewUrl);
      return prev.filter((_, i) => i !== index);
    });
  };

  const moveGallery = (index, delta) => {
    setGalleryItems((prev) => {
      const j = index + delta;
      if (j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !formData.name ||
      !formData.categoryId ||
      !formData.brandId ||
      !formData.amazonUrl ||
      !formData.amazonASIN ||
      !formData.price ||
      !formData.stock
    ) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      setLoading(false);
      return;
    }

    try {
      const priceVal = parseFloat(formData.price);
      const payload = {
        title: formData.name,
        titleFa: formData.englishName?.trim() || undefined,
        englishName: formData.englishName || undefined,
        categoryId: parseInt(formData.categoryId, 10),
        brandId: parseInt(formData.brandId, 10),
        amazonUrl: formData.amazonUrl,
        amazonLink: formData.amazonUrl,
        AmazonASIN: formData.amazonASIN,
        amazonASIN: formData.amazonASIN,
        price: priceVal,
        ourPrice: priceVal,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        stockQuantity: parseInt(formData.stock, 10),
        shortDescription: formData.shortDescription || undefined,
        description: formData.description || undefined,
        status: parseInt(formData.status, 10),
        isInStock: formData.inStock,
      };

      const response = await productService.create(payload);

      if (response.success) {
        const createdId = response?.data?.id ?? response?.id ?? response?.data?.productId;
        const pid = createdId != null ? parseInt(createdId, 10) : null;
        if (pid != null && mainImageFile instanceof File) {
          try {
            await productService.uploadMainImage(pid, mainImageFile);
          } catch (err) {
            toast.error("محصول ایجاد شد ولی آپلود تصویر اصلی با خطا مواجه شد");
            console.error("Error uploading main image:", err);
          }
        }
        if (pid != null && galleryItems.length > 0) {
          try {
            await productService.uploadProductImages(
              pid,
              galleryItems.map((item) => item.file)
            );
          } catch (err) {
            toast.error("محصول ایجاد شد ولی آپلود تصاویر گالری با خطا مواجه شد");
            console.error("Error uploading gallery:", err);
          }
        }

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
                        <SelectItem key={cat.id ?? cat.categoryId} value={String(cat.id ?? cat.categoryId)}>
                          {cat.name ?? cat.title ?? cat.categoryName ?? `دسته ${cat.id ?? cat.categoryId}`}
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
                        <SelectItem key={brand.id ?? brand.brandId} value={String(brand.id ?? brand.brandId)}>
                          {brand.name ?? brand.title ?? brand.brandName ?? `برند ${brand.id ?? brand.brandId}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amazonUrl" className={labelClass}>
                    لینک آمازون <span className="text-red-400/90">*</span>
                  </Label>
                  <Input
                    id="amazonUrl"
                    name="amazonUrl"
                    value={formData.amazonUrl}
                    onChange={handleChange}
                    placeholder="https://www.amazon.ae/.../dp/ASIN"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amazonASIN" className={labelClass}>
                    AmazonASIN <span className="text-red-400/90">*</span>
                  </Label>
                  <Input
                    id="amazonASIN"
                    name="amazonASIN"
                    value={formData.amazonASIN}
                    onChange={handleChange}
                    placeholder="مثال: B0CHWRXH8B"
                    className={inputClass}
                    required
                  />
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

              <div className="space-y-2">
                <Label className={labelClass} htmlFor="product-main-image">
                  تصویر اصلی محصول
                </Label>
                <input
                  ref={imageInputRef}
                  id="product-main-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setMainImageFile(file);
                    if (mainImagePreview?.startsWith("blob:")) URL.revokeObjectURL(mainImagePreview);
                    setMainImagePreview(file ? URL.createObjectURL(file) : "");
                  }}
                />
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className={inputClass + " cursor-pointer w-full flex items-center justify-between px-4"}
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <span className="text-gray-400">{mainImageFile ? mainImageFile.name : "انتخاب فایل تصویر"}</span>
                    <span className="text-gray-500">آپلود</span>
                  </button>

                  <button
                    type="button"
                    className="h-11 px-5 rounded-xl bg-gray-800/60 border border-gray-700/60 text-red-400 hover:text-red-500 hover:bg-gray-800/80 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    disabled={!mainImageFile}
                    onClick={() => {
                      if (imageInputRef.current) imageInputRef.current.value = "";
                      if (mainImagePreview?.startsWith("blob:")) URL.revokeObjectURL(mainImagePreview);
                      setMainImageFile(null);
                      setMainImagePreview("");
                    }}
                  >
                    حذف
                  </button>
                </div>

                {mainImagePreview ? (
                  <div className="pt-3 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={mainImagePreview}
                      alt="Preview"
                      className="w-40 h-40 object-cover rounded-xl border border-gray-700/60 bg-gray-900/30"
                    />
                  </div>
                ) : null}
              </div>

              <div className="space-y-3 pt-2 border-t border-gray-700/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Label className={labelClass}>تصاویر گالری (به ترتیب)</Label>
                  <span className="text-xs text-gray-500">
                    ترتیب از چپ به راست / بالا به پایین؛ با فلش‌ها جابه‌جا کنید — همان ترتیب روی سایت ذخیره می‌شود.
                  </span>
                </div>
                <input
                  ref={galleryInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleGalleryFilesAdded}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 border-gray-600 text-gray-300 hover:bg-gray-700/50"
                  onClick={() => galleryInputRef.current?.click()}
                >
                  <GalleryAdd size={18} className="ml-2" />
                  افزودن به گالری
                </Button>
                {galleryItems.length > 0 ? (
                  <ul className="space-y-2 rounded-xl border border-gray-700/60 bg-gray-900/20 p-3">
                    {galleryItems.map((item, index) => (
                      <li
                        key={item.id}
                        className="flex flex-wrap items-center gap-3 rounded-lg border border-gray-700/50 bg-gray-800/40 px-3 py-2"
                      >
                        <span className="text-xs text-gray-500 w-6 shrink-0">{index + 1}</span>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={item.previewUrl}
                          alt=""
                          className="w-14 h-14 object-cover rounded-lg border border-gray-700/60"
                        />
                        <span className="flex-1 min-w-0 text-sm text-gray-300 truncate" title={item.file.name}>
                          {item.file.name}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white"
                            disabled={index === 0}
                            onClick={() => moveGallery(index, -1)}
                            title="بالا"
                          >
                            <ArrowUp2 size={18} />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-gray-400 hover:text-white"
                            disabled={index === galleryItems.length - 1}
                            onClick={() => moveGallery(index, 1)}
                            title="پایین"
                          >
                            <ArrowDown2 size={18} />
                          </Button>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-400 hover:text-red-300"
                            onClick={() => removeGalleryAt(index)}
                            title="حذف"
                          >
                            <Trash size={18} />
                          </Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">اختیاری — می‌توانید چند تصویر اضافه کنید.</p>
                )}
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
