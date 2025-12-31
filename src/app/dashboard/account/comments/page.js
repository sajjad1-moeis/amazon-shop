"use client";

import DashboardLayout from "@/layout/DashboardLayout";
import React, { useState } from "react";
import PageHeader from "@/template/Dashboard/Common/PageHeader";
import CommentsFilter from "@/template/Dashboard/Comments/CommentsFilter";
import CommentCard from "@/template/Dashboard/Comments/CommentCard";
import { initialComments } from "@/data";
import CommentsList from "@/template/Dashboard/Comments/CommentsList";

export default function CommentsPage() {
  const [comments, setComments] = useState(initialComments);

  const [filters, setFilters] = useState({
    sortBy: "",
    status: "",
  });

  return (
    <DashboardLayout>
      {/* Header Section */}
      <PageHeader title="نظرات من" description="نظراتی که روی محصولات ثبت کرده اید و وضعیت بررسی آنها." />

      {/* Filters and Count Section */}
      <div className="flex-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <CommentsFilter filters={filters} onFiltersChange={setFilters} />
        {/* Total Reviews Count */}
        <div className="text-xs sm:text-sm text-gray-700 dark:text-dark-text whitespace-nowrap">
          کل نظرات : <span className="font-semibold text-yellow-600 dark:text-yellow-400">{comments.length} نظر</span>
        </div>
      </div>

      {/* Comments List */}
      <CommentsList comments={comments} setComments={setComments} />
    </DashboardLayout>
  );
}
