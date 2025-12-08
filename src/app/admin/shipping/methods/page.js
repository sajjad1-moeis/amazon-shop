"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import ShippingMethodsTable from "@/template/Admin/shipping/methods/ShippingMethodsTable";

const mockMethods = [
  { id: 1, name: "پست پیشتاز", price: 50000, estimatedDays: 3, isActive: true },
  { id: 2, name: "پست معمولی", price: 30000, estimatedDays: 7, isActive: true },
  { id: 3, name: "پیک موتوری", price: 20000, estimatedDays: 1, isActive: false },
];

export default function ShippingMethodsPage() {
  const [methods] = useState(mockMethods);

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="روش‌های ارسال"
          buttonText="روش جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
        />

        <ShippingMethodsTable methods={methods} />
      </div>
    </div>
  );
}
