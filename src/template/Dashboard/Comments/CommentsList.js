"use client";

import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import CommentsFilter from "./CommentsFilter";
import CommentCard from "./CommentCard";

const initialComments = [
  {
    id: 1,
    productTitle: "Sony Play Station ۵ Slim – Advanced Edition Gaming Console",
    productImage: "/image/Home/product.png",
    comment: "کیفیت ساخت خیلی خوبه و دکمه ها عملکرد نرمی دارن",
    rating: 4.5,
    status: "pending",
    statusText: "در حال بررسی",
    date: "۱۴۰۳/۰۱/۲۱",
    replies: [
      {
        id: 1,
        text: "از نظر شما ممنونیم. خوشحالیم که رضایت داشتید",
        date: "۱۴۰۳/۰۱/۲۲",
      },
      {
        id: 2,
        text: "پاسخ دوم برای تست",
        date: "۱۴۰۳/۰۱/۲۳",
      },
    ],
  },
  {
    id: 2,
    productTitle: "Sony Play Station ۵ Slim – Advanced Edition Gaming Console",
    productImage: "/image/Home/product.png",
    comment: "کیفیت ساخت خیلی خوبه و دکمه ها عملکرد نرمی دارن",
    rating: 4.5,
    status: "approved",
    statusText: "تأیید شده",
    date: "۱۴۰۳/۰۱/۲۱",
    replies: [],
  },
];

export default function CommentsList() {
  const [comments, setComments] = useState(initialComments);
  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
  });

  const handleDelete = (commentId) => {
    if (confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  const handleEdit = (commentId) => {
    // Handle edit logic
    console.log("Edit comment:", commentId);
  };

  return (
    <div dir="rtl">
      {/* Header Section */}
      <PageHeader
        title="نظرات من"
        description="نظراتی که روی محصولات ثبت کرده اید و وضعیت بررسی آنها."
      />

      {/* Filters and Count Section */}
      <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-4 mb-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Total Reviews Count - Left */}
          <div className="text-sm text-gray-700 dark:text-dark-text">
            کل نظرات : <span className="font-semibold text-yellow-600 dark:text-yellow-400">{comments.length} نظر</span>
          </div>

          {/* Filters - Right */}
          <CommentsFilter filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-8 text-center">
            <p className="text-gray-500 dark:text-dark-text">هیچ نظری ثبت نشده است</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onDelete={() => handleDelete(comment.id)}
                onEdit={() => handleEdit(comment.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

