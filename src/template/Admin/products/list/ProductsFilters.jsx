"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SearchNormal1 } from "iconsax-reactjs";
import { productCategoryService } from "@/services/product/productCategoryService";

const STATUS_OPTIONS = [
  { value: "1", label: "پیش‌نویس" },
  { value: "2", label: "منتشر شده" },
];

const BASE_PATH = "/admin/products/list";

export default function ProductsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";
  const statusParam = searchParams.get("status") || "all";
  const searchParam = searchParams.get("search") || "";
  const [searchInput, setSearchInput] = useState(searchParam);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await productCategoryService.getActive();
        if (res?.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (e) {
        console.error("Error loading categories:", e);
      }
    };
    load();
  }, []);

  useEffect(() => {
    setSearchInput(searchParam);
  }, [searchParam]);

  const setQuery = (updates) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value == null || value === "" || value === "all") params.delete(key);
      else params.set(key, String(value));
    });
    params.delete("page");
    const q = params.toString();
    router.push(q ? `${BASE_PATH}?${q}` : BASE_PATH);
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault?.();
    setQuery({ search: searchInput.trim() || undefined, category: categoryParam, status: statusParam });
  };

  const handleCategoryChange = (v) => {
    setQuery({ category: v, status: statusParam, search: searchInput.trim() || undefined });
  };

  const handleStatusChange = (v) => {
    setQuery({ status: v, category: categoryParam, search: searchInput.trim() || undefined });
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex flex-wrap items-center gap-3">
      <div className="relative flex-1 min-w-[180px] max-w-[260px]">
        <SearchNormal1 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        <Input
          type="text"
          placeholder="جستجو محصول..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={handleSearchSubmit}
          className="bg-gray-700 border-gray-600 text-white h-10 pl-3 pr-10"
        />
      </div>
      <Select value={categoryParam} onValueChange={handleCategoryChange}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-10 w-[160px]">
          <SelectValue placeholder="دسته‌بندی" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه دسته‌ها</SelectItem>
          {categories.map((cat) => (
            <SelectItem key={cat.id} value={String(cat.id)}>
              {cat.name || `دسته ${cat.id}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={statusParam} onValueChange={handleStatusChange}>
        <SelectTrigger className="bg-gray-700 border-gray-600 text-white h-10 w-[140px]">
          <SelectValue placeholder="وضعیت" />
        </SelectTrigger>
        <SelectContent className="bg-gray-800 border-gray-700">
          <SelectItem value="all">همه وضعیت‌ها</SelectItem>
          {STATUS_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </form>
  );
}
