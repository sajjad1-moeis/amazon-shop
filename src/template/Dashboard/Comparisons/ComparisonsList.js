"use client";

import React, { useState } from "react";
import ComparisonCard from "./ComparisonCard";
import { Button } from "@/components/ui/button";
import { Trash, Add } from "iconsax-reactjs";
import { toast } from "sonner";

const initialComparisons = [
  {
    id: 1,
    title: "مقایسه کنترلرهای پلی استیشن",
    category: "لوازم جانبی کنسول",
    products: [
      {
        id: "p1",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
      {
        id: "p2",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
    ],
    saveDate: "۱۴۰۳/۱۰/۱۹",
    productsCount: 3,
  },
  {
    id: 2,
    title: "مقایسه کنترلرهای پلی استیشن",
    category: "لوازم جانبی کنسول",
    products: [
      {
        id: "p3",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
      {
        id: "p4",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
    ],
    saveDate: "۱۴۰۳/۱۰/۱۹",
    productsCount: 3,
  },
  {
    id: 3,
    title: "مقایسه کنترلرهای پلی استیشن",
    category: "لوازم جانبی کنسول",
    products: [
      {
        id: "p5",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
      {
        id: "p6",
        title: "Sony Play Station 5 Controller",
        image: "/image/Home/product.png",
      },
    ],
    saveDate: "۱۴۰۳/۱۰/۱۹",
    productsCount: 3,
  },
];

export default function ComparisonsList() {
  const [comparisons, setComparisons] = useState(initialComparisons);

  const handleDelete = (comparisonId) => {
    if (confirm("آیا از حذف این مقایسه اطمینان دارید؟")) {
      setComparisons(comparisons.filter((c) => c.id !== comparisonId));
      toast.success("مقایسه با موفقیت حذف شد");
    }
  };

  const handleDeleteAll = () => {
    if (confirm("آیا از حذف همه مقایسه‌ها اطمینان دارید؟")) {
      setComparisons([]);
      toast.success("همه مقایسه‌ها با موفقیت حذف شدند");
    }
  };

  const handleCreateNew = () => {
    toast.info("در حال انتقال به صفحه ایجاد مقایسه جدید...");
  };

  return (
    <>
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-dark-title mb-2">مقایسه های ذخیره شده</h1>
        <p className="text-gray-600 dark:text-dark-text mb-4">
          مقایسه هایی که ذخیره کرده اید را اینجا ببینید و دوباره بررسی کنید.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleCreateNew}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium gap-2"
          >
            <Add size={20} />
            ایجاد مقایسه جدید
          </Button>
          <Button
            variant="outline"
            onClick={handleDeleteAll}
            className="gap-2 text-gray-700 dark:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-field"
            disabled={comparisons.length === 0}
          >
            <Trash size={18} />
            حذف همه
          </Button>
        </div>
      </div>

      {/* Comparisons Grid */}
      {comparisons.length === 0 ? (
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-box p-8 text-center">
          <p className="text-gray-500 dark:text-dark-text">هیچ مقایسه‌ای ذخیره نشده است</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {comparisons.map((comparison) => (
            <ComparisonCard key={comparison.id} comparison={comparison} onDelete={() => handleDelete(comparison.id)} />
          ))}
        </div>
      )}
    </>
  );
}
