"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import ProductsFilters from "@/template/Products/ProductsFilters";
import HeaderSection from "@/template/Products/HeaderSection";
import ProductList from "@/template/Products/ProductList";
import ProductNotFoundSection from "@/template/Products/ProductNotFoundSection";
import { ProductCardSkeletonList } from "@/components/ProductCardSkeleton";
import { productService } from "@/services/product/productService";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

/** map مقادیر UI به API طبق داک: price_asc, price_desc, rating, popularity, newest */
const SORT_TO_API = { "price-low": "price_asc", "price-high": "price_desc", newest: "newest", oldest: "newest" };
/** فروشگاه: 1=UAE, 2=America */
const SHOP_TO_API = { uae: 1, us: 2 };

function parseQuery(sp) {
  const search = (sp.get("search") ?? "").trim().slice(0, 200);
  const category = sp.get("category") ?? "";
  const brand = sp.get("brand") ?? "";
  const minPrice = sp.get("minPrice") ?? "";
  const maxPrice = sp.get("maxPrice") ?? "";
  const inStock = sp.get("inStock") === "true";
  const sortBy = sp.get("sortBy") ?? "";
  const shop = sp.get("shop") ?? "";
  const featured = sp.get("featured") === "true" || sp.get("discount") === "true";
  return { search, category, brand, minPrice, maxPrice, inStock, sortBy, shop, featured };
}

function buildFilters(query) {
  return {
    categoryId: query.category,
    brandId: query.brand,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    inStock: query.inStock,
    shop: query.shop,
    sortBy: query.sortBy,
    query: query.search,
  };
}

function buildUrl(pathname, params, overrides = {}) {
  const p = { ...params, ...overrides };
  const q = new URLSearchParams();
  if (p.search) q.set("search", p.search);
  if (p.category) q.set("category", p.category);
  if (p.brand) q.set("brand", p.brand);
  if (p.minPrice) q.set("minPrice", p.minPrice);
  if (p.maxPrice) q.set("maxPrice", p.maxPrice);
  if (p.inStock) q.set("inStock", "true");
  if (p.sortBy) q.set("sortBy", p.sortBy);
  if (p.shop) q.set("shop", p.shop);
  const qs = q.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export default function ProductsClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const searchDebounceRef = useRef(null);

  const query = parseQuery(sp);
  const filters = buildFilters(query);
  const isSearchMode = Boolean(query.search);

  const extractCategoriesBrands = (list) => {
    if (!Array.isArray(list) || list.length === 0) return;
    const catSet = new Set();
    const brandSet = new Set();
    list.forEach((p) => {
      const c = p.categoryName ?? p.category;
      if (c) catSet.add(c);
      if (p.brand) brandSet.add(p.brand);
    });
    setCategories(Array.from(catSet).map((name) => ({ id: name, name })));
    setBrands(Array.from(brandSet).map((name) => ({ id: name, name })));
  };

  useEffect(() => {
    setSearchInputValue(query.search);
  }, [query.search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const load = async () => {
      try {
        const hasSearch = Boolean(query.search);

        if (hasSearch) {
          const res = await productService.search(query.search);
          const raw = res?.data;
          const list = Array.isArray(raw) ? raw : Array.isArray(raw?.products) ? raw.products : [];
          if (cancelled) return;
          extractCategoriesBrands(list);
          setProducts(list);
          setTotalCount(list.length);
        } else {
          const res = await productService.getList({
            pageNumber: 1,
            pageSize: 100,
            category: query.category || undefined,
            brand: query.brand || undefined,
            minPrice: query.minPrice ? Number(query.minPrice) : undefined,
            maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
            inStock: query.inStock || undefined,
            featured: query.featured || undefined,
            amazonShop: SHOP_TO_API[query.shop],
            sortBy: SORT_TO_API[query.sortBy] || undefined,
          });
          if (cancelled) return;
          const payload = res?.data ?? {};
          const list = Array.isArray(payload.products) ? payload.products : [];
          const total = payload.totalCount ?? list.length;
          extractCategoriesBrands(list);
          setProducts(list);
          setTotalCount(total);
        }
      } catch {
        if (!cancelled) {
          setProducts([]);
          setTotalCount(0);
          setError("خطا در دریافت لیست محصولات.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [
    query.search,
    query.category,
    query.brand,
    query.minPrice,
    query.maxPrice,
    query.inStock,
    query.sortBy,
    query.shop,
    query.featured,
  ]);

  const updateUrl = (overrides) => {
    const next = { ...query, ...overrides };
    router.replace(buildUrl("/products", query, next), { scroll: false });
  };

  const handleFilterChange = (key, value) => {
    if (key === "categoryId") updateUrl({ category: value || undefined });
    else if (key === "brandId") updateUrl({ brand: value || undefined });
    else if (key === "minPrice") updateUrl({ minPrice: value || undefined });
    else if (key === "maxPrice") updateUrl({ maxPrice: value || undefined });
    else if (key === "inStock") updateUrl({ inStock: value ? "true" : undefined });
    else if (key === "shop") updateUrl({ shop: value || undefined });
    else if (key === "sortBy") updateUrl({ sortBy: value || undefined });
  };

  const handleClearFilters = () => {
    updateUrl({
      category: undefined,
      brand: undefined,
      minPrice: undefined,
      maxPrice: undefined,
      inStock: undefined,
      shop: undefined,
    });
  };

  const handleSearch = (value) => {
    const q = typeof value === "string" ? value.trim().slice(0, 200) : "";
    setSearchInputValue(value ?? "");
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);
    searchDebounceRef.current = setTimeout(() => {
      updateUrl({ search: q || undefined });
      searchDebounceRef.current = null;
    }, 400);
  };

  return (
    <>
      <HeaderSection
        viewMode={viewMode}
        setViewMode={setViewMode}
        onSearch={handleSearch}
        searchValue={searchInputValue}
        totalCount={totalCount}
        sortBy={filters.sortBy}
        onSortChange={(v) => handleFilterChange("sortBy", v === "all" ? "" : v)}
        onOpenFilterDrawer={() => setFilterDrawerOpen(true)}
      />
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
              onClearAll={handleClearFilters}
            />
          </div>
        </DrawerContent>
      </Drawer>
      <div className="grid lg:grid-cols-4 max-lg:px-4 lg:container my-10 gap-4 md:gap-8">
        <div className="max-lg:hidden">
          <ProductsFilters
            categories={categories}
            brands={brands}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearAll={handleClearFilters}
          />
        </div>
        <div className="lg:col-span-3">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300">
              {error}
            </div>
          )}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ProductCardSkeletonList count={8} />
            </div>
          ) : (
            <>
              <ProductList
                viewMode={viewMode}
                products={products}
                totalCount={totalCount}
                searchMode={isSearchMode}
                searchQuery={query.search}
              />
              {!isSearchMode && (
                <div className="max-lg:px-4 lg:container pb-12">
                  <ProductNotFoundSection searchQuery={query.search} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
