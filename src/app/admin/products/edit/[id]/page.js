"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowDown2, ArrowUp2, Trash, GalleryAdd } from "iconsax-reactjs";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { productService } from "@/services/product/productService";
import { productCategoryService } from "@/services/product/productCategoryService";
import { productBrandService } from "@/services/product/productBrandService";
import { Spinner } from "@/components/ui/spinner";
import { FORM_STYLES } from "@/template/Admin/formStyles";
import { API_BASE_URL } from "@/services/api/client";

/** نمایش API → مقدار ذخیره در DB (مسیر نسبی یا URL کامل) */
function displayUrlToStoragePath(displayUrl) {
  if (!displayUrl || typeof displayUrl !== "string") return "";
  const u = displayUrl.trim();
  if (!u.startsWith("http")) return u.replace(/^\/+/, "");
  try {
    const parsed = new URL(u);
    const host = parsed.hostname.toLowerCase();
    if (host.includes("amazon") || host.includes("media-amazon")) return u;
    if (parsed.search || parsed.hash) return u;
    let path = parsed.pathname.replace(/^\/+/, "");
    if (path.startsWith("uploads/")) path = path.slice("uploads/".length);
    try {
      const base = API_BASE_URL ? new URL(API_BASE_URL) : null;
      if (base && parsed.origin === base.origin && path.startsWith("api/")) return u;
    } catch {
      /* ignore */
    }
    return path || u;
  } catch {
    return u;
  }
}

