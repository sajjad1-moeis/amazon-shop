"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import RecentViewCard from "@/template/Dashboard/RecentViews/RecentViewCard";
import SimilarProductsSection from "@/template/Dashboard/RecentViews/SimilarProductsSection";
import { Button } from "@/components/ui/button";
import { Trash } from "iconsax-reactjs";
import RecentViewFilter from "@/template/Dashboard/RecentViews/RecentViewFilter";
import DashboardLayout from "@/layout/DashboardLayout";

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
        <Button variant="ghost" className="bg-gray-200 dark:bg-dark-field text-red-600">
          <Trash />
          حذف همه بازدید‌ها
        </Button>
      </PageHeader>

      <RecentViewFilter filters={filters} onFiltersChange={() => {}} />

      {/* Product List Header */}
      <div className="flex items-center justify-between my-8">
        <h2 className="text-lg md:text-xl font-bold text-primary-700 dark:text-dark-title">لیست محصولات</h2>
        <div className="text-sm text-gray-500 dark:text-dark-text">
          تعداد بازدیدها: <span className="font-semibold text-yellow-600 dark:text-dark-title">{products.length}</span>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div
          className="bg-white dark:bg-dark-box rounded-2xl shadow-md p-8 text-center mb-6"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-gray-500 dark:text-dark-text">هیچ بازدید اخیری وجود ندارد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  mb-6">
          {products.map((product) => (
            <RecentViewCard key={product.id} product={product} onDelete={() => handleDelete(product.id)} />
          ))}
        </div>
      )}

      {/* Similar Products Section */}
      <SimilarProductsSection />
    </DashboardLayout>
  );
}
