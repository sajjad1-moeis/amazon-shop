"use client";

import { Button } from "@/components/ui/button";
import { products } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import FavoriteCard from "@/template/Dashboard/Favorites/FavoriteCard";
import FavoritesFilter from "@/template/Dashboard/Favorites/FavoritesFilter";
import { Add } from "iconsax-reactjs";
import { useState } from "react";

export default function FavoritesPage() {
  const [filters, setFilters] = useState({
    sortBy: "",
    trackingStatus: "",
    brand: "",
    searchQuery: "",
  });

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value,
    }));
  };

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader
        actionButton={
          <Button className="bg-yellow-500 w-full hover:bg-yellow-600 text-primary-800 md:hidden">
            افزودن علاقه‌مندی جدید
            <Add size={24} />
          </Button>
        }
        title="علاقه مندی ها"
        description="لیست محصولاتی که ذخیره کرده اید."
      >
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5 max-md:text-xs max-lg:text-sm">
          <p className="text-gray-500 dark:text-dark-text">
            تعداد محصولات: <span className="text-yellow-600">4</span>
          </p>
          <p className="text-gray-500 dark:text-dark-text">
            کاهش قیمت اخیر: <span className="text-yellow-600">3 مورد</span>
          </p>
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-primary-800 max-md:hidden">
            افزودن علاقه‌مندی جدید
            <Add size={24} />
          </Button>
        </div>
      </PageHeader>

      <div>
        {/* Filter Section */}
        <FavoritesFilter filters={filters} onFiltersChange={handleFilterChange} />

        {/* Products List */}
        <div className="space-y-4 mt-6">
          {products.map((product) => (
            <FavoriteCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
