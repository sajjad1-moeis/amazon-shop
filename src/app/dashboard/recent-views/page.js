"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import RecentViewCard from "@/template/Dashboard/RecentViews/RecentViewCard";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import RecentViewFilter from "@/template/Dashboard/RecentViews/RecentViewFilter";
import DashboardLayout from "@/layout/DashboardLayout";
import ProductSuggestions from "@/template/Dashboard/RecentViews/ProductSuggestions";

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
    <DashboardLayout>
      {/* Top Section: Header with Count */}

      <PageHeader title="بازدیدهای اخیر" description="محصولاتی که اخیراً مشاهده کرده‌اید">
        <Button variant="ghost" className="bg-gray-200 dark:bg-dark-field text-red-600 dark:text-red-400">
          <Trash />
          حذف همه بازدید‌ها
        </Button>
      </PageHeader>

      <RecentViewFilter filters={filters} onFiltersChange={() => {}} />

      {/* Product List Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4 my-4 sm:my-6 md:my-8">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-primary-700 dark:text-dark-title">
          لیست محصولات
        </h2>
        <div className="text-xs sm:text-sm text-gray-500 dark:text-dark-text">
          تعداد بازدیدها: <span className="font-semibold text-yellow-600">{products.length}</span>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div
          className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-6 sm:p-8 text-center mb-4 sm:mb-6"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-sm sm:text-base text-gray-500 dark:text-dark-text">هیچ بازدید اخیری وجود ندارد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          {products.map((product) => (
            <RecentViewCard key={product.id} product={product} onDelete={() => handleDelete(product.id)} />
          ))}
        </div>
      )}

      {/* Similar Products Section */}
      <ProductSuggestions />
    </DashboardLayout>
  );
}
