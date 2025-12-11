"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Add } from "iconsax-reactjs";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import ReturnRequestsFilter from "./ReturnRequestsFilter";
import ActiveReturnCard from "./ActiveReturnCard";
import ReturnsTable from "./ReturnsTable";
// import CreateReturnRequestModal from "./CreateReturnRequestModal";

const initialReturns = [
  {
    id: "RM-45213",
    product: {
      name: "کنترلر پلی استی...",
      image: "/image/Home/product.png",
    },
    reason: "خرابی عملکرد دکمه...",
    date: "۱۴۰۳/۱۰/۲۱",
    status: "reviewing",
    refundAmount: null,
  },
  {
    id: "RM-45213",
    product: {
      name: "کنترلر پلی استی...",
      image: "/image/Home/product.png",
    },
    reason: "خرابی عملکرد دکمه...",
    date: "۱۴۰۳/۱۰/۲۱",
    status: "approved",
    refundAmount: "۱۲,۰۰۰,۰۰۰",
  },
];

const activeReturn = {
  id: "RM-45213",
  product: {
    name: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    image: "/image/Home/product.png",
  },
  date: "۱۴۰۳/۱۰/۲۱",
  reason: "خرابی عملکرد دکمه ها",
  status: "reviewing",
  currentStep: 2, // بررسی کارشناسان
};

export default function ReturnRequestsList() {
  const [returns, setReturns] = useState(initialReturns);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    category: "",
    searchQuery: "",
  });

  const handleAddReturn = (newReturn) => {
    const returnNumber = `RM-${Math.floor(Math.random() * 90000) + 10000}`;
    const today = new Date();
    const persianDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(
      today.getDate()
    ).padStart(2, "0")}`;

    const returnRequest = {
      id: returnNumber,
      product: {
        name: newReturn.productName,
        image: newReturn.productImage || "/images/default.jpg",
      },
      reason: newReturn.reason,
      date: persianDate,
      status: "reviewing",
      refundAmount: null,
    };

    setReturns([returnRequest, ...returns]);
  };

  const handleCancelReturn = (returnId) => {
    if (confirm("آیا از لغو این درخواست اطمینان دارید؟")) {
      setReturns(returns.filter((r) => r.id !== returnId));
    }
  };

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="درخواستهای مرجوعی"
        description="تمام درخواستهایی که برای مرجوعی کالا ثبت کرده اید در این بخش قابل مشاهده و پیگیری هستند"
      />

      {/* Filters Section with New Request Button */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <ReturnRequestsFilter 
          filters={filters} 
          onFiltersChange={setFilters}
          onCreateNew={() => setIsModalOpen(true)}
        />
      </div>

      {/* Active Return Status Section */}
      {activeReturn && (
        <div className="mb-6">
          <ActiveReturnCard returnData={activeReturn} onCancel={handleCancelReturn} />
        </div>
      )}

      {/* Returns Table Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <h2 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-6">لیست درخواستهای مرجوعی</h2>
        <ReturnsTable returns={returns} onCancel={handleCancelReturn} />
      </div>

      {/* Create Return Request Modal */}
      {/* <CreateReturnRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddReturn}
      /> */}
    </>
  );
}
