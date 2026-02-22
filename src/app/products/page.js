"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import IndexLayout from "@/layout/IndexLayout";
import FiltersSection from "@/components/module/FiltersSection";
import HeaderSection from "@/template/Products/HeaderSection";
import ProductList from "@/template/Products/ProductList";
import { productService } from "@/services/product/productService";
import { productCategoryService } from "@/services/product/productCategoryService";
import { productBrandService } from "@/services/product/productBrandService";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

export default function ProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [viewMode, setViewMode] = useState("list");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [filters, setFilters] = useState({
    categoryId: searchParams.get("category") || "",
    brandId: searchParams.get("brand") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    query: searchParams.get("search") || "",
  });
  const [pageNumber, setPageNumber] = useState(parseInt(searchParams.get("page")) || 1);
  const [pageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await productCategoryService.getActive();
      if (response.success && response.data) {
        setCategories(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await productBrandService.getActive();
      if (response.success && response.data) {
        setBrands(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        pageNumber,
        pageSize,
        query: filters.query || undefined,
        categoryId: filters.categoryId || undefined,
        brandId: filters.brandId || undefined,
        minPrice: filters.minPrice || undefined,
        maxPrice: filters.maxPrice || undefined,
      };

      const response = await productService.search(params);

      if (response.success && response.data) {
        setProducts(response.data.products || response.data || []);
        setTotalPages(response.data.totalPages || 1);
        setTotalCount(response.data.totalCount || 0);
      } else {
        toast.error(response.message || "خطا در دریافت محصولات");
      }
    } catch (error) {
      toast.error(error.message || "خطا در دریافت محصولات");
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [pageNumber, pageSize, filters]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
    setPageNumber(1);
    const params = new URLSearchParams();
    if (value) params.set(filterType, value);
    Object.entries(filters).forEach(([key, val]) => {
      if (key !== filterType && val) params.set(key, val);
    });
    router.push(`/products?${params.toString()}`);
  };

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, query }));
    setPageNumber(1);
    const params = new URLSearchParams();
    if (query) params.set("search", query);
    Object.entries(filters).forEach(([key, val]) => {
      if (key !== "query" && val) params.set(key, val);
    });
    router.push(`/products?${params.toString()}`);
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
    <IndexLayout>
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
    </IndexLayout>
  );
}
