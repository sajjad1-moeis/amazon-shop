"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import RecentViewsFilter from "./RecentViewsFilter";
import RecentViewCard from "./RecentViewCard";
import SimilarProductsSection from "./SimilarProductsSection";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";

const initialProducts = [
  {
    id: "p1",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    price: "۱۲۰,۴۵۰,۰۰۰",
    image: "/image/Home/product.png",
    retailer: "amazon",
    lastViewed: "۱۴۰۳/۱۰/۲۴ - ۱۴:۲۱",
    viewCount: 3,
    inStock: true,
  },
  {
    id: "p2",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    price: "۱۲۰,۴۵۰,۰۰۰",
    image: "/image/Home/product.png",
    retailer: "amazon",
    lastViewed: "۱۴۰۳/۱۰/۲۴ - ۱۴:۲۰",
    viewCount: 2,
    inStock: false,
  },
  {
    id: "p3",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    price: "۱۲۰,۴۵۰,۰۰۰",
    image: "/image/Home/product.png",
    retailer: "amazon",
    lastViewed: "۱۴۰۳/۱۰/۲۴ - ۱۴:۱۹",
    viewCount: 1,
    inStock: true,
  },
  {
    id: "p4",
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    price: "۱۲۰,۴۵۰,۰۰۰",
    image: "/image/Home/product.png",
    retailer: "amazon",
    lastViewed: "۱۴۰۳/۱۰/۲۴ - ۱۴:۱۸",
    viewCount: 1,
    inStock: true,
  },
];

export default function RecentViewsList() {
  const [products, setProducts] = useState(initialProducts);
  const [filters, setFilters] = useState({
    sortBy: "",
    dateRange: "",
    category: "",
    searchQuery: "",
  });

  const handleDelete = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
  };

  const handleClearAll = () => {
    if (confirm("آیا از پاک کردن تمام بازدیدهای اخیر اطمینان دارید؟")) {
      setProducts([]);
    }
  };

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader title="بازدیدهای اخیر" description="محصولاتی که اخیراً مشاهده کرده‌اید" />

      {/* Filters and Actions Section */}
      {products.length > 0 && (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                تعداد بازدیدها: <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span>
              </span>
            </div>
            <Button
              variant="outline"
              onClick={handleClearAll}
              className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-900/20"
            >
              <Trash className="h-4 w-4" />
              حذف همه بازدیدها
            </Button>
          </div>
          <RecentViewsFilter filters={filters} onFiltersChange={setFilters} />
        </div>
      )}

      {/* Products Grid */}
      {products.length === 0 ? (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-gray-500 dark:text-gray-400">هیچ بازدید اخیری وجود ندارد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-6">
          {products.map((product) => (
            <RecentViewCard key={product.id} product={product} onDelete={() => handleDelete(product.id)} />
          ))}
        </div>
      )}

      {/* Similar Products Section */}
      <SimilarProductsSection />
    </>
  );
}
