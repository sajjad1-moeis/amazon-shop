"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import BrandsTable from "@/template/Admin/products/brands/BrandsTable";

const mockBrands = [
  { id: 1, name: "Apple", productsCount: 89, isActive: true },
  { id: 2, name: "Samsung", productsCount: 156, isActive: true },
  { id: 3, name: "Dell", productsCount: 67, isActive: true },
  { id: 4, name: "Sony", productsCount: 45, isActive: true },
  { id: 5, name: "HP", productsCount: 78, isActive: false },
];

export default function BrandsPage() {
  const [brands] = useState(mockBrands);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBrands = brands.filter((brand) => brand.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="برندها"
          buttonText="برند جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <BrandsTable brands={filteredBrands} />
      </div>
    </div>
  );
}
