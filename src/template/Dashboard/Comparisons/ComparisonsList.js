"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ComparisonCard from "./ComparisonCard";
import { Button } from "@/components/ui/button";
import { Trash2 } from "iconsax-reactjs";

const initialComparisons = [
  {
    id: 1,
    name: "مقایسه لپتاپ‌ها",
    products: [
      {
        id: "p1",
        title: "MacBook Pro 16",
        price: "۱۵۰,۰۰۰,۰۰۰ تومان",
        image: "/image/Home/product.png",
        retailer: "amazon",
      },
      {
        id: "p2",
        title: "Dell XPS 15",
        price: "۱۲۰,۰۰۰,۰۰۰ تومان",
        image: "/image/Home/product.png",
        retailer: "amazon",
      },
    ],
    createdAt: "۱۴۰۳/۱۰/۰۵",
  },
  {
    id: 2,
    name: "مقایسه گوشی‌های موبایل",
    products: [
      {
        id: "p3",
        title: "iPhone 15 Pro",
        price: "۸۰,۰۰۰,۰۰۰ تومان",
        image: "/image/Home/product.png",
        retailer: "amazon",
      },
      {
        id: "p4",
        title: "Samsung Galaxy S24",
        price: "۷۵,۰۰۰,۰۰۰ تومان",
        image: "/image/Home/product.png",
        retailer: "amazon",
      },
      {
        id: "p5",
        title: "Google Pixel 8",
        price: "۷۰,۰۰۰,۰۰۰ تومان",
        image: "/image/Home/product.png",
        retailer: "amazon",
      },
    ],
    createdAt: "۱۴۰۳/۱۰/۰۳",
  },
];

export default function ComparisonsList() {
  const [comparisons, setComparisons] = useState(initialComparisons);

  const handleDelete = (comparisonId) => {
    if (confirm("آیا از حذف این مقایسه اطمینان دارید؟")) {
      setComparisons(comparisons.filter((c) => c.id !== comparisonId));
    }
  };

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="مقایسه‌های ذخیره شده"
        description="مقایسه محصولات مختلف و انتخاب بهترین گزینه"
      />

      {/* Comparisons Grid */}
      {comparisons.length === 0 ? (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-gray-500 dark:text-gray-400">هیچ مقایسه‌ای ذخیره نشده است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {comparisons.map((comparison) => (
            <ComparisonCard
              key={comparison.id}
              comparison={comparison}
              onDelete={() => handleDelete(comparison.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

