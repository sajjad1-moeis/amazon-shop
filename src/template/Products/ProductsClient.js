"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FiltersSection from "@/components/module/FiltersSection";
import HeaderSection from "@/template/Products/HeaderSection";
import ProductList from "@/template/Products/ProductList";
import { Spinner } from "@/components/ui/spinner";

export default function ProductsClient({ searchParams: serverSearchParams }) {
  const router = useRouter();
  const clientSearchParams = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  
  // داده‌های تستی
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

  // فیلتر کردن محصولات بر اساس فیلترها
  useEffect(() => {
    let filtered = [...mockProducts];

    if (filters.query) {
      const query = filters.query.toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(query));
    }

    if (filters.categoryId) {
      // در حالت تستی، همه محصولات را نشان می‌دهیم
    }

    if (filters.brandId) {
      // در حالت تستی، همه محصولات را نشان می‌دهیم
    }

    if (filters.minPrice) {
      filtered = filtered.filter((p) => (p.discountPrice || p.price) >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((p) => (p.discountPrice || p.price) <= parseFloat(filters.maxPrice));
    }

    setProducts(filtered);
    setTotalCount(filtered.length);
  }, [filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPageNumber(1);
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, query }));
    setPageNumber(1);
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
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <Spinner size="lg" />
            </div>
          ) : (
            <ProductList viewMode={viewMode} products={products} totalCount={totalCount} />
          )}
        </div>
      </div>
    </>
  );
}

