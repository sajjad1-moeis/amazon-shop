"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import CategoriesTable from "@/template/Admin/products/categories/CategoriesTable";

const mockCategories = [
  { id: 1, name: "لپ تاپ", slug: "laptop", productsCount: 45, isActive: true },
  { id: 2, name: "موبایل", slug: "mobile", productsCount: 120, isActive: true },
  { id: 3, name: "هدفون", slug: "headphone", productsCount: 67, isActive: true },
  { id: 4, name: "ساعت هوشمند", slug: "smartwatch", productsCount: 34, isActive: false },
  { id: 5, name: "تبلت", slug: "tablet", productsCount: 28, isActive: true },
];

export default function CategoriesPage() {
  const [categories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((cat) => cat.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="دسته‌بندی‌ها"
          buttonText="دسته‌بندی جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <CategoriesTable categories={filteredCategories} />
      </div>
    </div>
  );
}
