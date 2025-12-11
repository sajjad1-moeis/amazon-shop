"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import CommentsFilter from "./CommentsFilter";
import CommentCard from "./CommentCard";

const initialComments = [
  {
    id: 1,
    productTitle: "Sony PlayStation 5 Slim - Advanced Edition Gaming Console",
    productImage: "/image/Home/product.png",
    comment: "محصول عالی و با کیفیت. پیشنهاد می‌کنم.",
    rating: 5,
    status: "approved",
    statusText: "تایید شده",
    date: "۱۴۰۳/۱۰/۰۵",
  },
  {
    id: 2,
    productTitle: "MacBook Pro 16 inch M3 Max",
    productImage: "/image/Home/product.png",
    comment: "لپتاپ بسیار قدرتمند و سریع. راضی هستم.",
    rating: 4,
    status: "pending",
    statusText: "در انتظار تایید",
    date: "۱۴۰۳/۱۰/۰۴",
  },
  {
    id: 3,
    productTitle: "iPhone 15 Pro Max 256GB",
    productImage: "/image/Home/product.png",
    comment: "گوشی خوبی است اما قیمت بالایی دارد.",
    rating: 3,
    status: "rejected",
    statusText: "رد شده",
    date: "۱۴۰۳/۱۰/۰۳",
  },
];

export default function CommentsList() {
  const [comments, setComments] = useState(initialComments);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
    dateRange: "",
    searchQuery: "",
  });

  const handleDelete = (commentId) => {
    if (confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  return (
    <>
      {/* Top Section: Header */}
      <PageHeader
        title="نظرات و سوالات"
        description="مدیریت نظرات و سوالاتی که برای محصولات ثبت کرده‌اید"
      />

      {/* Filters Section */}
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-4 md:p-6 mb-6"
        style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
      >
        <CommentsFilter filters={filters} onFiltersChange={setFilters} />
      </div>

      {/* Comments List */}
      {comments.length === 0 ? (
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-8 text-center"
          style={{ boxShadow: "0px 1px 6px 0px #0000000F" }}
        >
          <p className="text-gray-500 dark:text-gray-400">هیچ نظری ثبت نشده است</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} onDelete={() => handleDelete(comment.id)} />
          ))}
        </div>
      )}
    </>
  );
}

