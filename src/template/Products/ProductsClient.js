"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FiltersSection from "@/components/module/FiltersSection";
import HeaderSection from "@/template/Products/HeaderSection";
import ProductList from "@/template/Products/ProductList";
import { Spinner } from "@/components/ui/spinner";
import { productService } from "@/services/product/productService";

export default function ProductsClient({ searchParams: serverSearchParams }) {
  const router = useRouter();
  const clientSearchParams = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [searchError, setSearchError] = useState(null);

  // داده‌های تستی (فقط وقتی جستجو خالی است نمایش داده می‌شود)
  const mockProducts = [
    {
      id: "1",
      name: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف",
      title: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف",
      price: 15370000,
      discountPrice: 12450000,
      mainImage: "/image/Home/product.png",
      image: "/image/Home/product.png",
      rating: 4.7,
      reviewCount: 235,
      inStock: true,
      badges: ["انتخاب آمازون", "ارسال بین المللی"],
      seller: "amazon",
      sellerCountry: "🇦🇪",
    },
    {
      id: "2",
      name: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف",
      title: "ساعت مچی مردانه Invicta مدل ۳۶۱ سری Reserve کرونوگراف",
      price: 15370000,
      discountPrice: 12450000,
      mainImage: "/image/Home/product.png",
      image: "/image/Home/product.png",
      rating: 4.7,
      reviewCount: 235,
      inStock: true,
      badges: ["پرفروش ترین", "ارسال بین المللی"],
      seller: "amazon",
      sellerCountry: "🇦🇪",
    },
    {
      id: "3",
      name: "کنترلر پلی استیشن ۵ - DualSense",
      title: "کنترلر پلی استیشن ۵ - DualSense",
      price: 5000000,
      discountPrice: 4500000,
      mainImage: "/image/Home/product.png",
      image: "/image/Home/product.png",
      rating: 4.5,
      reviewCount: 128,
      inStock: true,
      badges: ["ارسال بین المللی"],
      seller: "amazon",
      sellerCountry: "🇦🇪",
    },
    {
      id: "4",
      name: "ساعت هوشمند سامسونگ Galaxy Watch",
      title: "ساعت هوشمند سامسونگ Galaxy Watch",
      price: 8000000,
      discountPrice: 7500000,
      mainImage: "/image/Home/product.png",
      image: "/image/Home/product.png",
      rating: 4.6,
      reviewCount: 89,
      inStock: true,
      badges: ["پرفروش ترین"],
      seller: "amazon",
      sellerCountry: "🇦🇪",
    },
  ];

  const mockCategories = [
    { id: "1", name: "کالای دیجیتال" },
    { id: "2", name: "کنسول بازی" },
    { id: "3", name: "ساعت هوشمند" },
    { id: "4", name: "لوازم گیمینگ" },
    { id: "5", name: "صوتی و تصویری" },
  ];

  const mockBrands = [
    { id: "1", name: "Sony" },
    { id: "2", name: "Samsung" },
    { id: "3", name: "Logitech" },
    { id: "4", name: "Razer" },
    { id: "5", name: "JBL" },
  ];

  const [products, setProducts] = useState(mockProducts);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(mockCategories);
  const [brands, setBrands] = useState(mockBrands);
  const [filters, setFilters] = useState({
    categoryId: clientSearchParams.get("category") || "",
    brandId: clientSearchParams.get("brand") || "",
    minPrice: clientSearchParams.get("minPrice") || "",
    maxPrice: clientSearchParams.get("maxPrice") || "",
    query: clientSearchParams.get("search") || "",
  });
  const [pageNumber, setPageNumber] = useState(parseInt(clientSearchParams.get("page")) || 1);
  const [totalCount, setTotalCount] = useState(mockProducts.length);

  // جستجوی اسکرپر: وقتی در URL پارامتر search وجود دارد از API آمازون نتایج بگیر
  const searchParam = clientSearchParams.get("search") ?? "";
  const searchQuery = typeof searchParam === "string" ? searchParam.trim() : "";

  useEffect(() => {
    if (searchQuery.length < 2) {
      setProducts(mockProducts);
      setTotalCount(mockProducts.length);
      setSearchError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setSearchError(null);

    productService
      .searchAmazon(searchQuery)
      .then((res) => {
        if (cancelled) return;
        if (!res?.success) {
          setProducts([]);
          setTotalCount(0);
          setSearchError(res?.message || "خطا در دریافت نتایج جستجو");
          return;
        }
        const payload = res.data;
        const list = payload?.data ?? payload?.Data ?? [];
        const items = Array.isArray(list) ? list : [];
        setProducts(items);
        setTotalCount(items.length);
        setSearchError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setProducts([]);
        setTotalCount(0);
        const status = err?.response?.status;
        const msg =
          status === 429
            ? "محدودیت تعداد درخواست. لطفاً چند دقیقه دیگر تلاش کنید."
            : status === 503
              ? "سرویس جستجو در حال حاضر در دسترس نیست."
              : status === 408
                ? "زمان درخواست به پایان رسید. دوباره تلاش کنید."
                : "خطا در دریافت نتایج. لطفاً دوباره تلاش کنید.";
        setSearchError(msg);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);

  // وقتی جستجو خالی است و فقط فیلترها عوض می‌شوند، روی mock فیلتر اعمال کن
  useEffect(() => {
    if (searchQuery.length >= 2) return;
    let filtered = [...mockProducts];
    if (filters.query && typeof filters.query === "string") {
      const q = filters.query.toLowerCase();
      filtered = filtered.filter((p) => (p.name || p.title || "").toLowerCase().includes(q));
    }
    const minP = parseFloat(filters.minPrice);
    if (Number.isFinite(minP)) {
      filtered = filtered.filter((p) => Number(p.discountPrice || p.price || 0) >= minP);
    }
    const maxP = parseFloat(filters.maxPrice);
    if (Number.isFinite(maxP)) {
      filtered = filtered.filter((p) => Number(p.discountPrice || p.price || 0) <= maxP);
    }
    setProducts(filtered);
    setTotalCount(filtered.length);
  }, [filters, searchQuery]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPageNumber(1);
  };

  const searchDebounceRef = useRef(null);

  useEffect(() => {
    return () => {
      if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    };
  }, []);

  const handleSearch = (query) => {
    const q = typeof query === "string" ? String(query).trim().slice(0, 200) : "";
    setFilters((prev) => ({ ...prev, query: q }));
    setPageNumber(1);

    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      if (q.length >= 2) {
        router.replace(`/products?search=${encodeURIComponent(q)}`, { scroll: false });
      } else if (q.length === 0) {
        router.replace("/products", { scroll: false });
      }
      searchDebounceRef.current = null;
    }, 400);
  };

  const dynamicFilters = [
    {
      id: "categoryId",
      label: "دسته‌بندی",
      options: [{ id: "", label: "همه" }, ...categories.map((cat) => ({ id: cat.id.toString(), label: cat.name }))],
    },
    {
      id: "brandId",
      label: "برند",
      options: [{ id: "", label: "همه" }, ...brands.map((brand) => ({ id: brand.id.toString(), label: brand.name }))],
    },
  ];

  return (
    <>
      <HeaderSection
        setViewMode={setViewMode}
        viewMode={viewMode}
        onSearch={handleSearch}
        searchValue={filters.query}
      />
      <div className="grid lg:grid-cols-4 max-lg:px-4 lg:container mt-10 gap-4 md:gap-8">
        <div className="max-lg:hidden">
          <FiltersSection
            dynamicFilters={dynamicFilters}
            isInventory={true}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="lg:col-span-3">
          {searchError && searchQuery.length >= 2 && (
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {searchError}
            </div>
          )}
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <ProductList
              viewMode={viewMode}
              products={products}
              totalCount={totalCount}
              searchMode={searchQuery.length >= 2}
            />
          )}
        </div>
      </div>
    </>
  );
}

