"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import ProductsFilters from "@/template/Products/ProductsFilters";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import { productService } from "@/services/product/productService";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DealsTopSection from "./DealsTopSection";
import { ArrowLeft2, ArrowRight2, Shop, Star1, Flash, Candle } from "iconsax-reactjs";
import NotFoundView from "@/components/NotFoundView";
import { getNotFoundPreset } from "@/data/notFoundPresets";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const SHOP_TO_API = { uae: 1, us: 2 };
const PAGE_SIZE = 9;
const TODAY_DEALS_CHIPS = [
  { id: "featured", label: "پرطرفدار", icon: "star", tone: "blue" },
  { id: "endsToday", label: "امروز پایان می‌یابد", icon: "flash", tone: "orange" },
  { id: "startsToday", label: "امروز آغاز شده", icon: "flash", tone: "green" },
  { id: "all", label: "همه" },
  { id: "home", label: "خانه" },
  { id: "toys", label: "اسباب‌بازی و بازی" },
  { id: "fashion", label: "مد و پوشاک" },
  { id: "valentine", label: "ولنتاین" },
  { id: "beauty", label: "زیبایی" },
  { id: "outlet", label: "حراجی", icon: "shop" },
];

function buildPagination(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis", totalPages];
  if (currentPage >= totalPages - 2) return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

export default function OutletDealsPageClient({ activeTab = "outlet", showTopSection = true }) {
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    categoryId: "",
    brandId: "",
    minPrice: "",
    maxPrice: "",
    inStock: false,
    shop: "",
  });
  const [selectedChip, setSelectedChip] = useState("outlet");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const chipsScrollerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await productService.getList({
          pageNumber,
          pageSize: PAGE_SIZE,
          category: filters.categoryId || undefined,
          brand: filters.brandId || undefined,
          minPrice: filters.minPrice ? Number(filters.minPrice) : undefined,
          maxPrice: filters.maxPrice ? Number(filters.maxPrice) : undefined,
          inStock: filters.inStock || undefined,
          featured: true,
          amazonShop: SHOP_TO_API[filters.shop],
        });
        if (cancelled) return;
        const payload = res?.data ?? {};
        const list = Array.isArray(payload.products) ? payload.products : [];
        setProducts(list);
        setTotalPages(Math.max(1, Number(payload.totalPages) || 1));

        const catSet = new Set();
        const brandSet = new Set();
        list.forEach((product) => {
          const c = product?.categoryName ?? product?.category;
          if (c) catSet.add(c);
          if (product?.brand) brandSet.add(product.brand);
        });
        setCategories(Array.from(catSet).map((name) => ({ id: name, name })));
        setBrands(Array.from(brandSet).map((name) => ({ id: name, name })));
      } catch {
        if (!cancelled) {
          setProducts([]);
          setTotalPages(1);
          setError("خطا در دریافت محصولات. لطفا دوباره تلاش کنید.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => {
      cancelled = true;
    };
  }, [pageNumber, filters]);

  const handleFilterChange = (key, value) => {
    setPageNumber(1);
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setPageNumber(1);
    setFilters({
      categoryId: "",
      brandId: "",
      minPrice: "",
      maxPrice: "",
      inStock: false,
      shop: "",
    });
  };

  const paginationItems = useMemo(() => buildPagination(pageNumber, totalPages), [pageNumber, totalPages]);
  const filteredProducts = useMemo(() => {
    if (selectedChip === "all") return products;
    const normalize = (v) => String(v || "").toLowerCase();
    return products.filter((p) => {
      const title = normalize(p?.title || p?.name);
      const category = normalize(p?.categoryName || p?.category);
      switch (selectedChip) {
        case "all":
          return true;
        case "home":
          return category.includes("خانه") || category.includes("home") || title.includes("خانه");
        case "toys":
          return category.includes("بازی") || category.includes("toy") || title.includes("اسباب");
        case "beauty":
          return category.includes("زیبایی") || category.includes("beauty") || title.includes("زیبایی");
        case "valentine":
          return category.includes("ولنتاین") || title.includes("ولنتاین") || title.includes("هدیه");
        case "fashion":
          return category.includes("پوشاک") || category.includes("fashion") || title.includes("لباس");
        case "outlet":
          return true;
        case "featured":
          return Boolean(p?.isBestSeller || p?.isFeatured || p?.featured);
        case "endsToday":
          return Boolean(p?.endsToday || p?.expiresToday || p?.isEndingToday);
        case "startsToday":
          return Boolean(p?.startsToday || p?.startedToday || p?.isStartedToday);
        default:
          return true;
      }
    });
  }, [products, selectedChip]);

  const chipIcon = (chip) => {
    if (chip.icon === "shop") return <Shop size={16} variant="Broken" />;
    if (chip.icon === "star") return <Star1 size={16} variant="Bold" />;
    if (chip.icon === "flash") return <Flash size={16} variant="Bold" />;
    return null;
  };

  const chipToneClass = (chip, isActive) => {
    const active = isActive
      ? "bg-primary-50 border-primary-500 text-primary-700 dark:bg-primary-500/10 dark:border-primary-300 dark:text-primary-300 "
      : "bg-white dark:bg-dark-box hover:text-primary-700 hover:bg-primary-500/10 dark:hover:bg-primary-500/10 dark:hover:border-primary-300 dark:hover:text-primary-300";
    if (isActive) return active;
    if (chip.tone === "blue") return `border-gray-300 text-[#4E67C7] dark:border-dark-stroke ${active}`;
    if (chip.tone === "orange") return `border-gray-300 text-[#E79B24] dark:border-dark-stroke ${active}`;
    if (chip.tone === "green") return `border-gray-300 text-[#22A559] dark:border-dark-stroke ${active}`;
    return `border-gray-300 text-gray-600 dark:text-dark-text dark:border-dark-stroke ${active}`;
  };

  const scrollChips = (direction) => {
    const el = chipsScrollerRef.current;
    if (!el) return;
    const amount = 260;
    el.scrollBy({
      left: direction === "next" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div dir="rtl">
      {showTopSection && <DealsTopSection activeTab={activeTab} />}
      <div className="container">
        <Drawer open={filterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
          <DrawerContent className="max-h-[85vh] dark:bg-dark-box" dir="rtl">
            <DrawerHeader className="border-b border-gray-200 dark:border-dark-stroke pb-4">
              <DrawerTitle className="text-lg font-medium text-gray-900 dark:text-dark-titre text-right">
                فیلترها
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto p-4">
              <ProductsFilters
                categories={categories}
                brands={brands}
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearAll}
              />
            </div>
          </DrawerContent>
        </Drawer>

        {activeTab === "today" && (
          <div className="mb-4 flex items-center gap-2 mt-10 md:mt-22">
            <button
              type="button"
              onClick={() => scrollChips("prev")}
              className="h-10 w-10 rounded-xl border border-gray-300 bg-white text-gray-600 dark:bg-dark-box dark:border-dark-stroke dark:text-dark-text hidden md:flex items-center justify-center shrink-0"
              aria-label="قبلی"
            >
              <ArrowRight2 size={18} />
            </button>
            <Button
              variant="ghost"
              onClick={() => setFilterDrawerOpen(true)}
              className="md:hidden h-10 w-10 rounded-xl border border-gray-300 bg-gray-200 text-gray-600 dark:bg-dark-box dark:border-dark-stroke dark:text-dark-text p-0 flex items-center justify-center shrink-0"
              aria-label="نمایش فیلترها"
            >
              <Candle size={18} />
            </Button>
            <div
              ref={chipsScrollerRef}
              className="flex-1 overflow-x-auto scrollbar-hide"
              style={{ msOverflowStyle: "none", scrollbarWidth: "none" }}
            >
              <div className="flex items-center gap-2 w-max">
                {TODAY_DEALS_CHIPS.map((chip) => {
                  const isActive = selectedChip === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => setSelectedChip(chip.id)}
                      className={`h-10 md:h-11 px-3 md:px-5 rounded-xl border text-xs md:text-sm whitespace-nowrap transition-colors inline-flex items-center gap-1.5 shrink-0 ${chipToneClass(
                        chip,
                        isActive
                      )}`}
                    >
                      {chipIcon(chip)}
                      {chip.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollChips("next")}
              className="h-10 w-10 rounded-xl border border-gray-300 bg-white text-gray-600 dark:bg-dark-box dark:border-dark-stroke dark:text-dark-text hidden md:flex items-center justify-center shrink-0"
              aria-label="بعدی"
            >
              <ArrowLeft2 size={18} />
            </button>

           
          </div>
        )}

        {activeTab === "outlet" && (
          <div className="md:hidden mb-4 mt-6 flex items-center justify-between">
            <h2 className="text-primary-600 dark:text-primary-300 text-lg leading-none">
              لیست محصولات حراجی
            </h2>
            <Button
              variant="ghost"
              onClick={() => setFilterDrawerOpen(true)}
              className="h-10 w-10 rounded-xl border border-gray-300 bg-gray-200 text-gray-600 dark:bg-dark-box dark:border-dark-stroke dark:text-dark-text p-0 flex items-center justify-center shrink-0"
              aria-label="نمایش فیلترها"
            >
              <Candle size={18} />
            </Button>
          </div>
        )}

        <div className={`${showTopSection ? "my-2 md:my-4" : "my-6 md:my-8"} grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6`}>
          <aside className="order-2 lg:order-1 max-lg:hidden">
            <ProductsFilters
              categories={categories}
              brands={brands}
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearAll}
            />
          </aside>
          <section className="order-1 lg:order-2 lg:col-span-3">
            {error && (
              <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
                {error}
              </div>
            )}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <ProductCardSkeletonList count={9} />
              </div>
            ) : filteredProducts.length === 0 ? (
              <NotFoundView
                title={getNotFoundPreset("products").title}
                description={getNotFoundPreset("products").description}
                primaryButton={getNotFoundPreset("products").primaryButton}
                secondaryButton={getNotFoundPreset("products").secondaryButton}
                className="min-h-0 py-8"
              />
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product?.id ?? product?.asin ?? `outlet-${index}`}
                      className="h-full border border-gray-200 dark:border-dark-stroke"
                      product={product}
                      badges={product?.badges}
                    />
                  ))}
                </div>
                <Pagination className="mt-6">
                  <PaginationContent className="rounded-xl border border-gray-200 dark:border-dark-stroke bg-white dark:bg-dark-box px-1 py-1 gap-0 overflow-hidden">
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPageNumber((prev) => Math.max(1, prev - 1));
                        }}
                        className={`h-9 min-w-9 px-2 rounded-lg text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-field ${
                          pageNumber <= 1 ? "pointer-events-none opacity-50" : ""
                        }`}
                      />
                    </PaginationItem>
                    {paginationItems.map((item, idx) =>
                      item === "ellipsis" ? (
                        <PaginationItem key={`ellipsis-${idx}`}>
                          <PaginationEllipsis className="h-9 w-9 text-gray-500" />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={item}>
                          <PaginationLink
                            href="#"
                            isActive={item === pageNumber}
                            onClick={(e) => {
                              e.preventDefault();
                              setPageNumber(Number(item));
                            }}
                            className={`h-9 min-w-9 px-3 rounded-lg text-sm ${
                              item === pageNumber
                                ? "bg-primary-50 text-primary-700 border border-primary-200 dark:bg-primary-500/10 dark:text-primary-300 dark:border-primary-500/30"
                                : "text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-field"
                            }`}
                          >
                            {Number(item).toLocaleString("fa-IR")}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPageNumber((prev) => Math.min(totalPages, prev + 1));
                        }}
                        className={`h-9 min-w-9 px-2 rounded-lg text-gray-600 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-field ${
                          pageNumber >= totalPages ? "pointer-events-none opacity-50" : ""
                        }`}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
