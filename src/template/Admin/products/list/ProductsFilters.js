"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productCategoryService } from "@/services/product/productCategoryService";
import { productBrandService } from "@/services/product/productBrandService";

const STATUS_OPTIONS = [
  { value: "all", label: "همه" },
  { value: "1", label: "فعال" },
  { value: "2", label: "غیرفعال" },
  { value: "3", label: "ناموجود" },
];

export default function ProductsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  const filterCategory = searchParams.get("category") || "all";
  const filterStatus = searchParams.get("status") || "all";
  const filterBrand = searchParams.get("brand") || "all";

  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      setLoading(true);
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
      console.error("Error fetching filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateURL = (params) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([key, value]) => {
      if (value === "all" || !value) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
    });
    newParams.delete("page");
    router.push(`/admin/products/list?${newParams.toString()}`);
  };

  const handleCategoryChange = (value) => {
    updateURL({ category: value, status: filterStatus, brand: filterBrand });
  };

  const handleStatusChange = (value) => {
    updateURL({ category: filterCategory, status: value, brand: filterBrand });
  };

  const handleBrandChange = (value) => {
    updateURL({ category: filterCategory, status: filterStatus, brand: value });
  };

  return (
    <div className="flex gap-2">
      <Select value={filterCategory} onValueChange={handleCategoryChange} disabled={loading}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[140px]">
          <SelectValue placeholder="دسته‌بندی" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={cat.id.toString()}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterBrand} onValueChange={handleBrandChange} disabled={loading}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[140px]">
          <SelectValue placeholder="برند" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه</SelectItem>
          {brands.map((brand) => (
            <SelectItem key={brand.id} value={brand.id.toString()}>
              {brand.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filterStatus} onValueChange={handleStatusChange}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-[43px] w-[140px]">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          {STATUS_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
