"use client";

import React, { useState } from "react";
import FavoriteCard from "./FavoriteCard";
import FavoritesFilter from "./FavoritesFilter";
import PageHeader from "@/template/Dashboard/Common/PageHeader";

const products = [
  {
    id: 1,
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    image: "/image/Home/product.png",
    currentPrice: "۲۷,۴۵۰,۰۰۰",
    priceChange: "-۱.۲۴",
    trackingStatus: "active",
    lastChecked: "۲ ساعت پیش",
  },
  {
    id: 2,
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    image: "/image/Home/product.png",
    currentPrice: "۲۷,۴۵۰,۰۰۰",
    priceChange: "-۱.۲۷",
    trackingStatus: "active",
    lastChecked: "۲ ساعت پیش",
  },
  {
    id: 3,
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    image: "/image/Home/product.png",
    currentPrice: "۲۷,۴۵۰,۰۰۰",
    priceChange: "-۱.۲۴",
    trackingStatus: "active",
    lastChecked: "۲ ساعت پیش",
  },
  {
    id: 4,
    title: "Sony PlayStation 5 Slim – Advanced Edition Gaming Console",
    brand: "SONY",
    image: "/image/Home/product.png",
    currentPrice: "۲۷,۴۵۰,۰۰۰",
    priceChange: "-۱.۲۷",
    trackingStatus: "active",
    lastChecked: "۲ ساعت پیش",
  },
];

export default function FavoritesList() {
  const [filters, setFilters] = useState({
    sortBy: "",
    trackingStatus: "",
    brand: "",
    searchQuery: "",
  });

  const recentPriceDrops = products.filter((p) => parseFloat(p.priceChange) < 0).length;

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader title="علاقه مندی ها" description="لیست محصولاتی که ذخیره کرده اید." />

      {/* Bottom Section: Summary, Filter and Products */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        {/* Summary Statistics */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 mb-6">
          <div className="flex flex-wrap gap-4 md:gap-6">
            <div className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              تعداد محصولات: <span className="font-bold">{products.length}</span>
            </div>
            <div className="text-sm md:text-base text-gray-700 dark:text-gray-300">
              کاهش قیمت اخیر: <span className="font-bold text-yellow-600">{recentPriceDrops} مورد</span>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <FavoritesFilter filters={filters} onFiltersChange={setFilters} />

        {/* Products List */}
        <div className="space-y-4 mt-6">
          {products.map((product) => (
            <FavoriteCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