function normalizeProductImageUrls(product) {
  const raw = product?.imageUrls ?? product?.ImageUrls;
  if (Array.isArray(raw)) return raw.filter(Boolean);
  if (typeof raw === "string") {
    const t = raw.trim();
    if (t.startsWith("[")) {
      try {
        const j = JSON.parse(t);
        return Array.isArray(j) ? j.filter(Boolean) : [];
      } catch {
        /* comma-separated */
      }
    }
    return t
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params?.id;
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loadingPage, setLoadingPage] = useState(true);
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
    manualPriceOverrideToman: "",
    isPriceBlocked: false,
  });

  const imageInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const galleryIdRef = useRef(0);
  const savedMainDisplayUrlRef = useRef("");
  const [mainImageFile, setMainImageFile] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState("");
  /** آدرس نمایشی تصویر اصلی ذخیره‌شده (برای بازگردانی بعد از لغو انتخاب فایل جدید) */
  const [savedMainDisplayUrl, setSavedMainDisplayUrl] = useState("");
  /** @type {Array<{ id: string, kind: 'remote', previewUrl: string, storagePath: string } | { id: string, kind: 'local', file: File, previewUrl: string }>} */
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    if (!productId) return undefined;

    let cancelled = false;

    const normalizeList = (res, keys = []) => {
      if (Array.isArray(res)) return res;
      if (Array.isArray(res?.data)) return res.data;
      for (const k of keys) {
        const v = res?.data?.[k] ?? res?.[k];
        if (Array.isArray(v)) return v;
      }
      return [];
    };

    (async () => {
      try {
        setLoadingPage(true);
        const [categoriesRes, brandsRes, productRes] = await Promise.all([
          productCategoryService.getAll(),
          productBrandService.getPaginated({
            pageNumber: 1,
            pageSize: 9999,
            searchTerm: undefined,
            isActive: undefined,
          }),
          productService.getByIdForAdminEdit(productId),
        ]);

        if (cancelled) return;

        setCategories(normalizeList(categoriesRes, ["categories", "items", "list"]));
        const bd = brandsRes?.data;
        const brandList = Array.isArray(bd?.brands) ? bd.brands : Array.isArray(bd) ? bd : [];
        setBrands(brandList);

        const response = productRes;
        if (response.success && response.data) {
          const product = response.data;
          const bKey = (product.brand || "").trim().toLowerCase();
          const matchBrand = brandList.find((b) => (b.name || "").trim().toLowerCase() === bKey);
          const displayPrice =
            product.ourPrice != null ? product.ourPrice : product.finalPrice != null ? product.finalPrice : product.price;
          setFormData({
            name: product.titleFa || product.title || product.name || "",
            englishName: product.englishName || "",
            categoryId: product.categoryId ? product.categoryId.toString() : "",
            brandId: matchBrand ? String(matchBrand.id) : "",
            price: displayPrice != null ? String(displayPrice) : "",
            discountPrice: product.discountPrice != null ? String(product.discountPrice) : "",
            stock: product.stockQuantity != null ? String(product.stockQuantity) : "",
            shortDescription: product.shortDescription || "",
            description: product.description || "",
            status: product.status || 1,
            isActive: true,
            inStock: product.isInStock !== undefined ? product.isInStock : true,
            manualPriceOverrideToman:
              product.manualPriceOverrideToman != null ? product.manualPriceOverrideToman.toString() : "",
            isPriceBlocked: !!product.isPriceBlocked,
          });

          const mainDisp = product.mainImageUrl ?? product.MainImageUrl ?? "";
          const mainStr = typeof mainDisp === "string" && mainDisp ? mainDisp : "";
          setMainImageFile(null);
          savedMainDisplayUrlRef.current = mainStr;
          setSavedMainDisplayUrl(mainStr);
          setMainImagePreview(mainStr);

          const urls = normalizeProductImageUrls(product);
          galleryIdRef.current = 0;
          setGalleryItems(
            urls.map((url) => {
              galleryIdRef.current += 1;
              const s = String(url);
              const storagePath = displayUrlToStoragePath(s) || s;
              return {
                id: `r-${galleryIdRef.current}-${s.slice(-24)}`,
                kind: "remote",
                previewUrl: s,
                storagePath,
              };
            })
          );
        } else {
          toast.error(response.message || "خطا در دریافت محصول");
          router.push("/admin/products/list");
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error.message || "خطا در بارگذاری صفحه ویرایش");
          console.error("Edit product load:", error);
          router.push("/admin/products/list");
        }
      } finally {
        if (!cancelled) setLoadingPage(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [productId, router]);

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
          kind: "local",
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

    if (!formData.name || !formData.categoryId || !formData.brandId || !formData.price || !formData.stock) {
      toast.error("لطفاً تمام فیلدهای الزامی را پر کنید");
      setLoading(false);
      return;
    }

    try {
      const pid = parseInt(String(productId), 10);
      if (Number.isNaN(pid) || pid <= 0) {
        toast.error("شناسه محصول نامعتبر است");
        setLoading(false);
        return;
      }

      const priceVal = parseFloat(formData.price);
      const payload = {
        title: formData.name,
        titleFa: formData.englishName?.trim() || undefined,
        englishName: formData.englishName || undefined,
        categoryId: parseInt(formData.categoryId, 10),
        brandId: parseInt(formData.brandId, 10),
        price: priceVal,
        ourPrice: priceVal,
        discountPrice: formData.discountPrice ? parseFloat(formData.discountPrice) : undefined,
        stockQuantity: parseInt(formData.stock, 10),
        shortDescription: formData.shortDescription || undefined,
        description: formData.description || undefined,
        status: parseInt(formData.status, 10),
        isInStock: formData.inStock,
      };
      if (formData.manualPriceOverrideToman !== "" && formData.manualPriceOverrideToman != null) {
        payload.manualPriceOverrideToman = parseFloat(formData.manualPriceOverrideToman);
      } else {
        payload.manualPriceOverrideToman = null;
      }
      payload.isPriceBlocked = formData.isPriceBlocked;

      const newGalleryFiles = galleryItems.filter((i) => i.kind === "local").map((i) => i.file);
      let uploadedPaths = [];
      if (newGalleryFiles.length > 0) {
        const uploadRes = await productService.uploadProductImages(pid, newGalleryFiles);
        if (!uploadRes?.success) {
          toast.error(uploadRes?.message || "آپلود تصاویر گالری ناموفق بود");
          setLoading(false);
          return;
        }
        const rawList = Array.isArray(uploadRes.data) ? uploadRes.data : [];
        uploadedPaths = rawList
          .map((url) => {
            const p = displayUrlToStoragePath(url);
            return p && String(p).trim() ? p : String(url || "").trim();
          })
          .filter((p) => p);
        if (uploadedPaths.length !== newGalleryFiles.length) {
          toast.error("پاسخ سرور برای گالری با تعداد فایل‌های ارسالی هم‌خوان نیست؛ لطفاً دوباره تلاش کنید.");
          setLoading(false);
          return;
        }
      }

      let uploadIdx = 0;
      const imageUrls = galleryItems
        .map((item) => {
          if (item.kind === "remote") return item.storagePath || item.previewUrl;
          return uploadedPaths[uploadIdx++];
        })
        .filter((p) => p != null && String(p).trim() !== "");
      payload.imageUrls = imageUrls;

      const response = await productService.update(pid, payload);

      if (response.success) {
        if (mainImageFile instanceof File) {
          try {
            await productService.uploadMainImage(pid, mainImageFile);
          } catch (err) {
            toast.error("اطلاعات ذخیره شد ولی آپلود تصویر اصلی با خطا مواجه شد");
            console.error(err);
          }
        }
        toast.success("محصول با موفقیت ویرایش شد");
        router.push("/admin/products/list");
      } else {
        toast.error(response.message || "خطا در ویرایش محصول");
      }
    } catch (error) {
      toast.error(error.message || "خطا در ویرایش محصول");
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loadingPage) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
      </div>
    );
  }

  const inputClass = FORM_STYLES.input;
  const labelClass = FORM_STYLES.label;

  return (
    <div className="max-w-4xl mx-auto space-y-6" dir="rtl">
      <header className="flex items-center justify-between gap-4 mb-8">
        <div>
          <Link href="/admin/products/list" className="text-sm text-gray-500 hover:text-gray-300 transition-colors inline-flex items-center gap-1.5 mb-3">
            <ArrowRight size={16} />
            بازگشت به لیست
          </Link>
          <h1 className="text-2xl font-semibold text-white tracking-tight">ویرایش محصول</h1>
          <p className="text-sm text-gray-500 mt-1">ویرایش اطلاعات محصول</p>
        </div>
      </header>

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
                <Select value={formData.categoryId} onValueChange={(value) => handleSelectChange("categoryId", value)}>
                  <SelectTrigger className={inputClass + " border"}>
                    <SelectValue placeholder="انتخاب دسته‌بندی" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((cat) => {
                      const cid = cat.id ?? cat.categoryId;
                      return (
                        <SelectItem key={cid} value={String(cid)}>
                          {cat.name ?? cat.title ?? cat.categoryName ?? `دسته ${cid}`}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brandId" className={labelClass}>
                  برند <span className="text-red-400/90">*</span>
                </Label>
                <Select value={formData.brandId} onValueChange={(value) => handleSelectChange("brandId", value)}>
                  <SelectTrigger className={inputClass}>
                    <SelectValue placeholder="انتخاب برند" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {brands.map((brand) => {
                      const bid = brand.id ?? brand.brandId;
                      return (
                        <SelectItem key={bid} value={String(bid)}>
                          {brand.name ?? brand.title ?? brand.brandName ?? `برند ${bid}`}
                        </SelectItem>
                      );
                    })}
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
                  <SelectTrigger className={inputClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="1">فعال</SelectItem>
                    <SelectItem value="2">غیرفعال</SelectItem>
                    <SelectItem value="3">ناموجود</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2 border-t border-gray-700 pt-4 mt-2">
                <h3 className="text-white font-medium mb-3">فیلدهای ادمین (قیمت‌گذاری)</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="manualPriceOverrideToman" className={labelClass}>
                      قیمت دستی نهایی (تومان)
                    </Label>
                    <Input
                      id="manualPriceOverrideToman"
                      name="manualPriceOverrideToman"
                      type="number"
                      min="0"
                      value={formData.manualPriceOverrideToman}
                      onChange={handleChange}
                      placeholder="خالی = محاسبه خودکار"
                      className={inputClass}
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-8">
                    <input
                      type="checkbox"
                      id="isPriceBlocked"
                      name="isPriceBlocked"
                      checked={formData.isPriceBlocked}
                      onChange={handleChange}
                      className="rounded border-gray-600"
                    />
                    <Label htmlFor="isPriceBlocked" className={`${labelClass} cursor-pointer`}>
                      مسدود فروش (وزن/قیمت)
                    </Label>
                  </div>
                </div>
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

            <div className="space-y-2 pt-2 border-t border-gray-700/40">
              <Label className={labelClass} htmlFor="edit-product-main-image">
                تصویر اصلی محصول
              </Label>
              <input
                ref={imageInputRef}
                id="edit-product-main-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setMainImageFile(file);
                  setMainImagePreview((prev) => {
                    if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                    return file ? URL.createObjectURL(file) : savedMainDisplayUrlRef.current || "";
                  });
                }}
              />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className={inputClass + " cursor-pointer w-full flex items-center justify-between px-4 border"}
                  onClick={() => imageInputRef.current?.click()}
                >
                  <span className="text-gray-400">
                    {mainImageFile ? mainImageFile.name : savedMainDisplayUrl ? "تصویر فعلی حفظ می‌شود — برای تعویض فایل بزنید" : "انتخاب فایل تصویر"}
                  </span>
                  <span className="text-gray-500">آپلود</span>
                </button>
                <button
                  type="button"
                  className="h-11 px-5 rounded-xl bg-gray-800/60 border border-gray-700/60 text-red-400 hover:text-red-500 hover:bg-gray-800/80 transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  disabled={!mainImageFile}
                  onClick={() => {
                    if (imageInputRef.current) imageInputRef.current.value = "";
                    setMainImagePreview((prev) => {
                      if (prev?.startsWith("blob:")) URL.revokeObjectURL(prev);
                      return savedMainDisplayUrlRef.current || "";
                    });
                    setMainImageFile(null);
                  }}
                >
                  حذف انتخاب
                </button>
              </div>
              {mainImagePreview ? (
                <div className="pt-3 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={mainImagePreview}
                    alt=""
                    className="w-40 h-40 object-cover rounded-xl border border-gray-700/60 bg-gray-900/30"
                  />
                </div>
              ) : null}
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-700/40">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <Label className={labelClass}>تصاویر گالری (به ترتیب)</Label>
                <span className="text-xs text-gray-500">
                  ترتیب با فلش‌ها؛ فایل‌های جدید بعد از ذخیره در همین ترتیب در لیست نهایی قرار می‌گیرند.
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
                      <span
                        className="flex-1 min-w-0 text-sm text-gray-300 truncate"
                        title={item.kind === "local" ? item.file.name : item.previewUrl}
                      >
                        {item.kind === "local" ? item.file.name : "تصویر موجود"}
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
                <p className="text-sm text-gray-500">گالری خالی است؛ می‌توانید تصویر اضافه کنید یا خالی بگذارید.</p>
              )}
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-700/60 mt-6">
              <Button type="submit" disabled={loading} className={FORM_STYLES.button}>
                {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
              </Button>
              <Link href="/admin/products/list">
                <Button type="button" variant="ghost" className="rounded-xl text-gray-400 hover:text-white hover:bg-gray-700/50">
                  انصراف
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
