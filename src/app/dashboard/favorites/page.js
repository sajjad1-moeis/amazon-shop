"use client";

import { products } from "@/data";
import DashboardLayout from "@/layout/DashboardLayout";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import FavoriteCard from "@/template/Dashboard/Favorites/FavoriteCard";
import FavoritesFilter from "@/template/Dashboard/Favorites/FavoritesFilter";
import { useState } from "react";

export default function FavoritesPage() {
  const [filters, setFilters] = useState({
    sortBy: "",
    trackingStatus: "",
    brand: "",
    searchQuery: "",
  });

  return (
    <DashboardLayout>
      {/* Top Section: Header */}
      <PageHeader title="علاقه مندی ها" description="لیست محصولاتی که ذخیره کرده اید.">
        <div class="flex gap-5">
          <p className="text-gray-500">
            تعداد محصولات: : <span className="text-yellow-600">4</span>
          </p>
          <p className="text-gray-500">
            کاهش قیمت اخیر: <span className="text-yellow-600">3 مورد</span>
          </p>
        </div>
      </PageHeader>

      <div>
        {/* Filter Section */}
        <FavoritesFilter filters={filters} onFiltersChange={setFilters} />

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
