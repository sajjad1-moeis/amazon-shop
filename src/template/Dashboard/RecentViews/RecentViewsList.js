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
    <div dir="rtl">
      {/* Top Section: Header with Count */}
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="بازدیدهای اخیر" description="محصولاتی که اخیراً مشاهده کرده‌اید" />
        <div className="text-sm text-gray-600 dark:text-gray-400">
          تعداد بازدیدها: <span className="font-semibold text-gray-900 dark:text-white">{products.length}</span>
        </div>
      </div>

      {/* Product List Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">لیست محصولات</h2>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center mb-6"
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
    </div>
  );
}
