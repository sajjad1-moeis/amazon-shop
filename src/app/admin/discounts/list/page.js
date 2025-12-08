"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import DiscountsTable from "@/template/Admin/discounts/list/DiscountsTable";

// داده‌های تستی
const mockDiscounts = [
  {
    id: 1,
    code: "WELCOME20",
    type: "percentage",
    value: 20,
    minPurchase: 100000,
    maxDiscount: 500000,
    usageLimit: 100,
    used: 45,
    status: "active",
    startDate: "1403/09/01",
    endDate: "1403/12/29",
  },
  {
    id: 2,
    code: "SUMMER50",
    type: "fixed",
    value: 50000,
    minPurchase: 200000,
    maxDiscount: null,
    usageLimit: 50,
    used: 12,
    status: "active",
    startDate: "1403/09/15",
    endDate: "1403/10/15",
  },
  {
    id: 3,
    code: "VIP100",
    type: "percentage",
    value: 10,
    minPurchase: 500000,
    maxDiscount: 100000,
    usageLimit: 200,
    used: 200,
    status: "expired",
    startDate: "1403/08/01",
    endDate: "1403/08/31",
  },
];

export default function DiscountsListPage() {
  const [discounts] = useState(mockDiscounts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="لیست کوپن‌ها"
          buttonText="کوپن جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          buttonHref="/admin/discounts/create"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <DiscountsTable discounts={filteredDiscounts} />
      </div>
    </div>
  );
}
