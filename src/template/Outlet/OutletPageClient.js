"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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
import { Shop } from "iconsax-reactjs";

const SHOP_TO_API = { uae: 1, us: 2 };
const PAGE_SIZE = 9;

function buildPagination(currentPage, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis", totalPages];
  if (currentPage >= totalPages - 2) return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
}

export default function OutletPageClient() {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
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
        setTotalCount(payload.totalCount ?? list.length);
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
          setTotalCount(0);
          setTotalPages(1);
          setError("خطا در دریافت محصولات حراجی. لطفا دوباره تلاش کنید.");
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

  return (
    <div  dir="rtl">
      <div className="bg-[#E5E7EB80] border-b border-gray-300 dark:border-dark-stroke  dark:bg-dark-box overflow-hidden">
        <div className="flex items-center md:container max-md:text-sm">
          <Link
            href="/products?discount=true"
            className="md:w-max w-1/2 max-md:justify-center items-center md:px-5 py-3 text-center text-gray-600 dark:text-dark-text border-b border-l border-gray-200 dark:border-dark-stroke hover:bg-gray-50 dark:hover:bg-dark-field transition-colors"
          >
            تخفیف‌های امروز
          </Link>
          <div className="md:w-max flex gap-1 w-1/2 items-center max-md:justify-center md:px-5 py-3 text-center  text-primary-700 dark:text-primary-300 border-b-2 border-primary-600 bg-primary-400/30 dark:bg-primary-500/10">
          <Shop variant="Bold" className="max-md:size-4.5"/>
            حراجی (outlet)
          </div>
        </div>

      </div>
      <div className="container py-6 md:py-8">

          <img src={"/image/Outlet/outletBg.png"} />
          <div className="mt-10 md:mt-22 grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        <aside className="order-2 lg:order-1">
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
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 dark:border-dark-stroke p-8 text-center text-gray-500 dark:text-dark-text">
              محصولی در حراجی پیدا نشد.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {products.map((product, index) => (
                  <ProductCard
                    key={product?.id ?? product?.asin ?? `outlet-${index}`}
                    className="h-full border border-gray-200 dark:border-dark-stroke"
                    product={product}
                    badges={product?.badges}
                  />
                ))}
              </div>

              <Pagination className="mt-6">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPageNumber((prev) => Math.max(1, prev - 1));
                      }}
                      className={pageNumber <= 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>

                  {paginationItems.map((item, idx) =>
                    item === "ellipsis" ? (
                      <PaginationItem key={`ellipsis-${idx}`}>
                        <PaginationEllipsis />
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
                        >
                          {Number(item).toLocaleString("fa-IR")}
                        </PaginationLink>
                      </PaginationItem>
                    )
                  )}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPageNumber((prev) => Math.min(totalPages, prev + 1));
                      }}
                      className={pageNumber >= totalPages ? "pointer-events-none opacity-50" : ""}
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
