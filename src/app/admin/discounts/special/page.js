"use client";

import React, { useState } from "react";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Admin/PageHeader";
import SpecialDiscountsTable from "@/template/Admin/discounts/special/SpecialDiscountsTable";

// داده‌های تستی
const mockSpecialDiscounts = [
  {
    id: 1,
    code: "SPECIAL50",
    type: "percentage",
    value: 50,
    minPurchase: 500000,
    maxDiscount: 1000000,
    usageLimit: 50,
    used: 25,
    status: "active",
    startDate: "1403/09/01",
    endDate: "1403/12/29",
  },
  {
    id: 2,
    code: "VIP100",
    type: "fixed",
    value: 100000,
    minPurchase: 1000000,
    maxDiscount: null,
    usageLimit: 100,
    used: 45,
    status: "active",
    startDate: "1403/09/15",
    endDate: "1403/10/15",
  },
  {
    id: 3,
    code: "BLACKFRIDAY",
    type: "percentage",
    value: 30,
    minPurchase: 200000,
    maxDiscount: 500000,
    usageLimit: 200,
    used: 200,
    status: "expired",
    startDate: "1403/08/01",
    endDate: "1403/08/31",
  },
];

export default function SpecialDiscountsPage() {
  const [discounts] = useState(mockSpecialDiscounts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDiscounts = discounts.filter((discount) =>
    discount.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="">
        <PageHeader
          title="تخفیف‌های ویژه"
          buttonText="تخفیف ویژه جدید"
          buttonIcon={<Add size={20} className="ml-2" />}
          buttonHref="/admin/discounts/special/create"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <SpecialDiscountsTable discounts={filteredDiscounts} />
      </div>
    </div>
  );
}
