"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Admin/PageHeader";
import InventoryTable from "@/template/Admin/inventory/InventoryTable";

const mockInventory = [
  { id: 1, productName: "لپ تاپ Dell XPS 15", currentStock: 15, minStock: 10, status: "ok" },
  { id: 2, productName: "گوشی سامسونگ Galaxy S24", currentStock: 8, minStock: 10, status: "low" },
  { id: 3, productName: "هدفون Sony WH-1000XM5", currentStock: 0, minStock: 5, status: "out" },
  { id: 4, productName: "ساعت هوشمند Apple Watch", currentStock: 25, minStock: 10, status: "ok" },
];

export default function InventoryPage() {
  const [inventory] = useState(mockInventory);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventory.filter((item) =>
    item.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="موجودی محصولات"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <InventoryTable inventory={filteredInventory} />
      </div>
    </div>
  );
}
