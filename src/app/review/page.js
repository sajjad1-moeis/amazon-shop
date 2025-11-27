"use client";

import IndexLayout from "@/layout/IndexLayout";
import FiltersSection from "@/components/module/FiltersSection";
import HeaderSection from "@/template/Products/HeaderSection";
import ProductList from "@/template/Products/ProductList";
import React, { useState } from "react";
import ReviewsBoard from "@/template/Review/ReviewsBoard";
const dynamicFilters = [
  {
    id: "color",
    label: "رنگ",
    options: [
      { id: "red", label: "قرمز" },
      { id: "blue", label: "آبی" },
      { id: "green", label: "سبز" },
    ],
  },
  {
    id: "size",
    label: "سایز",
    options: [
      { id: "s", label: "کوچک" },
      { id: "m", label: "متوسط" },
      { id: "l", label: "بزرگ" },
    ],
  },
];

function Page() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <IndexLayout>
      <HeaderSection setViewMode={setViewMode} viewMode={viewMode} />
      <div className="grid grid-cols-4 container mt-10 gap-8">
        <FiltersSection isInventory={true} dynamicFilters={dynamicFilters} />
        <div className="md:col-span-3">
          <ReviewsBoard />
        </div>
      </div>
    </IndexLayout>
  );
}

export default Page;
