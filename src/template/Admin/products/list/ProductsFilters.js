"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import StatusSelect from "@/components/FilterSelects/StatusSelect";
import FilterSection from "@/components/FilterSection";
import FilterSearchInput from "@/components/FilterSelects/FilterSearchInput";
import { productCategoryService } from "@/services/product/productCategoryService";
import { productBrandService } from "@/services/product/productBrandService";

const STATUS_OPTIONS = [
  { value: "1", label: "فعال" },
  { value: "2", label: "غیرفعال" },
  { value: "3", label: "ناموجود" },
];

export default function ProductsFilters({ isInDrawer = false }) {
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

  const categoryOptions = categories.map((cat) => ({
    value: cat.id.toString(),
    label: cat.name,
  }));

  const brandOptions = brands.map((brand) => ({
    value: brand.id.toString(),
    label: brand.name,
  }));

  const searchValue = searchParams.get("search") || "";

  const handleSearchChange = (value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value) {
      newParams.set("search", value);
    } else {
      newParams.delete("search");
    }
    newParams.delete("page");
    router.push(`/admin/products/list?${newParams.toString()}`);
  };

  return (
    <FilterSection isAdmin>
      <FilterSearchInput value={searchValue} onChange={handleSearchChange} isAdmin placeholder="جستجو محصول..." />

      <StatusSelect
        value={filterCategory}
        onValueChange={handleCategoryChange}
        placeholder="دسته‌بندی"
        options={categoryOptions}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
      <StatusSelect
        value={filterBrand}
        onValueChange={handleBrandChange}
        placeholder="برند"
        options={brandOptions}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
      <StatusSelect
        value={filterStatus}
        onValueChange={handleStatusChange}
        placeholder="وضعیت"
        options={STATUS_OPTIONS}
        includeAll={true}
        isInDrawer={isInDrawer}
        isAdmin
      />
    </FilterSection>
  );
}
