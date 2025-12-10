"use client";

import React, { useState } from "react";
import PurchaseCard from "./PurchaseCard";
import PurchasesFilter from "./PurchasesFilter";
import PageHeader from "@/template/Dashboard/Common/PageHeader";

const products = [
  {
    id: "۱۲۴۴۲۲",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۳",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۴",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۵",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۶",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۷",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۸",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
  {
    id: "۱۲۴۴۲۹",
    title: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
    purchaseDate: "۱۴۰۳/۱۰/۰۲",
    amount: "۱۲۰,۴۵۰,۰۰۰",
  },
];

export default function PurchasesList() {
  const [filters, setFilters] = useState({
    sortBy: "",
    dateFilter: "",
    searchQuery: "",
    totalCount: products.length,
  });

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader title="خریدهای من" description="لیست کامل محصولاتی که خریداری کرده اید." />

      {/* Bottom Section: Filter and Products */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        {/* Filter Section */}
        <PurchasesFilter filters={filters} onFiltersChange={setFilters} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
          {products.map((product) => (
            <PurchaseCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
