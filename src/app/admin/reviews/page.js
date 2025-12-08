"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Admin/PageHeader";
import ReviewsTable from "@/template/Admin/reviews/ReviewsTable";

const mockReviews = [
  {
    id: 1,
    customerName: "علی محمدی",
    productName: "لپ تاپ Dell XPS 15",
    rating: 5,
    comment: "محصول عالی و با کیفیت",
    status: "approved",
    date: "1403/09/20",
  },
  {
    id: 2,
    customerName: "مریم احمدی",
    productName: "گوشی سامسونگ",
    rating: 4,
    comment: "خوب بود ولی قیمت بالایی داشت",
    status: "pending",
    date: "1403/09/19",
  },
  {
    id: 3,
    customerName: "حسین رضایی",
    productName: "هدفون Sony",
    rating: 3,
    comment: "کیفیت صدا متوسط بود",
    status: "approved",
    date: "1403/09/18",
  },
];

export default function ReviewsPage() {
  const [reviews] = useState(mockReviews);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter(
    (review) =>
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 bg-opacity-50 border border-gray-700 shadow-lg rounded-xl p-6">
        <PageHeader
          title="نظرات و امتیازات"
          searchPlaceholder="جستجو ..."
          searchValue={searchTerm}
          onSearchChange={setSearchTerm}
        />

        <ReviewsTable reviews={filteredReviews} />
      </div>
    </div>
  );
}
